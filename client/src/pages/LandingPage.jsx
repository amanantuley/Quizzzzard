import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            {/* Hero Section */}
            <div className="relative overflow-hidden pt-16 pb-32">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-50 to-pink-50 -z-10"></div>
                <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-bl from-purple-200 to-blue-200 blur-[100px] opacity-50 -z-10"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
                    <div className="inline-block mb-6 px-4 py-1.5 rounded-full bg-indigo-100 text-indigo-700 font-semibold text-sm tracking-wide">
                        ✨ AI-Powered Learning
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 mb-8 leading-tight">
                        Master Any Topic with <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
                            AI-Generated Quizzes
                        </span>
                    </h1>
                    <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600 mb-10">
                        Instantly generate quizzes on any subject, challenge your friends, and track your progress with detailed analytics.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                        <Link to="/signup" className="px-8 py-4 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-bold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all">
                            Start Learning Free
                        </Link>
                        <Link to="/quizzes" className="px-8 py-4 rounded-full bg-white text-gray-800 font-bold text-lg shadow-md hover:shadow-xl border border-gray-100 transition-all">
                            Explore Library
                        </Link>
                    </div>

                    {/* Stats */}
                    <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                        {[
                            { label: 'Quizzes Generated', value: '10K+' },
                            { label: 'Active Learners', value: '50K+' },
                            { label: 'Topics Covered', value: 'Unlimited' },
                            { label: 'User Satisfaction', value: '98%' },
                        ].map((stat, i) => (
                            <div key={i} className="flex flex-col items-center">
                                <span className="text-3xl font-bold text-gray-900">{stat.value}</span>
                                <span className="text-gray-500 text-sm mt-1 uppercase tracking-wider">{stat.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Features Grid */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900">Why choose Quizzzzard?</h2>
                        <p className="mt-4 text-xl text-gray-600">Everything you need to accelarate your learning journey.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[
                            { title: "🤖 AI-Generated", desc: "Just enter a topic, and our AI constructs a perfect quiz in seconds.", icon: "✨" },
                            { title: "📊 Deep Analytics", desc: "Track your strengths and weaknesses with detailed performance reports.", icon: "📈" },
                            { title: "🏆 Leaderboards", desc: "Compete with peers and climb the global rankings.", icon: "🥇" },
                            { title: "🌍 Unlimited Topics", desc: "From Quantum Physics to Pop Culture, learn anything.", icon: "🌐" },
                            { title: "⚡ Instant Feedback", desc: "Learn from mistakes immediately with detailed explanations.", icon: "💡" },
                            { title: "📱 Mobile Optimized", desc: "Learn on the go with our fully responsive design.", icon: "📱" },
                        ].map((feature, i) => (
                            <div key={i} className="bg-gray-50 rounded-2xl p-8 hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-gray-100">
                                <div className="text-4xl mb-4">{feature.icon}</div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                                <p className="text-gray-600">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <p className="text-gray-500">© 2024 Quizzzzard. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
