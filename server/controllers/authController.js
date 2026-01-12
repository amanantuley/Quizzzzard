const User = require('../models/User');

// POST /api/auth/sync
// access: Private (requires token)
const syncUser = async (req, res) => {
    try {
        const { uid, email, name, picture } = req.user; // from verifyToken or expected from body if we want extra fields
        // NOTE: verifyToken puts decoded token in req.user which has uid, email, etc.
        // req.body can contain additional info if needed.

        let user = await User.findOne({ uid });

        if (!user) {
            user = new User({
                uid,
                email,
                displayName: name || req.body.displayName || 'Anonymous',
                photoURL: picture || req.body.photoURL,
            });
            await user.save();
        } else {
            // Update fields if changed
            if (req.body.displayName || req.body.photoURL) {
                user.displayName = req.body.displayName || user.displayName;
                user.schema = req.body.photoURL || user.photoURL;
                await user.save();
            }
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('Auth Sync Error:', error);
        res.status(500).json({ error: 'Server error syncing user' });
    }
};

const getMe = async (req, res) => {
    try {
        const user = await User.findOne({ uid: req.user.uid });
        if (!user) return res.status(404).json({ error: "User not found" });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
}

module.exports = { syncUser, getMe };
