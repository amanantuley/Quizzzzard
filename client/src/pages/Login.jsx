import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';

const Login = () => {
  const { user, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-3xl shadow-2xl items-center text-center">
          <div>
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Welcome Back!
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Sign in to continue your learning journey
            </p>
          </div>

          <div className="mt-8 space-y-6">
            <button
              onClick={loginWithGoogle}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-gradient-to-r from-primary to-secondary hover:from-primary hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-md transform hover:-translate-y-0.5 transition-all"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                {/* Google Icon SVG could go here */}
                <svg className="h-5 w-5 text-indigo-50 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12.545,10.239v3.821h5.445c-0.712,2.335-3.486,3.821-5.445,3.821c-3.283,0-5.958-2.605-5.958-5.917c0-3.313,2.675-5.917,5.958-5.917c1.408,0,2.684,0.492,3.692,1.296l2.909-2.909c-2.023-1.879-4.707-3.054-7.838-3.054C5.694,1.482,1.333,5.844,1.333,11.961c0,6.117,4.361,10.479,10.48,10.479c4.325,0,8.086-2.222,9.982-5.592C22.759,16.037,23,14.908,23,13.723c0-0.456-0.032-0.908-0.086-1.354H12.545z" /></svg>
              </span>
              Sign in with Google
            </button>

            <p className="text-xs text-gray-500">
              By signing in, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
