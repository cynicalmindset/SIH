import React, { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { ArrowRight, MapPin, Calendar, Clock, X, FileText } from 'lucide-react';

/**
 * InsightsPage
 * ────────────
 * Redesigned Editorial / News-Style Insights Publication Page for Planet.
 * Strictly adheres to the reference design layout:
 *   • WHITE page background (#ffffff canvas)
 *   • BLACK primary typography (#0f172a / #111827)
 *   • Planet BLUE accents (#2563eb)
 *   • Hero split-card featured incident container at top
 *   • Responsive multi-card editorial grid below
 *   • Prominent image placeholder frames ready for manual image insertion
 */

const INCIDENTS_DATA = [
  {
    id: 'oman-oil-spill-2026',
    slug: 'caroline-bezengi-oman-spill-2026',
    featured: true,
    category: 'RECENT INCIDENT',
    title: 'Caroline Bezengi — Oman Oil Spill',
    location: 'Gulf of Oman, Oman',
    year: '2026',
    readTime: '6 min read',
    summary: 'A major crude-oil spill involving the tanker Caroline Bezengi off Oman, with satellite imagery tracking the expanding slick and growing concern over impacts to protected marine and coastal ecosystems.',
    imagePlaceholder: '/Intelligence/Saroilleak.png',
  },
  {
    id: 'olmeca-pemex-refinery-2026',
    slug: 'olmeca-pemex-refinery-spill-2026',
    featured: false,
    category: 'REFINERY INCIDENT',
    title: 'Olmeca / Pemex Refinery Spill',
    location: 'Tabasco, Mexico',
    year: '2026',
    readTime: '4 min read',
    summary: 'An oil-related spill and fire near Mexico\'s Olmeca refinery caused fatalities and environmental concerns around nearby waterways, mangroves and fishing communities.',
    imagePlaceholder: '/Intelligence/AIS Gap & Anomaly Detection.png',
  },
  {
    id: 'batam-tanker-explosion-2025',
    slug: 'batam-tanker-explosion-2025',
    featured: false,
    category: 'SAFETY AUDIT',
    title: 'Batam Tanker Explosion',
    location: 'Batam, Indonesia',
    year: '2025',
    readTime: '5 min read',
    summary: 'A tanker undergoing repairs at a Batam shipyard caught fire and exploded, killing workers and highlighting serious safety risks surrounding tanker maintenance and fuel operations.',
    imagePlaceholder: '/Intelligence/darkvesseldetection.png',
  },
  {
    id: 'kerch-strait-spill-2025',
    slug: 'kerch-strait-tanker-spill-2025',
    featured: false,
    category: 'COASTAL CONTAMINATION',
    title: 'Kerch Strait Tanker Spill',
    location: 'Kerch Strait, Black Sea',
    year: '2024–2025',
    readTime: '5 min read',
    summary: 'Two aging tankers were damaged during severe weather, releasing heavy fuel oil into the Black Sea and causing extensive shoreline contamination and wildlife impacts.',
    imagePlaceholder: '/Intelligence/Shitdrift.png',
  },
  {
    id: 'mt-terra-nova-2024',
    slug: 'mt-terra-nova-manila-bay-2024',
    featured: false,
    category: 'SPILL PREVENTION',
    title: 'MT Terra Nova — Manila Bay',
    location: 'Manila Bay, Philippines',
    year: '2024',
    readTime: '4 min read',
    summary: 'The tanker MT Terra Nova sank in Manila Bay while carrying a large quantity of industrial fuel oil, triggering an urgent operation to prevent a much larger coastal spill.',
    imagePlaceholder: '/Intelligence/Spatial Proximity Analysis.png',
  },
  {
    id: 'dikko-fuel-disaster-2025',
    slug: 'dikko-fuel-tanker-disaster-2025',
    featured: false,
    category: 'MARITIME HAZARD',
    title: 'Dikko Fuel Tanker Disaster',
    location: 'Dikko, Niger State, Nigeria',
    year: '2025',
    readTime: '4 min read',
    summary: 'A fuel tanker overturned and leaked petrol before igniting, causing a deadly explosion and highlighting the severe human risks associated with fuel-tanker accidents.',
    imagePlaceholder: '/Intelligence/Forensic Evidence Attribution.png',
  },
];

export default function InsightsPage({ onNavigate }) {
  const [selectedArticle, setSelectedArticle] = useState(null);

  const featuredIncident = INCIDENTS_DATA.find((item) => item.featured);
  const gridIncidents = INCIDENTS_DATA.filter((item) => !item.featured);

  return (
    <div className="insights-ref-canvas">
      
      {/* Navigation Header */}
      <header className="insights-ref-header">
        <Navbar currentView="insights" theme="light" onNavigate={onNavigate} />
      </header>

      {/* Main Container */}
      <main className="insights-ref-main">
        
        {/* SECTION 1: EDITORIAL TITLE & PILL BADGE */}
        <div className="insights-ref-hero-head">
          <span className="insights-ref-pill">INSIGHTS</span>
          <h1 className="insights-ref-heading">
            Recent Oil & Maritime <em>Incidents.</em>
          </h1>
          <p className="insights-ref-subheading">
            Analytical summaries and satellite environmental audits tracking major global vessel, refinery, and coastal slick events.
          </p>
        </div>

        {/* SECTION 2: HERO FEATURED INCIDENT CONTAINER (Split Layout matching reference top card) */}
        {featuredIncident && (
          <section className="insights-ref-featured-card">
            {/* Left Image Placeholder Frame */}
            <div className="insights-ref-featured-img-wrap">
              {featuredIncident.imagePlaceholder ? (
                <img
                  src={featuredIncident.imagePlaceholder}
                  alt={featuredIncident.title}
                  className="insights-ref-img"
                />
              ) : (
                <div className="insights-ref-img-placeholder" />
              )}
              <span className="insights-ref-category-overlay">{featuredIncident.category}</span>
            </div>

            {/* Right Featured Content Area */}
            <div className="insights-ref-featured-content">
              <div>
                <span className="insights-ref-category-tag">{featuredIncident.category}</span>
                <h2 className="insights-ref-featured-title">{featuredIncident.title}</h2>
                <div className="insights-ref-meta-row">
                  <span><MapPin size={13} /> {featuredIncident.location}</span>
                  <span><Calendar size={13} /> {featuredIncident.year}</span>
                </div>
                <p className="insights-ref-featured-summary">{featuredIncident.summary}</p>
              </div>

              <div className="insights-ref-featured-foot">
                <span className="insights-ref-readtime"><Clock size={13} /> {featuredIncident.readTime}</span>
                <button
                  type="button"
                  className="insights-ref-action-btn"
                  onClick={() => setSelectedArticle(featuredIncident)}
                >
                  <span>Read insight</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </section>
        )}

        {/* SECTION 3: GRID OF REMAINING INCIDENT CARDS (Matching reference bottom 3-column row) */}
        <section className="insights-ref-grid">
          {gridIncidents.map((incident) => (
            <article key={incident.id} className="insights-ref-grid-card">
              {/* Top Image Placeholder Area */}
              <div className="insights-ref-card-img-wrap">
                {incident.imagePlaceholder ? (
                  <img
                    src={incident.imagePlaceholder}
                    alt={incident.title}
                    className="insights-ref-img"
                  />
                ) : (
                  <div className="insights-ref-img-placeholder" />
                )}
                <span className="insights-ref-category-overlay">{incident.category}</span>
              </div>

              {/* Bottom Card Content */}
              <div className="insights-ref-card-body">
                <div>
                  <h3 className="insights-ref-card-title">{incident.title}</h3>
                  <div className="insights-ref-meta-row margin-bottom-8">
                    <span><MapPin size={13} /> {incident.location}</span>
                    <span><Calendar size={13} /> {incident.year}</span>
                  </div>
                  <p className="insights-ref-card-summary">{incident.summary}</p>
                </div>

                <div className="insights-ref-card-foot">
                  <span className="insights-ref-readtime">{incident.readTime}</span>
                  <button
                    type="button"
                    className="insights-ref-link-btn"
                    onClick={() => setSelectedArticle(incident)}
                  >
                    <span>Read insight</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </section>

      </main>

      {/* SECTION 4: ARTICLE READER MODAL */}
      {selectedArticle && (
        <div className="insights-modal-backdrop" onClick={() => setSelectedArticle(null)}>
          <div className="insights-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="insights-modal-head">
              <div className="insights-modal-title-group">
                <FileText size={20} className="text-blue" />
                <span className="insights-modal-cat">{selectedArticle.category}</span>
              </div>
              <button
                className="insights-modal-close"
                onClick={() => setSelectedArticle(null)}
                aria-label="Close article"
              >
                <X size={20} />
              </button>
            </div>

            <div className="insights-modal-body">
              <h2 className="insights-modal-title">{selectedArticle.title}</h2>
              <div className="insights-ref-meta-row margin-bottom-16">
                <span><MapPin size={14} /> {selectedArticle.location}</span>
                <span><Calendar size={14} /> {selectedArticle.year}</span>
                <span><Clock size={14} /> {selectedArticle.readTime}</span>
              </div>

              <div className="insights-modal-img-wrap margin-bottom-16">
                {selectedArticle.imagePlaceholder ? (
                  <img
                    src={selectedArticle.imagePlaceholder}
                    alt={selectedArticle.title}
                    className="insights-modal-img"
                  />
                ) : (
                  <div className="insights-ref-img-placeholder" />
                )}
              </div>

              <p className="insights-modal-desc">{selectedArticle.summary}</p>

              <div className="insights-modal-foot">
                <button
                  type="button"
                  className="dash-btn-primary"
                  onClick={() => setSelectedArticle(null)}
                >
                  <span>Close Insight</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer onNavigate={onNavigate} />
    </div>
  );
}
