import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./header.css";

export default function Header(){
  const { user, logout } = useAuth();
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link to="/" className="brand">🧙‍♂️ Quizzzzard</Link>
        <nav>
          <Link to="/leaderboard">Leaderboard</Link>
          <Link to="/quiz">Quizzes</Link>
          {user ? (
            <>
              <Link to="/dashboard">Dashboard</Link>
              <button className="btn-link" onClick={logout}>Logout</button>
            </>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </nav>
      </div>
    </header>
  );
}
