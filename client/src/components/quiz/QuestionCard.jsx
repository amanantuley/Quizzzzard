import React from "react";
import "./quiz.css";

export default function QuestionCard({ q, onAnswer, selected }) {
  return (
    <div className="container question-card">
      <h4 className="question-title">{q.text}</h4>
      <div className="options">
        {q.options.map((o, idx) => (
          <button
            key={idx}
            onClick={() => onAnswer(idx)}
            className={selected === idx ? "option-btn selected" : "option-btn"}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}
