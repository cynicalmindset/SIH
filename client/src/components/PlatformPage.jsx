import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import {
  Droplets,
  Satellite,
  Radio,
  Compass,
  Wind,
  Target,
  ArrowRight,
} from 'lucide-react';

const services = [
  {
    number: '01',
    title: 'OIL SPILL DETECTION',
    slug: 'oil-spill-detection',
    description: 'Detect and characterise potential oil slicks from satellite imagery.',
    image: '/platform/container1.png',
    icon: Droplets,
  },
  {
    number: '02',
    title: 'SATELLITE INTELLIGENCE',
    slug: 'satellite-intelligence',
    description: 'Extract spatial intelligence from SAR and optical imagery.',
    image: '/platform/container2.png',
    icon: Satellite,
  },
  {
    number: '03',
    title: 'AIS INTELLIGENCE',
    slug: 'ais-intelligence',
    description: 'Reconstruct vessel movements around an incident.',
    image: '/platform/container3.png',
    icon: Radio,
  },
  {
    number: '04',
    title: 'VESSEL CORRELATION',
    slug: 'vessel-correlation',
    description: 'Match vessel trajectories with the probable spill origin.',
    image: '/platform/container4.png',
    icon: Compass,
  },
  {
    number: '05',
    title: 'OCEAN & WEATHER',
    slug: 'ocean-and-weather',
    description: 'Use currents, wind and environmental data to trace slick movement.',
    image: '/platform/container5.png',
    icon: Wind,
  },
  {
    number: '06',
    title: 'INCIDENT ATTRIBUTION',
    slug: 'incident-attribution',
    description: 'Rank potential vessels using spatial and temporal evidence.',
    image: '/platform/container6.png',
    icon: Target,
  },
];

export default function PlatformPage({ onNavigate }) {
  const handleCardClick = (slug) => {
    if (onNavigate) {
      onNavigate(`doc-${slug}`);
    } else {
      window.location.hash = `doc-${slug}`;
    }
  };

  return (
    <div className="platform-page-wrapper">
      {/* Top Header Wrapper with Navy Background & Background Image */}
      <div className="page-wrapper">
        <header className="platform-header-box">
          <Navbar currentView="platform" theme="light" onNavigate={onNavigate} />

          {/* Platform Intro Header (Text Overlaying Background Image) */}
          <div className="platform-services-header">
            <span className="services-eyebrow-pill">OUR SERVICES</span>
            <h1 className="services-main-title">
              Everything you need to understand what happened at sea.
            </h1>
            <p className="services-subtitle">
              Connect satellite imagery, vessel movements, and environmental intelligence into one unified investigation workflow.
            </p>
          </div>
        </header>
      </div>

      {/* Six Platform Service Cards Grid Section */}
      <section className="platform-services-section">
        <div className="platform-services-container">
          <div className="platform-services-grid">
            {services.map((item) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={item.number}
                  className="service-card service-card--interactive"
                  onClick={() => handleCardClick(item.slug)}
                  role="button"
                  tabIndex={0}
                >
                  {/* Container Image Area */}
                  <div className="service-card-image-wrapper">
                    <div className="service-card-image-frame">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="service-card-image"
                      />
                    </div>
                    {/* Overlapping Circular Icon Badge - Fully Visible & Unclipped */}
                    <div className="service-icon-badge">
                      <IconComponent size={20} className="service-icon" />
                    </div>
                  </div>

                  {/* Card Content Body */}
                  <div className="service-card-body">
                    <div className="service-card-top">
                      <span className="service-card-number">{item.number}</span>
                      <h3 className="service-card-title">{item.title}</h3>
                      <p className="service-card-desc">{item.description}</p>
                    </div>

                    <div className="service-card-action">
                      <span className="service-view-more">READ DOCUMENTATION</span>
                      <ArrowRight size={14} className="service-arrow-icon" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Blue Worker Section with Protruding Yellow Helmet/Head */}
      <section className="platform-worker-section">
        <div className="platform-worker-container">
          <div className="worker-blue-card">
            {/* Transparent Worker Image Protruding Above Card */}
            <div className="worker-image-wrapper">
              <img
                src="/platform/worker.png"
                alt="Maritime Intelligence Operator"
                className="worker-transparent-img"
              />
            </div>

            {/* Worker Section Content Block */}
            <div className="worker-content-block">
              <span className="worker-eyebrow">
                BUILT FOR MARITIME INVESTIGATION
              </span>
              <h2 className="worker-heading">
                Turn complex ocean data into clear intelligence.
              </h2>
              <p className="worker-description">
                Bring satellite imagery, vessel movements and environmental context together in one investigation workflow.
              </p>
              <div className="worker-cta-row">
                <a
                  href="#contact"
                  className="worker-cta-btn"
                  onClick={(e) => {
                    e.preventDefault();
                    if (onNavigate) onNavigate('home');
                  }}
                >
                  <span>Explore the Platform</span>
                  <span className="worker-cta-arrow">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer onNavigate={onNavigate} />
    </div>
  );
}
