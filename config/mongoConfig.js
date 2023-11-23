const mongoose = require("mongoose");
const logger = require("./loggerConfig");

async function dbConnection() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    logger.info("Connected to MongoDB");
  } catch (err) {
    logger.error("Error connecting database", err);
  }
}

module.exports = {
  dbConnection,
};
