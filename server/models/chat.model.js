const mongoose = require("mongoose");

const chatDataSchema = mongoose.Schema(
  {
    userId: String,
    prompt: String,
    response: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ChatData", chatDataSchema);
