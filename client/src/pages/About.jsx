import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/about.css";

export default function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const stats = [
    { number: "50K+", label: "Active Users", icon: "👥" },
    { number: "100K+", label: "Quizzes Created", icon: "📝" },
    { number: "5M+", label: "Questions Answered", icon: "✅" },
    { number: "95%", label: "User Satisfaction", icon: "⭐" },
  ];

  const features = [
    {
      icon: "🤖",
      title: "AI-Powered Quizzes",
      description: "Generate personalized quizzes using advanced AI technology",
    },
    {
      icon: "🎯",
      title: "Smart Tracking",
      description: "Monitor your progress with detailed analytics and insights",
    },
    {
      icon: "🏆",
      title: "Competitive Leaderboards",
      description: "Compete with friends and climb the global rankings",
    },
    {
      icon: "🎤",
      title: "Voice Quiz Mode",
      description: "Learn and quiz using voice interactions for immersive experience",
    },
    {
      icon: "📱",
      title: "Mobile Responsive",
      description: "Access your quizzes anytime, anywhere on any device",
    },
    {
      icon: "🔒",
      title: "Secure & Private",
      description: "Your data is encrypted and protected with enterprise security",
    },
  ];

  const team = [
    {
      name: "Innovation Team",
      role: "Product & Development",
      icon: "💻",
      description: "Building cutting-edge quiz solutions",
    },
    {
      name: "Design Team",
      role: "UI/UX & Branding",
      icon: "🎨",
      description: "Creating beautiful user experiences",
    },
    {
      name: "AI Team",
      role: "Machine Learning & Analytics",
      icon: "🧠",
      description: "Powering intelligent quiz generation",
    },
    {
      name: "Support Team",
      role: "Customer Success",
      icon: "🤝",
      description: "Always here to help you succeed",
    },
  ];

  return (
    <div className="about-container">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="hero-content">
          <h1 className="hero-title">About Quizzzzard</h1>
          <p className="hero-subtitle">
            Revolutionizing the way people learn through interactive, AI-powered quizzes
          </p>
          <div className="hero-divider"></div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="about-section mission-section">
        <div className="section-container">
          <div className="section-content">
            <h2>Our Mission</h2>
            <p>
              At Quizzzzard, we believe learning should be engaging, personalized, and accessible to everyone. 
              Our mission is to empower learners worldwide by combining artificial intelligence, gamification, 
              and modern education techniques to create quiz experiences that inspire growth and success.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="section-container">
          <h2>Our Impact</h2>
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="section-container">
          <h2>Why Choose Quizzzzard?</h2>
          <p className="section-subtitle">
            Packed with powerful features designed for modern learners
          </p>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="section-container">
          <h2>Our Team</h2>
          <p className="section-subtitle">
            Dedicated professionals committed to your learning success
          </p>
          <div className="team-grid">
            {team.map((member, index) => (
              <div key={index} className="team-card">
                <div className="team-icon">{member.icon}</div>
                <h3>{member.name}</h3>
                <p className="team-role">{member.role}</p>
                <p className="team-description">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <div className="section-container">
          <h2>Our Core Values</h2>
          <div className="values-grid">
            <div className="value-item">
              <h3>🚀 Innovation</h3>
              <p>Constantly pushing boundaries with cutting-edge technology</p>
            </div>
            <div className="value-item">
              <h3>🎓 Excellence</h3>
              <p>Delivering the highest quality learning experiences</p>
            </div>
            <div className="value-item">
              <h3>♿ Accessibility</h3>
              <p>Making education available to everyone, everywhere</p>
            </div>
            <div className="value-item">
              <h3>🌱 Growth</h3>
              <p>Empowering continuous learning and personal development</p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="vision-section">
        <div className="section-container">
          <h2>Our Vision</h2>
          <p>
            To become the world's most trusted and innovative quiz platform, where millions of learners 
            discover their potential and achieve their educational goals through intelligent, personalized, 
            and engaging learning experiences.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="section-container cta-content">
          <h2>Ready to Transform Your Learning?</h2>
          <p>Join thousands of learners already experiencing the Quizzzzard difference</p>
          <div className="cta-buttons">
            <Link to="/register" className="btn btn-primary">
              Get Started Free
            </Link>
            <Link to="/" className="btn btn-secondary">
              Explore Quizzes
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <div className="section-container">
          <h2>Get In Touch</h2>
          <p>Have questions or suggestions? We'd love to hear from you!</p>
          <div className="contact-info">
            <div className="contact-item">
              <span className="icon">📧</span>
              <p>support@quizzzzard.com</p>
            </div>
            <div className="contact-item">
              <span className="icon">🌐</span>
              <p>www.quizzzzard.com</p>
            </div>
            <div className="contact-item">
              <span className="icon">💬</span>
              <p>Community Discord</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}