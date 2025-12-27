import React from "react";
import { Link } from "react-router-dom";
import "../styles/landing.css";

export default function Landing() {
  return (
    <div className="landing">
      {/* Hero */}
      <section className="l-hero">
        <div>
          <h1>Generate AI quizzes from any topic — instantly</h1>
          <p>
            Save time and learn faster. Type a topic, get a high-quality quiz in seconds, and track your progress with instant feedback and leaderboards.
          </p>
          <div className="l-hero-actions">
            <Link to="/login" style={{ textDecoration: "none" }}>
              <button className="l-btn">Login to get started</button>
            </Link>
            <Link to="/home" style={{ textDecoration: "none" }}>
              <button className="l-btn-ghost">Explore quizzes</button>
            </Link>
          </div>
          <div className="l-trust" aria-label="Trusted by">
            <span>Trusted by learners and teams</span>
            <span className="logo-pill">Edu</span>
            <span className="logo-pill">Tech</span>
            <span className="logo-pill">Labs</span>
          </div>
        </div>
        <div className="l-hero-visual" aria-hidden="true" />
      </section>

      {/* Features */}
      <section className="l-features">
        <div className="l-card">
          <h3>AI-generated quizzes</h3>
          <p>Enter a topic and get structured, fair multiple-choice questions immediately.</p>
        </div>
        <div className="l-card">
          <h3>Instant feedback</h3>
          <p>See your accuracy per question and overall score as you play.</p>
        </div>
        <div className="l-card">
          <h3>Competitive leaderboard</h3>
          <p>Climb the ranks and compare performance with peers or teammates.</p>
        </div>
      </section>

      {/* How it works */}
      <section className="l-steps">
        <div className="l-step">
          <div className="num">1</div>
          <h3>Login</h3>
          <p>Sign in to save scores and access your dashboard.</p>
        </div>
        <div className="l-step">
          <div className="num">2</div>
          <h3>Generate</h3>
          <p>Type a topic and choose difficulty to create your quiz.</p>
        </div>
        <div className="l-step">
          <div className="num">3</div>
          <h3>Play & track</h3>
          <p>Answer, get feedback, and track improvement over time.</p>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="l-cta">
        <div>
          <h3>Ready to level up your learning?</h3>
          <p style={{ color: "var(--text-muted)" }}>Join now and create your first quiz in under a minute.</p>
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Link to="/login" style={{ textDecoration: "none" }}>
            <button className="l-btn">Login</button>
          </Link>
          <Link to="/home" style={{ textDecoration: "none" }}>
            <button className="l-btn-ghost">Browse quizzes</button>
          </Link>
        </div>
      </section>
    </div>
  );
}
