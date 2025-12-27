import React from "react";
import { Link } from "react-router-dom";
import "./quiz.css";

export default function QuizCard({ quiz }) {
  return (
    <div className="container quiz-card">
      <div>
        <h3>{quiz.title}</h3>
        <p style={{ marginTop: 6 }}>{quiz.description}</p>
      </div>
      <div className="quiz-card-actions">
        <Link to={`/quiz/${quiz._id}`}>
          <button className="play-btn">Play</button>
        </Link>
      </div>
    </div>
  );
}
