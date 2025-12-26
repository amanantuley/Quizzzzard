import React from "react";
import "../../styles/footer.css";

export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-content">
        <div className="footer-section">
          <div className="footer-logo">
            <div className="footer-logo-circle">
              <img src="/logo.png" alt="Quizzzzard Logo" className="footer-logo-img" />
            </div>
            <span>Quizzzzard</span>
          </div>

          <p className="footer-about">
            Quizzzzard is your smart quiz and leaderboard platform designed for
            interactive learning, real-time competition, and AI-driven insights.
          </p>

          <div className="footer-contact">
            <span>📩</span>
            <a href="mailto:support@quizzzzard.com">support@quizzzzard.com</a>
          </div>

          <div className="social-icons">
            <a
              href="https://github.com/amanantuley/Quizzzzard"
              className="social-icon"
              aria-label="GitHub"
              target="_blank"
              rel="noopener noreferrer"
            >
              🐙
            </a>
            <a
              href="https://www.linkedin.com/in/aman-antuley-8974ab26a/"
              className="social-icon"
              aria-label="LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
            >
              💼
            </a>
            <a href="mailto:support@quizzzzard.com" className="social-icon" aria-label="Email">
              ✉️
            </a>
          </div>
        </div>

        <div className="footer-section">
          <h3>Explore</h3>
          <ul className="footer-links">
            <li><a href="/">Home</a></li>
            <li><a href="/quizzes">Quizzes</a></li>
            <li><a href="/leaderboard">Leaderboard</a></li>
            <li><a href="/login">Login</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Resources</h3>
          <ul className="footer-links">
            <li><a href="#">Docs</a></li>
            <li><a href="#">API</a></li>
            <li><a href="#">Support</a></li>
            <li><a href="#">Feedback</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Follow Us</h3>
          <ul className="footer-links">
            <li><a href="#">Twitter</a></li>
            <li><a href="#">Instagram</a></li>
            <li><a href="#">LinkedIn</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} <span>Quizzzzard</span>. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
