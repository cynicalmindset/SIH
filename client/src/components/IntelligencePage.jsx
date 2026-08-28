import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import {
  Radar,
  Activity,
  EyeOff,
  Wind,
  Navigation,
  Radio,
  ShieldAlert,
  FileCheck,
  CheckCircle2,
  ShieldCheck,
  Eye,
  FileText,
  Play,
  ArrowUpRight,
} from 'lucide-react';

const intelligenceModules = [
  {
    id: 'mod-1',
    title: 'SAR Oil Slick Analysis',
    description: 'Detect radar backscatter anomalies indicating surface oil slicks.',
    image: '/Intelligence/Saroilleak.png',
    icon: Radar,
    featured: false,
  },
  {
    id: 'mod-2',
    title: 'Kinematic Track Reconstruction',
    description: 'Rebuild vessel speed, heading, and maneuvers surrounding the incident.',
    image: '/Intelligence/Kinematictrack.png',
    icon: Activity,
    featured: true,
  },
  {
    id: 'mod-3',
    title: 'Dark Vessel Detection',
    description: 'Identify unflagged vessels by matching satellite targets against AIS feeds.',
    image: '/Intelligence/darkvesseldetection.png',
    icon: EyeOff,
    featured: false,
  },
  {
    id: 'mod-4',
    title: 'Drift Vector Modeling',
    description: 'Reverse-simulate slick movement using real-time current and wind fields.',
    image: '/Intelligence/Shitdrift.png',
    icon: Wind,
    featured: false,
  },
  {
    id: 'mod-5',
    title: 'Spatial Proximity Analysis',
    description: 'Calculate exact distance-to-source metrics for candidate vessels.',
    image: '/Intelligence/AISgapandanomaly.png',
    icon: Navigation,
    featured: false,
  },
  {
    id: 'mod-6',
    title: 'AIS Gap & Anomaly Detection',
    description: 'Highlight deliberate transponder dropouts in high-risk ocean zones.',
    image: '/Intelligence/AISgapandanomaly.png',
    icon: Radio,
    featured: false,
  },
  {
    id: 'mod-7',
    title: 'Environmental Risk Assessment',
    description: 'Quantify ecological impact on coastal and marine protected zones.',
    image: '/Intelligence/oceanenvironment.png',
    icon: ShieldAlert,
    featured: false,
  },
  {
    id: 'mod-8',
    title: 'Forensic Evidence Attribution',
    description: 'Rank suspect vessels using multi-criteria evidentiary scoring.',
    image: '/Intelligence/Forensic Evidence Attribution.png',
    icon: FileCheck,
    featured: false,
  },
];

const whyFeatures = [
  {
    id: 'feat-1',
    title: 'Spatial & Temporal Precision',
    description: 'Correlate satellite detection timestamps with microsecond AIS vessel transponder pings.',
    icon: ShieldCheck,
  },
  {
    id: 'feat-2',
    title: 'Dark Vessel Identification',
    description: 'Detect non-reporting ships when transponders are intentionally silenced or spoofed.',
    icon: Eye,
  },
  {
    id: 'feat-3',
    title: 'Hydrodynamic Drift Modeling',
    description: 'Simulate surface wind and current vectors to trace slick trajectories back to source.',
    icon: Wind,
  },
  {
    id: 'feat-4',
    title: 'Audit-Ready Evidence',
    description: 'Generate structured forensic intelligence reports for maritime authorities and insurers.',
    icon: FileText,
  },
];

