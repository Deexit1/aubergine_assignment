const mongoose = require("mongoose");

async function dbConnection() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
  } catch (err) {
    console.log("Error connecting database", err);
  }
}

module.exports = {
  dbConnection,
};
