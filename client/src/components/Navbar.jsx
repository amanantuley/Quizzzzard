import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/');
        } catch (error) {
            console.error("Logout Error", error);
        }
    };

    return (
        <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => navigate('/')}>
                        <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                            Quizzzzard
                        </span>
                        <span className="text-2xl ml-1">🧙‍♂️</span>
                    </div>

                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/" className="text-gray-600 hover:text-primary transition-colors font-medium">Home</Link>
                        <Link to="/quizzes" className="text-gray-600 hover:text-primary transition-colors font-medium">Explore</Link>
                        {user && (
                            <Link to="/dashboard" className="text-gray-600 hover:text-primary transition-colors font-medium">Dashboard</Link>
                        )}
                    </div>

                    <div className="flex items-center space-x-4">
                        {user ? (
                            <div className="flex items-center space-x-4">
                                <span className="text-sm font-medium text-gray-700 hidden sm:block">{user.displayName || "Wizard"}</span>
                                <img
                                    src={user.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.uid}`}
                                    alt="Avatar"
                                    className="h-8 w-8 rounded-full border border-gray-200"
                                />
                                <button
                                    onClick={handleLogout}
                                    className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-full text-sm font-medium transition-colors"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div className="space-x-4">
                                <Link to="/login" className="text-gray-700 hover:text-primary font-medium">Login</Link>
                                <Link to="/signup" className="bg-gradient-to-r from-primary to-secondary text-white px-5 py-2.5 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all text-sm font-medium">
                                    Get Started
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
