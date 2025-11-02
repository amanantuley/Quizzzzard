import React from "react";
import "../../styles/footer.css";

export default function Footer(){
  return (
    <footer className="footer" id="contact">
      <div className="footer-content">
        <div className="footer-section">
          <div className="footer-logo">
            <div className="footer-logo-circle">
              <img src="/logo.png" alt="GDGC Logo" className="footer-logo-img" />
            </div>
            <span>GDGC AIKTC</span>
          </div>

          <p className="footer-about">
            Google Developer Group on Campus at AIKTC. Empowering students
            with Google technologies through workshops, events, and
            collaborative learning.
          </p>

          <div className="footer-contact">
            <span>📞</span>
            <span>+91 98674 08609</span>
          </div>

          <div className="social-icons">
            <a href="#" className="social-icon" aria-label="GitHub">🐙</a>
            <a href="#" className="social-icon" aria-label="LinkedIn">💼</a>
            <a href="mailto:gdgconcampusaiktc@gmail.com" className="social-icon" aria-label="Email">@</a>
          </div>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul className="footer-links">
            <li><a href="#about">About Us</a></li>
            <li><a href="#teams">Team</a></li>
            <li><a href="#events">Events</a></li>
            <li><a href="#resources">Resources</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Programs</h3>
          <ul className="footer-links">
            <li><a href="#workshops">Workshops</a></li>
            <li><a href="https://algorithm9.aiktc.ac.in/">Hackathons</a></li>
            <li><a href="#tech-talks">Projects</a></li>
            <li><a href="#gallery">Gallery</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Connect With Us</h3>
          <ul className="footer-links">
            <li><a href="https://chat.whatsapp.com/FvcCSpX8wef6iamEoDESXv">WhatsApp Group</a></li>
            <li><a href="https://www.instagram.com/gdgc_aiktc">Instagram</a></li>
            <li><a href="https://www.linkedin.com/company/gdg-on-campus-aiktc/">LinkedIn</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 <span>GDGC AIKTC</span>. All rights reserved.</p>
      </div>
    </footer>
  );
}
