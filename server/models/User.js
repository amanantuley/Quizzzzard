const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    uid: { type: String, required: true, unique: true }, // Firebase UID
    email: { type: String, required: true, unique: true },
    displayName: { type: String },
    photoURL: { type: String },
    createdAt: { type: Date, default: Date.now },
    stats: {
        totalQuizzes: { type: Number, default: 0 },
        totalQuestions: { type: Number, default: 0 },
        correctAnswers: { type: Number, default: 0 },
    }
});

module.exports = mongoose.model('User', UserSchema);
