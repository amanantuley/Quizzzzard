import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';

const QuizzesPage = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [difficultyFilter, setDifficultyFilter] = useState('all');

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const res = await axios.get('http://localhost:4000/api/quizzes');
                setQuizzes(res.data);
            } catch (error) {
                console.error("Error fetching quizzes", error);
            } finally {
                setLoading(false);
            }
        };
        fetchQuizzes();
    }, []);

    const filteredQuizzes = quizzes.filter(quiz => {
        const matchesSearch = quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            quiz.topic.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesDifficulty = difficultyFilter === 'all' || quiz.difficulty === difficultyFilter;
        return matchesSearch && matchesDifficulty;
    });

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
                        📚 Explore Quizzes
                    </h1>
                    <p className="text-xl text-gray-600">
                        Browse our collection of AI-generated quizzes
                    </p>
                </div>

                {/* Search and Filter */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                            <input
                                type="text"
                                placeholder="Search by topic or title..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
                            <select
                                value={difficultyFilter}
                                onChange={(e) => setDifficultyFilter(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                            >
                                <option value="all">All Levels</option>
                                <option value="easy">🟢 Easy</option>
                                <option value="medium">🟡 Medium</option>
                                <option value="hard">🔴 Hard</option>
                            </select>
                        </div>
                    </div>
                    <div className="mt-4 text-sm text-gray-500">
                        Found {filteredQuizzes.length} quiz{filteredQuizzes.length !== 1 ? 'zes' : ''}
                    </div>
                </div>

                {/* Quiz Grid */}
                {loading ? (
                    <div className="text-center py-20">
                        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto"></div>
                        <p className="mt-4 text-gray-500">Loading quizzes...</p>
                    </div>
                ) : filteredQuizzes.length === 0 ? (
                    <div className="bg-white rounded-3xl shadow-xl p-12 text-center border border-gray-100">
                        <div className="text-6xl mb-4">🔍</div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">No quizzes found</h3>
                        <p className="text-gray-500 mb-6">Try adjusting your search or filters</p>
                        <Link
                            to="/dashboard"
                            className="inline-block px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-bold hover:shadow-lg transition-all"
                        >
                            Create Your Own Quiz
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredQuizzes.map((quiz) => (
                            <div
                                key={quiz._id}
                                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all border border-gray-100 overflow-hidden group"
                            >
                                <div className="p-6">
                                    {/* Difficulty Badge */}
                                    <div className="flex justify-between items-start mb-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${quiz.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                                                quiz.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                                                    'bg-red-100 text-red-700'
                                            }`}>
                                            {quiz.difficulty === 'easy' ? '🟢' : quiz.difficulty === 'medium' ? '🟡' : '🔴'} {quiz.difficulty}
                                        </span>
                                        <span className="text-gray-400 text-sm">{quiz.questions.length} Qs</span>
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                                        {quiz.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                        {quiz.description || `Test your knowledge on ${quiz.topic}`}
                                    </p>

                                    {/* Topic Tag */}
                                    <div className="mb-4">
                                        <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-medium">
                                            📖 {quiz.topic}
                                        </span>
                                    </div>

                                    {/* Stats */}
                                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                                        <span>👥 {quiz.plays || 0} plays</span>
                                        <span>📅 {new Date(quiz.createdAt).toLocaleDateString()}</span>
                                    </div>

                                    {/* Play Button */}
                                    <Link
                                        to={`/quiz/${quiz._id}`}
                                        className="block w-full py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-bold text-center hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
                                    >
                                        Start Quiz →
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default QuizzesPage;
