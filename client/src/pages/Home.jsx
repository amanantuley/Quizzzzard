import React, { useEffect, useState } from "react";
import axios from "axios";
import QuizCard from "../components/quiz/QuizCard";
import { generateQuiz } from "../api/aiService";
import { useNavigate } from "react-router-dom";

export default function Home(){
  const [quizzes, setQuizzes] = useState([]);
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("medium");
  const [count, setCount] = useState(10);
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();
  useEffect(()=>{
    axios.get(`${import.meta.env.VITE_API_BASE || "http://localhost:4000/api"}/quizzes`)
      .then(r=>setQuizzes(r.data))
      .catch(()=>{});
  },[]);
  async function createFromTopic(e){
    e.preventDefault();
    if(!topic.trim()) return;
    try {
      setBusy(true);
      const quiz = await generateQuiz({ topic: topic.trim(), count, difficulty });
      setQuizzes(qs => [quiz, ...qs]);
      navigate(`/quiz/${quiz._id}`);
    } catch(err) {
      // noop: surface minimal feedback
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <section style={{display:"grid", gridTemplateColumns:"1fr", gap:16, alignItems:"center", marginBottom:18}}>
        <div>
          <h1>Quizzzzard 🧙‍♂️</h1>
          <p>Generate quizzes by topic instantly. Learn faster, compete smarter.</p>
        </div>
        <form onSubmit={createFromTopic} style={{display:"flex", gap:8, alignItems:"center", flexWrap:"wrap"}}>
          <input type="text" placeholder="Enter a topic (e.g., JavaScript)" value={topic} onChange={(e)=>setTopic(e.target.value)} style={{padding:"10px 12px", borderRadius:10, border:"1px solid var(--border)", minWidth:260}} />
          <select value={difficulty} onChange={e=>setDifficulty(e.target.value)} style={{padding:"10px 12px", borderRadius:10, border:"1px solid var(--border)"}}>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
          <input type="number" min={5} max={20} value={count} onChange={e=>setCount(Number(e.target.value)||10)} style={{padding:"10px 12px", borderRadius:10, border:"1px solid var(--border)", width:100}} />
          <button type="submit" disabled={busy} style={{background:"var(--primary)", color:"#fff", padding:"10px 14px", borderRadius:10}}>
            {busy ? "Creating…" : "Create Quiz"}
          </button>
        </form>
      </section>

      <section style={{display:"grid", gap:12}}>
        {quizzes.map(q => <QuizCard key={q._id} quiz={q} />)}
      </section>
    </div>
  );
}
