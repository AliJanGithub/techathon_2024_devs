const express = require("express");
const { analyzeHealth } = require("../controllers/health.controller");

const router = express.Router();

router.post("/analyze", analyzeHealth);

module.exports = router;
