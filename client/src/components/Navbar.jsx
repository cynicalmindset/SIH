import React, { useState } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';

export default function Navbar({ currentView = 'home', theme = 'dark', onNavigate }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (e, target) => {
    if (onNavigate) {
      if (
        target === 'home' ||
        target === 'platform' ||
        target === 'intelligence' ||
        target === 'insights' ||
        target === 'contact' ||
        target === 'auth'
      ) {
        e.preventDefault();
        setMobileMenuOpen(false);
        onNavigate(target);
      }
    }
  };

  return (
    <header className={`navbar-wrapper ${theme === 'light' ? 'navbar-wrapper--light' : ''}`}>
      <div className="nav-left">
        {/* Planet Brand Logo Link */}
        <a
          href="#home"
          className="brand-logo-link"
          onClick={(e) => handleNav(e, 'home')}
        >
          <img src="/planetlogo.png" alt="Planet" className="brand-logo-img" />
        </a>

        {/* Desktop Navigation Links */}
        <nav className="nav-links-container">
          <a
            href="#platform"
            className={`nav-link ${currentView === 'platform' ? 'nav-link-active' : ''}`}
            onClick={(e) => handleNav(e, 'platform')}
          >
            Platform
          </a>
          <a
            href="#intelligence"
            className={`nav-link ${currentView === 'intelligence' ? 'nav-link-active' : ''}`}
            onClick={(e) => handleNav(e, 'intelligence')}
          >
            Intelligence
          </a>
          <a
            href="#insights"
            className={`nav-link ${currentView === 'insights' ? 'nav-link-active' : ''}`}
            onClick={(e) => handleNav(e, 'insights')}
          >
            Insights
          </a>
        </nav>
      </div>

      {/* Right side ACCESS PLANET CTA button & Mobile Hamburger */}
      <div className="nav-right">
        <a
          href="#auth"
          className="nav-cta-btn desktop-cta"
          onClick={(e) => handleNav(e, 'auth')}
        >
          <span>ACCESS PLANET</span>
          <span style={{ fontSize: '1.05rem', lineHeight: '1' }}>→</span>
        </a>

        {/* Mobile Hamburger Toggle Button */}
        <button
          type="button"
          className="nav-mobile-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Slide-down Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="nav-mobile-drawer">
          <nav className="nav-mobile-links">
            <a
              href="#home"
              className={`nav-mobile-link ${currentView === 'home' ? 'nav-mobile-link--active' : ''}`}
              onClick={(e) => handleNav(e, 'home')}
            >
              <span>Home</span>
              {currentView === 'home' && <span className="nav-mobile-dot">•</span>}
            </a>
            <a
              href="#platform"
              className={`nav-mobile-link ${currentView === 'platform' ? 'nav-mobile-link--active' : ''}`}
              onClick={(e) => handleNav(e, 'platform')}
            >
              <span>Platform</span>
              {currentView === 'platform' && <span className="nav-mobile-dot">•</span>}
            </a>
            <a
              href="#intelligence"
              className={`nav-mobile-link ${currentView === 'intelligence' ? 'nav-mobile-link--active' : ''}`}
              onClick={(e) => handleNav(e, 'intelligence')}
            >
              <span>Intelligence</span>
              {currentView === 'intelligence' && <span className="nav-mobile-dot">•</span>}
            </a>
            <a
              href="#insights"
              className={`nav-mobile-link ${currentView === 'insights' ? 'nav-mobile-link--active' : ''}`}
              onClick={(e) => handleNav(e, 'insights')}
            >
              <span>Insights</span>
              {currentView === 'insights' && <span className="nav-mobile-dot">•</span>}
            </a>

            <div className="nav-mobile-cta-wrap">
              <a
                href="#auth"
                className="nav-mobile-cta-btn"
                onClick={(e) => handleNav(e, 'auth')}
              >
                <span>ACCESS PLANET</span>
                <ArrowRight size={16} />
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
