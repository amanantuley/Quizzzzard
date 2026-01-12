const express = require('express');
const router = express.Router();
const { syncUser, getMe } = require('../controllers/authController');
const verifyToken = require('../utils/verifyToken');

router.post('/sync', verifyToken, syncUser);
router.get('/me', verifyToken, getMe);

module.exports = router;
