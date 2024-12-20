const axios = require("axios");
const apiKey = "AIzaSyB1fNLj8Zr1K75_Xbr-Z1OqwN62PA92sj4";

async function generateInsights(prompt) {
  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`,
      {
        contents: [{ parts: [{ text: prompt }] }],
      }
    );
    return response.data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error("Error querying Gemini API:", error);
    throw new Error("Failed to get insights from Gemini API");
  }
}

module.exports = { generateInsights };
