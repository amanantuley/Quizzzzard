const Quiz = require('../models/Quiz');
const { generateQuiz: generateQuizAI } = require('../utils/aiHelper');

// POST /api/quizzes/generate
const generateQuiz = async (req, res) => {
    try {
        const { topic, count = 10, difficulty = "medium" } = req.body || {};
        if (!topic) {
            return res.status(400).json({ error: "Topic is required" });
        }

        // Call AI Helper
        const aiResult = await generateQuizAI({ topic, count, difficulty });

        // Save to DB
        // Note: We need the user ID from the token (req.user.uid)
        const newQuiz = new Quiz({
            title: aiResult.title,
            description: aiResult.description,
            topic,
            difficulty,
            questions: aiResult.questions,
            createdBy: req.user ? req.user.uid : "anonymous",
        });

        const savedQuiz = await newQuiz.save();
        res.status(201).json(savedQuiz);
    } catch (error) {
        console.error("Generate Quiz Error:", error);
        res.status(500).json({ error: "Failed to generate quiz" });
    }
};

// GET /api/quizzes
const getQuizzes = async (req, res) => {
    try {
        const quizzes = await Quiz.find().sort({ createdAt: -1 }).limit(20);
        res.json(quizzes);
    } catch (error) {
        res.status(500).json({ error: "Server Error" });
    }
};

// GET /api/quizzes/:id
const getQuizById = async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id);
        if (!quiz) return res.status(404).json({ error: "Quiz not found" });
        res.json(quiz);
    } catch (error) {
        res.status(500).json({ error: "Server Error" });
    }
};

module.exports = { generateQuiz, getQuizzes, getQuizById };
