import React from 'react';
import { CONTACT_EMAIL } from '../config';

export default function Footer({ onNavigate }) {
  const handleNavClick = (e, target) => {
    if (onNavigate) {
      if (
        target === 'home' ||
        target === 'platform' ||
        target === 'intelligence' ||
        target === 'insights' ||
        target === 'contact'
      ) {
        e.preventDefault();
        onNavigate(target);
      }
    }
  };

  return (
    <footer className="footer-wrapper">
      <div className="footer-container">
        {/* Top Content Grid */}
        <div className="footer-top">
          {/* Brand Info */}
          <div className="footer-brand">
            <a
              href="#home"
              className="footer-logo-link"
              onClick={(e) => handleNavClick(e, 'home')}
            >
              <img src="/planetlogo.png" alt="Planet" className="footer-logo-img" />
            </a>
            <p className="footer-subtitle">
              Maritime Intelligence Platform
            </p>
          </div>

          {/* Navigation Links */}
          <div className="footer-column">
            <span className="footer-col-title">Navigation</span>
            <ul className="footer-links">
              <li>
                <a
                  href="#platform"
                  onClick={(e) => handleNavClick(e, 'platform')}
                >
                  Platform
                </a>
              </li>
              <li>
                <a
                  href="#intelligence"
                  onClick={(e) => handleNavClick(e, 'intelligence')}
                >
                  Intelligence
                </a>
              </li>
              <li>
                <a
                  href="#insights"
                  onClick={(e) => handleNavClick(e, 'insights')}
                >
                  Insights
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, 'contact')}
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Links */}
          <div className="footer-column">
            <span className="footer-col-title">Contact</span>
            <ul className="footer-links">
              <li>
                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, 'contact')}
                >
                  Get in Touch
                </a>
              </li>
              <li><a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></li>
            </ul>
          </div>

          {/* Social Logo Icons */}
          <div className="footer-column">
            <span className="footer-col-title">Social</span>
            <div className="footer-social-icons">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="footer-social-link"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                </svg>
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                aria-label="X (Twitter)"
                className="footer-social-link"
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Planet Maritime Intelligence. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
