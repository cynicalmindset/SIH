import React, { useState } from 'react';

/**
 * RoleSelection
 * ─────────────
 * Step 1 of the 3-step post-auth onboarding flow.
 * Layout replicates the Notion-style role selection reference:
 *   • Three step indicators at top (step 1 active)
 *   • Heading + sub-copy
 *   • Three role cards — each with illustration + role name + description
 *   • "Continue" CTA, enabled only when a role is selected
 *
 * Illustrations:
 *   Admin    → /auth/adminillustrartion.png
 *   Analyst  → /auth/ANALYSTILLUSTRARTION.png
 *   Viewer   → /auth/Vviewerillustration.png
 *
 * IMPORTANT: Role selection here is a UI preference step only.
 * The backend-authoritative role stored after login is never overridden.
 * This selection feeds onboarding context, not access control.
 */

const ROLES = [
  {
    id: 'ADMIN',
    label: 'Admin',
    illustration: '/auth/adminillustrartion.png',
    description: 'Manage users, configure the platform, and oversee all maritime intelligence operations.',
  },
  {
    id: 'ANALYST',
    label: 'Analyst',
    illustration: '/auth/ANALYSTILLUSTRARTION.png',
    description: 'Investigate incidents, run intelligence modules, and generate evidence reports.',
  },
  {
    id: 'VIEWER',
    label: 'Viewer',
    illustration: '/auth/Vviewerillustration.png',
    description: 'Monitor maritime activity, review reports, and track ongoing investigations.',
  },
];

export default function RoleSelection({ onContinue, totalSteps = 3, currentStep = 1 }) {
  const [selected, setSelected] = useState(null);

  const handleContinue = () => {
    if (selected && onContinue) {
      onContinue(selected);
    }
  };

  return (
    <div className="role-sel-page">
      {/* ── Step Indicators ── */}
      <div className="role-sel-steps" role="list" aria-label="Setup progress">
        {Array.from({ length: totalSteps }, (_, i) => (
          <div
            key={i}
            role="listitem"
            aria-current={i + 1 === currentStep ? 'step' : undefined}
            className={`role-sel-step-bar ${i + 1 === currentStep ? 'role-sel-step-bar--active' : ''}`}
          />
        ))}
      </div>

      {/* ── Heading ── */}
      <div className="role-sel-header">
        <h1 className="role-sel-heading">How will you use Planet?</h1>
        <p className="role-sel-subheading">
          We'll tailor your workspace experience accordingly.
        </p>
      </div>

      {/* ── Role Cards ── */}
      <div className="role-sel-cards" role="radiogroup" aria-label="Select your role">
        {ROLES.map((role) => {
          const isSelected = selected === role.id;
          return (
            <button
              key={role.id}
              type="button"
              role="radio"
              aria-checked={isSelected}
              className={`role-sel-card ${isSelected ? 'role-sel-card--selected' : ''}`}
              onClick={() => setSelected(role.id)}
            >
              {/* Selection indicator tick */}
              <div className={`role-sel-card-tick ${isSelected ? 'role-sel-card-tick--visible' : ''}`} aria-hidden="true">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6l3 3 5-5" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>

              {/* Illustration */}
              <div className="role-sel-card-illo">
                <img
                  src={role.illustration}
                  alt={`${role.label} illustration`}
                  className="role-sel-card-illo-img"
                  draggable={false}
                />
              </div>

              {/* Text */}
              <div className="role-sel-card-text">
                <span className="role-sel-card-label">{role.label}</span>
                <p className="role-sel-card-desc">{role.description}</p>
              </div>
            </button>
          );
        })}
      </div>

      {/* ── Continue CTA ── */}
      <button
        type="button"
        className="role-sel-cta"
        disabled={!selected}
        onClick={handleContinue}
      >
        Continue
      </button>
    </div>
  );
}
