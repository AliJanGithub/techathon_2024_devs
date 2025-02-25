const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

// Import routes
const healthRoutes = require("./routes/health.routes");
const physicalRoutes = require("./routes/physical.routes");
const sleepRoutes = require("./routes/sleep.routes");
const medicalRoutes = require("./routes/medical.routes");
const chatRoutes = require("./routes/chat.routes");

const app = express();
const apiKey = "AIzaSyB1fNLj8Zr1K75_Xbr-Z1OqwN62PA92sj4";
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://khanabdulahadmuhammad:pakistan12@cluster0.aqwds37.mongodb.net/",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/health", healthRoutes);
app.use("/api/physical", physicalRoutes);
app.use("/api/sleep", sleepRoutes);
app.use("/api/medical", medicalRoutes);
app.use("/api/chat", chatRoutes);

app.get("/", (req, res) => res.send("Hello World"));

app.listen(port, () => console.log(`Server running on port ${port}`));
