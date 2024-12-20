const HealthData = require("../models/health.model");
const { generateInsights } = require("../services/gemini.service");

async function analyzeHealth(req, res) {
  try {
    const healthData = req.body;

    const prompt = `Analyze health data: 
      * Steps: ${healthData.steps} 
      * Calories Burned: ${healthData.caloriesBurned} 
      ... (other fields)
    `;
    const insights = await generateInsights(prompt);

    const newHealthData = new HealthData(healthData);
    await newHealthData.save();

    res.json({ message: "Data saved successfully", insights });
  } catch (error) {
    console.error("Error analyzing health data:", error);
    res.status(500).json({ error: "Failed to analyze health data" });
  }
}

module.exports = { analyzeHealth };
