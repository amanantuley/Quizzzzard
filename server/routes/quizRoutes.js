const express = require('express');
const router = express.Router();
const { generateQuiz, getQuizzes, getQuizById } = require('../controllers/quizController');
const verifyToken = require('../utils/verifyToken');

router.post('/generate', verifyToken, generateQuiz);
router.get('/', getQuizzes); // Public or Private? Let's make it public to browse
router.get('/:id', getQuizById);

module.exports = router;
