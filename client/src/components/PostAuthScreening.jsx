import React, { useState } from 'react';

/**
 * PostAuthScreening
 * ─────────────────
 * 3-Step Post-Authentication Screening & Onboarding Flow:
 *   STEP 1 → Role Selection (Admin / Analyst / Viewer)
 *   STEP 2 → Primary Focus Area (Checkboxes)
 *   STEP 3 → Intelligence Feeds (Checkboxes)
 *   FINISH → Dashboard
 *
 * Design:
 *   • Pure WHITE background (#ffffff)
 *   • BLACK primary typography (#0f172a / #1e293b)
 *   • Three slim horizontal progress bars at top
 *   • Navigation in BOTH directions (← Back & Continue →)
 *   • Preserved selections across navigation
 */

const ROLES = [
  {
    id: 'ADMIN',
    label: 'Admin',
    illustration: '/auth/adminillustrartion.png',
    description: 'Manage users, configure platform parameters, and oversee system operations.',
  },
  {
    id: 'ANALYST',
    label: 'Analyst',
    illustration: '/auth/ANALYSTILLUSTRARTION.png',
    description: 'Investigate incidents, run intelligence modules, and generate forensic evidence.',
  },
  {
    id: 'VIEWER',
    label: 'Viewer',
    illustration: '/auth/Vviewerillustration.png',
    description: 'Monitor maritime activity, review reports, and track active investigations.',
  },
];

const STEP2_OPTIONS = [
  {
    id: 'spill-attribution',
    title: 'Oil Spill Detection & Incident Attribution',
    description: 'Identify radar backscatter anomalies and trace slicks back to candidate vessels.',
  },
  {
    id: 'dark-vessels',
    title: 'Vessel Kinematics & Dark Ship Tracking',
    description: 'Reconstruct speeds, maneuvers, and non-reporting AIS transponder gaps.',
  },
  {
    id: 'environmental-risk',
    title: 'Environmental Risk & Protected Zone Impact',
    description: 'Quantify ecological risks across marine protected areas and coastal zones.',
  },
  {
    id: 'forensic-reports',
    title: 'Forensic Evidence & Audit-Ready Reporting',
    description: 'Export multi-criteria evidence scoring reports for legal enforcement.',
  },
];

const STEP3_OPTIONS = [
  {
    id: 'sar-imagery',
    title: 'Satellite SAR & Optical Target Detection',
    description: 'High-frequency Synthetic Aperture Radar feeds for day/night all-weather coverage.',
  },
  {
    id: 'ais-feeds',
    title: 'Real-time AIS Vessel Transponder Feeds',
    description: 'Global terrestrial and satellite AIS vessel tracking feeds.',
  },
  {
    id: 'drift-models',
    title: 'Hydrodynamic Wind & Surface Current Drift Models',
    description: 'Integrated oceanographic current vectors for backward slick drift simulation.',
  },
  {
    id: 'automated-alerts',
    title: 'Automated Anomaly & Transponder Gap Alerting',
    description: 'Instant notification triggers for AIS dropouts in high-risk oceanic corridors.',
  },
];

