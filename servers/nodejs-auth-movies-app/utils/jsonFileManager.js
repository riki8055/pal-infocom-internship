const fs = require("fs").promises;
const path = require("path");

const DATA_DIR = path.join(__dirname, "..", "data");

/**
 * Ensure data directory exists
 */
async function ensureDataDir() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
  } catch (error) {
    console.error("Error creating data directory:", error);
    throw error;
  }
}

/**
 * Read JSON file safely with fallback to empty array
 * @param {string} filename - Name of JSON file in data directory
 * @returns {Promise<Array>} Parsed JSON array or empty array if file doesn't exist
 */
async function readJsonFile(filename) {
  const filePath = path.join(DATA_DIR, filename);

  try {
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    if (error.code === "ENOENT") {
      await writeJsonFile(filename, []);
      return [];
    }

    console.error(`Error reading ${filename}:`, error);
    throw error;
  }
}

/**
 * Write JSON file safely with atomic write (write to temp file, then rename)
 * @param {string} filename - Name of JSON file in data directory
 * @param {any} data - Data to write (will be stringified)
 * @returns {Promise<void>}
 */
async function writeJsonFile(filename, data) {
  try {
    await ensureDataDir();
    const filePath = path.join(DATA_DIR, filename);
    const tempPath = `${filePath}.tmp`;

    // Write to temporary file first
    await fs.writeFile(tempPath, JSON.stringify(data, null, 2), "utf-8");

    // Atomically rename temp file to actual file
    await fs.rename(tempPath, filePath);
  } catch (error) {
    console.error(`Error writing ${filename}:`, error);
    throw error;
  }
}

/**
 * Find an item in a JSON file array by field value
 * @param {string} filename - Name of JSON file
 * @param {string} field - Field name to search by
 * @param {any} value - Value to match
 * @returns {Promise<Object|null>} Found item or null
 */
async function findInFile(filename, field, value) {
  try {
    const items = await readJsonFile(filename);
    return items.find((item) => item[field] === value) || null;
  } catch (error) {
    console.error(`Error finding in ${filename}:`, error);
    throw error;
  }
}

/**
 * Get all items from a JSON file
 * @param {string} filename - Name of JSON file
 * @returns {Promise<Array>} Array of items
 */
async function getAllFromFile(filename) {
  try {
    return await readJsonFile(filename);
  } catch (error) {
    console.error(`Error getting all from ${filename}:`, error);
    throw error;
  }
}

/**
 * Add an item to a JSON file array
 * @param {string} filename - Name of JSON file
 * @param {Object} item - Item to add
 * @returns {Promise<Array>} Updated array
 */
async function addToFile(filename, item) {
  try {
    const items = await readJsonFile(filename);
    items.push(item);
    await writeJsonFile(filename, items);
    return items;
  } catch (error) {
    console.error(`Error adding to ${filename}:`, error);
    throw error;
  }
}

/**
 * Remove an item from a JSON file array by field value
 * @param {string} filename - Name of JSON file
 * @param {string} field - Field name to match
 * @param {any} value - Value to match
 * @returns {Promise<Array>} Updated array
 */
async function removeFromFile(filename, field, value) {
  try {
    let items = await readJsonFile(filename);
    const originalLength = items.length;
    items = items.filter((item) => item[field] !== value);

    if (items.length < originalLength) {
      await writeJsonFile(filename, items);
    }
    return items;
  } catch (error) {
    console.error(`Error removing from ${filename}:`, error);
    throw error;
  }
}

/**
 * Update an item in a JSON file array by field value
 * @param {string} filename - Name of JSON file
 * @param {string} field - Field name to match
 * @param {any} value - Value to match
 * @param {Object} updateData - Data to update (merged with existing item)
 * @returns {Promise<Array>} Updated array
 */
async function updateInFile(filename, field, value, updateData) {
  try {
    let items = await readJsonFile(filename);
    const index = items.findIndex((item) => item[field] === value);

    if (index !== -1) {
      items[index] = { ...items[index], ...updateData };
      await writeJsonFile(filename, items);
    }
    return items;
  } catch (error) {
    console.error(`Error updating in ${filename}:`, error);
    throw error;
  }
}

module.exports = {
  ensureDataDir,
  readJsonFile,
  writeJsonFile,
  findInFile,
  getAllFromFile,
  addToFile,
  removeFromFile,
  updateInFile,
};
