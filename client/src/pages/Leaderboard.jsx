import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Leaderboard(){
  const [list, setList] = useState([]);
  useEffect(()=>{
    axios.get(`${import.meta.env.VITE_API_BASE || "http://localhost:4000/api"}/scores/top`)
      .then(r=>setList(r.data))
      .catch(()=>{});
  },[]);
  return (
    <div>
      <h2>Leaderboard</h2>
      <div style={{display:"grid",gap:8}}>
        {list.map((l,i)=>(
          <div key={i} className="container" style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div>{i+1}. {l.userName}</div>
            <div>{l.score}/{l.total}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
