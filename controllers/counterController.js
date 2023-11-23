/**
 * Controller for handling count-related operations.
 * @module counterController
 */

const logger = require("../config/loggerConfig");
const Counter = require("../models/counter");

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
exports.getCount = async (req, res) => {
  const { id } = req.params;

  try {
    let counter = await Counter.findOne({ id });
    if (!counter) {
      counter = await Counter.create({ id, count: 0 });
    }

    counter.count += 1;
    await counter.save();

    logger.info(`Count incremented for ID: ${id}`);
    res.status(200).json({ count: counter.count });
  } catch (err) {
    logger.error(`Error getting count: ${err}`);
    res.send(500).json({ message: "Internal Server Error" });
  }
};

/**
 * Reset the count for a specific ID.
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response indicating the count has been reset.
 */
exports.resetCount = async (req, res) => {
  const { id } = req.params;

  try {
    let counter = await Counter.findOne({ id });
    if (!counter) {
      counter = await Counter.create({ id, count: 0 });
    }
    counter.count = 0;
    await counter.save();

    logger.info(`Count reset for ID: ${id}`);
    res.status(200).json({ count: counter.count });
  } catch (err) {
    logger.error(`Error resetting count of ${id}: ${err}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
