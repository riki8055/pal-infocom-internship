/**
 * Global error handling middleware
 * Should be used as the last middleware in the app
 */
function errorHandler(err, req, res, next) {
  console.error("Error:", {
    message: err.message,
    stack: err.stack,
    status: err.status || 500,
  });

  const status = err.status || 500;
  const message = err.message || "Internal server error";

  res.status(status).json({
    success: false,
    error: message,
    timestamp: new Date(),
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
}

module.exports = errorHandler;
