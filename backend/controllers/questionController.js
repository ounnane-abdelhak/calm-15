const Question = require("./../models/questionModel");
const factory = require("./handlerFactory");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
// Get a single question by its ID (no change)
exports.getQuestion = factory.getOne(Question);

// Get all questions, with optional filtering by level
exports.getAllQuestions = factory.getAll(Question);

// Get all questions by level
exports.getQuestionsByLevel = catchAsync(async (req, res, next) => {
  const { level } = req.params; // Extract level from URL parameters

  // Fetch questions filtered by the level parameter
  const questions = await Question.find({ level });

  if (!questions || questions.length === 0) {
    return next(new AppError("No questions found for this level", 404));
  }

  res.status(200).json({
    status: "success",
    results: questions.length,
    data: {
      data: questions,
    },
  });
});

// Update a question by its ID (no change)
exports.updateQuestion = factory.updateOne(Question);

// Delete a question by its ID (no change)
exports.deleteQuestion = factory.deleteOne(Question);

// Create a new question (no change)
exports.createQuestion = factory.createOne(Question);
