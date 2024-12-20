const express = require("express");
const router = express.Router();
const { addPhysicalData } = require("../controllers/physical.controller");

// Add physical data
router.post("/add", addPhysicalData);

module.exports = router;
