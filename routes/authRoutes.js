/**
 * Express router for authentication-related routes.
 * @module authRoutes
 */

const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController");
const router = express.Router();

/**
 * POST request to register a new user.
 * @name POST/api/auth/register
 * @function
 * @memberof module:authRoutes
 * @inner
 * @param {string} username - The username of the new user.
 * @param {string} password - The password of the new user.
 * @returns {Object} - JSON response indicating the success of user registration.
 */
router.post("/register", registerUser);

/**
 * POST request to log in an existing user.
 * @name POST/api/auth/login
 * @function
 * @memberof module:authRoutes
 * @inner
 * @param {string} username - The username of the user trying to log in.
 * @param {string} password - The password of the user trying to log in.
 * @returns {Object} - JSON response containing a JWT token for the authenticated user.
 */
router.post("/login", loginUser);

module.exports = router;
