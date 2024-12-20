const mongoose = require("mongoose");

const physicalDataSchema = new mongoose.Schema({
  userId: String,
  date: Date,
  steps: Number,
  physicalActivity: String,
  exerciseType: String,
  caloriesConsumed: Number,
});

module.exports = mongoose.model("PhysicalData", physicalDataSchema);
