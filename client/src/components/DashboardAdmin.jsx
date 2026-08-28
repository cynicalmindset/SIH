import React from 'react';
import PlanetDashboard from './PlanetDashboard';

/**
 * DashboardAdmin
 * ──────────────
 * Admin Operational Workspace for Planet Maritime Intelligence.
 */
export default function DashboardAdmin({ onNavigate }) {
  return <PlanetDashboard userRole="ADMIN" onNavigate={onNavigate} />;
}
