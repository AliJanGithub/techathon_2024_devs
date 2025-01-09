const PhysicalData = require("../models/physical.model");
const geminiService = require("../services/gemini.service");

const addPhysicalData = async (req, res) => {
  try {
    const {
      userId,
      date,
      steps,
      physicalActivity,
      exerciseType,
      caloriesConsumed,
    } = req.body;

    // Prompt for Gemini API
    const prompt = `Analyze my physical activity data for today:
      - Steps Taken: ${steps}
      - Physical Activity: ${physicalActivity}
      - Exercise Type: ${exerciseType}
      - Calories Consumed: ${caloriesConsumed}.
    Provide personalized insights and suggestions.please kepp it consice and the response should not exceed 10 lines`;

    // Generate insights using Gemini
    const insights = await geminiService.generateInsights(prompt);

    // Create and save the PhysicalData
    const newPhysicalData = new PhysicalData({
      userId,
      date,
      steps,
      physicalActivity,
      exerciseType,
      caloriesConsumed,
    });

    await newPhysicalData.save();
    res.status(201).json({
      message: "Physical data saved successfully.",
      physicalData: newPhysicalData,
      insights,
    });
  } catch (error) {
    console.error("Error saving physical data:", error);
    res.status(500).json({ error: "Failed to save physical data." });
  }
};
module.exports = { addPhysicalData };
