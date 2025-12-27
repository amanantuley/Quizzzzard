import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import "../../styles/footer.css";

export default function Footer() {
  const linkGroups = useMemo(() => ([
    {
      title: "Product",
      links: [
        { label: "Home", to: "/" },
        { label: "Quizzes", to: "/quizzes" },
        { label: "Leaderboard", to: "/leaderboard" },
        { label: "Login", to: "/login" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Docs", href: "#" },
        { label: "API", href: "#" },
        { label: "Support", href: "#" },
        { label: "Feedback", href: "#" },
      ],
    },
    {
      title: "Connect",
      links: [
        { label: "GitHub", href: "https://github.com/amanantuley/Quizzzzard" },
        { label: "LinkedIn", href: "https://www.linkedin.com/in/aman-antuley-8974ab26a/" },
        { label: "Email", href: "mailto:support@quizzzzard.com" },
      ],
    },
  ]), []);

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-content">
        <div className="footer-hero">
          <div className="footer-logo">
            <div className="footer-logo-circle" aria-hidden="true">QZ</div>
            <div>
              <span className="footer-brand">Quizzzzard</span>
              <p className="footer-tagline">Smarter quizzes. Sharper teams.</p>
            </div>
          </div>

          <p className="footer-about">
            A fast, AI-assisted quiz platform for engaging learning, real-time competition, and clear insights. Built for teams, classrooms, and lifelong learners.
          </p>

          <div className="footer-actions">
            <Link to="/" className="footer-cta">Start a quiz</Link>
            <a className="footer-ghost" href="mailto:support@quizzzzard.com">Talk to us</a>
          </div>

          <div className="footer-contact" aria-label="Contact email">
            <span aria-hidden="true">📩</span>
            <a href="mailto:support@quizzzzard.com">support@quizzzzard.com</a>
          </div>

          <div className="social-icons" aria-label="Social links">
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
            <a
              href="mailto:support@quizzzzard.com"
              className="social-icon"
              aria-label="Email"
            >
              ✉️
            </a>
          </div>
        </div>

        {linkGroups.map(({ title, links }) => (
          <div className="footer-section" key={title}>
            <h3>{title}</h3>
            <ul className="footer-links">
              {links.map((link) => (
                <li key={link.label}>
                  {link.to ? (
                    <Link to={link.to}>{link.label}</Link>
                  ) : (
                    <a href={link.href} target={link.href?.startsWith("http") ? "_blank" : undefined} rel={link.href?.startsWith("http") ? "noopener noreferrer" : undefined}>
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} <span>Quizzzzard</span>. All rights reserved.
        </p>
        <div className="footer-bottom-links">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Status</a>
        </div>
      </div>
    </footer>
  );
}
