const express = require("express");
const axios = require("axios");

const router = express.Router();

const OMDB_API_URL = process.env.OMDB_API_URL || "https://www.omdbapi.com/";
const OMDB_API_KEY = process.env.OMDB_API_KEY;

// Validation: Check if OMDB API key is set
if (!OMDB_API_KEY) {
  console.warn(
    "⚠️  WARNING: OMDB_API_KEY is not set in .env file. Movies search will fail.",
  );
}

/**
 * GET /movies/search
 * Proxy endpoint to search movies from OMDB API
 * Query params: q (search query), page (optional), type (optional), y (year, optional)
 */
router.get("/search", async (req, res, next) => {
  try {
    const { q, page = 1, type, y } = req.query;

    // Validate search query
    if (!q || q.trim() === "") {
      return res.status(400).json({
        success: false,
        error: "Search query 'q' is required and cannot be empty",
      });
    }

    if (!OMDB_API_KEY) {
      return res.status(500).json({
        success: false,
        error: "OMDB API key is not configured on the server",
      });
    }

    // Build OMDB API URL with query parameters
    const omdbParams = {
      apikey: OMDB_API_KEY,
      s: q.trim(),
      page: parseInt(page, 10) || 1,
    };

    // Add optional parameters
    if (type && type.trim()) {
      omdbParams.type = type;
    }
    if (y && y.trim()) {
      omdbParams.y = y;
    }

    // Call OMDB API
    const response = await axios.get(OMDB_API_URL, { params: omdbParams });

    // OMDB returns Response: "False" on error
    if (response.data.Response === "False") {
      return res.status(404).json({
        success: false,
        error: response.data.Error || "No movies found",
      });
    }

    // Return success response
    res.json({
      success: true,
      data: response.data,
    });
  } catch (error) {
    console.error("OMDB API Error:", error.message);

    if (error.response) {
      // OMDB API returned an error response
      return res.status(error.response.status || 500).json({
        success: false,
        error: error.response.data?.Error || "Failed to fetch movies from OMDB",
      });
    }

    // Network or other error
    next(error);
  }
});

module.exports = router;
