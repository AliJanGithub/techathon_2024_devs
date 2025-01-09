const express = require("express");
const { chat } = require("../controllers/chat.controller");

const router = express.Router();

router.post("/ask", chat);

module.exports = router;
