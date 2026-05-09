/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} true if valid email format
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate password strength
 * Must be at least 6 characters
 * @param {string} password - Password to validate
 * @returns {Object} { valid: boolean, message: string }
 */
function validatePassword(password) {
  if (!password) {
    return { valid: false, message: "Password is required" };
  }
  if (password.length < 6) {
    return { valid: false, message: "Password must be at least 6 characters" };
  }
  return { valid: true, message: "" };
}

/**
 * Validate name
 * Must not be empty and at least 2 characters
 * @param {string} name - Name to validate
 * @returns {Object} { valid: boolean, message: string }
 */
function validateName(name) {
  if (!name || !name.trim()) {
    return { valid: false, message: "Name is required" };
  }
  if (name.trim().length < 2) {
    return { valid: false, message: "Name must be at least 2 characters" };
  }
  return { valid: true, message: "" };
}

/**
 * Validate signup input
 * @param {Object} data - { name, email, password }
 * @returns {Object} { valid: boolean, errors: Object }
 */
function validateSignup(data) {
  const errors = {};

  // Validate name
  const nameValidation = validateName(data.name);
  if (!nameValidation.valid) {
    errors.name = nameValidation.message;
  }

  // Validate email
  if (!data.email || !data.email.trim()) {
    errors.email = "Email is required";
  } else if (!isValidEmail(data.email)) {
    errors.email = "Invalid email format";
  }

  // Validate password
  const passwordValidation = validatePassword(data.password);
  if (!passwordValidation.valid) {
    errors.password = passwordValidation.message;
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Validate login input
 * @param {Object} data - { email, password }
 * @returns {Object} { valid: boolean, errors: Object }
 */
function validateLogin(data) {
  const errors = {};

  // Validate email
  if (!data.email || !data.email.trim()) {
    errors.email = "Email is required";
  } else if (!isValidEmail(data.email)) {
    errors.email = "Invalid email format";
  }

  // Validate password
  const passwordValidation = validatePassword(data.password);
  if (!passwordValidation.valid) {
    errors.password = passwordValidation.message;
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

module.exports = {
  isValidEmail,
  validatePassword,
  validateName,
  validateSignup,
  validateLogin,
};
