const SleepData = require("../models/sleep.model");
const geminiService = require("../services/gemini.service");

const addSleepData = async (req, res) => {
  try {
    const { userId, date, sleepHours, notes, stressLevel, mood } = req.body;

    // Prompt for Gemini API
    const prompt = `Analyze my sleep and mental health data for today:
      - Sleep Hours: ${sleepHours}
      - Stress Level: ${stressLevel}
      - Mood: ${mood}
      - Notes: ${notes}.
    Provide personalized insights and suggestions.`;

    // Generate insights using Gemini
    const insights = await geminiService.generateInsights(prompt);

    // Create and save the SleepData
    const newSleepData = new SleepData({
      userId,
      date,
      sleepHours,
      notes,
      stressLevel,
      mood,
    });

    await newSleepData.save();
    res.status(201).json({
      message: "Sleep data saved successfully.",
      sleepData: newSleepData,
      insights,
    });
  } catch (error) {
    console.error("Error saving sleep data:", error);
    res.status(500).json({ error: "Failed to save sleep data." });
  }
};
module.exports = { addSleepData };
