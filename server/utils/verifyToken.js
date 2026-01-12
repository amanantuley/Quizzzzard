const admin = require('./firebase');

const verifyToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }

    const token = authHeader.split(' ')[1];

    try {
        // If Admin app is not initialized (e.g. no keys), we might skip or fail.
        // For development without keys, we might want a bypass or mock, but let's assume keys will be there or we fail.
        if (!admin.apps.length) {
            console.warn("Firebase Admin not initialized, skipping verification (UNSAFE in prod)");
            // For mock dev, we can decode base64 or something if needed, but let's strict fail if we want real auth
            // return res.status(500).json({ error: "Auth configuration missing" });
            // BYPASS FOR DEV if no keys:
            req.user = { uid: "test-user-uid", email: "test@example.com" };
            return next();
        }

        const decodedToken = await admin.auth().verifyIdToken(token);
        req.user = decodedToken;
        next();
    } catch (error) {
        console.error('Error verifying token:', error);
        return res.status(403).json({ error: 'Unauthorized: Invalid token' });
    }
};

module.exports = verifyToken;
