const mongoose = require('mongoose');

const ScoreSchema = new mongoose.Schema({
    userId: { type: String, required: true }, // Firebase UID
    quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
    score: { type: Number, required: true },
    total: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Score', ScoreSchema);
