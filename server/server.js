const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const app = express();
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
  // Add other health metrics as needed
});

const HealthData = mongoose.model("HealthData", healthDataSchema);

app.get("/", (req, res) => {
  res.send("Hello WOrld");
});

// API endpoints
app.post("/api/data", async (req, res) => {
  try {
    const { userId, date, steps, caloriesBurned, sleepHours, notes } = req.body;

    // Use Gemini API to analyze data and provide insights
    const geminiResponse = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyB1fNLj8Zr1K75_Xbr-Z1OqwN62PA92sj4",
      {
        contents: [
          {
            parts: [
              {
                text: `Analyze health data: steps: ${steps}, calories burned: ${caloriesBurned}, sleep hours: ${sleepHours}. 
                                        Provide insights and suggestions based on this data.`,
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
      insights,
    });
    await newHealthData.save();

    res.json({ message: "Data saved successfully", insights: insights });
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).json({ error: "Failed to save data" });
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

// Start server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
