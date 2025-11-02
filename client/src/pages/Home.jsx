import React, { useEffect, useState } from "react";
import axios from "axios";
import QuizCard from "../components/quiz/QuizCard";

export default function Home(){
  const [quizzes, setQuizzes] = useState([]);
  useEffect(()=>{
    axios.get(`${import.meta.env.VITE_API_BASE || "http://localhost:4000/api"}/quizzes`)
      .then(r=>setQuizzes(r.data))
      .catch(()=>{});
  },[]);
  return (
    <div>
      <section style={{display:"flex", justifyContent:"space-between", gap:20, alignItems:"center", marginBottom:18}}>
        <div>
          <h1>Quizzzzard 🧙‍♂️</h1>
          <p>Play quick quizzes, get instant feedback, and climb the leaderboard.</p>
        </div>
      </section>

      <section style={{display:"grid", gap:12}}>
        {quizzes.map(q => <QuizCard key={q._id} quiz={q} />)}
      </section>
    </div>
  );
}