export default function PostAuthScreening({
  currentStep = 1, // 1 | 2 | 3
  onStepComplete,  // (stepNumber, data) => void
  onStepBack,      // (stepNumber) => void
  onFinish,        // (selectedRole, data) => void
}) {
  // Step 1 state
  const [selectedRole, setSelectedRole] = useState(() => {
    return localStorage.getItem('planet_ui_role') || 'ANALYST';
  });

  // Step 2 state (Checkboxes)
  const [step2Selected, setStep2Selected] = useState(['spill-attribution', 'dark-vessels']);

  // Step 3 state (Checkboxes)
  const [step3Selected, setStep3Selected] = useState(['sar-imagery', 'ais-feeds']);

  // Checkbox toggle helpers
  const toggleStep2 = (id) => {
    setStep2Selected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleStep3 = (id) => {
    setStep3Selected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Handlers
  const handleNext = () => {
    if (currentStep === 1) {
      if (!selectedRole) return;
      localStorage.setItem('planet_ui_role', selectedRole);
      if (onStepComplete) onStepComplete(1, { role: selectedRole });
    } else if (currentStep === 2) {
      if (onStepComplete) onStepComplete(2, { focusAreas: step2Selected });
    } else if (currentStep === 3) {
      if (onFinish) onFinish(selectedRole, { feeds: step3Selected });
    }
  };

  const handleBack = () => {
    if (onStepBack) {
      onStepBack(currentStep);
    }
  };

  return (
    <div className="screening-page-wrapper">
      <div className="screening-content-center">
        
        {/* ── THREE SLIM RECTANGULAR NAVIGATION BARS AT TOP ── */}
        <div className="screening-step-nav" role="navigation" aria-label="Screening steps">
          {[1, 2, 3].map((stepNum) => {
            const isActive = currentStep === stepNum;
            const isCompleted = currentStep > stepNum;
            return (
              <div
                key={stepNum}
                className={`screening-slim-bar ${isActive ? 'screening-slim-bar--active' : ''} ${isCompleted ? 'screening-slim-bar--completed' : ''}`}
                aria-current={isActive ? 'step' : undefined}
              />
            );
          })}
        </div>

        {/* ── STEP 1: ROLE SELECTION ── */}
        {currentStep === 1 && (
          <div className="screening-step-body fade-in">
            <div className="screening-header">
              <h1 className="screening-title">Choose your role</h1>
              <p className="screening-subtitle">
                Select the role that best describes your access needs.
              </p>
            </div>

            <div className="screening-role-grid" role="radiogroup" aria-label="Role selection">
              {ROLES.map((role) => {
                const isSelected = selectedRole === role.id;
                return (
                  <button
                    key={role.id}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    className={`screening-role-card ${isSelected ? 'screening-role-card--selected' : ''}`}
                    onClick={() => setSelectedRole(role.id)}
                  >
                    {/* Tick Badge */}
                    <div className={`screening-card-tick ${isSelected ? 'screening-card-tick--active' : ''}`}>
                      {isSelected && (
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M2 6l3 3 5-5" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </div>

                    {/* Illustration */}
                    <div className="screening-role-illo">
                      <img
                        src={role.illustration}
                        alt={role.label}
                        className="screening-role-img"
                        draggable={false}
                      />
                    </div>

                    <div className="screening-role-info">
                      <h3 className="screening-role-label">{role.label}</h3>
                      <p className="screening-role-desc">{role.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="screening-nav-actions screening-nav-actions--single">
              <button
                type="button"
                className="screening-btn-primary"
                disabled={!selectedRole}
                onClick={handleNext}
              >
                <span>Continue</span>
                <span className="btn-arrow">→</span>
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 2: PRIMARY FOCUS AREA ── */}
        {currentStep === 2 && (
          <div className="screening-step-body fade-in">
            <div className="screening-header">
              <h1 className="screening-title">What is your primary focus?</h1>
              <p className="screening-subtitle">
                Select all maritime operations that apply to your workflow.
              </p>
            </div>

            <div className="screening-checkbox-list" role="group" aria-label="Primary focus areas">
              {STEP2_OPTIONS.map((option) => {
                const isChecked = step2Selected.includes(option.id);
                return (
                  <div
                    key={option.id}
                    className={`screening-checkbox-row ${isChecked ? 'screening-checkbox-row--checked' : ''}`}
                    onClick={() => toggleStep2(option.id)}
                  >
                    <div className="screening-custom-checkbox">
                      {isChecked && (
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M2 6l3 3 5-5" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </div>
                    <div className="screening-option-text">
                      <h4 className="screening-option-title">{option.title}</h4>
                      <p className="screening-option-desc">{option.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="screening-nav-actions">
              <button
                type="button"
                className="screening-btn-back"
                onClick={handleBack}
              >
                <span className="btn-arrow">←</span>
                <span>Back</span>
              </button>

              <button
                type="button"
                className="screening-btn-primary"
                onClick={handleNext}
              >
                <span>Continue</span>
                <span className="btn-arrow">→</span>
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 3: INTELLIGENCE FEEDS ── */}
        {currentStep === 3 && (
          <div className="screening-step-body fade-in">
            <div className="screening-header">
              <h1 className="screening-title">Select your intelligence feeds</h1>
              <p className="screening-subtitle">
                Choose the data streams required in your analysis workspace.
              </p>
            </div>

            <div className="screening-checkbox-list" role="group" aria-label="Intelligence feeds">
              {STEP3_OPTIONS.map((option) => {
                const isChecked = step3Selected.includes(option.id);
                return (
                  <div
                    key={option.id}
                    className={`screening-checkbox-row ${isChecked ? 'screening-checkbox-row--checked' : ''}`}
                    onClick={() => toggleStep3(option.id)}
                  >
                    <div className="screening-custom-checkbox">
                      {isChecked && (
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M2 6l3 3 5-5" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </div>
                    <div className="screening-option-text">
                      <h4 className="screening-option-title">{option.title}</h4>
                      <p className="screening-option-desc">{option.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="screening-nav-actions">
              <button
                type="button"
                className="screening-btn-back"
                onClick={handleBack}
              >
                <span className="btn-arrow">←</span>
                <span>Back</span>
              </button>

              <button
                type="button"
                className="screening-btn-primary"
                onClick={handleNext}
              >
                <span>Complete Setup</span>
                <span className="btn-arrow">→</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
