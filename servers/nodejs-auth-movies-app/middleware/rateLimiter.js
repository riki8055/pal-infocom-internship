/**
 * Simple in-memory rate limiter middleware
 * Tracks requests per IP address (or user ID if authenticated)
 * Useful for preventing abuse and DDoS attacks
 */

// Store for tracking requests: { key: [timestamp1, timestamp2, ...] }
const requestStore = new Map();

// Configuration
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX_REQUESTS = 100; // Max 100 requests per window

/**
 * Clean old timestamps from the store (older than window)
 */
function cleanOldTimestamps(timestamps) {
  const now = Date.now();
  return timestamps.filter((timestamp) => now - timestamp < RATE_LIMIT_WINDOW);
}

/**
 * Rate limiting middleware
 * Uses IP address as key, or userId if user is authenticated
 */
function rateLimiter(req, res, next) {
  try {
    // Determine the key: use userId if authenticated, otherwise use IP
    const key = req.user?.userId || req.ip || req.connection.remoteAddress;

    // Get current timestamps for this key
    let timestamps = requestStore.get(key) || [];

    // Clean old timestamps
    timestamps = cleanOldTimestamps(timestamps);

    // Check if limit exceeded
    if (timestamps.length >= RATE_LIMIT_MAX_REQUESTS) {
      return res.status(429).json({
        success: false,
        message: "Too many requests. Please try again later.",
        retryAfter: Math.ceil(
          (timestamps[0] + RATE_LIMIT_WINDOW - Date.now()) / 1000,
        ),
      });
    }

    // Add current timestamp
    timestamps.push(Date.now());

    // Update store
    requestStore.set(key, timestamps);

    // Add rate limit info to response headers
    res.setHeader("X-RateLimit-Limit", RATE_LIMIT_MAX_REQUESTS);
    res.setHeader(
      "X-RateLimit-Remaining",
      RATE_LIMIT_MAX_REQUESTS - timestamps.length,
    );
    res.setHeader(
      "X-RateLimit-Reset",
      Math.ceil((timestamps[0] + RATE_LIMIT_WINDOW) / 1000),
    );

    next();
  } catch (error) {
    console.error("Rate limiter error:", error);
    // On error, allow request to proceed (fail open)
    next();
  }
}

/**
 * Get current usage stats for a key
 * Useful for monitoring and debugging
 */
function getUsageStats(key) {
  const timestamps = requestStore.get(key) || [];
  const cleaned = cleanOldTimestamps(timestamps);
  return {
    key,
    requestsInWindow: cleaned.length,
    limit: RATE_LIMIT_MAX_REQUESTS,
    windowSize: RATE_LIMIT_WINDOW,
    remaining: RATE_LIMIT_MAX_REQUESTS - cleaned.length,
  };
}

/**
 * Clear all rate limit data (useful for testing)
 */
function clearRateLimitData() {
  requestStore.clear();
}

module.exports = {
  rateLimiter,
  getUsageStats,
  clearRateLimitData,
};
