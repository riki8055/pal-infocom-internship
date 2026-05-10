const { verifyToken, extractTokenFromHeader } = require("../utils/jwtManager");

/**
 * Middleware to verify JWT token and protect routes
 * Expects: Authorization: Bearer <token>
 * On success: Attaches decoded user data to req.user
 * On failure: Returns 401 Unauthorized
 */
function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Authorization header is missing",
      });
    }

    const token = extractTokenFromHeader(authHeader);
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Invalid token format. Expected: Bearer <token>",
      });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token",
      });
    }

    // Attach user data to request object
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    res.status(401).json({
      success: false,
      message: "Authentication failed",
    });
  }
}

module.exports = authMiddleware;
