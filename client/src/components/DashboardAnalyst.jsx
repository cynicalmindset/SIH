import React from 'react';
import PlanetDashboard from './PlanetDashboard';

/**
 * DashboardAnalyst
 * ────────────────
 * Analyst Operational Workspace for Planet Maritime Intelligence.
 */
export default function DashboardAnalyst({ onNavigate }) {
  return <PlanetDashboard userRole="ANALYST" onNavigate={onNavigate} />;
}
