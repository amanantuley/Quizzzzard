import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login(){
  const [email,setEmail]=useState(""); const [pass,setPass]=useState("");
  const { login } = useAuth();
  const nav = useNavigate();
  const [err,setErr]=useState("");

  async function submit(e){
    e.preventDefault();
    setErr("");
    try{
      await login(email, pass);
      nav("/dashboard");
    }catch(err){
      setErr(err.response?.data?.message || err.message);
    }
  }

  return (
    <div className="container" style={{maxWidth:520, margin:"2rem auto"}}>
      <h2>Login</h2>
      <form onSubmit={submit}>
        <label>Email</label>
        <input required value={email} onChange={e=>setEmail(e.target.value)} style={{width:"100%",padding:8,margin:"6px 0",borderRadius:6}}/>
        <label>Password</label>
        <input required type="password" value={pass} onChange={e=>setPass(e.target.value)} style={{width:"100%",padding:8,margin:"6px 0",borderRadius:6}}/>
        {err && <div style={{color:"red",marginBottom:8}}>{err}</div>}
        <button style={{background:"var(--accent)",color:"#fff",padding:"10px 14px",borderRadius:8}}>Login</button>
      </form>
      <p style={{marginTop:8}}>No account? <Link to="/register">Register</Link></p>
    </div>
  );
}
