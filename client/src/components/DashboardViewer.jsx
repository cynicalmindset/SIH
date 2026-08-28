import React from 'react';

/**
 * DashboardViewer — placeholder
 * Full implementation to be built in a separate task.
 * Role: VIEWER
 */
export default function DashboardViewer({ onNavigate }) {
  const user = (() => {
    try { return JSON.parse(localStorage.getItem('planet_user') || '{}'); }
    catch { return {}; }
  })();

  const handleSignOut = () => {
    localStorage.removeItem('planet_token');
    localStorage.removeItem('planet_user');
    if (onNavigate) onNavigate('home');
  };

  return (
    <div className="dashboard-placeholder">
      <div className="dashboard-placeholder-inner">
        <img src="/planetlogo.png" alt="Planet" className="dashboard-placeholder-logo" />
        <div className="dashboard-placeholder-badge dashboard-placeholder-badge--viewer">VIEWER</div>
        <h1 className="dashboard-placeholder-heading">Viewer Dashboard</h1>
        <p className="dashboard-placeholder-sub">
          Welcome{user.name ? `, ${user.name}` : ''}. The Viewer dashboard is under active development.
        </p>
        <div className="dashboard-placeholder-meta">
          <span>{user.email}</span>
          <span className="dashboard-placeholder-dot" aria-hidden="true">·</span>
          <span>{user.role}</span>
        </div>
        <button className="dashboard-placeholder-signout" onClick={handleSignOut}>
          Sign out
        </button>
      </div>
    </div>
  );
}
