const Question = require('./../models/questionModel');
const catchAsync = require('./../utils/catchAsync');
const factory = require('./handlerFactory');

exports.getQuestion = factory.getOne(Question);
exports.getAllQuestions = factory.getAll(Question);
exports.updateQuestion = factory.updateOne(Question);
exports.deleteQuestion = factory.deleteOne(Question);
exports.createQuestion = factory.createOne(Question);
