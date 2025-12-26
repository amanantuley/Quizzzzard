import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./header.css";

export default function Header(){
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header" role="banner">
      <div className="site-header-inner">
        <Link to="/" className="brand" onClick={closeMenu}>
          🧙‍♂️ Quizzzzard
        </Link>

        <button
          className="menu-toggle"
          aria-label="Toggle navigation"
          aria-controls="primary-navigation"
          aria-expanded={menuOpen}
          onClick={toggleMenu}
        >
          <span className="menu-icon" aria-hidden="true">☰</span>
        </button>

        <nav
          id="primary-navigation"
          className={menuOpen ? "nav open" : "nav"}
          aria-label="Main"
        >
          <ul className="nav-list">
            <li className="nav-item">
              <Link to="/leaderboard" onClick={closeMenu}>Leaderboard</Link>
            </li>
            <li className="nav-item">
              <Link to="/quiz" onClick={closeMenu}>Quizzes</Link>
            </li>
            <li className="nav-item">
              <Link to="/about" onClick={closeMenu}>About</Link>
            </li>
            {user ? (
              <>
                <li className="nav-item">
                  <Link to="/dashboard" onClick={closeMenu}>Dashboard</Link>
                </li>
                <li className="nav-item">
                  <button className="btn-link" onClick={() => { logout(); closeMenu(); }}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link to="/login" onClick={closeMenu}>Login</Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
