const express = require('express');
const router = express.Router();
const { submitScore, getTopScores, getUserScores } = require('../controllers/scoreController');
const verifyToken = require('../utils/verifyToken');

router.post('/', verifyToken, submitScore);
router.get('/top', getTopScores);
router.get('/me', verifyToken, getUserScores);

module.exports = router;
