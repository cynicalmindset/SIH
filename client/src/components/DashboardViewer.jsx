import React from 'react';
import PlanetDashboard from './PlanetDashboard';

/**
 * DashboardViewer
 * ───────────────
 * Viewer Operational Workspace for Planet Maritime Intelligence.
 */
export default function DashboardViewer({ onNavigate }) {
  return <PlanetDashboard userRole="VIEWER" onNavigate={onNavigate} />;
}
