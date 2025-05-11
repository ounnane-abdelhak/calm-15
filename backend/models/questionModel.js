const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  level: {
    type: String,
    enum: ["1", "2", "3", "4"],
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  options: {
    type: [String],
    required: true,
  },
  correctOption: {
    type: Number,
    required: true,
  },
  points: {
    type: Number,
    required: true,
  },
});

const Question = mongoose.model("Question", QuestionSchema);
module.exports = Question;
