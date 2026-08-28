import React from 'react';

export default function Navbar({ currentView = 'home', onNavigate }) {
  const handleNav = (e, target) => {
    if (onNavigate) {
      if (target === 'home' || target === 'platform' || target === 'intelligence' || target === 'insights') {
        e.preventDefault();
        onNavigate(target);
      }
    }
  };

  return (
    <header className="navbar-wrapper">
      <div className="nav-left">
        {/* Planet Brand Logo Image acting as home link */}
        <a
          href="#home"
          className="brand-logo-link"
          onClick={(e) => handleNav(e, 'home')}
        >
          <img src="/planetlogo.png" alt="Planet" className="brand-logo-img" />
        </a>

        {/* Navigation items - Plain white text by default, individual hover pill container */}
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

      {/* Right side ACCESS PLANET CTA button */}
      <div className="nav-right">
        <a
          href="#auth"
          className="nav-cta-btn"
          onClick={(e) => {
            e.preventDefault();
            if (onNavigate) onNavigate('auth');
          }}
        >
          <span>ACCESS PLANET</span>
          <span style={{ fontSize: '1.05rem', lineHeight: '1' }}>→</span>
        </a>
      </div>
    </header>
  );
}
