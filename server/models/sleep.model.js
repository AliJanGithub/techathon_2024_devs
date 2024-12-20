const mongoose = require("mongoose");

const sleepDataSchema = new mongoose.Schema({
  userId: String,
  date: Date,
  sleepHours: Number,
  notes: String,
  stressLevel: String,
  mood: String,
});

module.exports = mongoose.model("SleepData", sleepDataSchema);
