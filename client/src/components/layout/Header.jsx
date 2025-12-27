import React, { useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import "./header.css";

export default function Header() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = useMemo(() => ([
    { to: "/", label: "Quizzes" },
    { to: "/leaderboard", label: "Leaderboard" },
    { to: "/about", label: "About" },
  ]), []);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  const onSearchSubmit = (event) => {
    event.preventDefault();
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
          <span className="brand-name">Quizzzzard</span>
        </Link>

        <nav
          id="primary-navigation"
          className={menuOpen ? "nav open" : "nav"}
          aria-label="Main navigation"
        >
          <ul className="nav-list">
            {navLinks.map(({ to, label }) => {
              const active = location.pathname === to || (to !== "/" && location.pathname.startsWith(to));
              return (
                <li className="nav-item" key={to}>
                  <Link
                    to={to}
                    onClick={closeMenu}
                    className={active ? "nav-link active" : "nav-link"}
                    aria-current={active ? "page" : undefined}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}

            <li className="nav-item hide-desktop">
              <form
                className="search"
                onSubmit={onSearchSubmit}
                role="search"
                aria-label="Search quizzes"
              >
                <input
                  type="search"
                  name="q"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search quizzes"
                  aria-label="Search quizzes"
                />
                <button type="submit">Go</button>
              </form>
            </li>

            {user ? (
              <>
                <li className="nav-item">
                  <Link to="/dashboard" onClick={closeMenu}>Dashboard</Link>
                </li>
                <li className="nav-item">
                  <button
                    className="btn-link"
                    type="button"
                    onClick={() => {
                      logout();
                      closeMenu();
                    }}
                  >
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
                onClick={toggleTheme}
              >
                {theme === "light" ? "🌙" : "☀️"}
              </button>
            </li>

            <li className="nav-item cta">
              <Link to="/" className="btn-primary" onClick={closeMenu}>Start quiz</Link>
            </li>
          </ul>
        </nav>

        <form
          className="search search-desktop"
          onSubmit={onSearchSubmit}
          role="search"
          aria-label="Search quizzes"
        >
          <input
            type="search"
            name="q"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search quizzes"
            aria-label="Search quizzes"
          />
          <button type="submit">Search</button>
        </form>

        <button
          className="menu-toggle"
          aria-label="Toggle navigation"
          aria-controls="primary-navigation"
          aria-expanded={menuOpen}
          onClick={toggleMenu}
          type="button"
        >
          <span className="menu-icon" aria-hidden="true">☰</span>
        </button>
      </div>

      {menuOpen && (
        <div
          className="nav-overlay"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}
    </header>
  );
}
