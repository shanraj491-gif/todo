const { text } = require("express");
const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    text: {
      type: String,
      required: [true, "Enter Text"],
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);


module.exports = mongoose.model('Todo', todoSchema);