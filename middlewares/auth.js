/**
 * Middleware for handling authentication using JSON Web Tokens (JWT).
 * @module authMiddleware
 */

const jwt = require("jsonwebtoken");

/**
 * Authenticate the request using a JWT token.
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {function} next - Express next middleware function.
 * @returns {undefined}
 */
exports.authenticateJWT = (req, res, next) => {
  const token = req.header("Authorization").split("Bearer ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. Token not provided" });
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Invalid token" });
    req.userId = decoded.userId;
    next();
  });
};
