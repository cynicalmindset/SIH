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
import ContactPage from './components/ContactPage';
import AuthPage from './components/AuthPage';
import DashboardAdmin from './components/DashboardAdmin';
import DashboardAnalyst from './components/DashboardAnalyst';
import DashboardViewer from './components/DashboardViewer';
import DocViewer from './components/DocViewer';
import { authService } from './services/authService';

// All valid hash views recognized by this router
const VIEWS = [
  'home',
  'platform',
  'intelligence',
  'insights',
  'contact',
  'auth',
  'dashboard-admin',
  'dashboard-analyst',
  'dashboard-viewer',
];

function hashToView(hash) {
  const h = hash.replace('#', '');
  if (!h) return 'home';
  if (h.startsWith('doc-')) return h;
  if (VIEWS.includes(h)) return h;
  // If hash is an unknown section anchor or sub-link, return null to preserve current view
  return null;
}

export default function App() {
  const [currentView, setCurrentView] = useState(() =>
    hashToView(window.location.hash) || 'home'
  );

  // Authenticated state check
  const [isAuthenticated, setIsAuthenticated] = useState(() => authService.isAuthenticated());

  useEffect(() => {
    // Validate session on mount
    authService.validateSession().then((valid) => {
      setIsAuthenticated(valid);
    });

    const handleHashChange = () => {
      const view = hashToView(window.location.hash);
      if (view === null) {
        // Preserve current view for section anchors or in-page scrolling
        return;
      }

      const isAuth = authService.isAuthenticated();
      setIsAuthenticated(isAuth);

      // Guard: If authenticated and trying to visit #auth, redirect to role dashboard
      if (view === 'auth' && isAuth) {
        const role = authService.getUserRole();
        const targetDashboard =
          role === 'ADMIN'
            ? 'dashboard-admin'
            : role === 'VIEWER'
            ? 'dashboard-viewer'
            : 'dashboard-analyst';
        setCurrentView(targetDashboard);
        window.location.hash = targetDashboard;
        return;
      }

      // Guard: If visiting dashboard routes without authentication, redirect to #auth
      if (view.startsWith('dashboard-') && !isAuth) {
        setCurrentView('auth');
        window.location.hash = 'auth';
        return;
      }

      setCurrentView(view);
      window.scrollTo(0, 0);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (view) => {
    const isAuth = authService.isAuthenticated();
    setIsAuthenticated(isAuth);

    // Guard: Prevent going backward to login if already authenticated
    if (view === 'auth' && isAuth) {
      const role = authService.getUserRole();
      const targetDashboard =
        role === 'ADMIN'
          ? 'dashboard-admin'
          : role === 'VIEWER'
          ? 'dashboard-viewer'
          : 'dashboard-analyst';
      setCurrentView(targetDashboard);
      window.location.hash = targetDashboard;
      window.scrollTo(0, 0);
      return;
    }

    setCurrentView(view);
    window.location.hash = view === 'home' ? '' : view;
    window.scrollTo(0, 0);
  };

  // ── Auth ──────────────────────────────────────────────────────────────────
  if (currentView === 'auth') {
    // If authenticated, do not show login; render role dashboard directly
    if (isAuthenticated) {
      const role = authService.getUserRole();
      if (role === 'ADMIN') return <DashboardAdmin onNavigate={handleNavigate} />;
      if (role === 'VIEWER') return <DashboardViewer onNavigate={handleNavigate} />;
      return <DashboardAnalyst onNavigate={handleNavigate} />;
    }
    return <AuthPage onNavigate={handleNavigate} />;
  }

  // ── Dashboard routes ──────────────────────────────────────────────────────
  if (currentView === 'dashboard-admin') {
    return <DashboardAdmin onNavigate={handleNavigate} />;
  }

  if (currentView === 'dashboard-analyst') {
    return <DashboardAnalyst onNavigate={handleNavigate} />;
  }

  if (currentView === 'dashboard-viewer') {
    return <DashboardViewer onNavigate={handleNavigate} />;
  }

  // ── Documentation routes ──────────────────────────────────────────────────
  if (currentView.startsWith('doc-')) {
    const slug = currentView.replace('doc-', '');
    return <DocViewer docSlug={slug} onNavigate={handleNavigate} />;
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

  if (currentView === 'contact') {
    return <ContactPage onNavigate={handleNavigate} />;
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
      <QnaSection onNavigate={handleNavigate} />
      <CtaSection />
      <Footer onNavigate={handleNavigate} />
    </main>
  );
}
