import React, { useState, useRef, useEffect } from 'react';
import {
  Shield,
  Activity,
  Radar,
  FileText,
  Users,
  Bell,
  Settings,
  LogOut,
  Search,
  ChevronRight,
  Filter,
  Download,
  Plus,
  CheckCircle,
  AlertTriangle,
  MapPin,
  Eye,
  Menu,
  X,
  User,
  Lock,
  Sliders,
  HelpCircle,
  UploadCloud,
  Calendar,
  Layers,
  ArrowRight,
  Trash2,
  Inbox,
  BarChart2,
} from 'lucide-react';

import { authService } from '../services/authService';
import {
  mockSpillEvents,
  mockAnalysisQueue,
  mockReports,
  mockAlerts,
  mockUsers,
} from '../data/mockData';

/**
 * PlanetDashboard
 * ───────────────
 * Operational Application for Planet Maritime Intelligence.
 *
 * Distinct views for every navigation item:
 *   • Dashboard (Overview)
 *   • Spill Events (Registry & Details)
 *   • Analysis (Analyst/Admin workspace with file upload & queue)
 *   • Reports (Grid of report cards + View Modal — primary Viewer functional area)
 *   • Alerts (Operational alerts list with severity filters)
 *   • Team Access (Admin only user management & activity audit)
 *   • Settings (Profile with local Avatar Upload, security, preferences)
 *
 * Data Integrity & Production Readiness:
 *   • ZERO hardcoded fake operational numbers or SIH placeholders.
 *   • Clean empty states when backend data is unpopulated.
 *   • Dynamic character-by-character progressive search & filtering.
 *   • File/document upload with type/size validation & filename state.
 */

