import React, { useState } from 'react';

/**
 * AuthPage
 * ─────────
 * Two-panel layout mirroring the reference:
 *   LEFT  → branded gradient card (Planet blue deep navy)
 *   RIGHT → clean dark sign-in form
 *
 * Backend-ready: form state + submit handler stubbed for POST /api/auth/login.
 * Role routing is done post-auth from backend response — never from the form.
 */
export default function AuthPage({ onNavigate }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // ── Form submission ────────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Invalid credentials. Please try again.');
        return;
      }

      // Store token; role comes from the backend — never from the UI
      localStorage.setItem('planet_token', data.token);
      localStorage.setItem('planet_user', JSON.stringify(data.user));

      // Navigate based on backend-provided role — role is authoritative from server
      const role = data.user?.role;
      const roleRoutes = {
        ADMIN:   'dashboard-admin',
        ANALYST: 'dashboard-analyst',
        VIEWER:  'dashboard-viewer',
      };
      const destination = roleRoutes[role];
      if (destination) {
        if (onNavigate) onNavigate(destination);
      } else {
        setError('Account role not recognised. Contact your administrator.');
      }
    } catch {
      setError('Unable to reach the server. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    // Placeholder — wire to OAuth flow when implemented
    setError('Google sign-in is not yet configured for this deployment.');
  };

  return (
    <div className="auth-page">
      {/* ── LEFT PANEL — Branded gradient card ── */}
      <div className="auth-brand-panel">
        {/* Noise texture overlay */}
        <div className="auth-brand-noise" aria-hidden="true" />

        {/* Radial orbs that create the depth gradient effect */}
        <div className="auth-brand-orb auth-brand-orb--1" aria-hidden="true" />
        <div className="auth-brand-orb auth-brand-orb--2" aria-hidden="true" />
        <div className="auth-brand-orb auth-brand-orb--3" aria-hidden="true" />

        {/* Brand identity — bottom of card, matching reference */}
        <div className="auth-brand-identity">
          <img
            src="/planetlogo.png"
            alt="Planet"
            className="auth-brand-logo"
          />
          <span className="auth-brand-name">Planet</span>
          <span className="auth-brand-tagline">Maritime Intelligence Platform</span>
        </div>
      </div>

      {/* ── RIGHT PANEL — Sign-in form ── */}
      <div className="auth-form-panel">
        <div className="auth-form-inner">

          {/* Heading */}
          <div className="auth-heading-block">
            <h1 className="auth-heading">Welcome to Planet</h1>
            <p className="auth-subheading">
              Sign in to continue to your maritime intelligence workspace.
            </p>
          </div>

          {/* Google SSO */}
          <button
            type="button"
            className="auth-sso-btn"
            onClick={handleGoogleSignIn}
            aria-label="Continue with Google"
          >
            {/* Google 'G' icon */}
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
              <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
              <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
              <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>

          {/* Divider */}
          <div className="auth-divider" aria-hidden="true">
            <span className="auth-divider-line" />
            <span className="auth-divider-text">or</span>
            <span className="auth-divider-line" />
          </div>

          {/* Error message */}
          {error && (
            <div className="auth-error" role="alert">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M8 5v3M8 10.5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              {error}
            </div>
          )}

          {/* Credential form */}
          <form className="auth-form" onSubmit={handleSubmit} noValidate>

            {/* Email field */}
            <div className="auth-field">
              <label className="auth-field-label" htmlFor="auth-email">
                Email address
              </label>
              <input
                id="auth-email"
                type="email"
                className="auth-field-input"
                placeholder="you@maritime.org"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
                disabled={loading}
              />
            </div>

            {/* Password field */}
            <div className="auth-field">
              <div className="auth-field-label-row">
                <label className="auth-field-label" htmlFor="auth-password">
                  Password
                </label>
                <button
                  type="button"
                  className="auth-forgot-link"
                  onClick={() => setError('Password reset is not yet enabled for this deployment.')}
                  aria-label="Forgot password"
                >
                  Forgot password?
                </button>
              </div>
              <div className="auth-password-wrapper">
                <input
                  id="auth-password"
                  type={showPassword ? 'text' : 'password'}
                  className="auth-field-input auth-field-input--password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                  disabled={loading}
                />
                <button
                  type="button"
                  className="auth-password-toggle"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  tabIndex={-1}
                >
                  {showPassword ? (
                    // Eye-off
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  ) : (
                    // Eye
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Submit CTA */}
            <button
              type="submit"
              className="auth-submit-btn"
              disabled={loading || !email || !password}
            >
              {loading ? (
                <span className="auth-submit-spinner" aria-hidden="true" />
              ) : null}
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>

          {/* Bottom link */}
          <p className="auth-bottom-link">
            Don't have an account?{' '}
            <button
              type="button"
              className="auth-bottom-link-btn"
              onClick={() => setError('Account provisioning is managed by your administrator. Contact them to request access.')}
            >
              Create account
            </button>
          </p>

        </div>
      </div>
    </div>
  );
}
