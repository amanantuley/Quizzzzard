import React from "react";
import { Link } from "react-router-dom";
export default function QuizCard({ quiz }){
  return (
    <div className="container" style={{display:"flex", justifyContent:"space-between", alignItems:"center", gap:12}}>
      <div>
        <h3>{quiz.title}</h3>
        <p style={{marginTop:6}}>{quiz.description}</p>
      </div>
      <div>
        <Link to={`/quiz/${quiz._id}`}><button style={{background:"var(--accent)",color:"#fff",padding:"8px 12px",borderRadius:8}}>Play</button></Link>
      </div>
    </div>
  );
}
