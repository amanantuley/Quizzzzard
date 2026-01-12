const mongoose = require('mongoose');

const QuizSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    topic: { type: String, required: true },
    difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'medium' },
    questions: [{
        text: { type: String, required: true },
        options: [{ type: String, required: true }], // Array of 4 strings
        answerIndex: { type: Number, required: true },
    }],
    createdBy: { type: String, required: true }, // Firebase UID of creator
    createdAt: { type: Date, default: Date.now },
    plays: { type: Number, default: 0 },
});

module.exports = mongoose.model('Quiz', QuizSchema);
