const Score = require('../models/Score');
const User = require('../models/User');

// POST /api/scores
const submitScore = async (req, res) => {
    try {
        const { quizId, score, total } = req.body;
        const userId = req.user.uid;

        if (!quizId || score === undefined || total === undefined) {
            return res.status(400).json({ error: "Invalid score data" });
        }

        const newScore = new Score({
            userId,
            quizId,
            score,
            total
        });

        await newScore.save();

        // Update User Stats
        await User.findOneAndUpdate(
            { uid: userId },
            {
                $inc: {
                    'stats.totalQuizzes': 1,
                    'stats.totalQuestions': total,
                    'stats.correctAnswers': score
                }
            }
        );

        res.status(201).json(newScore);
    } catch (error) {
        console.error("Submit Score Error:", error);
        res.status(500).json({ error: "Server Error" });
    }
};

// GET /api/scores/top (Leaderboard)
const getTopScores = async (req, res) => {
    try {
        // Basic leaderboard: top scores based on %
        // In a real app we might aggregate by user. For now, just list top individual plays.
        // Or let's aggregate to find top users? 
        // Let's stick to the prompt's simplicity: List of top scores with user info.

        // We need to join with Users to get names.
        // Since we store userId (Firebase UID) in Score and User, and they are separate collections.
        // We can do a manual populate if we used ObjectId for references, but userId is a string.
        // So we fetch scores then fetch users or use aggregation.

        // Let's use simple find and map for MVP if scale is small, or aggregation.
        // Aggregation is better.

        const topScores = await Score.aggregate([
            {
                $addFields: {
                    ratio: { $divide: ["$score", "$total"] }
                }
            },
            { $sort: { ratio: -1, score: -1 } },
            { $limit: 20 }
        ]);

        // Now populate user details. 
        // Mongoose 'lookup' works if types match. User.uid is String, Score.userId is String.

        const leaderboard = await Score.aggregate([
            {
                $addFields: { percentage: { $cond: [{ $eq: ["$total", 0] }, 0, { $multiply: [{ $divide: ["$score", "$total"] }, 100] }] } }
            },
            { $sort: { percentage: -1 } },
            { $limit: 20 },
            {
                $lookup: {
                    from: "users", // collection name (lowercase plural usually)
                    localField: "userId",
                    foreignField: "uid",
                    as: "userDetails"
                }
            },
            {
                $unwind: { path: "$userDetails", preserveNullAndEmptyArrays: true }
            },
            {
                $project: {
                    score: 1,
                    total: 1,
                    percentage: 1,
                    username: { $ifNull: ["$userDetails.displayName", "Anonymous"] },
                    photoURL: "$userDetails.photoURL",
                    createdAt: 1
                }
            }
        ]);

        res.json(leaderboard);
    } catch (error) {
        console.error("Leaderboard Error:", error);
        res.status(500).json({ error: "Server Error" });
    }
};

// GET /api/scores/user - My scores
const getUserScores = async (req, res) => {
    try {
        const scores = await Score.find({ userId: req.user.uid }).sort({ createdAt: -1 });
        res.json(scores);
    } catch (error) {
        res.status(500).json({ error: "Server Error" });
    }
}

module.exports = { submitScore, getTopScores, getUserScores };
