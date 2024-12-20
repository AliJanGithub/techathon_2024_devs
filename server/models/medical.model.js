const mongoose = require("mongoose");

const medicalDataSchema = new mongoose.Schema({
  userId: String,
  date: Date,
  symptoms: String,
  medications: String,
  bloodPressure: String,
  bloodSugar: String,
  temperature: Number,
});

module.exports = mongoose.model("Medical Data", medicalDataSchema);
