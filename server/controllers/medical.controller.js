const MedicalData = require("../models/medical.model");
const geminiService = require("../services/gemini.service");

const addMedicalData = async (req, res) => {
  try {
    const {
      userId,
      date,
      symptoms,
      medications,
      bloodPressure,
      bloodSugar,
      temperature,
    } = req.body;

    // Prompt for Gemini API
    const prompt = `Analyze my medical condition data for today:
      - Syptoms: ${symptoms}
      - Medications: ${medications}
      - Blood Pressure: ${bloodPressure}
      - Temperature: ${temperature}
      - Blood Sugar: ${bloodSugar}.
    Provide personalized insights and suggestions.please kepp it consice and the response should not exceed 10 lines`;

    // Generate insights using Gemini
    const insights = await geminiService.generateInsights(prompt);

    // Create and save the PhysicalData
    const newMedicalData = new MedicalData({
      userId,
      date,
      symptoms,
      medications,
      bloodPressure,
      bloodSugar,
      temperature,
    });

    await newMedicalData.save();
    res.status(201).json({
      message: "Medical data saved successfully.",
      medicalData: newMedicalData,
      insights,
    });
  } catch (error) {
    console.error("Error saving physical data:", error);
    res.status(500).json({ error: "Failed to save physical data." });
  }
};
module.exports = { addMedicalData };
