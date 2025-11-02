import React from "react";

export default function QuestionCard({ q, onAnswer, selected }) {
  return (
    <div className="container" style={{marginBottom:12}}>
      <h4>{q.text}</h4>
      <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginTop:10}}>
        {q.options.map((o, idx) => (
          <button key={idx} onClick={() => onAnswer(idx)} style={{
            padding:10, borderRadius:8, border:selected === idx ? `2px solid var(--accent)` : '1px solid #e6e9ee',
            background:selected===idx? 'rgba(66,133,244,0.08)' : '#fff'
          }}>
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}
