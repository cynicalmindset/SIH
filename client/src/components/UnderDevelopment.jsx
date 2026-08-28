import React from 'react';

/**
 * UnderDevelopment
 * ─────────────────
 * Temporary placeholder rendered in place of the authenticated
 * dashboard routes while the workspace is being built.
 *
 * The underlying Dashboard components (DashboardAdmin, DashboardAnalyst,
 * DashboardViewer) are NOT deleted — they remain in /src/components/
 * and will be re-connected once the workspace implementation is complete.
 *
 * Routes this covers:
 *   #dashboard-admin   → DashboardAdmin.jsx   (preserved)
 *   #dashboard-analyst → DashboardAnalyst.jsx (preserved)
 *   #dashboard-viewer  → DashboardViewer.jsx  (preserved)
 */
export default function UnderDevelopment({ onNavigate }) {
  const handleBack = () => {
    if (onNavigate) onNavigate('home');
  };

  return (
    <div className="under-dev-page">
      {/* Subtle background orbs — same visual language as AuthPage */}
      <div className="under-dev-orb under-dev-orb--1" aria-hidden="true" />
      <div className="under-dev-orb under-dev-orb--2" aria-hidden="true" />

      <div className="under-dev-inner">
        {/* Logo */}
        <a
          href="#home"
          className="under-dev-logo-link"
          onClick={(e) => { e.preventDefault(); handleBack(); }}
          aria-label="Return to Planet homepage"
        >
          <img
            src="/planetlogo.png"
            alt="Planet"
            className="under-dev-logo"
          />
        </a>

        {/* Status pill */}
        <div className="under-dev-pill" aria-label="Status: Under development">
          <span className="under-dev-pill-dot" aria-hidden="true" />
          Under Development
        </div>

        {/* Heading */}
        <h1 className="under-dev-heading">Planet Workspace</h1>

        {/* Body */}
        <p className="under-dev-body">
          This section is currently under active development and will be
          available soon. The maritime intelligence workspace is being
          carefully built to meet our quality standards.
        </p>

        {/* Back to homepage */}
        <button
          className="under-dev-cta"
          onClick={handleBack}
          aria-label="Return to Planet homepage"
        >
          Return to Homepage
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M1 7h12M8 2l5 5-5 5"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
