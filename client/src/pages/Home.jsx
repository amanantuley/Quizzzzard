import React, { useEffect, useState } from "react";
import axios from "axios";
import QuizCard from "../components/quiz/QuizCard";
import { generateQuiz } from "../api/aiService";
import { useNavigate } from "react-router-dom";
import "../styles/home.css";

export default function Home(){
  const [quizzes, setQuizzes] = useState([]);
  const [filteredQuizzes, setFilteredQuizzes] = useState([]);
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("medium");
  const [count, setCount] = useState(10);
  const [busy, setBusy] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDifficulty, setFilterDifficulty] = useState("all");
  const [sortBy, setSortBy] = useState("recent");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(()=>{
    axios.get(`${import.meta.env.VITE_API_BASE || "http://localhost:4000/api"}/quizzes`)
      .then(r=>setQuizzes(r.data || []))
      .catch(()=>{});
  },[]);

  useEffect(() => {
    let filtered = quizzes.filter(q => {
      const matchesSearch = !searchQuery || q.title?.toLowerCase().includes(searchQuery.toLowerCase()) || q.description?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDifficulty = filterDifficulty === "all" || q.difficulty === filterDifficulty;
      return matchesSearch && matchesDifficulty;
    });

    if (sortBy === "recent") {
      filtered = filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortBy === "trending") {
      filtered = filtered.sort((a, b) => (b.plays || 0) - (a.plays || 0));
    } else if (sortBy === "popular") {
      filtered = filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    setFilteredQuizzes(filtered);
  }, [quizzes, searchQuery, filterDifficulty, sortBy]);

  async function createFromTopic(e){
    e.preventDefault();
    setError("");
    if(!topic.trim()) {
      setError("Please enter a topic");
      return;
    }
    try {
      setBusy(true);
      const quiz = await generateQuiz({ topic: topic.trim(), count, difficulty });
      setQuizzes(qs => [quiz, ...qs]);
      setTopic("");
      navigate(`/quiz/${quiz._id}`);
    } catch(err) {
      setError("Failed to create quiz. Please try again.");
      console.error(err);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="home">
      {/* Header Section */}
      <section className="home-header">
        <div className="header-gradient-bg"></div>
        <div className="header-content">
          <h1 className="header-title">
            Create or Explore Quizzes
          </h1>
          <p className="header-subtitle">
            Generate AI-powered quizzes on any topic or browse our library of expertly crafted questions
          </p>
        </div>
      </section>

      {/* Quiz Generator Section */}
      <section className="generator-section">
        <div className="generator-container">
          <div className="generator-header">
            <h2>🚀 Generate Your Custom Quiz</h2>
            <p>Create an AI-powered quiz in seconds</p>
          </div>

          <form onSubmit={createFromTopic} className="generator-form">
            <div className="form-group">
              <label htmlFor="topic">Topic</label>
              <input 
                id="topic"
                type="text" 
                placeholder="e.g., Machine Learning, World War II, Spanish Grammar..." 
                value={topic} 
                onChange={(e)=>setTopic(e.target.value)}
                className="form-input"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="difficulty">Difficulty</label>
                <select value={difficulty} onChange={e=>setDifficulty(e.target.value)} className="form-select">
                  <option value="easy">🟢 Easy</option>
                  <option value="medium">🟡 Medium</option>
                  <option value="hard">🔴 Hard</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="count">Questions</label>
                <input 
                  id="count"
                  type="number" 
                  min={5} 
                  max={20} 
                  value={count} 
                  onChange={e=>setCount(Number(e.target.value)||10)}
                  className="form-input"
                />
              </div>
            </div>

            {error && <div className="error-message">{error}</div>}

            <button type="submit" disabled={busy || !topic.trim()} className="generate-btn">
              <span className="btn-icon">{busy ? "⏳" : "✨"}</span>
              {busy ? "Creating Your Quiz..." : "Generate Quiz"}
            </button>
          </form>
        </div>
      </section>

      {/* Browse Section */}
      <section className="browse-section">
        <div className="browse-header">
          <h2>📚 Quiz Library</h2>
          <p>Discover and play quizzes created by our community</p>
        </div>

        {/* Search and Filter Bar */}
        <div className="search-filter-bar">
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search quizzes by title or topic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="filter-controls">
            <select value={filterDifficulty} onChange={(e) => setFilterDifficulty(e.target.value)} className="filter-select">
              <option value="all">All Difficulties</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>

            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="filter-select">
              <option value="recent">Recent</option>
              <option value="trending">Trending</option>
              <option value="popular">Popular</option>
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="results-count">
          Found <span className="count-badge">{filteredQuizzes.length}</span> {filteredQuizzes.length === 1 ? "quiz" : "quizzes"}
        </div>

        {/* Quiz Cards Grid */}
        {filteredQuizzes.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📭</div>
            <h3>No quizzes found</h3>
            <p>Try adjusting your filters or create a new quiz above</p>
          </div>
        ) : (
          <div className="quizzes-grid">
            {filteredQuizzes.map((quiz, idx) => (
              <div key={quiz._id} className="quiz-card-wrapper" style={{animationDelay: `${idx * 0.05}s`}}>
                <QuizCard quiz={quiz} />
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
