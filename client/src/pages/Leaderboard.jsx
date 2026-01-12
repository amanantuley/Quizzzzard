import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await axios.get('http://localhost:4000/api/scores/top');
        setLeaderboard(res.data);
      } catch (error) {
        console.error("Error fetching leaderboard", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            🏆 Global Leaderboard
          </h1>
          <p className="text-xl text-gray-600">
            Top performers from around the world
          </p>
        </div>

        {/* Leaderboard */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          {loading ? (
            <div className="p-12 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-gray-500">Loading leaderboard...</p>
            </div>
          ) : leaderboard.length === 0 ? (
            <div className="p-12 text-center">
              <div className="text-6xl mb-4">🎯</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No scores yet</h3>
              <p className="text-gray-500">Be the first to complete a quiz!</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {/* Header Row */}
              <div className="bg-gradient-to-r from-primary to-secondary text-white px-6 py-4 grid grid-cols-12 gap-4 font-bold text-sm uppercase tracking-wider">
                <div className="col-span-1">Rank</div>
                <div className="col-span-5">Player</div>
                <div className="col-span-3">Score</div>
                <div className="col-span-3">Percentage</div>
              </div>

              {/* Leaderboard Rows */}
              {leaderboard.map((entry, index) => (
                <div
                  key={entry._id}
                  className={`px-6 py-4 grid grid-cols-12 gap-4 items-center hover:bg-gray-50 transition-colors ${index < 3 ? 'bg-gradient-to-r from-yellow-50 to-orange-50' : ''
                    }`}
                >
                  {/* Rank */}
                  <div className="col-span-1">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${index === 0 ? 'bg-yellow-400 text-yellow-900' :
                        index === 1 ? 'bg-gray-300 text-gray-700' :
                          index === 2 ? 'bg-orange-400 text-orange-900' :
                            'bg-gray-100 text-gray-600'
                      }`}>
                      {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : index + 1}
                    </div>
                  </div>

                  {/* Player */}
                  <div className="col-span-5 flex items-center space-x-3">
                    <img
                      src={entry.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${entry.username}`}
                      alt={entry.username}
                      className="w-10 h-10 rounded-full border-2 border-gray-200"
                    />
                    <span className="font-semibold text-gray-900">{entry.username}</span>
                  </div>

                  {/* Score */}
                  <div className="col-span-3">
                    <span className="text-gray-700 font-medium">
                      {entry.score}/{entry.total}
                    </span>
                  </div>

                  {/* Percentage */}
                  <div className="col-span-3">
                    <div className="flex items-center space-x-2">
                      <div className="flex-grow bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${entry.percentage >= 80 ? 'bg-green-500' :
                              entry.percentage >= 60 ? 'bg-yellow-500' :
                                'bg-red-500'
                            }`}
                          style={{ width: `${entry.percentage}%` }}
                        ></div>
                      </div>
                      <span className="font-bold text-gray-900 min-w-[3rem]">
                        {Math.round(entry.percentage)}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
