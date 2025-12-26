import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import "./header.css";

export default function Header(){
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);
  const onSearchSubmit = (e) => {
    e.preventDefault();
    closeMenu();
    if (query.trim()) {
      navigate(`/?q=${encodeURIComponent(query.trim())}`);
    } else {
      navigate("/");
    }
  };

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
              <Link to="/" onClick={closeMenu}>Quizzes</Link>
            </li>
            <li className="nav-item">
              <Link to="/about" onClick={closeMenu}>About</Link>
            </li>
            <li className="nav-item hide-desktop">
              <form className="search" onSubmit={onSearchSubmit} role="search" aria-label="Search quizzes">
                <input
                  type="search"
                  name="q"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search quizzes..."
                  aria-label="Search quizzes"
                />
                <button type="submit">Search</button>
              </form>
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
            <li className="nav-item">
              <button
                className="theme-toggle"
                type="button"
                aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
                onClick={() => { toggleTheme(); }}
              >
                {theme === "light" ? "🌙" : "☀️"}
              </button>
            </li>
            <li className="nav-item cta">
              <Link to="/" className="btn-primary" onClick={closeMenu}>Start Quiz</Link>
            </li>
          </ul>
        </nav>

        <form className="search search-desktop" onSubmit={onSearchSubmit} role="search" aria-label="Search quizzes">
          <input
            type="search"
            name="q"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search quizzes..."
            aria-label="Search quizzes"
          />
        </form>
      </div>
      {menuOpen && <div className="nav-overlay" onClick={closeMenu} aria-hidden="true" />}
    </header>
  );
}
