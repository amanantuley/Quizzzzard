import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';

const QuizPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { token, user } = useAuth();

    const [quiz, setQuiz] = useState(null);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const res = await axios.get(`http://localhost:4000/api/quizzes/${id}`);
                setQuiz(res.data);
            } catch (error) {
                console.error("Error fetching quiz", error);
                alert("Quiz not found!");
                navigate('/dashboard');
            } finally {
                setLoading(false);
            }
        };
        fetchQuiz();
    }, [id, navigate]);

    const handleAnswerClick = (index) => {
        setSelectedAnswer(index);
    };

    const handleNextQuestion = async () => {
        if (selectedAnswer === null) return;

        const isCorrect = selectedAnswer === quiz.questions[currentQuestion].answerIndex;
        if (isCorrect) {
            setScore(prev => prev + 1);
        }

        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < quiz.questions.length) {
            setCurrentQuestion(nextQuestion);
            setSelectedAnswer(null);
        } else {
            // Finish Quiz
            const finalScore = isCorrect ? score + 1 : score;
            setShowScore(true);

            // Submit Score to Backend
            try {
                await axios.post('http://localhost:4000/api/scores', {
                    quizId: id,
                    score: finalScore,
                    total: quiz.questions.length,
                    userName: user.displayName || "Anonymous"
                }, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            } catch (error) {
                console.error("Failed to submit score", error);
            }
        }
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    if (!quiz) return null;

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <Navbar />

            <div className="max-w-3xl mx-auto px-4 mt-10">
                {showScore ? (
                    <div className="bg-white rounded-3xl p-8 shadow-xl text-center border border-gray-100">
                        <h2 className="text-3xl font-bold mb-4">Quiz Completed! 🎉</h2>
                        <div className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-6">
                            {Math.round((score / quiz.questions.length) * 100)}%
                        </div>
                        <p className="text-xl text-gray-600 mb-8">
                            You scored {score} out of {quiz.questions.length}
                        </p>
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="px-8 py-3 rounded-xl bg-gray-900 text-white font-bold hover:bg-gray-800 transition-all"
                        >
                            Return to Dashboard
                        </button>
                    </div>
                ) : (
                    <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 min-h-[400px] flex flex-col">
                        <div className="flex justify-between items-center mb-6">
                            <span className="text-gray-500 font-medium">Question {currentQuestion + 1}/{quiz.questions.length}</span>
                            <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-sm font-bold uppercase tracking-wide">
                                {quiz.difficulty}
                            </span>
                        </div>

                        <h2 className="text-2xl font-bold text-gray-900 mb-8">
                            {quiz.questions[currentQuestion].text}
                        </h2>

                        <div className="space-y-4 flex-grow">
                            {quiz.questions[currentQuestion].options.map((option, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleAnswerClick(index)}
                                    className={`w-full text-left p-4 rounded-xl border-2 transition-all font-medium ${selectedAnswer === index
                                            ? 'border-primary bg-indigo-50 text-primary'
                                            : 'border-gray-100 hover:border-indigo-200 text-gray-700'
                                        }`}
                                >
                                    <span className="w-6 h-6 inline-flex items-center justify-center rounded-full border border-gray-300 mr-3 text-sm text-gray-400 bg-white">
                                        {String.fromCharCode(65 + index)}
                                    </span>
                                    {option}
                                </button>
                            ))}
                        </div>

                        <div className="mt-8 flex justify-end">
                            <button
                                onClick={handleNextQuestion}
                                disabled={selectedAnswer === null}
                                className="px-8 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-bold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95 transition-all"
                            >
                                {currentQuestion === quiz.questions.length - 1 ? "Finish Quiz" : "Next Question"}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default QuizPage;
