const express = require("express");
const router = express.Router();
const { addSleepData } = require("../controllers/sleep.controller");

// Add sleep data
router.post("/add", addSleepData);

module.exports = router;
