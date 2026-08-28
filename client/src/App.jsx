import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import CapabilitiesSection from './components/CapabilitiesSection';
import Section3 from './components/Section3';
import ImpactSection from './components/ImpactSection';
import EditorialTypographySection from './components/EditorialTypographySection';
import FeaturePanelSection from './components/FeaturePanelSection';
import QnaSection from './components/QnaSection';
import CtaSection from './components/CtaSection';
import Footer from './components/Footer';
import PlatformPage from './components/PlatformPage';
import IntelligencePage from './components/IntelligencePage';
import InsightsPage from './components/InsightsPage';
import AuthPage from './components/AuthPage';
import UnderDevelopment from './components/UnderDevelopment';

// ─── Dashboard components (preserved, pending full implementation) ───────────
// Reconnect these by replacing <UnderDevelopment /> below with the relevant
// component once the workspace is ready to ship.
// import DashboardAdmin   from './components/DashboardAdmin';
// import DashboardAnalyst from './components/DashboardAnalyst';
// import DashboardViewer  from './components/DashboardViewer';
// ────────────────────────────────────────────────────────────────────────────

// All valid hash views recognised by this router
const VIEWS = [
  'home',
  'platform',
  'intelligence',
  'insights',
  'auth',
  'dashboard-admin',
  'dashboard-analyst',
  'dashboard-viewer',
];

function hashToView(hash) {
  const h = hash.replace('#', '');
  return VIEWS.includes(h) ? h : 'home';
}

export default function App() {
  const [currentView, setCurrentView] = useState(() =>
    hashToView(window.location.hash)
  );

  useEffect(() => {
    const handleHashChange = () => {
      const view = hashToView(window.location.hash);
      setCurrentView(view);
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (view) => {
    setCurrentView(view);
    window.location.hash = view === 'home' ? '' : view;
    window.scrollTo(0, 0);
  };

  // ── Auth ──────────────────────────────────────────────────────────────────
  if (currentView === 'auth') {
    return <AuthPage onNavigate={handleNavigate} />;
  }

  // ── Dashboard routes — temporarily showing UnderDevelopment ───────────────
  // TODO: Replace <UnderDevelopment /> with the role-specific component
  //       (DashboardAdmin / DashboardAnalyst / DashboardViewer) once the
  //       workspace implementation is complete.
  if (currentView === 'dashboard-admin') {
    return <UnderDevelopment onNavigate={handleNavigate} />;   // was: <DashboardAdmin />
  }

  if (currentView === 'dashboard-analyst') {
    return <UnderDevelopment onNavigate={handleNavigate} />;   // was: <DashboardAnalyst />
  }

  if (currentView === 'dashboard-viewer') {
    return <UnderDevelopment onNavigate={handleNavigate} />;   // was: <DashboardViewer />
  }

  // ── Marketing pages ───────────────────────────────────────────────────────
  if (currentView === 'platform') {
    return <PlatformPage onNavigate={handleNavigate} />;
  }

  if (currentView === 'intelligence') {
    return <IntelligencePage onNavigate={handleNavigate} />;
  }

  if (currentView === 'insights') {
    return <InsightsPage onNavigate={handleNavigate} />;
  }

  // ── Homepage (default) ────────────────────────────────────────────────────
  return (
    <main>
      <Hero currentView={currentView} onNavigate={handleNavigate} />
      <CapabilitiesSection />
      <Section3 />
      <ImpactSection />
      <EditorialTypographySection />
      <FeaturePanelSection />
      <QnaSection />
      <CtaSection />
      <Footer onNavigate={handleNavigate} />
    </main>
  );
}
