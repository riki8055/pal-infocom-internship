require("dotenv").config();
const express = require("express");
const cors = require("cors");

// Import route files
const authRoutes = require("./routes/auth");
const moviesRoutes = require("./routes/movies");
const favoritesRoutes = require("./routes/favorites");

// Import middleware
const errorHandler = require("./middleware/errorHandler");
const { rateLimiter } = require("./middleware/rateLimiter");

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

// Rate Limiter: Prevent abuse (100 requests per 15 minutes)
app.use(rateLimiter);

// ==================== ROUTES ====================

// Health check endpoint (exempt from rate limiting for monitoring)
app.get("/health", (req, res) => {
  res.json({ status: "Server is running!", timestamp: new Date() });
});

// Mount route files
app.use("/auth", authRoutes);
app.use("/movies", moviesRoutes);
app.use("/favorites", favoritesRoutes);

// ==================== ERROR HANDLING ====================

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, error: "Route not found" });
});

// Global error handler (must be last)
app.use(errorHandler);

// ==================== SERVER START ====================

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`📝 Health check: http://localhost:${PORT}/health`);
});
