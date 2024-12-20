const mongoose = require("mongoose");

const healthDataSchema = new mongoose.Schema({
  userId: String,
  date: Date,
  steps: Number,
  caloriesBurned: Number,
  sleepHours: Number,
  notes: String,
  stressLevel: String,
  physicalActivity: String,
  exerciseType: String,
  caloriesConsumed: Number,
  waterIntake: Number,
  meals: Number,
  weight: Number,
  mood: String,
  symptoms: String,
  medications: String,
  bloodPressure: String,
  bloodSugar: String,
  temperature: Number,
});

module.exports = mongoose.model("HealthData", healthDataSchema);
