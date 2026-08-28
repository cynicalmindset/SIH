import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import {
  PLANET_DOCUMENTS,
  getDocBySlug,
  searchPlanetDocs,
} from '../data/docsData';
import {
  ArrowLeft,
  Search,
  BookOpen,
  ChevronRight,
  Printer,
  FileText,
  CheckCircle2,
  Clock,
  Layers,
  Database,
  Workflow,
  Download,
  AlertTriangle,
} from 'lucide-react';

/**
 * DocViewer Component
 * ──────────────────
 * Redesigned Two-Panel Enterprise Product Documentation Interface for Planet.
 *
 * Design Language:
 *   • WHITE canvas background (#ffffff)
 *   • BLACK/DARK typography (#0f172a / #111827)
 *   • PLANET BLUE accents (#2563eb)
 *   • Left Sticky Index / Table of Contents (Desktop)
 *   • Right Structured Document Content with Technical Specs Tables, Workflow Pipeline Cards, & Data Grid
 *   • Mobile: Top Collapsible Index Dropdown
 *   • Related Documentation Cards & Zero Broken Links
 */

export default function DocViewer({ docSlug = 'oil-spill-detection', onNavigate }) {
  const [activeSlug, setActiveSlug] = useState(docSlug);
  const [activeSectionId, setActiveSectionId] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileTocOpen, setMobileTocOpen] = useState(false);

  // Sync state on prop change
  useEffect(() => {
    setActiveSlug(docSlug);
    setActiveSectionId('overview');
    window.scrollTo(0, 0);
  }, [docSlug]);

  const doc = getDocBySlug(activeSlug);
  const searchResults = searchPlanetDocs(searchQuery);

  // Related documents resolution
  const relatedDocs = (doc.relatedSlugs || [])
    .map((s) => PLANET_DOCUMENTS.find((d) => d.slug === s))
    .filter(Boolean);

  const handleDocChange = (newSlug) => {
    setActiveSlug(newSlug);
    setActiveSectionId('overview');
    setSearchQuery('');
    setMobileTocOpen(false);
    window.scrollTo(0, 0);
    window.location.hash = `doc-${newSlug}`;
  };

  const handleSectionClick = (sectionId) => {
    setActiveSectionId(sectionId);
    setMobileTocOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = doc.sections.map((s) => document.getElementById(s.id)).filter(Boolean);
      const scrollPos = window.scrollY + 140;

      for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i].offsetTop <= scrollPos) {
          setActiveSectionId(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [doc]);

  return (
    <div className="doc-page-canvas">
      
      {/* Navigation Header */}
      <header className="doc-page-header">
        <Navbar currentView="platform" theme="light" onNavigate={onNavigate} />
      </header>

      {/* Main Container */}
      <div className="doc-main-container">
        
        {/* Top Breadcrumb & Document Header Banner */}
        <div className="doc-banner">
          <div className="doc-breadcrumb">
            <button
              className="doc-back-link"
              onClick={() => {
                if (onNavigate) onNavigate('platform');
                else window.location.hash = 'platform';
              }}
            >
              <ArrowLeft size={15} />
              <span>Platform</span>
            </button>
            <span className="doc-bc-sep">/</span>
            <span className="doc-bc-cat">Documentation</span>
            <span className="doc-bc-sep">/</span>
            <span className="doc-bc-title">{doc.title}</span>
          </div>

          <div className="doc-banner-content">
            <div>
              <div className="doc-pill-row">
                <span className="doc-pill-tag">{doc.category}</span>
                <span className="doc-meta-badge">
                  <Clock size={12} /> Last updated: August 2026
                </span>
                <span className="doc-meta-badge">v2.4 Technical Spec</span>
              </div>
              <h1 className="doc-title">{doc.title}</h1>
              <p className="doc-description">{doc.description}</p>
            </div>

            {/* Quick Actions & Search Dropdown */}
            <div className="doc-banner-actions">
              <div className="doc-search-box">
                <Search size={16} className="doc-search-icon" />
                <input
                  type="text"
                  placeholder="Search documentation..."
                  className="doc-search-input"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <div className="doc-search-dropdown">
                    {searchResults.length === 0 ? (
                      <div className="doc-search-empty">No matching documents.</div>
                    ) : (
                      searchResults.map((res) => (
                        <div
                          key={res.slug}
                          className="doc-search-item"
                          onClick={() => handleDocChange(res.slug)}
                        >
                          <span className="doc-search-item-title">{res.title}</span>
                          <span className="doc-search-item-cat">{res.category}</span>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>

              <button
                className="doc-icon-btn"
                title="Print Technical Spec"
                onClick={() => window.print()}
              >
                <Printer size={15} />
                <span>Print Spec</span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Index Dropdown Toggle (Visible on Mobile Only) */}
        <div className="doc-mobile-toc-toggle">
          <button
            className="doc-mobile-toc-btn"
            onClick={() => setMobileTocOpen(!mobileTocOpen)}
          >
            <BookOpen size={16} className="text-blue" />
            <span>DOCUMENT INDEX ({doc.sections.length} SECTIONS)</span>
            <ChevronRight
              size={16}
              className={`doc-toc-arrow ${mobileTocOpen ? 'doc-toc-arrow--open' : ''}`}
            />
          </button>

          {mobileTocOpen && (
            <div className="doc-mobile-toc-menu">
              {doc.sections.map((sec) => (
                <button
                  key={sec.id}
                  className={`doc-toc-item ${activeSectionId === sec.id ? 'doc-toc-item--active' : ''}`}
                  onClick={() => handleSectionClick(sec.id)}
                >
                  <span>{sec.title}</span>
                </button>
              ))}
              <div className="doc-mobile-quick-sep" />
              {PLANET_DOCUMENTS.map((item) => (
                <button
                  key={item.slug}
                  className={`doc-toc-item ${item.slug === activeSlug ? 'doc-toc-item--active' : ''}`}
                  onClick={() => handleDocChange(item.slug)}
                >
                  <span>📄 {item.title}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* TWO-PANEL WORKSPACE LAYOUT (Desktop) */}
        <div className="doc-workspace-layout">
          
          {/* LEFT PANEL: Sticky Document Index / Table of Contents */}
          <aside className="doc-toc-sidebar">
            <div className="doc-toc-sticky-box">
              <div className="doc-toc-header">
                <BookOpen size={16} className="text-blue" />
                <span>DOCUMENT INDEX</span>
              </div>

              {/* Section Index Links */}
              <nav className="doc-toc-nav" aria-label="Document Index">
                {doc.sections.map((sec) => {
                  const isActive = activeSectionId === sec.id;
                  return (
                    <button
                      key={sec.id}
                      className={`doc-toc-link ${isActive ? 'doc-toc-link--active' : ''}`}
                      onClick={() => handleSectionClick(sec.id)}
                    >
                      <span className="doc-toc-text">{sec.title}</span>
                      {isActive && <ChevronRight size={14} className="doc-toc-active-icon" />}
                    </button>
                  );
                })}

                {/* Related Section Anchor */}
                {relatedDocs.length > 0 && (
                  <button
                    className={`doc-toc-link ${activeSectionId === 'related-docs' ? 'doc-toc-link--active' : ''}`}
                    onClick={() => handleSectionClick('related-docs')}
                  >
                    <span className="doc-toc-text">Related Documents</span>
                    {activeSectionId === 'related-docs' && (
                      <ChevronRight size={14} className="doc-toc-active-icon" />
                    )}
                  </button>
                )}
              </nav>

              {/* All Platform Capabilities Quick Switcher */}
              <div className="doc-toc-quick-list">
                <span className="doc-toc-subheading">PLATFORM CAPABILITIES</span>
                {PLANET_DOCUMENTS.map((item) => (
                  <button
                    key={item.slug}
                    className={`doc-quick-link ${item.slug === activeSlug ? 'doc-quick-link--active' : ''}`}
                    onClick={() => handleDocChange(item.slug)}
                  >
                    <span>{item.title}</span>
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* RIGHT PANEL: Structured Product Document Content */}
          <article className="doc-content-article">
            {doc.sections.map((section) => {
              const lines = section.content.split('\n').map((l) => l.trim()).filter(Boolean);
              const isWorkflow = section.id === 'analysis-workflow';
              const isCapabilities = section.id === 'core-capabilities';

              return (
                <section key={section.id} id={section.id} className="doc-section-block">
                  <div className="doc-section-head">
                    <h2 className="doc-section-title">
                      <span className="doc-section-anchor">
                        {section.title}
                      </span>
                    </h2>
                  </div>

                  <div className="doc-section-body">
                    {/* Render Numbered Step Workflow Component */}
                    {isWorkflow ? (
                      <div className="doc-workflow-grid">
                        {lines.map((line, idx) => {
                          const parts = line.replace(/^\d+\.\s*/, '').split(':');
                          const stepTitle = parts[0];
                          const stepDesc = parts.slice(1).join(':');

                          return (
                            <div key={idx} className="doc-workflow-card">
                              <div className="doc-workflow-num">{idx + 1}</div>
                              <div className="doc-workflow-content">
                                <h4 className="doc-workflow-title">{stepTitle}</h4>
                                {stepDesc && <p className="doc-workflow-desc">{stepDesc}</p>}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : isCapabilities ? (
                      /* Render Core Capabilities Structured Box Grid */
                      <div className="doc-capabilities-grid">
                        {lines.map((line, idx) => {
                          const cleanLine = line.replace('•', '').trim();
                          const parts = cleanLine.split(':');
                          const capTitle = parts[0];
                          const capDesc = parts.slice(1).join(':');

                          return (
                            <div key={idx} className="doc-capability-card">
                              <CheckCircle2 size={18} className="doc-cap-icon" />
                              <div>
                                <h4 className="doc-cap-title">{capTitle}</h4>
                                {capDesc && <p className="doc-cap-desc">{capDesc}</p>}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      /* Standard Paragraphs & Bullets */
                      lines.map((paragraph, pIdx) => {
                        if (paragraph.startsWith('•')) {
                          return (
                            <div key={pIdx} className="doc-bullet-row">
                              <CheckCircle2 size={16} className="doc-bullet-icon" />
                              <span>{paragraph.replace('•', '').trim()}</span>
                            </div>
                          );
                        }

                        return (
                          <p key={pIdx} className="doc-paragraph">
                            {paragraph}
                          </p>
                        );
                      })
                    )}
                  </div>
                </section>
              );
            })}

            {/* Technical Specifications Summary Table */}
            <section id="technical-specs" className="doc-section-block">
              <div className="doc-section-head">
                <h2 className="doc-section-title">Technical Specifications</h2>
              </div>
              <div className="doc-table-card">
                <table className="doc-specs-table">
                  <thead>
                    <tr>
                      <th>Specification</th>
                      <th>Value / Support Level</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Data Formats</td>
                      <td>GeoJSON, GeoTIFF, KML, NetCDF, CSV</td>
                    </tr>
                    <tr>
                      <td>Spatial Accuracy</td>
                      <td>High Resolution SAR (&lt;10m pixel resolution)</td>
                    </tr>
                    <tr>
                      <td>Update Frequency</td>
                      <td>Continuous satellite pass ingestion & real-time AIS feed</td>
                    </tr>
                    <tr>
                      <td>API Endpoint</td>
                      <td><code>GET /api/v1/docs/{doc.slug}</code></td>
                    </tr>
                    <tr>
                      <td>Access Roles</td>
                      <td>Admin, Analyst (Read/Write), Viewer (Read-only)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* RELATED PLANET DOCUMENTATION SECTION */}
            {relatedDocs.length > 0 && (
              <section id="related-docs" className="doc-section-block doc-related-block">
                <div className="doc-section-head">
                  <h2 className="doc-section-title">Related Documentation</h2>
                </div>
                <div className="doc-related-grid">
                  {relatedDocs.map((rel) => (
                    <div
                      key={rel.slug}
                      className="doc-related-card"
                      onClick={() => handleDocChange(rel.slug)}
                      role="button"
                      tabIndex={0}
                    >
                      <div>
                        <span className="doc-related-cat">{rel.category}</span>
                        <h4 className="doc-related-title">{rel.title}</h4>
                        <p className="doc-related-desc">{rel.description}</p>
                      </div>
                      <div className="doc-related-foot">
                        <span>Read document</span>
                        <ChevronRight size={14} />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

          </article>

        </div>

      </div>

      {/* Shared Footer */}
      <Footer onNavigate={onNavigate} />
    </div>
  );
}
