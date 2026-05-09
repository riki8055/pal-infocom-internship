require("dotenv").config();
const express = require("express");
const cors = require("cors");

// Import route files
const moviesRoutes = require("./routes/movies");

const app = express();
const PORT = process.env.PORT || 5000;

// ==================== MIDDLEWARES ====================

// CORS: Allow requests from frontend
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// Body Parser: Parse JSON and URL-encoded request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ==================== ROUTES ====================

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "Server is running!", timestamp: new Date() });
});

// Mount route files
app.use("/movies", moviesRoutes);

// TODO: Auth routes will be mounted here
// app.use("/auth", authRoutes);

// TODO: Favorites routes will be mounted here
// app.use("/favorites", favoritesRoutes);

// ==================== ERROR HANDLING ====================

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(err.status || 500).json({
    error: err.message || "Internal server error",
    timestamp: new Date(),
  });
});

// ==================== SERVER START ====================

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`📝 Health check: http://localhost:${PORT}/health`);
});