export default function IntelligencePage({ onNavigate }) {
  return (
    <div className="intel-page-wrapper">
      {/* SECTION 1: Single Rounded Hero Container with Background Image */}
      <div className="page-wrapper">
        <header className="intel-single-hero-box">
          {/* Navigation Bar */}
          <Navbar currentView="intelligence" onNavigate={onNavigate} />

          {/* Primary Text "INTELLIGENCE" sitting directly on hero background */}
          <div className="intel-hero-content-center">
            <h1 className="intel-hero-single-title">INTELLIGENCE</h1>
          </div>
        </header>
      </div>

      {/* SECTION 2: Overview Section */}
      <section className="intel-overview-section">
        <div className="intel-overview-container">
          <div className="intel-overview-left">
            <span className="clean-section-eyebrow">WHAT WE DERIVE</span>
            <h2 className="intel-overview-title">
              Empowering You to Investigate & <span className="title-highlight-text">Attribute Maritime Incidents</span>
            </h2>
          </div>

          <div className="intel-overview-right">
            <p className="intel-overview-desc">
              At Planet, we believe that ocean security begins with clarity and speed. Our intelligence workflows are engineered to fuse satellite observations, vessel kinematics, and oceanographic models into verified incident attribution.
            </p>
            <p className="intel-overview-subdesc">
              Whether analyzing dark vessel encounters or tracing oil spill origins, we provide the evidence required to act with confidence.
            </p>

            <div className="intel-focus-grid">
              <div className="focus-item">
                <CheckCircle2 size={16} className="focus-check-icon" />
                <span>Satellite SAR & Optical Fusion</span>
              </div>
              <div className="focus-item">
                <CheckCircle2 size={16} className="focus-check-icon" />
                <span>Kinematic Track Reconstruction</span>
              </div>
              <div className="focus-item">
                <CheckCircle2 size={16} className="focus-check-icon" />
                <span>Hydrodynamic Slick Drift</span>
              </div>
              <div className="focus-item">
                <CheckCircle2 size={16} className="focus-check-icon" />
                <span>Multi-Source Evidence Attribution</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: Why Choose Section */}
      <section className="intel-why-section">
        <div className="intel-why-container">
          <div className="intel-why-card">
            <div className="intel-why-header">
              <span className="clean-section-eyebrow">WHY MARITIME INTELLIGENCE</span>
              <h2 className="intel-why-title">
                Why Fusing Ocean Data Matters for <span className="title-accent-blue">Incident Investigations</span>
              </h2>
            </div>

            <div className="intel-why-split">
              {/* Left Media Column with Image */}
              <div className="intel-why-media-column">
                <div className="intel-why-media-placeholder">
                  <img
                    src="/Intelligence/Intelligencehero.png"
                    alt="Maritime Data Fusion"
                    className="intel-why-media-img"
                  />
                  <div className="intel-media-play-badge">
                    <Play size={22} className="play-icon" />
                  </div>
                </div>
              </div>

              {/* Right Stack of Feature Items */}
              <div className="intel-why-stack">
                {whyFeatures.map((feat) => {
                  const FeatIcon = feat.icon;
                  return (
                    <div key={feat.id} className="why-feature-item">
                      <div className="why-icon-pill">
                        <FeatIcon size={20} />
                      </div>
                      <div className="why-feature-text">
                        <h4 className="why-feature-title">{feat.title}</h4>
                        <p className="why-feature-desc">{feat.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: 8-Module Grid with Assigned Image Assets */}
      <section className="intel-modules-section">
        <div className="intel-modules-container">
          <div className="intel-modules-header">
            <span className="clean-section-eyebrow text-center">INTELLIGENCE MODULES</span>
            <h2 className="intel-modules-title">
              Tailored Intelligence to <span className="title-accent-blue">Detect & Attribute Incidents</span>
            </h2>
          </div>

          <div className="intel-modules-grid">
            {intelligenceModules.map((mod) => {
              const ModIcon = mod.icon;
              return (
                <div
                  key={mod.id}
                  className={`intel-module-card ${mod.featured ? 'featured-card' : ''}`}
                >
                  <div className="module-card-content">
                    <div className="module-card-header">
                      <h3 className="module-card-title">{mod.title}</h3>
                      <ArrowUpRight size={18} className="module-arrow" />
                    </div>
                    <p className="module-card-desc">{mod.description}</p>
                  </div>

                  <div className="module-card-media-area">
                    <img
                      src={mod.image}
                      alt={mod.title}
                      className="module-card-media-img"
                    />
                    <div className="module-icon-badge">
                      <ModIcon size={18} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer onNavigate={onNavigate} />
    </div>
  );
}
