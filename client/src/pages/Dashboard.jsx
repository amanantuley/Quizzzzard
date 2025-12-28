import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { generateQuiz } from "../api/aiService";
import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css";

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [myScores, setMyScores] = useState([]);
  const [busy, setBusy] = useState(false);
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("medium");
  const [count, setCount] = useState(10);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE || "http://localhost:4000/api"}/scores/top`)
      .then((r) => {
        const all = Array.isArray(r.data) ? r.data : [];
        const mine = all.filter((s) => (s.userName || "").toLowerCase() === (user?.email || "").toLowerCase());
        // Sort by date, most recent first
        const sorted = mine.sort((a, b) => {
          const dateA = new Date(a.createdAt || 0);
          const dateB = new Date(b.createdAt || 0);
          return dateB - dateA;
        });
        setMyScores(sorted);
      })
      .catch((err) => {
        console.error("Failed to fetch scores:", err);
      });
  }, [user]);

  const metrics = useMemo(() => {
    const played = myScores.length;
    const accs = myScores.map((s) => (s.total ? s.score / s.total : 0));
    const avgAcc = accs.length ? Math.round((accs.reduce((a, b) => a + b, 0) / accs.length) * 100) : 0;
    const best = myScores.reduce((m, s) => Math.max(m, s.total ? Math.round((s.score / s.total) * 100) : 0), 0);
    const totalQuestions = myScores.reduce((sum, s) => sum + s.total, 0);
    const totalCorrect = myScores.reduce((sum, s) => sum + s.score, 0);
    const streak = calculateStreak(myScores);
    return { played, avgAcc, best, totalQuestions, totalCorrect, streak };
  }, [myScores]);

  const calculateStreak = (scores) => {
    if (scores.length === 0) return 0;
    
    let streak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    for (const score of scores) {
      const scoreDate = score.createdAt ? new Date(score.createdAt) : new Date();
      scoreDate.setHours(0, 0, 0, 0);
      const dayDiff = Math.floor((today - scoreDate) / (1000 * 60 * 60 * 24));
      
      if (dayDiff === streak) {
        streak++;
      } else {
        break;
      }
    }
    return streak;
  };

  async function createQuiz(e) {
    e.preventDefault();
    setError("");
    if (!topic.trim()) {
      setError("Please enter a topic");
      return;
    }
    try {
      setBusy(true);
      const quiz = await generateQuiz({ topic: topic.trim(), count, difficulty });
      setTopic("");
      navigate(`/quiz/${quiz._id}`);
    } catch (err) {
      setError("Failed to create quiz. Please try again.");
      console.error(err);
    } finally {
      setBusy(false);
    }
  }

  const recentScores = myScores.slice(0, 5);
  const difficultyTrend = {
    easy: myScores.filter(s => s.difficulty === 'easy').length,
    medium: myScores.filter(s => s.difficulty === 'medium').length,
    hard: myScores.filter(s => s.difficulty === 'hard').length,
  };

  return (
    <section className="dashboard">
      {/* Hero Header */}
      <div className="dashboard-hero">
        <div className="hero-content">
          <h1 className="hero-title">Welcome back, <span className="highlight">{user?.email?.split('@')[0] || "Learner"}</span></h1>
          <p className="hero-subtitle">Master new topics with AI-powered quizzes tailored to your learning pace</p>
        </div>
        <div className="hero-decoration"></div>
      </div>

      {/* Quick Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card stat-card-primary">
          <div className="stat-icon">🎯</div>
          <div className="stat-info">
            <div className="stat-label">Quizzes Completed</div>
            <div className="stat-value">{metrics.played}</div>
          </div>
          <div className="stat-progress">
            <div className="progress-bar" style={{width: Math.min(metrics.played * 10, 100) + '%'}}></div>
          </div>
        </div>

        <div className="stat-card stat-card-success">
          <div className="stat-icon">📊</div>
          <div className="stat-info">
            <div className="stat-label">Accuracy Rate</div>
            <div className="stat-value">{metrics.avgAcc}%</div>
          </div>
          <div className="stat-progress">
            <div className="progress-bar accuracy" style={{width: metrics.avgAcc + '%'}}></div>
          </div>
        </div>

        <div className="stat-card stat-card-warning">
          <div className="stat-icon">🏆</div>
          <div className="stat-info">
            <div className="stat-label">Best Score</div>
            <div className="stat-value">{metrics.best}%</div>
          </div>
          <div className="stat-progress">
            <div className="progress-bar success" style={{width: metrics.best + '%'}}></div>
          </div>
        </div>

        <div className="stat-card stat-card-info">
          <div className="stat-icon">🔥</div>
          <div className="stat-info">
            <div className="stat-label">Current Streak</div>
            <div className="stat-value">{metrics.streak} days</div>
          </div>
          <div className="stat-progress">
            <div className="progress-bar info" style={{width: Math.min(metrics.streak * 10, 100) + '%'}}></div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="dashboard-grid">
        {/* Quiz Generator */}
        <div className="quiz-generator-section">
          <h2 className="section-title">
            <span className="title-icon">✨</span>
            Create Custom Quiz
          </h2>
          <div className="generator-card">
            <p className="generator-subtitle">Generate a personalized AI-powered quiz on any topic</p>
            <form onSubmit={createQuiz} className="quiz-form">
              <div className="form-group">
                <label htmlFor="topic" className="form-label">Topic</label>
                <input
                  id="topic"
                  type="text"
                  placeholder="e.g., Quantum Physics, Ancient Rome, Python Basics..."
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="difficulty" className="form-label">Difficulty</label>
                  <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} className="form-select">
                    <option value="easy">🟢 Easy</option>
                    <option value="medium">🟡 Medium</option>
                    <option value="hard">🔴 Hard</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="count" className="form-label">Questions</label>
                  <input
                    id="count"
                    type="number"
                    min={5}
                    max={20}
                    value={count}
                    onChange={(e) => setCount(Number(e.target.value) || 10)}
                    className="form-input"
                  />
                </div>
              </div>

              {error && <div className="error-message">{error}</div>}

              <button type="submit" className="submit-btn" disabled={busy || !topic.trim()}>
                <span className="btn-icon">{busy ? "⏳" : "🚀"}</span>
                {busy ? "Creating Quiz..." : "Create Quiz"}
              </button>
            </form>
          </div>
        </div>

        {/* Analytics & Recent Activity */}
        <div className="analytics-section">
          <div className="analytics-card">
            <h2 className="section-title">
              <span className="title-icon">📈</span>
              Learning Overview
            </h2>
            <div className="overview-stats">
              <div className="overview-item">
                <div className="overview-label">Total Questions</div>
                <div className="overview-value">{metrics.totalQuestions}</div>
              </div>
              <div className="overview-item">
                <div className="overview-label">Correct Answers</div>
                <div className="overview-value">{metrics.totalCorrect}</div>
              </div>
              <div className="overview-item">
                <div className="overview-label">Success Rate</div>
                <div className="overview-value">{metrics.totalQuestions > 0 ? Math.round((metrics.totalCorrect / metrics.totalQuestions) * 100) : 0}%</div>
              </div>
            </div>

            {metrics.played > 0 && (
              <div className="difficulty-breakdown">
                <h3 className="breakdown-title">Quizzes by Difficulty</h3>
                <div className="difficulty-bars">
                  <div className="difficulty-item">
                    <span className="difficulty-label">Easy</span>
                    <div className="difficulty-bar">
                      <div className="difficulty-fill easy" style={{width: metrics.played > 0 ? (difficultyTrend.easy / metrics.played * 100) + '%' : 0}}></div>
                    </div>
                    <span className="difficulty-count">{difficultyTrend.easy}</span>
                  </div>
                  <div className="difficulty-item">
                    <span className="difficulty-label">Medium</span>
                    <div className="difficulty-bar">
                      <div className="difficulty-fill medium" style={{width: metrics.played > 0 ? (difficultyTrend.medium / metrics.played * 100) + '%' : 0}}></div>
                    </div>
                    <span className="difficulty-count">{difficultyTrend.medium}</span>
                  </div>
                  <div className="difficulty-item">
                    <span className="difficulty-label">Hard</span>
                    <div className="difficulty-bar">
                      <div className="difficulty-fill hard" style={{width: metrics.played > 0 ? (difficultyTrend.hard / metrics.played * 100) + '%' : 0}}></div>
                    </div>
                    <span className="difficulty-count">{difficultyTrend.hard}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="recent-activity-card">
            <h2 className="section-title">
              <span className="title-icon">⚡</span>
              Recent Activity
            </h2>
            {recentScores.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">📚</div>
                <p className="empty-text">No quizzes completed yet</p>
                <p className="empty-subtext">Start by creating your first quiz above</p>
              </div>
            ) : (
              <div className="activity-list">
                {recentScores.map((s, idx) => (
                  <div key={s._id} className="activity-item" style={{animationDelay: `${idx * 0.1}s`}}>
                    <div className="activity-left">
                      <div className="activity-rank">{idx + 1}</div>
                      <div className="activity-details">
                        <div className="activity-topic">{s.quizId || "Quiz"}</div>
                        <div className="activity-date">
                          {new Date(s.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </div>
                      </div>
                    </div>
                    <div className="activity-score">
                      <div className="score-badge" style={{background: `hsl(${Math.round((s.score / s.total) * 120)}, 100%, 50%)`}}>
                        {Math.round((s.score / s.total) * 100)}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
