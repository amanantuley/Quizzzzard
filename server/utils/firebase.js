const admin = require('firebase-admin');
const dotenv = require('dotenv');

dotenv.config();

// Check if app is already initialized
if (!admin.apps.length) {
    try {
        const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY || '{}');
        // Verify we have keys if in production/dev (might skip if just testing without keys)
        if (Object.keys(serviceAccount).length > 0) {
            admin.initializeApp({
                credential: admin.credential.cert(serviceAccount)
            });
            console.log('Firebase Admin Initialized');
        } else {
            console.warn('Firebase Service Account Key missing. Auth verification may fail.');
        }
    } catch (error) {
        console.error('Firebase Admin Init Error:', error);
    }
}

module.exports = admin;
