const ChatData = require("../models/chat.model");
const { generateInsights } = require("../services/gemini.service");

async function chat(req, res) {
  try {
    const prompt = `
    ${req.body.question} be sure to answer it knowing that you are being used as a health advisor or an ai doctor the user i know that your results are based on data and i should confirm with my doctor before applying anything serious but still answer like a doctor with years of experience in medical field`;

    const response = await generateInsights(prompt);

    const chatData = {
      userId: "2222",
      prompt,
      response,
    };

    const newChatData = new ChatData(chatData);
    await newChatData.save();

    res.json({ message: "Data saved successfully", response });
  } catch (error) {
    console.error("Error analyzing health data:", error);
    res.status(500).json({ error: "Failed to analyze health data" });
  }
}

module.exports = { chat };
