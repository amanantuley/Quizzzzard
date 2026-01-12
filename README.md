# 🧙‍♂️ Quizzzzard - AI-Powered Quiz Platform

A modern, full-stack quiz application with AI-powered quiz generation, real-time leaderboards, and beautiful UI.

## ✨ Features

### Frontend
- 🎨 **Premium Design** - Built with Tailwind CSS featuring gradients, glassmorphism, and smooth animations
- 🔐 **Firebase Authentication** - Secure Google Sign-In
- 📊 **Real-time Dashboard** - Track your progress with beautiful stats cards
- 🎯 **Interactive Quiz Interface** - Smooth question flow with instant feedback
- 🏆 **Global Leaderboard** - Compete with players worldwide
- 📱 **Fully Responsive** - Perfect experience on all devices

### Backend
- 🤖 **AI Quiz Generation** - Powered by OpenAI GPT
- 🗄️ **MongoDB Database** - Scalable data storage
- 🔒 **Firebase Auth Integration** - Secure API endpoints
- 📈 **Analytics & Scoring** - Track user performance
- ⚡ **RESTful API** - Clean, documented endpoints

## 🚀 Quick Start

### Prerequisites
- Node.js (v16+)
- MongoDB (local or Atlas)
- Firebase Project
- OpenAI API Key (optional, has fallback)

### Installation

1. **Clone the repository**
\`\`\`bash
git clone https://github.com/your-username/quizzzzard.git
cd quizzzzard
\`\`\`

2. **Setup Backend**
\`\`\`bash
cd server
npm install
\`\`\`

Create \`.env\` file in \`server/\`:
\`\`\`env
PORT=4000
MONGO_URI=mongodb://localhost:27017/quizzzzard
OPENAI_API_KEY=your_openai_key_here
FIREBASE_SERVICE_ACCOUNT_KEY={"type":"service_account",...}
\`\`\`

3. **Setup Frontend**
\`\`\`bash
cd ../client
npm install
\`\`\`

Create \`.env\` file in \`client/\`:
\`\`\`env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_API_URL=http://localhost:4000
\`\`\`

4. **Run the Application**

Terminal 1 (Backend):
\`\`\`bash
cd server
npm start
\`\`\`

Terminal 2 (Frontend):
\`\`\`bash
cd client
npm run dev
\`\`\`

5. **Open your browser**
Navigate to \`http://localhost:5173\`

## 📁 Project Structure

\`\`\`
quizzzzard/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── context/       # React context (Auth)
│   │   ├── App.jsx        # Main app component
│   │   └── main.jsx       # Entry point
│   ├── tailwind.config.js # Tailwind configuration
│   └── package.json
│
└── server/                # Express backend
    ├── controllers/       # Route controllers
    ├── models/           # Mongoose models
    ├── routes/           # API routes
    ├── utils/            # Helper functions
    ├── server.js         # Entry point
    └── package.json
\`\`\`

## 🎯 API Endpoints

### Authentication
- \`POST /api/auth/sync\` - Sync Firebase user with database
- \`GET /api/auth/me\` - Get current user profile

### Quizzes
- \`POST /api/quizzes/generate\` - Generate new quiz (AI)
- \`GET /api/quizzes\` - Get all quizzes
- \`GET /api/quizzes/:id\` - Get quiz by ID

### Scores
- \`POST /api/scores\` - Submit quiz score
- \`GET /api/scores/top\` - Get leaderboard
- \`GET /api/scores/me\` - Get user's scores

## 🎨 Tech Stack

### Frontend
- React 18
- React Router v6
- Tailwind CSS
- Axios
- Firebase Auth
- Vite

### Backend
- Node.js
- Express
- MongoDB + Mongoose
- Firebase Admin SDK
- OpenAI API

## 🔧 Configuration

### Firebase Setup
1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable Google Authentication
3. Download service account key for backend
4. Copy web app config for frontend

### MongoDB Setup
- **Local**: Install MongoDB and run \`mongod\`
- **Cloud**: Create cluster at [mongodb.com/atlas](https://www.mongodb.com/atlas)

### OpenAI Setup (Optional)
1. Get API key from [platform.openai.com](https://platform.openai.com)
2. Add to server \`.env\`
3. Fallback quiz generation works without it

## 🌟 Key Features Explained

### AI Quiz Generation
Uses OpenAI's GPT model to generate contextual, topic-specific quizzes. Falls back to template-based generation if API key is missing.

### Real-time Stats
Dashboard displays:
- Total quizzes completed
- Accuracy rate
- Best score
- Current streak

### Leaderboard System
Aggregates scores across all users, showing top performers with percentage-based ranking.

## 🚧 Troubleshooting

**CSS not loading?**
- Ensure Tailwind CSS v3.4.x is installed (not v4)
- Run \`npm install -D tailwindcss@3.4.17\`

**Backend connection failed?**
- Check MongoDB is running
- Verify \`.env\` configuration
- Ensure port 4000 is available

**Authentication not working?**
- Verify Firebase config in both frontend and backend
- Check Firebase console for enabled auth methods

## 📝 License

MIT License - feel free to use for your projects!

## 👨‍💻 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🙏 Acknowledgments

- OpenAI for GPT API
- Firebase for authentication
- MongoDB for database
- Tailwind CSS for styling

---

Made with ❤️ by the Quizzzzard Team
