const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const app = express();
const apiKey = "AIzaSyB1fNLj8Zr1K75_Xbr-Z1OqwN62PA92sj4";
const port = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/health-tracker", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Define Mongoose schema for health data
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
  // Add other health metrics as needed
});

const HealthData = mongoose.model("HealthData", healthDataSchema);

app.get("/", (req, res) => {
  res.send("Hello WOrld");
});



// API endpoints
app.post("/api/analyzeHealth", async (req, res) => {
  try {
    const {
      userId,
      date,
      steps,
      caloriesBurned,
      sleepHours,
      notes,
      stressLevel,
      physicalActivity,
      exerciseType,
      caloriesConsumed,
      waterIntake,
      meals,
      weight,
      mood,
      symptoms,
      medications,
      bloodPressure,
      bloodSugar,
      temperature,
    } = req.body;

    // Use Gemini API to analyze data and provide insights
    const geminiResponse = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`,
      {
        contents: [
          {
            parts: [
              {
                text: `Analyze health data: 
    * Steps: ${steps} 
    * Calories Burned: ${caloriesBurned} 
    * Sleep Hours: ${sleepHours} 
    * Notes: ${notes} 
    * Stress Level: ${stressLevel} 
    * Physical Activity: ${physicalActivity} 
    * Exercise Type: ${exerciseType} 
    * Calories Consumed: ${caloriesConsumed} 
    * Water Intake: ${waterIntake} 
    * Meals: ${meals} 
    * Weight: ${weight} 
    * Mood: ${mood} 
    * Symptoms: ${symptoms} 
    * Medications: ${medications} 
    * Blood Pressure: ${bloodPressure} 
    * Blood Sugar: ${bloodSugar} 
    * Temperature: ${temperature}. 
    Provide comprehensive insights and personalized suggestions based on this data. 
    Consider factors like overall health trends, potential imbalances, and areas for improvement.`,
              },
            ],
          },
        ],
      }
    );

    const insights = geminiResponse.data.candidates[0].content.parts[0].text;

    // Save data to MongoDB
    const newHealthData = new HealthData({
      userId,
      date,
      steps,
      caloriesBurned,
      sleepHours,
      notes,
      stressLevel,
      physicalActivity,
      exerciseType,
      caloriesConsumed,
      waterIntake,
      meals,
      weight,
      mood,
      symptoms,
      medications,
      bloodPressure,
      bloodSugar,
      temperature,
    });
    await newHealthData.save();

    res.json({ message: "Data saved successfully", insights: insights });
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).json({ error: "Failed to save data" });
  }
});

app.post("/api/aiDoctor", async (req, res) => {
  try {
    const { question } = req.body;

    // Send the question to the Gemini API
    const geminiResponse = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`,
      {
        contents: [
          {
            parts: [
              {
                text: question,
              },
            ],
          },
        ],
      }
    );

    const aiResponse = geminiResponse.data.candidates[0].content.parts[0].text;

    res.json({ aiResponse });
  } catch (error) {
    console.error("Error querying AI Doctor:", error);
    res.status(500).json({ error: "Failed to get AI Doctor response" });
  }
});

app.get("/api/data/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const data = await HealthData.find({ userId });
    res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});


app.get("/api/analyzeAllRecords", async (req, res) => {
  try {
    // Fetch all records from the database
    const allRecords = await HealthData.find();

    if (!allRecords || allRecords.length === 0) {
      return res
        .status(400)
        .json({ message: "No records available to analyze" });
    }

    // Format the data for Gemini API
    const formattedData = allRecords
      .map((record) => {
        return `Record for User ID: ${record.userId} - 
        Steps: ${record.steps}, 
        Calories Burned: ${record.caloriesBurned}, 
        Sleep Hours: ${record.sleepHours}, 
        Stress Level: ${record.stressLevel}, 
        Mood: ${record.mood}, 
        Blood Pressure: ${record.bloodPressure}, 
        Blood Sugar: ${record.bloodSugar}.`;
      })
      .join("\n");

    // Send data to Gemini API
    const geminiResponse = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`,
      {
        contents: [
          {
            parts: [
              {
                text: `Analyze the following health data records and provide a summary, trends, and any potential suggestions:\n\n${formattedData}`,
              },
            ],
          },
        ],
      }
    );

    const insights = geminiResponse.data.candidates[0].content.parts[0].text;

    res.status(200).json({
      message: "Analysis completed successfully",
      insights,
    });
  } catch (error) {
    console.error("Error analyzing records:", error);
    res.status(500).json({ error: "Failed to analyze records" });
  }
});
app.get("/api/trackrecord", async (req, res) => {
  const dataOfTrackRecord = await HealthData.find();
  console.log("firing");

  return res.json({ dataOfTrackRecord });
});
// Start server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
