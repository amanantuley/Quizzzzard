import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register(){
  const [name,setName]=useState(""); const [email,setEmail]=useState(""); const [pw,setPw]=useState("");
  const { register } = useAuth();
  const nav = useNavigate();
  const [err,setErr]=useState("");

  async function submit(e){
    e.preventDefault();
    setErr("");
    try{
      await register(name, email, pw);
      nav("/dashboard");
    }catch(err){
      setErr(err.response?.data?.message || err.message);
    }
  }

  return (
    <div className="container" style={{maxWidth:520, margin:"2rem auto"}}>
      <h2>Create account</h2>
      <form onSubmit={submit}>
        <label>Name</label>
        <input required value={name} onChange={e=>setName(e.target.value)} style={{width:"100%",padding:8,margin:"6px 0",borderRadius:6}}/>
        <label>Email</label>
        <input required value={email} onChange={e=>setEmail(e.target.value)} style={{width:"100%",padding:8,margin:"6px 0",borderRadius:6}}/>
        <label>Password</label>
        <input required type="password" value={pw} onChange={e=>setPw(e.target.value)} style={{width:"100%",padding:8,margin:"6px 0",borderRadius:6}}/>
        {err && <div style={{color:"red",marginBottom:8}}>{err}</div>}
        <button style={{background:"var(--accent)",color:"#fff",padding:"10px 14px",borderRadius:8}}>Register</button>
      </form>
    </div>
  );
}
