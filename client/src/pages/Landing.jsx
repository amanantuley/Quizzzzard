import React from "react";
import { Link } from "react-router-dom";
import "../styles/landing.css";

export default function Landing() {
  return (
    <div className="landing">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-gradient-bg"></div>
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Generate AI-powered quizzes from <span className="gradient-text">any topic</span> instantly
            </h1>
            <p className="hero-subtitle">
              Master any subject in minutes. Leverage cutting-edge AI to create intelligent quizzes, get instant feedback, and climb the competitive leaderboard. Your fastest path to expertise starts here.
            </p>
            
            <div className="hero-stats">
              <div className="stat">
                <div className="stat-value">10K+</div>
                <div className="stat-label">Quizzes Generated</div>
              </div>
              <div className="stat">
                <div className="stat-value">98%</div>
                <div className="stat-label">User Satisfaction</div>
              </div>
              <div className="stat">
                <div className="stat-value">50K+</div>
                <div className="stat-label">Active Learners</div>
              </div>
            </div>

            <div className="hero-cta">
              <Link to="/login" style={{ textDecoration: "none" }}>
                <button className="btn btn-primary">
                  <span className="btn-icon">🚀</span>
                  Start Learning Now
                </button>
              </Link>
              <Link to="/home" style={{ textDecoration: "none" }}>
                <button className="btn btn-secondary">
                  <span className="btn-icon">🎯</span>
                  Browse Quizzes
                </button>
              </Link>
            </div>

            <div className="hero-badges">
              <span className="badge">✨ AI-Powered</span>
              <span className="badge">⚡ Instant Generation</span>
              <span className="badge">📊 Real-time Analytics</span>
            </div>
          </div>

          <div className="hero-visual">
            <div className="visual-card">
              <div className="visual-icon">📚</div>
              <div className="visual-text">1000+ Topics</div>
            </div>
            <div className="visual-card">
              <div className="visual-icon">⚡</div>
              <div className="visual-text">Instant Quizzes</div>
            </div>
            <div className="visual-card">
              <div className="visual-icon">🏆</div>
              <div className="visual-text">Leaderboards</div>
            </div>
            <div className="visual-card">
              <div className="visual-icon">📈</div>
              <div className="visual-text">Track Progress</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="section-header">
          <h2>Why Choose Quizzzzard?</h2>
          <p>Everything you need to master any subject faster than ever before</p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🤖</div>
            <h3>AI-Generated Quizzes</h3>
            <p>Enter any topic and get high-quality, structured multiple-choice questions instantly. Our AI creates fair and challenging questions tailored to your needs.</p>
            <div className="feature-tag">Powered by GPT</div>
          </div>

          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Instant Feedback</h3>
            <p>Get real-time feedback on every answer. See your accuracy, performance trends, and detailed explanations to accelerate your learning.</p>
            <div className="feature-tag">Real-time</div>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🏆</div>
            <h3>Competitive Leaderboards</h3>
            <p>Climb the ranks and compete with peers. Monitor your progress, challenge friends, and celebrate achievements on global leaderboards.</p>
            <div className="feature-tag">Social</div>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Advanced Analytics</h3>
            <p>Track your learning journey with comprehensive dashboards. Visualize progress, identify weak areas, and optimize your study strategy.</p>
            <div className="feature-tag">Analytics</div>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3>Custom Difficulty Levels</h3>
            <p>Choose from easy, medium, or hard difficulty. Scale the challenge to match your skill level and learning goals perfectly.</p>
            <div className="feature-tag">Flexible</div>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🌍</div>
            <h3>Any Topic, Unlimited</h3>
            <p>From quantum physics to ancient history, generate quizzes on any topic under the sun. No limits, no restrictions, pure learning freedom.</p>
            <div className="feature-tag">Unlimited</div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works-section">
        <div className="section-header">
          <h2>How It Works</h2>
          <p>Get started in three simple steps</p>
        </div>

        <div className="steps-grid">
          <div className="step-card">
            <div className="step-number">01</div>
            <h3>Login & Personalize</h3>
            <p>Create your account and set your learning preferences. Join thousands of learners advancing their knowledge.</p>
            <div className="step-icon">🔐</div>
          </div>

          <div className="step-card">
            <div className="step-number">02</div>
            <h3>Generate Your Quiz</h3>
            <p>Type any topic, choose your difficulty level, and set the number of questions. Our AI generates your custom quiz in seconds.</p>
            <div className="step-icon">✨</div>
          </div>

          <div className="step-card">
            <div className="step-number">03</div>
            <h3>Play & Track Progress</h3>
            <p>Answer questions, get instant feedback, and watch your skills improve. Track everything in your personal dashboard.</p>
            <div className="step-icon">📈</div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="social-proof-section">
        <div className="section-header">
          <h2>Trusted by Learners Worldwide</h2>
          <p>Join 50,000+ students and professionals</p>
        </div>

        <div className="testimonials-grid">
          <div className="testimonial-card">
            <div className="stars">⭐⭐⭐⭐⭐</div>
            <p>"Quizzzzard changed how I study. I went from struggling to acing my exams in just 3 weeks!"</p>
            <div className="testimonial-author">
              <div className="author-avatar">JK</div>
              <div>
                <div className="author-name">John Karim</div>
                <div className="author-title">Engineering Student</div>
              </div>
            </div>
          </div>

          <div className="testimonial-card">
            <div className="stars">⭐⭐⭐⭐⭐</div>
            <p>"The AI-generated questions are incredibly smart and actually help me learn, not just memorize."</p>
            <div className="testimonial-author">
              <div className="author-avatar">SM</div>
              <div>
                <div className="author-name">Sarah Mitchell</div>
                <div className="author-title">Professional Learner</div>
              </div>
            </div>
          </div>

          <div className="testimonial-card">
            <div className="stars">⭐⭐⭐⭐⭐</div>
            <p>"The leaderboards keep me motivated. Love competing with my classmates and tracking my improvement!"</p>
            <div className="testimonial-author">
              <div className="author-avatar">MC</div>
              <div>
                <div className="author-name">Maria Chen</div>
                <div className="author-title">Medical Student</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="final-cta-section">
        <div className="cta-content">
          <h2>Ready to Transform Your Learning?</h2>
          <p>Join thousands of successful learners. Start creating AI-powered quizzes and mastering topics today.</p>
          <div className="cta-buttons">
            <Link to="/login" style={{ textDecoration: "none" }}>
              <button className="btn btn-primary btn-large">
                <span className="btn-icon">🚀</span>
                Get Started Free
              </button>
            </Link>
            <Link to="/home" style={{ textDecoration: "none" }}>
              <button className="btn btn-secondary btn-large">
                Explore Library
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
