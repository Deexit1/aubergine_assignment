/**
 * Express router for count-related routes.
 * @module counterRoutes
 */

const express = require("express");
const { getCount, resetCount } = require("../controllers/counterController");
const { authenticateJWT } = require("../middlewares/auth");
const router = express.Router();

/**
 * GET request to retrieve the count for a specific ID.
 * @name GET/api/counter/:id
 * @function
 * @memberof module:counterRoutes
 * @inner
 * @param {string} id - The ID for which the count is requested.
 * @returns {Object} - JSON response containing the count for the given ID.
 */
router.get("/:id", getCount);

/**
 * POST request to reset the count for a specific ID.
 * @name POST/api/counter/reset/:id
 * @function
 * @memberof module:counterRoutes
 * @inner
 * @param {string} id - The ID for which the count needs to be reset.
 * @param {function} authenticateToken - Middleware to authenticate the request using a JWT token.
 * @returns {Object} - JSON response indicating the count has been reset.
 */
router.post("/reset/:id", authenticateJWT, resetCount);

module.exports = router;
