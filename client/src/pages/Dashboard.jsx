import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const gradientCard = "bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all";

const Dashboard = () => {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({ total: 0, accuracy: 0, best: 0, streak: 0 });
  const [recentQuizzes, setRecentQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  const [topic, setTopic] = useState("");
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!token) return;
      try {
        // Fetch User Stats
        const userRes = await axios.get('http://localhost:4000/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const userData = userRes.data;
        const accuracy = userData.stats?.totalQuestions > 0
          ? Math.round((userData.stats?.correctAnswers / userData.stats?.totalQuestions) * 100)
          : 0;

        setStats({
          total: userData.stats?.totalQuizzes || 0,
          accuracy: accuracy,
          best: accuracy, // Simplified for now
          streak: 1 // Mock streak
        });

        // Fetch Recent Scores/Quizzes (Not implemented in backend fully yet but let's mock or use empty)
        const scoresRes = await axios.get('http://localhost:4000/api/scores/me', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setRecentQuizzes(scoresRes.data);
      } catch (error) {
        console.error("Error fetching dashboard data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [token]);

  const handleCreateQuiz = async (e) => {
    e.preventDefault();
    if (!topic) return;
    setGenerating(true);
    try {
      const res = await axios.post('http://localhost:4000/api/quizzes/generate',
        { topic, count: 5, difficulty: 'medium' },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate(`/quiz/${res.data._id}`);
    } catch (error) {
      console.error("Quiz gen error", error);
      alert("Failed to generate quiz. Try again.");
    } finally {
      setGenerating(false);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Navbar />

      {/* Hero Header */}
      <div className="bg-gradient-to-r from-primary to-secondary pt-12 pb-24 text-white px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">Welcome back, {user?.displayName?.split(' ')[0] || "Wizard"}! 👋</h1>
          <p className="text-purple-100 text-lg">Master new topics with AI-powered quizzes tailored to your pace.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
            { label: "Quizzes Completed", value: stats.total, color: "blue" },
            { label: "Accuracy Rate", value: `${stats.accuracy}%`, color: "green" },
            { label: "Best Score", value: `${stats.best}%`, color: "yellow" },
            { label: "Current Streak", value: `${stats.streak} 🔥`, color: "red" },
          ].map((stat, i) => (
            <div key={i} className={`${gradientCard} transform hover:-translate-y-1`}>
              <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">{stat.label}</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
              <div className={`mt-2 h-1 w-full bg-gray-100 rounded-full overflow-hidden`}>
                <div className={`h-full bg-${stat.color}-500 w-full rounded-full`}></div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Create Quiz Section */}
          <div className="lg:col-span-1">
            <div className={`${gradientCard} h-full`}>
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="text-2xl mr-2">✨</span> Create New Quiz
              </h2>
              <form onSubmit={handleCreateQuiz} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Topic</label>
                  <input
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="e.g. Ancient Rome, React Hooks..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
                  <select className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary outline-none">
                    <option>🟡 Medium</option>
                    <option>🟢 Easy</option>
                    <option>🔴 Hard</option>
                  </select>
                </div>
                <button
                  disabled={generating}
                  type="submit"
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {generating ? "⏳ Creating Quiz..." : "🚀 Generate Quiz"}
                </button>
              </form>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <div className={`${gradientCard} h-full`}>
              <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h2>
              {recentQuizzes.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📚</div>
                  <h3 className="text-lg font-medium text-gray-900">No quizzes completed yet</h3>
                  <p className="text-gray-500">Start by creating your first quiz on the left!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {recentQuizzes.map((quiz, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold mr-4">
                          {i + 1}
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900">Quiz #{quiz.quizId.slice(-4)}</h4>
                          <p className="text-sm text-gray-500">{new Date(quiz.createdAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className={`px-3 py-1 rounded-full text-sm font-bold ${(quiz.score / quiz.total) > 0.8 ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                          }`}>
                          {Math.round((quiz.score / quiz.total) * 100)}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
