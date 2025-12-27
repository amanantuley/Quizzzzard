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

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE || "http://localhost:4000/api"}/scores/top`)
      .then((r) => {
        const all = Array.isArray(r.data) ? r.data : [];
        const mine = all.filter((s) => (s.userName || "").toLowerCase() === (user?.email || "").toLowerCase());
        setMyScores(mine);
      })
      .catch(() => {});
  }, [user]);

  const metrics = useMemo(() => {
    const played = myScores.length;
    const accs = myScores.map((s) => (s.total ? s.score / s.total : 0));
    const avgAcc = accs.length ? Math.round((accs.reduce((a, b) => a + b, 0) / accs.length) * 100) : 0;
    const best = myScores.reduce((m, s) => Math.max(m, s.total ? Math.round((s.score / s.total) * 100) : 0), 0);
    return { played, avgAcc, best };
  }, [myScores]);

  async function createQuiz(e) {
    e.preventDefault();
    if (!topic.trim()) return;
    try {
      setBusy(true);
      const quiz = await generateQuiz({ topic: topic.trim(), count, difficulty });
      navigate(`/quiz/${quiz._id}`);
    } catch (err) {
      // minimal feedback could be added
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="db">
      <header className="db-header">
        <div>
          <h2>Welcome, {user?.email || "Learner"}</h2>
          <p className="db-sub">Generate a quiz, track your progress, and see recent activity.</p>
        </div>
      </header>

      <div className="db-grid">
        {/* Quick generator */}
        <div className="db-card">
          <h3>Create a quiz by topic</h3>
          <form onSubmit={createQuiz} className="db-form">
            <input
              type="text"
              placeholder="e.g., JavaScript, World History, Algebra"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
            <div className="db-row">
              <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
              <input
                type="number"
                min={5}
                max={20}
                value={count}
                onChange={(e) => setCount(Number(e.target.value) || 10)}
              />
            </div>
            <button type="submit" className="db-btn" disabled={busy}>
              {busy ? "Creating…" : "Create Quiz"}
            </button>
          </form>
        </div>

        {/* Metrics */}
        <div className="db-card db-metrics">
          <div className="metric">
            <div className="metric-value">{metrics.played}</div>
            <div className="metric-label">Quizzes played</div>
          </div>
          <div className="metric">
            <div className="metric-value">{metrics.avgAcc}%</div>
            <div className="metric-label">Avg accuracy</div>
          </div>
          <div className="metric">
            <div className="metric-value">{metrics.best}%</div>
            <div className="metric-label">Best score</div>
          </div>
        </div>

        {/* Recent activity */}
        <div className="db-card">
          <h3>Recent activity</h3>
          {myScores.length === 0 ? (
            <p className="db-empty">No activity yet. Create a quiz to get started.</p>
          ) : (
            <ul className="db-list">
              {myScores.slice(0, 5).map((s) => (
                <li key={s._id} className="db-list-item">
                  <span className="db-list-name">{s.quizId}</span>
                  <span className="db-list-score">
                    {s.score}/{s.total} ({Math.round((s.score / s.total) * 100)}%)
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
