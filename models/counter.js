const mongoose = require("mongoose");

const counterSchema = new mongoose.Schema({
  id: { type: String, unique: true, required: true },
  count: { type: Number, default: 0 },
});

const Counter = mongoose.model("Counter", counterSchema);

module.exports = Counter;
