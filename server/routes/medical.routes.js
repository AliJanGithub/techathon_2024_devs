const express = require("express");
const { addMedicalData } = require("../controllers/medical.controller");

const router = express.Router();

router.post("/add", addMedicalData);

module.exports = router;
