import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

const insightArticles = [
  {
    id: 'art-1',
    title: 'Oil Slick Dispersion Dynamics',
    description: 'Analyzing surface drift trajectories under extreme winter gale conditions in the North Sea.',
    featured: false,
  },
  {
    id: 'art-2',
    title: 'Dark Fleet AIS Spoofing Patterns',
    description: 'Identifying micro-frequency transponder anomalies near restricted maritime economic zones.',
    featured: true, // Highlighted center card matching reference
  },
  {
    id: 'art-3',
    title: 'Multi-Source Incident Attribution',
    description: 'Combining SAR imagery with temporal kinematic scoring to verify vessel spill responsibility.',
    featured: false,
  },
];

export default function InsightsPage({ onNavigate }) {
  return (
    <div className="insights-page-wrapper">
      {/* SECTION 1: Top Hero Section (Single Container + Image Background + Custom Geometric Shape) */}
      <div className="page-wrapper">
        <header className="insights-header-box">
          <Navbar currentView="insights" onNavigate={onNavigate} />

          <div className="insights-hero-container">
            {/* Left Hero Content directly over Image Background */}
            <div className="insights-hero-left">
              <span className="insights-eyebrow-text">MARITIME INSIGHTS</span>
              <h1 className="insights-hero-title">
                Signals worth understanding.
              </h1>
              <p className="insights-hero-desc">
                Explore observations, patterns and intelligence emerging from maritime activity, satellite data and environmental conditions.
              </p>
              <div className="insights-hero-actions">
                <a
                  href="#case-studies"
                  className="insights-primary-btn"
                  onClick={(e) => e.preventDefault()}
                >
                  <span>Explore Insights</span>
                  <ArrowRight size={16} />
                </a>
                <a
                  href="#overview"
                  className="insights-secondary-link"
                  onClick={(e) => e.preventDefault()}
                >
                  View All Incident Analysis →
                </a>
              </div>
            </div>
          </div>
        </header>
      </div>

      {/* SECTION 2: Hero → Next Section Marquee Transition Ticker */}
      <section className="insights-marquee-section">
        <div className="marquee-track">
          <div className="marquee-content">
            <span>Maritime Intelligence</span>
            <span className="marquee-star">✳</span>
            <span>Satellite SAR Analysis</span>
            <span className="marquee-star">✳</span>
            <span>Vessel Kinematics</span>
            <span className="marquee-star">✳</span>
            <span>Oil Slick Tracking</span>
            <span className="marquee-star">✳</span>
            <span>AIS Anomaly Detection</span>
            <span className="marquee-star">✳</span>
            <span>Hydrodynamic Drift</span>
            <span className="marquee-star">✳</span>
            <span>Incident Attribution</span>
            <span className="marquee-star">✳</span>
          </div>
          <div className="marquee-content" aria-hidden="true">
            <span>Maritime Intelligence</span>
            <span className="marquee-star">✳</span>
            <span>Satellite SAR Analysis</span>
            <span className="marquee-star">✳</span>
            <span>Vessel Kinematics</span>
            <span className="marquee-star">✳</span>
            <span>Oil Slick Tracking</span>
            <span className="marquee-star">✳</span>
            <span>AIS Anomaly Detection</span>
            <span className="marquee-star">✳</span>
            <span>Hydrodynamic Drift</span>
            <span className="marquee-star">✳</span>
            <span>Incident Attribution</span>
            <span className="marquee-star">✳</span>
          </div>
        </div>
      </section>

      {/* SECTION 3: "WHAT THE DATA REVEALS" (Multi-Image Stack + Progress Metrics + 4-Stat Row) */}
      <section className="insights-data-section">
        <div className="insights-data-container">
          {/* Header */}
          <div className="insights-data-header">
            <span className="clean-section-eyebrow text-center">WHAT THE DATA REVEALS</span>
            <h2 className="insights-data-title">
              See the patterns behind every incident.
            </h2>
          </div>

          {/* Split Content Row */}
          <div className="insights-data-split">
            {/* Left Column: Stacked Image Placeholder Containers */}
            <div className="data-image-stack">
              <div className="data-image-box box-main">
                <div className="data-media-placeholder" />
              </div>
              <div className="data-image-box box-sub">
                <div className="data-media-placeholder" />
              </div>
            </div>

            {/* Right Column: Paragraph + Progress Metric Bars + Button */}
            <div className="data-content-col">
              <p className="data-content-desc">
                Combine observations across vessel activity, satellite imagery and environmental conditions to build a clearer picture of maritime events.
              </p>

              <div className="data-progress-list">
                {/* Progress Metric 1 */}
                <div className="progress-item">
                  <div className="progress-label-row">
                    <span className="progress-title">Satellite SAR & Optical Accuracy</span>
                    <span className="progress-val">92%</span>
                  </div>
                  <div className="progress-bar-track">
                    <div className="progress-bar-fill" style={{ width: '92%' }} />
                  </div>
                </div>

                {/* Progress Metric 2 */}
                <div className="progress-item">
                  <div className="progress-label-row">
                    <span className="progress-title">AIS Vessel Kinematic Matching</span>
                    <span className="progress-val">88%</span>
                  </div>
                  <div className="progress-bar-track">
                    <div className="progress-bar-fill" style={{ width: '88%' }} />
                  </div>
                </div>

                {/* Progress Metric 3 */}
                <div className="progress-item">
                  <div className="progress-label-row">
                    <span className="progress-title">Hydrodynamic Slick Correlation</span>
                    <span className="progress-val">95%</span>
                  </div>
                  <div className="progress-bar-track">
                    <div className="progress-bar-fill" style={{ width: '95%' }} />
                  </div>
                </div>
              </div>

              <div className="data-action-wrapper">
                <button type="button" className="data-action-btn">
                  <span>Explore Analytical Methods</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Bottom 4-Stat Counter Grid */}
          <div className="insights-stats-counter-row">
            <div className="stat-counter-item">
              <span className="stat-number">4.2k+</span>
              <span className="stat-label">Satellite Scenes Analyzed</span>
            </div>
            <div className="stat-counter-divider" />
            <div className="stat-counter-item">
              <span className="stat-number">180+</span>
              <span className="stat-label">Active Vessel Watchlists</span>
            </div>
            <div className="stat-counter-divider" />
            <div className="stat-counter-item">
              <span className="stat-number">96%</span>
              <span className="stat-label">Attribution Confidence</span>
            </div>
            <div className="stat-counter-divider" />
            <div className="stat-counter-item">
              <span className="stat-number">24/7</span>
              <span className="stat-label">Automated Slick Alerts</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: INSIGHT CARDS SECTION (Dark Navy 3-Column Grid) */}
      <section className="insights-cards-section">
        <div className="insights-cards-container">
          <div className="insights-cards-header">
            <div className="header-text-left">
              <span className="clean-section-eyebrow-light">DEEP-DIVE INSIGHTS</span>
              <h2 className="cards-section-title">
                Latest Maritime Incident Analyses
              </h2>
            </div>
            <button type="button" className="cards-header-btn">
              <span>View All Case Studies</span>
              <ArrowUpRight size={16} />
            </button>
          </div>

          <div className="insights-cards-grid">
            {insightArticles.map((art) => (
              <div
                key={art.id}
                className={`insight-article-card ${art.featured ? 'featured-insight-card' : ''}`}
              >
                {!art.featured && (
                  <div className="article-media-area">
                    <div className="article-media-placeholder" />
                  </div>
                )}

                <div className="article-body">
                  <h3 className="article-title">{art.title}</h3>
                  <p className="article-desc">{art.description}</p>
                  <div className="article-link-row">
                    <span className="article-link-text">Learn more</span>
                    <ArrowRight size={14} className="article-link-arrow" />
                  </div>
                </div>

                {art.featured && (
                  <div className="article-media-area featured-media-bottom">
                    <div className="article-media-placeholder" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer onNavigate={onNavigate} />
    </div>
  );
}
