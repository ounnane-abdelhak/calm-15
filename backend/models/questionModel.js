const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    level: {
        type: String,
        enum: ['1', '2', '3', '4'],
        //required: [true, 'A question must have its level!'] to turn on 
    },
    question: {
        type: String,
        required: [true, 'Please provide your question!']
    },
    options: {
        type: [String],
        required: [true, 'Please provide the options for your question!']
    },
    correctOption: {
        type: Number,
        required: [true, 'Please provide the correct option from all the options!']
    },
    points: {
        type: Number,
        required: [true, 'Please provide the points for your question!']
    }
});

const Question = mongoose.model('Question', QuestionSchema);
module.exports = Question; 
