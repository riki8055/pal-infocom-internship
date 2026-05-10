const express = require("express");
const { v4: uuidv4 } = require("uuid");
const authMiddleware = require("../middleware/authMiddleware");
const {
  getAllFromFile,
  addToFile,
  removeFromFile,
} = require("../utils/jsonFileManager");

const router = express.Router();

// Apply auth middleware to all routes in this router
router.use(authMiddleware);

/**
 * GET /favorites
 * Retrieve all favorites for the authenticated user
 * Protected route - requires valid JWT token
 */
router.get("/", async (req, res, next) => {
  try {
    const userId = req.user.userId;

    // Get all favorites from file
    const allFavorites = await getAllFromFile("favorites.json");

    // Filter favorites for the current user
    const userFavorites = allFavorites.filter((fav) => fav.userId === userId);

    res.status(200).json({
      success: true,
      message: "Favorites retrieved successfully",
      favorites: userFavorites,
      count: userFavorites.length,
    });
  } catch (error) {
    console.error("Get favorites error:", error);
    next(error);
  }
});

/**
 * POST /favorites
 * Add a movie to the user's favorites
 * Protected route - requires valid JWT token
 * Body: { movie: { imdbID, Title, Year, Type, Poster, ... } }
 */
router.post("/", async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const email = req.user.email;
    const { movie } = req.body;

    // Validate movie data
    if (!movie || !movie.imdbID) {
      return res.status(400).json({
        success: false,
        message: "Movie data with imdbID is required",
      });
    }

    // Check if movie is already in favorites
    const allFavorites = await getAllFromFile("favorites.json");
    const alreadyFavorited = allFavorites.some(
      (fav) => fav.userId === userId && fav.movie.imdbID === movie.imdbID,
    );

    if (alreadyFavorited) {
      return res.status(409).json({
        success: false,
        message: "This movie is already in your favorites",
      });
    }

    // Create favorite object
    const newFavorite = {
      id: uuidv4(),
      userId,
      email,
      movie,
      addedAt: new Date().toISOString(),
    };

    // Add to favorites.json
    await addToFile("favorites.json", newFavorite);

    res.status(201).json({
      success: true,
      message: "Movie added to favorites successfully",
      favorite: newFavorite,
    });
  } catch (error) {
    console.error("Add favorite error:", error);
    next(error);
  }
});

/**
 * DELETE /favorites/:imdbID
 * Remove a movie from the user's favorites
 * Protected route - requires valid JWT token
 */
router.delete("/:imdbID", async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const { imdbID } = req.params;

    if (!imdbID) {
      return res.status(400).json({
        success: false,
        message: "IMDB ID is required",
      });
    }

    // Get all favorites
    const allFavorites = await getAllFromFile("favorites.json");

    // Find the favorite to ensure it belongs to the user
    const favorite = allFavorites.find(
      (fav) => fav.userId === userId && fav.movie.imdbID === imdbID,
    );

    if (!favorite) {
      return res.status(404).json({
        success: false,
        message: "Favorite not found or does not belong to you",
      });
    }

    // Remove the favorite by its ID
    const updatedFavorites = allFavorites.filter(
      (fav) => fav.id !== favorite.id,
    );

    // Write back to file
    const fs = require("fs").promises;
    const path = require("path");
    const filePath = path.join(__dirname, "..", "data", "favorites.json");
    await fs.writeFile(
      filePath,
      JSON.stringify(updatedFavorites, null, 2),
      "utf-8",
    );

    res.status(200).json({
      success: true,
      message: "Movie removed from favorites successfully",
      removedFavorite: favorite,
    });
  } catch (error) {
    console.error("Delete favorite error:", error);
    next(error);
  }
});

module.exports = router;
