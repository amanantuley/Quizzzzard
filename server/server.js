const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { generateQuiz } = require("./utils/aiHelper");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// In-memory stores (replace with DB later)
const quizzes = [];
const scores = [];

// AI: generate quiz
app.post("/api/ai/generate-quiz", async (req, res) => {
	try {
		const { topic, count = 10, difficulty = "medium" } = req.body || {};
		if (!topic || typeof topic !== "string") {
			return res.status(400).json({ error: "Topic is required" });
		}

		const quiz = await generateQuiz({ topic, count, difficulty });
		const id = require("crypto").randomUUID();
		const doc = { _id: id, title: quiz.title, description: quiz.description, questions: quiz.questions };
		quizzes.push(doc);
		return res.status(201).json(doc);
	} catch (err) {
		console.error("generate-quiz error", err);
		return res.status(500).json({ error: "Failed to generate quiz" });
	}
});

// Quizzes list
app.get("/api/quizzes", (req, res) => {
	res.json(quizzes);
});

// Quiz by id
app.get("/api/quizzes/:id", (req, res) => {
	const q = quizzes.find((x) => x._id === req.params.id);
	if (!q) return res.status(404).json({ error: "Not found" });
	res.json(q);
});

// Scores: create
app.post("/api/scores", (req, res) => {
	const { quizId, score, total, userName = "Anonymous" } = req.body || {};
	if (!quizId || typeof score !== "number" || typeof total !== "number") {
		return res.status(400).json({ error: "Invalid score payload" });
	}
	const id = require("crypto").randomUUID();
	const doc = { _id: id, quizId, userName, score, total, createdAt: new Date().toISOString() };
	scores.push(doc);
	res.status(201).json(doc);
});

// Scores: top
app.get("/api/scores/top", (req, res) => {
	const ranked = [...scores].sort((a, b) => (b.score / b.total) - (a.score / a.total)).slice(0, 50);
	res.json(ranked);
});

app.get("/api/health", (req, res) => res.json({ ok: true }));

app.listen(PORT, () => {
	console.log(`Server listening on http://localhost:${PORT}`);
});
