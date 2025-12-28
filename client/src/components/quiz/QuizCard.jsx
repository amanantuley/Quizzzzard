import React from "react";
import { Link } from "react-router-dom";
import "./quiz.css";

export default function QuizCard({ quiz }) {
  const difficulty = quiz.difficulty || "medium";
  const difficultyColors = {
    easy: "#84fab0",
    medium: "#fee140",
    hard: "#ff6a88"
  };

  const difficultyEmojis = {
    easy: "🟢",
    medium: "🟡",
    hard: "🔴"
  };

  return (
    <div className="quiz-card">
      <div className="quiz-card-header">
        <h3 className="quiz-card-title">{quiz.title || "Untitled Quiz"}</h3>
        <div className="quiz-difficulty-badge" style={{ background: difficultyColors[difficulty] }}>
          <span>{difficultyEmojis[difficulty]} {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}</span>
        </div>
      </div>

      <p className="quiz-card-description">{quiz.description || "No description provided"}</p>

      <div className="quiz-card-stats">
        <div className="stat-item">
          <span className="stat-label">Questions</span>
          <span className="stat-value">{quiz.questions?.length || 0}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Plays</span>
          <span className="stat-value">{quiz.plays || 0}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Rating</span>
          <span className="stat-value">{'⭐'.repeat(Math.min(5, Math.max(1, Math.round(quiz.rating || 3))))}</span>
        </div>
      </div>

      <Link to={`/quiz/${quiz._id}`} style={{ textDecoration: "none" }}>
        <button className="play-btn">
          <span className="btn-play-icon">▶</span>
          Play Now
        </button>
      </Link>
    </div>
  );
}