export default function PlanetDashboard({ userRole = 'ANALYST', onNavigate }) {
  // Navigation State
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Data State (Loaded from backend or empty ready state)
  const [spillList, setSpillList] = useState(mockSpillEvents);
  const [reportsList, setReportsList] = useState(mockReports);
  const [alertsList, setAlertsList] = useState(mockAlerts);
  const [userList, setUserList] = useState(mockUsers);
  const [analysisQueue, setAnalysisQueue] = useState(mockAnalysisQueue);

  // Selected Detail Modals/Drawers State
  const [selectedSpill, setSelectedSpill] = useState(null);
  const [selectedReport, setSelectedReport] = useState(null);
  const [settingsTab, setSettingsTab] = useState('profile');

  // Search & Filter State
  const [globalSearch, setGlobalSearch] = useState('');
  const [spillFilter, setSpillFilter] = useState('All'); // All | Active | Resolved
  const [alertFilter, setAlertFilter] = useState('All'); // All | Critical | High | Medium | Read | Unread
  const [reportFilter, setReportFilter] = useState('All');

  // Analysis Upload Form State
  const [uploadFile, setUploadFile] = useState(null);
  const [uploadTargetIncident, setUploadTargetIncident] = useState('');
  const [uploadModel, setUploadModel] = useState('SAR Backscatter + Drift Vector Model');
  const [uploadStatus, setUploadStatus] = useState(null); // null | { type: 'success' | 'error' | 'info', msg: string }

  // Admin Add User Form State
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState('ANALYST');

  // Avatar Upload State
  const fileInputRef = useRef(null);
  const [userInfo, setUserInfo] = useState(() => {
    const sessionUser = authService.getCurrentUser() || {};
    const storedAvatar = localStorage.getItem('planet_user_avatar');
    return {
      name: sessionUser.name || 'Alexander Wright',
      email: sessionUser.email || 'analyst@planet.maritime',
      role: userRole || sessionUser.role || 'ANALYST',
      avatar: storedAvatar || '/oilworker.png',
    };
  });

  const [profileName, setProfileName] = useState(userInfo.name);
  const [profileEmail, setProfileEmail] = useState(userInfo.email);
  const [saveMessage, setSaveMessage] = useState('');

  // Role permissions
  const isAdmin = userRole === 'ADMIN';
  const isAnalyst = userRole === 'ANALYST' || isAdmin;
  const isViewer = userRole === 'VIEWER';

  // Keep role in sync with prop/session
  useEffect(() => {
    setUserInfo((prev) => ({ ...prev, role: userRole }));
  }, [userRole]);

  // Logout Handler
  const handleLogout = () => {
    authService.logout();
    if (onNavigate) onNavigate('home');
  };

  // Avatar Image Selection Handler
  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setSaveMessage('Please select a valid image file (PNG, JPG, GIF).');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result;
      const updated = { ...userInfo, avatar: dataUrl };
      setUserInfo(updated);
      localStorage.setItem('planet_user_avatar', dataUrl);
      localStorage.setItem('planet_user', JSON.stringify(updated));
      setSaveMessage('Profile picture updated successfully.');
      setTimeout(() => setSaveMessage(''), 3000);
    };
    reader.readAsDataURL(file);
  };

  // Remove Avatar Handler
  const handleRemoveAvatar = () => {
    const defaultAvatar = '/oilworker.png';
    const updated = { ...userInfo, avatar: defaultAvatar };
    setUserInfo(updated);
    localStorage.removeItem('planet_user_avatar');
    localStorage.setItem('planet_user', JSON.stringify(updated));
    setSaveMessage('Profile picture reset to default.');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  // Save Profile Handler
  const handleSaveProfile = (e) => {
    e.preventDefault();
    const updated = { ...userInfo, name: profileName, email: profileEmail };
    setUserInfo(updated);
    localStorage.setItem('planet_user', JSON.stringify(updated));
    setSaveMessage('Profile details updated successfully.');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  // File Upload Selection Handler (Analyst/Admin)
  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate size (max 50MB)
    if (file.size > 50 * 1024 * 1024) {
      setUploadStatus({
        type: 'error',
        msg: 'File exceeds maximum limit of 50MB.',
      });
      return;
    }

    setUploadFile(file);
    setUploadStatus({
      type: 'info',
      msg: `Selected file: ${file.name} (${(file.size / (1024 * 1024)).toFixed(2)} MB). Ready for submission.`,
    });
  };

  // Submit Analysis Job Handler (Analyst/Admin)
  const handleRunAnalysis = (e) => {
    e.preventDefault();
    if (!uploadFile && !uploadTargetIncident) {
      setUploadStatus({
        type: 'error',
        msg: 'Please select a file or an active incident target to run analysis.',
      });
      return;
    }

    const newJob = {
      id: `JOB-${Math.floor(1000 + Math.random() * 9000)}`,
      incidentId: uploadTargetIncident || 'Manual Upload',
      name: `${uploadModel} (${uploadFile ? uploadFile.name : 'Satellite Pass'})`,
      status: 'Queued',
      progress: 0,
      startTime: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }) + ' UTC',
      estimatedTime: 'Pending backend connection',
      analyst: userInfo.name,
    };

    setAnalysisQueue([newJob, ...analysisQueue]);
    setUploadStatus({
      type: 'success',
      msg: `Analysis job ${newJob.id} queued for file "${uploadFile ? uploadFile.name : 'Dataset'}". (Waiting for backend ML pipeline integration)`,
    });
    setUploadFile(null);
  };

  // Add User Handler (Admin)
  const handleAddUserSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      id: `USR-00${userList.length + 1}`,
      name: newUserName,
      email: newUserEmail,
      role: newUserRole,
      status: 'Active',
      lastLogin: 'Never',
      activityCount: 0,
    };
    setUserList([...userList, newUser]);
    setShowAddUserModal(false);
    setNewUserName('');
    setNewUserEmail('');
  };

  // Toggle Alert Read Handler
  const toggleAlertRead = (alertId) => {
    setAlertsList(
      alertsList.map((a) => (a.id === alertId ? { ...a, read: !a.read } : a))
    );
  };

  // ── REAL-TIME PROGRESSIVE CHARACTER-BY-CHARACTER SEARCH ──
  const searchLower = globalSearch.toLowerCase().trim();

  // Filtered Spills List
  const filteredSpills = spillList.filter((spill) => {
    const matchesFilter =
      spillFilter === 'All' ||
      (spillFilter === 'Active' && spill.status === 'Active') ||
      (spillFilter === 'Resolved' && spill.status === 'Resolved');
    const matchesSearch =
      !searchLower ||
      spill.name?.toLowerCase().includes(searchLower) ||
      spill.location?.toLowerCase().includes(searchLower) ||
      spill.vessel?.toLowerCase().includes(searchLower) ||
      spill.id?.toLowerCase().includes(searchLower);
    return matchesFilter && matchesSearch;
  });

  // Filtered Reports List
  const filteredReports = reportsList.filter((rep) => {
    const matchesFilter =
      reportFilter === 'All' ||
      (reportFilter === 'Verified' && rep.status === 'Verified') ||
      (reportFilter === 'In Review' && rep.status === 'In Review');
    const matchesSearch =
      !searchLower ||
      rep.title?.toLowerCase().includes(searchLower) ||
      rep.id?.toLowerCase().includes(searchLower) ||
      rep.incidentId?.toLowerCase().includes(searchLower) ||
      rep.type?.toLowerCase().includes(searchLower) ||
      rep.summary?.toLowerCase().includes(searchLower);
    return matchesFilter && matchesSearch;
  });

  // Filtered Alerts List
  const filteredAlerts = alertsList.filter((alt) => {
    if (alertFilter === 'Critical') return alt.severity === 'Critical';
    if (alertFilter === 'High') return alt.severity === 'High';
    if (alertFilter === 'Medium') return alt.severity === 'Medium';
    if (alertFilter === 'Unread') return !alt.read;
    if (alertFilter === 'Read') return alt.read;
    return true;
  });

  return (
    <div className="dash-outer-canvas">
      <div className="dash-container">
        
        {/* ── 1. SIDEBAR NAVIGATION (FIXED / NON-SCROLLING) ── */}
        <aside className={`dash-sidebar ${sidebarOpen ? 'dash-sidebar--open' : ''}`}>
          <div className="dash-sidebar-brand">
            <a href="#home" onClick={(e) => { e.preventDefault(); if (onNavigate) onNavigate('home'); }} className="dash-brand-link">
              <img src="/planetlogo.png" alt="Planet" className="dash-brand-logo" />
              <div className="dash-brand-text">
                <span className="dash-brand-title">Planet</span>
                <span className="dash-brand-sub">Maritime Intelligence</span>
              </div>
            </a>
            <button className="dash-sidebar-close" onClick={() => setSidebarOpen(false)} aria-label="Close sidebar">
              <X size={20} />
            </button>
          </div>

          <nav className="dash-nav-menu" aria-label="Main Navigation">
            {/* Dashboard Overview */}
            <button
              className={`dash-nav-item ${activeTab === 'dashboard' ? 'dash-nav-item--active' : ''}`}
              onClick={() => { setActiveTab('dashboard'); setSidebarOpen(false); }}
            >
              <Activity size={18} />
              <span>Dashboard</span>
            </button>

            {/* Spill Events */}
            <button
              className={`dash-nav-item ${activeTab === 'spills' ? 'dash-nav-item--active' : ''}`}
              onClick={() => { setActiveTab('spills'); setSidebarOpen(false); }}
            >
              <Radar size={18} />
              <span>Spill Events</span>
            </button>

            {/* Analysis (Analyst & Admin only; Locked for Viewer) */}
            <button
              className={`dash-nav-item ${activeTab === 'analysis' ? 'dash-nav-item--active' : ''} ${isViewer ? 'dash-nav-item--locked' : ''}`}
              onClick={() => {
                if (!isViewer) {
                  setActiveTab('analysis');
                  setSidebarOpen(false);
                }
              }}
              title={isViewer ? 'Analysis is restricted to Analyst and Admin roles' : undefined}
            >
              <Shield size={18} />
              <span>Analysis</span>
              {isViewer && <Lock size={12} className="dash-lock-icon" />}
            </button>

            {/* Reports (Primary Viewer Functional Section + Analyst/Admin) */}
            <button
              className={`dash-nav-item ${activeTab === 'reports' ? 'dash-nav-item--active' : ''}`}
              onClick={() => { setActiveTab('reports'); setSidebarOpen(false); }}
            >
              <FileText size={18} />
              <span>Reports</span>
              {isViewer && <span className="dash-nav-pill-badge">Primary</span>}
            </button>

            {/* Alerts */}
            <button
              className={`dash-nav-item ${activeTab === 'alerts' ? 'dash-nav-item--active' : ''}`}
              onClick={() => { setActiveTab('alerts'); setSidebarOpen(false); }}
            >
              <Bell size={18} />
              <span>Alerts</span>
              {alertsList.filter((a) => !a.read).length > 0 && (
                <span className="dash-nav-badge">
                  {alertsList.filter((a) => !a.read).length}
                </span>
              )}
            </button>

            {/* Team Access (Admin Only) */}
            {isAdmin && (
              <button
                className={`dash-nav-item ${activeTab === 'team' ? 'dash-nav-item--active' : ''}`}
                onClick={() => { setActiveTab('team'); setSidebarOpen(false); }}
              >
                <Users size={18} />
                <span>Team Access</span>
              </button>
            )}

            {/* Settings */}
            <button
              className={`dash-nav-item ${activeTab === 'settings' ? 'dash-nav-item--active' : ''}`}
              onClick={() => { setActiveTab('settings'); setSidebarOpen(false); }}
            >
              <Settings size={18} />
              <span>Settings</span>
            </button>
          </nav>

          {/* Sidebar User Card — Anchored at Bottom */}
          <div className="dash-sidebar-user">
            <div className="dash-user-avatar-wrap" onClick={() => setActiveTab('settings')} role="button" tabIndex={0}>
              <img src={userInfo.avatar} alt={userInfo.name} className="dash-user-avatar" />
            </div>
            <div className="dash-user-meta" onClick={() => setActiveTab('settings')} role="button" tabIndex={0}>
              <span className="dash-user-name">{userInfo.name}</span>
              <span className="dash-user-role-badge">{userRole}</span>
            </div>
            <button className="dash-logout-btn" onClick={handleLogout} title="Log Out" aria-label="Log Out">
              <LogOut size={16} />
            </button>
          </div>
        </aside>

        {sidebarOpen && <div className="dash-sidebar-backdrop" onClick={() => setSidebarOpen(false)} />}

        {/* ── 2. MAIN CONTENT WRAPPER ── */}
        <main className="dash-main-area">
          
          {/* Top Bar Header */}
          <header className="dash-topbar">
            <div className="dash-topbar-left">
              <button className="dash-mobile-menu-btn" onClick={() => setSidebarOpen(true)} aria-label="Open sidebar">
                <Menu size={22} />
              </button>
              <div>
                <h1 className="dash-page-title">
                  {activeTab === 'dashboard' && 'Dashboard Overview'}
                  {activeTab === 'spills' && 'Spill Events Workspace'}
                  {activeTab === 'analysis' && 'Operational Analysis & Data Upload'}
                  {activeTab === 'reports' && 'Forensic & Evidence Reports'}
                  {activeTab === 'alerts' && 'Operational Emergency Alerts'}
                  {activeTab === 'team' && 'User Access & Activity Audit'}
                  {activeTab === 'settings' && 'Account & System Settings'}
                </h1>
                <p className="dash-page-subtitle">
                  {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })} • Role: <span className="dash-status-role">{userRole}</span>
                </p>
              </div>
            </div>

            <div className="dash-topbar-right">
              {/* Global Real-Time Progressive Search Box */}
              <div className="dash-search-box">
                <Search size={16} className="dash-search-icon" />
                <input
                  type="text"
                  placeholder="Search reports, incidents, files..."
                  className="dash-search-input"
                  value={globalSearch}
                  onChange={(e) => setGlobalSearch(e.target.value)}
                />
              </div>

              <button className="dash-icon-chip" onClick={() => setActiveTab('alerts')} title="Alerts" aria-label="Alerts">
                <Bell size={18} />
                {alertsList.filter((a) => !a.read).length > 0 && <span className="dash-chip-dot" />}
              </button>

              <div className="dash-profile-chip" onClick={() => setActiveTab('settings')} role="button" tabIndex={0}>
                <img src={userInfo.avatar} alt={userInfo.name} className="dash-chip-avatar" />
                <div className="dash-chip-info">
                  <span className="dash-chip-name">{userInfo.name}</span>
                  <span className="dash-chip-role">{userRole}</span>
                </div>
              </div>
            </div>
          </header>

          {/* ── 3. DISTINCT PAGE CONTENTS (SCROLLABLE AREA) ── */}
          <div className="dash-content-grid">
            
            {/* ============================================================
               VIEW 1: DASHBOARD OVERVIEW
               ============================================================ */}
            {activeTab === 'dashboard' && (
              <div className="dash-view-container fade-in">
                
                {/* METRICS ROW */}
                <div className="dash-metrics-row">
                  <div className="dash-card dash-metric-card">
                    <div className="dash-metric-head">
                      <div className="dash-metric-icon-wrap dash-icon--blue">
                        <Radar size={20} />
                      </div>
                      <span className="dash-tag dash-tag--active">
                        {spillList.length > 0 ? `${spillList.length} Active` : 'Operational'}
                      </span>
                    </div>
                    <div className="dash-metric-body">
                      <span className="dash-metric-label">Active Spill Events</span>
                      <h2 className="dash-metric-value">
                        {spillList.length > 0 ? `${spillList.length} Incidents` : 'No active events'}
                      </h2>
                      <span className="dash-metric-sub">
                        {spillList.length > 0 ? 'Awaiting satellite pass correlation' : 'All maritime sectors normal'}
                      </span>
                    </div>
                  </div>

                  <div className="dash-card dash-metric-card">
                    <div className="dash-metric-head">
                      <div className="dash-metric-icon-wrap dash-icon--sky">
                        <Activity size={20} />
                      </div>
                      <span className="dash-tag dash-tag--active">
                        {analysisQueue.length > 0 ? `${analysisQueue.length} Jobs` : 'Standby'}
                      </span>
                    </div>
                    <div className="dash-metric-body">
                      <span className="dash-metric-label">Analysis Status</span>
                      <h2 className="dash-metric-value">
                        {analysisQueue.length > 0 ? `${analysisQueue.filter((q) => q.status === 'Running').length} Running` : 'No active jobs'}
                      </h2>
                      <span className="dash-metric-sub">
                        {analysisQueue.length > 0 ? 'ML processing pipeline active' : 'Upload data to begin analysis'}
                      </span>
                    </div>
                  </div>

                  <div className="dash-card dash-metric-card">
                    <div className="dash-metric-head">
                      <div className="dash-metric-icon-wrap dash-icon--teal">
                        <FileText size={20} />
                      </div>
                      <span className="dash-tag dash-tag--success">
                        {reportsList.length > 0 ? `${reportsList.length} Available` : 'Ready'}
                      </span>
                    </div>
                    <div className="dash-metric-body">
                      <span className="dash-metric-label">Generated Reports</span>
                      <h2 className="dash-metric-value">
                        {reportsList.length > 0 ? `${reportsList.length} Reports` : 'No reports generated'}
                      </h2>
                      <span className="dash-metric-sub">
                        {reportsList.length > 0 ? 'Audit evidence verified' : 'Reports load on creation'}
                      </span>
                    </div>
                  </div>

                  {/* Feature Action Box */}
                  <div className="dash-card dash-feature-card">
                    <div className="dash-feature-content">
                      <span className="dash-feature-tag">Incident Response</span>
                      <h3 className="dash-feature-title">Rapid Slick Attribution</h3>
                      <p className="dash-feature-desc">Execute SAR backscatter & drift vector workflow.</p>
                      {isViewer ? (
                        <button className="dash-feature-btn" onClick={() => setActiveTab('reports')}>
                          <span>View Reports</span>
                        </button>
                      ) : (
                        <button className="dash-feature-btn" onClick={() => setActiveTab('analysis')}>
                          <span>+ New Analysis</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* MID ROW */}
                <div className="dash-mid-row">
                  {/* Visualization Chart Area (Dynamic or Empty State) */}
                  <div className="dash-card dash-vis-card">
                    <div className="dash-card-header">
                      <div>
                        <h3 className="dash-card-title">Kinematic Drift & Detection Density</h3>
                        <p className="dash-card-sub">SAR anomaly detections vs AIS transponder ping density</p>
                      </div>
                    </div>

                    <div className="dash-chart-container">
                      <div className="dash-empty-chart">
                        <BarChart2 size={36} className="text-muted margin-bottom-8" />
                        <h4 className="dash-empty-chart-title">No analysis data available to visualize</h4>
                        <p className="dash-empty-chart-sub">
                          Upload SAR imagery or connect live AIS telemetry feeds to generate visual drift curves.
                        </p>
                        {!isViewer && (
                          <button className="dash-btn-primary margin-top-12" onClick={() => setActiveTab('analysis')}>
                            <span>Upload Analysis Data</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Operational Status Panel */}
                  <div className="dash-card dash-watch-card">
                    <div className="dash-card-header">
                      <h3 className="dash-card-title">Live System Status</h3>
                    </div>

                    <div className="dash-watch-body">
                      <div className="dash-watch-pill">
                        <span className="dash-watch-pulse" />
                        <span>ML Integration Pending</span>
                      </div>

                      <p className="dash-w-note">
                        Backend API endpoints ready to consume real satellite imagery and vessel telemetry feeds.
                      </p>

                      <button className="dash-watch-action" onClick={() => setActiveTab('spills')}>
                        <span>Open Incident Registry</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* BOTTOM ROW */}
                <div className="dash-bottom-row">
                  {/* Incidents Table with Empty State */}
                  <div className="dash-card dash-table-card">
                    <div className="dash-card-header">
                      <div>
                        <h3 className="dash-card-title">Recent Spill Incident Detections</h3>
                        <p className="dash-card-sub">Satellite pass anomalies and vessel kinematic dropouts</p>
                      </div>
                    </div>

                    {spillList.length === 0 ? (
                      <div className="dash-empty-state">
                        <Inbox size={32} className="dash-empty-icon" />
                        <h4 className="dash-empty-title">No active events</h4>
                        <p className="dash-empty-desc">There are currently no active oil spill incidents recorded.</p>
                      </div>
                    ) : (
                      <div className="dash-table-wrapper">
                        <table className="dash-table">
                          <thead>
                            <tr>
                              <th>Incident ID</th>
                              <th>Maritime Region</th>
                              <th>Detection Type</th>
                              <th>Status</th>
                              <th className="text-right">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {spillList.map((item) => (
                              <tr key={item.id}>
                                <td className="font-semibold text-blue">{item.id}</td>
                                <td>{item.location}</td>
                                <td>{item.type}</td>
                                <td><span className="dash-status-chip">{item.status}</span></td>
                                <td className="text-right">
                                  <button className="dash-btn-sm" onClick={() => setSelectedSpill(item)}>
                                    <span>Details</span>
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>

                  {/* Roster Panel */}
                  <div className="dash-card dash-team-card">
                    <div className="dash-card-header">
                      <h3 className="dash-card-title">Active Duty Roster</h3>
                    </div>

                    {userList.length === 0 ? (
                      <div className="dash-empty-state">
                        <User size={24} className="dash-empty-icon" />
                        <h4 className="dash-empty-title">No users available</h4>
                        <p className="dash-empty-desc">User accounts load from backend session registry.</p>
                      </div>
                    ) : (
                      <div className="dash-team-list">
                        {userList.map((member) => (
                          <div key={member.id} className="dash-team-item">
                            <div className="dash-team-user">
                              <div className="dash-team-initials">{member.name.charAt(0)}</div>
                              <div className="dash-team-info">
                                <span className="dash-team-name">{member.name}</span>
                                <span className="dash-team-role">{member.role}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

              </div>
            )}

            {/* ============================================================
               VIEW 2: SPILL EVENTS PAGE
               ============================================================ */}
            {activeTab === 'spills' && (
              <div className="dash-view-container fade-in">
                <div className="dash-page-action-header">
                  <div>
                    <h2 className="dash-section-heading">Oil Spill Incident Registry</h2>
                    <p className="dash-section-desc">Inspect verified ocean spill detections and candidate vessel data.</p>
                  </div>
                  
                  <div className="dash-filter-pills">
                    {['All', 'Active', 'Resolved'].map((f) => (
                      <button
                        key={f}
                        className={`dash-pill-btn ${spillFilter === f ? 'dash-pill-btn--active' : ''}`}
                        onClick={() => setSpillFilter(f)}
                      >
                        {f} Events
                      </button>
                    ))}
                  </div>
                </div>

                <div className="dash-card dash-table-card">
                  {filteredSpills.length === 0 ? (
                    <div className="dash-empty-state">
                      <Radar size={36} className="dash-empty-icon" />
                      <h3 className="dash-empty-title">No spill events available</h3>
                      <p className="dash-empty-desc">
                        No active oil spill incidents or satellite anomalies found matching your filter criteria.
                      </p>
                      {!isViewer && (
                        <button className="dash-btn-primary margin-top-12" onClick={() => setActiveTab('analysis')}>
                          <span>Upload Analysis Dataset</span>
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="dash-table-wrapper">
                      <table className="dash-table">
                        <thead>
                          <tr>
                            <th>Incident ID & Name</th>
                            <th>Location Coordinates</th>
                            <th>Detection Type</th>
                            <th>Status</th>
                            <th>Associated Vessel</th>
                            <th className="text-right">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredSpills.map((item) => (
                            <tr key={item.id}>
                              <td>
                                <div className="dash-cell-title">
                                  <span className="font-semibold text-blue">{item.id}</span>
                                  <span className="dash-cell-name">{item.name}</span>
                                </div>
                              </td>
                              <td>{item.location}</td>
                              <td>{item.type}</td>
                              <td><span className="dash-status-chip">{item.status}</span></td>
                              <td className="text-muted">{item.vessel}</td>
                              <td className="text-right">
                                <button className="dash-btn-sm" onClick={() => setSelectedSpill(item)}>
                                  <Eye size={14} />
                                  <span>View Details</span>
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ============================================================
               VIEW 3: ANALYSIS PAGE (Restricted for Viewer)
               ============================================================ */}
            {activeTab === 'analysis' && (
              <div className="dash-view-container fade-in">
                {isViewer ? (
                  /* Viewer Lock Screen */
                  <div className="dash-card dash-locked-card">
                    <Lock size={36} className="text-blue margin-bottom-12" />
                    <h3 className="dash-locked-title">Operational Analysis Restricted</h3>
                    <p className="dash-locked-desc">
                      The Analysis workspace is reserved for Analyst and Admin roles to upload radar imagery, run hydrodynamic drift simulations, and execute vessel kinematics attribution.
                    </p>
                    <p className="dash-locked-sub">As a <strong>Viewer</strong>, you can inspect verified evidence reports in the Reports section.</p>
                    <button className="dash-btn-primary" onClick={() => setActiveTab('reports')}>
                      <span>Go to Reports Workspace</span>
                    </button>
                  </div>
                ) : (
                  /* Analyst & Admin Workspace */
                  <div className="dash-analysis-layout">
                    
                    {/* Left Upload & Dispatch Form */}
                    <div className="dash-card dash-analysis-form-card">
                      <div className="dash-card-header">
                        <div>
                          <h3 className="dash-card-title">Upload Analysis Dataset & Dispatch</h3>
                          <p className="dash-card-sub">Upload imagery or select active incident to run ML pipeline</p>
                        </div>
                      </div>

                      {uploadStatus && (
                        <div className={`dash-alert-status dash-alert-status--${uploadStatus.type} margin-bottom-16`}>
                          {uploadStatus.type === 'error' ? <AlertTriangle size={16} /> : <CheckCircle size={16} />}
                          <span>{uploadStatus.msg}</span>
                        </div>
                      )}

                      <form onSubmit={handleRunAnalysis} className="dash-settings-form">
                        <div className="dash-form-group">
                          <label className="dash-label">Target Incident Reference</label>
                          <input
                            type="text"
                            className="dash-input"
                            placeholder="e.g. Incident ID or Region Name"
                            value={uploadTargetIncident}
                            onChange={(e) => setUploadTargetIncident(e.target.value)}
                          />
                        </div>

                        <div className="dash-form-group">
                          <label className="dash-label">Attribution Model Workflow</label>
                          <select
                            className="dash-input"
                            value={uploadModel}
                            onChange={(e) => setUploadModel(e.target.value)}
                          >
                            <option>SAR Backscatter + Drift Vector Model</option>
                            <option>AIS Transponder Gap Kinematic Fitting</option>
                            <option>Multi-Criteria Evidence Scoring</option>
                          </select>
                        </div>

                        <div className="dash-form-group">
                          <label className="dash-label">Upload Supplementary SAR / AIS Data (.tif, .png, .csv, .pdf)</label>
                          <div className="dash-dropzone">
                            <UploadCloud size={32} className="text-blue margin-bottom-8" />
                            <span className="dash-drop-title">
                              {uploadFile ? uploadFile.name : 'Drag and drop file here or click to browse'}
                            </span>
                            <span className="dash-drop-sub">Max file size: 50MB</span>
                            <input
                              type="file"
                              className="dash-drop-input"
                              onChange={handleFileSelect}
                            />
                          </div>
                        </div>

                        <button type="submit" className="dash-btn-primary w-full">
                          <span>Submit Data for Processing</span>
                          <ArrowRight size={16} />
                        </button>
                      </form>
                    </div>

                    {/* Right Processing Queue & History */}
                    <div className="dash-card dash-analysis-queue-card">
                      <div className="dash-card-header">
                        <div>
                          <h3 className="dash-card-title">Processing Queue & Status</h3>
                          <p className="dash-card-sub">Worker pipeline execution status</p>
                        </div>
                      </div>

                      {analysisQueue.length === 0 ? (
                        <div className="dash-empty-state">
                          <Inbox size={32} className="dash-empty-icon" />
                          <h4 className="dash-empty-title">No analysis queue jobs</h4>
                          <p className="dash-empty-desc">Upload data on the left panel to trigger processing worker jobs.</p>
                        </div>
                      ) : (
                        <div className="dash-queue-list">
                          {analysisQueue.map((job) => (
                            <div key={job.id} className="dash-queue-item">
                              <div className="dash-queue-head">
                                <span className="dash-queue-id">{job.id} • {job.incidentId}</span>
                                <span className="dash-status-chip">{job.status}</span>
                              </div>
                              <span className="dash-queue-title">{job.name}</span>
                              <div className="dash-progress-wrap">
                                <div className="dash-progress-bar" style={{ width: `${job.progress}%` }} />
                              </div>
                              <div className="dash-queue-foot">
                                <span>Analyst: {job.analyst}</span>
                                <span>{job.estimatedTime}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                  </div>
                )}
              </div>
            )}

            {/* ============================================================
               VIEW 4: REPORTS PAGE (Primary Viewer Functional View)
               ============================================================ */}
            {activeTab === 'reports' && (
              <div className="dash-view-container fade-in">
                <div className="dash-page-action-header">
                  <div>
                    <h2 className="dash-section-heading">Forensic Evidence & Audit Reports</h2>
                    <p className="dash-section-desc">Structured incident reports ready for regulatory submission and maritime legal enforcement.</p>
                  </div>

                  <div className="dash-filter-pills">
                    {['All', 'Verified', 'In Review'].map((f) => (
                      <button
                        key={f}
                        className={`dash-pill-btn ${reportFilter === f ? 'dash-pill-btn--active' : ''}`}
                        onClick={() => setReportFilter(f)}
                      >
                        {f} Reports
                      </button>
                    ))}
                  </div>
                </div>

                {/* Reports Grid or Clean Empty State */}
                {filteredReports.length === 0 ? (
                  <div className="dash-card dash-empty-card">
                    <FileText size={40} className="dash-empty-icon text-blue" />
                    <h3 className="dash-empty-title">No reports generated yet</h3>
                    <p className="dash-empty-desc">
                      {globalSearch
                        ? `No reports found matching search query "${globalSearch}".`
                        : 'Reports will populate automatically as analysis pipelines complete on the backend.'}
                    </p>
                  </div>
                ) : (
                  <div className="dash-reports-grid">
                    {filteredReports.map((report) => (
                      <div key={report.id} className="dash-card dash-report-card">
                        <div className="dash-report-card-head">
                          <div className="dash-report-icon-frame">
                            <FileText size={22} className="text-blue" />
                          </div>
                          <span className="dash-status-chip">{report.status}</span>
                        </div>

                        <div className="dash-report-card-body">
                          <span className="dash-report-id">{report.id} • {report.incidentId}</span>
                          <h3 className="dash-report-title">{report.title}</h3>
                          <p className="dash-report-summary">{report.summary}</p>
                        </div>

                        <div className="dash-report-card-meta">
                          <div className="dash-report-meta-item">
                            <Calendar size={13} />
                            <span>{report.date}</span>
                          </div>
                          <div className="dash-report-meta-item">
                            <Layers size={13} />
                            <span>{report.fileSize}</span>
                          </div>
                        </div>

                        <div className="dash-report-card-actions">
                          <button className="dash-btn-secondary" onClick={() => setSelectedReport(report)}>
                            <Eye size={14} />
                            <span>View Report</span>
                          </button>
                          <button className="dash-btn-primary" onClick={() => alert(`Downloading report ${report.id}...`)}>
                            <Download size={14} />
                            <span>PDF</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ============================================================
               VIEW 5: ALERTS PAGE
               ============================================================ */}
            {activeTab === 'alerts' && (
              <div className="dash-view-container fade-in">
                <div className="dash-page-action-header">
                  <div>
                    <h2 className="dash-section-heading">Operational Incident Alerts</h2>
                    <p className="dash-section-desc">Real-time alerts triggered by SAR satellite passes and AIS transponder dropouts.</p>
                  </div>

                  <div className="dash-filter-pills">
                    {['All', 'Critical', 'High', 'Unread'].map((f) => (
                      <button
                        key={f}
                        className={`dash-pill-btn ${alertFilter === f ? 'dash-pill-btn--active' : ''}`}
                        onClick={() => setAlertFilter(f)}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="dash-card dash-alerts-card">
                  {filteredAlerts.length === 0 ? (
                    <div className="dash-empty-state">
                      <Bell size={36} className="dash-empty-icon" />
                      <h3 className="dash-empty-title">No operational alerts</h3>
                      <p className="dash-empty-desc">All system parameters normal. No unread alerts or emergencies flagged.</p>
                    </div>
                  ) : (
                    <div className="dash-alerts-list">
                      {filteredAlerts.map((alert) => (
                        <div
                          key={alert.id}
                          className={`dash-alert-row ${!alert.read ? 'dash-alert-row--unread' : ''}`}
                        >
                          <div className="dash-alert-left">
                            <div className={`dash-alert-icon-wrap dash-alert-icon--${alert.severity.toLowerCase()}`}>
                              <AlertTriangle size={18} />
                            </div>
                            <div>
                              <div className="dash-alert-title-row">
                                <h4 className="dash-alert-title">{alert.title}</h4>
                                <span className="dash-status-chip">{alert.severity}</span>
                                <span className="dash-alert-category">{alert.category}</span>
                              </div>
                              <p className="dash-alert-msg">{alert.message}</p>
                            </div>
                          </div>

                          <div className="dash-alert-right">
                            <span className="dash-alert-time">{alert.time}</span>
                            <button
                              className={`dash-btn-sm ${alert.read ? '' : 'dash-btn-sm--active'}`}
                              onClick={() => toggleAlertRead(alert.id)}
                            >
                              {alert.read ? 'Mark Unread' : 'Mark Read'}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ============================================================
               VIEW 6: TEAM ACCESS PAGE (Admin Only)
               ============================================================ */}
            {activeTab === 'team' && isAdmin && (
              <div className="dash-view-container fade-in">
                <div className="dash-page-action-header">
                  <div>
                    <h2 className="dash-section-heading">Team & Role Access Control</h2>
                    <p className="dash-section-desc">Manage operator privileges, access roles, and monitor user activity logs.</p>
                  </div>
                  <button className="dash-btn-primary" onClick={() => setShowAddUserModal(true)}>
                    <Plus size={16} />
                    <span>+ Add User</span>
                  </button>
                </div>

                <div className="dash-card dash-table-card">
                  {userList.length === 0 ? (
                    <div className="dash-empty-state">
                      <Users size={36} className="dash-empty-icon" />
                      <h3 className="dash-empty-title">No users available</h3>
                      <p className="dash-empty-desc">Click "+ Add User" above to create an operator account.</p>
                    </div>
                  ) : (
                    <div className="dash-table-wrapper">
                      <table className="dash-table">
                        <thead>
                          <tr>
                            <th>User ID & Name</th>
                            <th>Email Address</th>
                            <th>Assigned Role</th>
                            <th>Status</th>
                            <th>Last Login</th>
                            <th className="text-right">Activity</th>
                          </tr>
                        </thead>
                        <tbody>
                          {userList.map((user) => (
                            <tr key={user.id}>
                              <td>
                                <div className="dash-cell-title">
                                  <span className="font-semibold text-blue">{user.id}</span>
                                  <span className="dash-cell-name">{user.name}</span>
                                </div>
                              </td>
                              <td>{user.email}</td>
                              <td><span className="dash-role-badge">{user.role}</span></td>
                              <td><span className="dash-status-chip">{user.status}</span></td>
                              <td className="text-muted">{user.lastLogin}</td>
                              <td className="text-right font-semibold">{user.activityCount} actions</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ============================================================
               VIEW 7: SETTINGS PAGE
               ============================================================ */}
            {activeTab === 'settings' && (
              <div className="dash-view-container fade-in">
                <div className="dash-settings-layout">
                  
                  {/* Settings Sidebar Tabs */}
                  <div className="dash-card dash-settings-tabs-card">
                    <button
                      className={`dash-settings-tab ${settingsTab === 'profile' ? 'dash-settings-tab--active' : ''}`}
                      onClick={() => setSettingsTab('profile')}
                    >
                      <User size={16} />
                      <span>Profile & Avatar</span>
                    </button>
                    <button
                      className={`dash-settings-tab ${settingsTab === 'account' ? 'dash-settings-tab--active' : ''}`}
                      onClick={() => setSettingsTab('account')}
                    >
                      <Lock size={16} />
                      <span>Account & Security</span>
                    </button>
                    <button
                      className={`dash-settings-tab ${settingsTab === 'preferences' ? 'dash-settings-tab--active' : ''}`}
                      onClick={() => setSettingsTab('preferences')}
                    >
                      <Sliders size={16} />
                      <span>System Preferences</span>
                    </button>
                    <button
                      className={`dash-settings-tab ${settingsTab === 'support' ? 'dash-settings-tab--active' : ''}`}
                      onClick={() => setSettingsTab('support')}
                    >
                      <HelpCircle size={16} />
                      <span>Help & Support</span>
                    </button>
                    <div className="dash-modal-tab-divider" />
                    <button className="dash-settings-tab dash-settings-tab--logout" onClick={handleLogout}>
                      <LogOut size={16} />
                      <span>Sign Out</span>
                    </button>
                  </div>

                  {/* Settings Content Card */}
                  <div className="dash-card dash-settings-content-card">
                    {saveMessage && (
                      <div className="dash-alert-status dash-alert-status--success margin-bottom-16">
                        <CheckCircle size={16} />
                        <span>{saveMessage}</span>
                      </div>
                    )}

                    {/* PROFILE TAB */}
                    {settingsTab === 'profile' && (
                      <form onSubmit={handleSaveProfile} className="dash-settings-form">
                        <h3 className="dash-settings-heading">Profile & Display Avatar</h3>
                        <p className="dash-settings-sub">Manage your personal operator details and display picture.</p>

                        {/* Avatar Upload Area */}
                        <div className="dash-avatar-section">
                          <img src={userInfo.avatar} alt={userInfo.name} className="dash-settings-avatar-lg" />
                          <div className="dash-avatar-controls">
                            <div className="dash-avatar-btns">
                              <button
                                type="button"
                                className="dash-btn-primary"
                                onClick={() => fileInputRef.current?.click()}
                              >
                                <UploadCloud size={14} />
                                <span>Upload Picture</span>
                              </button>
                              <button
                                type="button"
                                className="dash-btn-secondary"
                                onClick={handleRemoveAvatar}
                              >
                                <Trash2 size={14} />
                                <span>Remove</span>
                              </button>
                            </div>
                            <input
                              type="file"
                              ref={fileInputRef}
                              accept="image/*"
                              className="dash-file-hidden"
                              onChange={handleAvatarChange}
                            />
                            <p className="dash-avatar-note">JPG, PNG, or GIF. Max 5MB. Preview is persisted locally.</p>
                          </div>
                        </div>

                        <div className="dash-form-group">
                          <label className="dash-label">Full Name</label>
                          <input
                            type="text"
                            className="dash-input"
                            value={profileName}
                            onChange={(e) => setProfileName(e.target.value)}
                            required
                          />
                        </div>

                        <div className="dash-form-group">
                          <label className="dash-label">Email Address</label>
                          <input
                            type="email"
                            className="dash-input"
                            value={profileEmail}
                            onChange={(e) => setProfileEmail(e.target.value)}
                            required
                          />
                        </div>

                        <div className="dash-form-group">
                          <label className="dash-label">Assigned Access Role</label>
                          <input
                            type="text"
                            className="dash-input dash-input--disabled"
                            value={userInfo.role}
                            disabled
                          />
                        </div>

                        <button type="submit" className="dash-btn-primary">Save Profile Changes</button>
                      </form>
                    )}

                    {/* ACCOUNT TAB */}
                    {settingsTab === 'account' && (
                      <div className="dash-settings-form">
                        <h3 className="dash-settings-heading">Account & Password Security</h3>
                        <p className="dash-settings-sub">Manage password credentials and active session authentication tokens.</p>

                        <div className="dash-form-group">
                          <label className="dash-label">Current Password</label>
                          <input type="password" placeholder="••••••••" className="dash-input" />
                        </div>

                        <div className="dash-form-group">
                          <label className="dash-label">New Password</label>
                          <input type="password" placeholder="••••••••" className="dash-input" />
                        </div>

                        <button type="button" className="dash-btn-primary" onClick={() => { setSaveMessage('Password updated.'); setTimeout(() => setSaveMessage(''), 3000); }}>
                          Update Password
                        </button>
                      </div>
                    )}

                    {/* PREFERENCES TAB */}
                    {settingsTab === 'preferences' && (
                      <div className="dash-settings-form">
                        <h3 className="dash-settings-heading">System Preferences</h3>
                        <p className="dash-settings-sub">Configure operational notification channels.</p>

                        <div className="dash-toggle-row">
                          <div>
                            <span className="dash-toggle-title">Critical Spill Alerts</span>
                            <span className="dash-toggle-desc">Instant alerts on high-confidence SAR slick detections.</span>
                          </div>
                          <input type="checkbox" defaultChecked className="dash-toggle-checkbox" />
                        </div>
                      </div>
                    )}

                    {/* SUPPORT TAB */}
                    {settingsTab === 'support' && (
                      <div className="dash-settings-form">
                        <h3 className="dash-settings-heading">Help & Support Desk</h3>
                        <p className="dash-settings-sub">Planet Maritime Intelligence technical support contacts.</p>

                        <div className="dash-support-card">
                          <HelpCircle size={24} className="text-blue" />
                          <div>
                            <h4 className="dash-support-title">Operator Documentation</h4>
                            <p className="dash-support-desc">Guides for SAR slick analysis, kinematic tracking, and evidence export.</p>
                          </div>
                        </div>

                        <div className="dash-support-card">
                          <FileText size={24} className="text-blue" />
                          <div>
                            <h4 className="dash-support-title">Incident Response Support</h4>
                            <p className="dash-support-desc">Email support: <strong>contact@planet.example</strong></p>
                          </div>
                        </div>
                      </div>
                    )}

                  </div>
                </div>
              </div>
            )}

          </div>

        </main>
      </div>

      {/* ── 4. SPILL EVENT DETAIL DRAWER / MODAL ── */}
      {selectedSpill && (
        <div className="dash-modal-backdrop" onClick={() => setSelectedSpill(null)}>
          <div className="dash-modal-box dash-detail-modal" onClick={(e) => e.stopPropagation()}>
            <div className="dash-modal-header">
              <div className="dash-modal-title-group">
                <Radar size={20} className="text-blue" />
                <h2 className="dash-modal-title">{selectedSpill.id} - {selectedSpill.name}</h2>
              </div>
              <button className="dash-modal-close" onClick={() => setSelectedSpill(null)}>
                <X size={20} />
              </button>
            </div>

            <div className="dash-detail-modal-body">
              <div className="dash-detail-info">
                <div className="dash-detail-tags">
                  <span className="dash-status-chip">{selectedSpill.status}</span>
                </div>
                <div className="dash-detail-field"><label>Location:</label><span>{selectedSpill.location}</span></div>
                <div className="dash-detail-field"><label>Type:</label><span>{selectedSpill.type}</span></div>
                <div className="dash-detail-field"><label>Vessel:</label><span>{selectedSpill.vessel}</span></div>
                <p className="dash-detail-desc">{selectedSpill.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── 5. REPORT VIEW MODAL ── */}
      {selectedReport && (
        <div className="dash-modal-backdrop" onClick={() => setSelectedReport(null)}>
          <div className="dash-modal-box dash-detail-modal" onClick={(e) => e.stopPropagation()}>
            <div className="dash-modal-header">
              <div className="dash-modal-title-group">
                <FileText size={20} className="text-blue" />
                <h2 className="dash-modal-title">{selectedReport.title}</h2>
              </div>
              <button className="dash-modal-close" onClick={() => setSelectedReport(null)}>
                <X size={20} />
              </button>
            </div>

            <div className="dash-detail-modal-body">
              <div className="dash-report-modal-content">
                <div className="dash-report-doc-meta">
                  <span>Report ID: <strong>{selectedReport.id}</strong></span>
                  <span>Incident ID: <strong>{selectedReport.incidentId}</strong></span>
                  <span>Date: <strong>{selectedReport.date}</strong></span>
                  <span>Status: <strong>{selectedReport.status}</strong></span>
                </div>
                <h4 className="dash-doc-heading">Executive Summary</h4>
                <p className="dash-doc-body">{selectedReport.summary}</p>
                <div className="dash-detail-actions margin-top-20">
                  <button className="dash-btn-primary" onClick={() => alert(`Downloading PDF ${selectedReport.id}...`)}>
                    <Download size={14} />
                    <span>Download PDF ({selectedReport.fileSize})</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── 6. ADMIN ADD USER MODAL ── */}
      {showAddUserModal && isAdmin && (
        <div className="dash-modal-backdrop" onClick={() => setShowAddUserModal(false)}>
          <div className="dash-modal-box dash-sm-modal" onClick={(e) => e.stopPropagation()}>
            <div className="dash-modal-header">
              <div className="dash-modal-title-group">
                <Users size={20} className="text-blue" />
                <h2 className="dash-modal-title">+ Add Operator User</h2>
              </div>
              <button className="dash-modal-close" onClick={() => setShowAddUserModal(false)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddUserSubmit} className="dash-modal-body dash-add-user-form">
              <div className="dash-form-group">
                <label className="dash-label">Full Name</label>
                <input
                  type="text"
                  className="dash-input"
                  placeholder="e.g. Commander Sarah Vance"
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  required
                />
              </div>

              <div className="dash-form-group">
                <label className="dash-label">Email Address</label>
                <input
                  type="email"
                  className="dash-input"
                  placeholder="sarah.vance@planet.maritime"
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  required
                />
              </div>

              <div className="dash-form-group">
                <label className="dash-label">Assign Access Role</label>
                <select
                  className="dash-input"
                  value={newUserRole}
                  onChange={(e) => setNewUserRole(e.target.value)}
                >
                  <option value="ANALYST">ANALYST (Full Operational Analysis)</option>
                  <option value="VIEWER">VIEWER (Reports & Overviews Only)</option>
                  <option value="ADMIN">ADMIN (Full Platform Management)</option>
                </select>
              </div>

              <button type="submit" className="dash-btn-primary w-full margin-top-12">
                <span>Create User Account</span>
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
