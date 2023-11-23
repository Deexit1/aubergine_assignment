/**
 * Controller for handling count-related operations.
 * @module counterController
 */

/**
 * Keeps track of counts for different IDs.
 * @type {Object.<string, number>}
 */
let counter = {};

/**
 * Get the count for a specific ID.
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response containing the count for the given ID.
 */
exports.getCount = (req, res) => {
  const { id } = req.params;

  if (Object.keys(counter).includes(id)) {
    counter[id] += 1;
  } else {
    counter[id] = 1;
  }

  res.status(200).json({ count: counter[id] });
};

/**
 * Reset the count for a specific ID.
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response indicating the count has been reset.
 */
exports.resetCount = (req, res) => {
  const { id } = req.params;

  counter[id] = 0;

  res.status(200).json({ count: counter[id] });
};
