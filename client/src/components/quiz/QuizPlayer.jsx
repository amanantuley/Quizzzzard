import React, { useEffect, useState } from "react";
import axios from "axios";
import QuestionCard from "./QuestionCard";
import { useParams, useNavigate } from "react-router-dom";

export default function QuizPlayer(){
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const nav = useNavigate();

  useEffect(()=>{
    axios.get(`${import.meta.env.VITE_API_BASE || "http://localhost:4000/api"}/quizzes/${id}`)
      .then(r=>setQuiz(r.data))
      .catch(()=>{});
  },[id]);

  function onAnswer(choice){
    const newAns = [...answers]; newAns[index]=choice; setAnswers(newAns);
    // auto next
    if(index < (quiz.questions.length -1)) setIndex(i=>i+1);
    else finish(newAns);
  }

  async function finish(ans){
    const correct = quiz.questions.reduce((acc, q, i)=>{
      if(ans[i] === q.answerIndex) return acc+1; return acc;
    },0);
    // save score
    await axios.post(`${import.meta.env.VITE_API_BASE || "http://localhost:4000/api"}/scores`, {
      quizId: quiz._id, score: correct, total: quiz.questions.length
    }).catch(()=>{});
    nav("/leaderboard");
  }

  if(!quiz) return <div className="container">Loading...</div>;

  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between", alignItems:"center"}}>
        <h2>{quiz.title}</h2>
        <div>Q {index+1}/{quiz.questions.length}</div>
      </div>
      <QuestionCard q={quiz.questions[index]} onAnswer={onAnswer} selected={answers[index]} />
    </div>
  );
}
