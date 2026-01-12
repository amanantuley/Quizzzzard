const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require('./utils/db');

// Routes
const authRoutes = require('./routes/authRoutes');
const quizRoutes = require('./routes/quizRoutes');
const scoreRoutes = require('./routes/scoreRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect DB
connectDB();

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/scores', scoreRoutes);

// Health Check
app.get("/api/health", (req, res) => res.json({ ok: true }));

app.listen(PORT, () => {
	console.log(`Server listening on http://localhost:${PORT}`);
});
