import React from 'react';

export default function ImpactSection() {
  const stats = [
    {
      id: 'stat-1',
      category: 'INCIDENTS',
      value: '14,950+',
      label: 'Oil spill incidents',
    },
    {
      id: 'stat-2',
      category: 'LIVES',
      value: '2,400+',
      label: 'Lives impacted',
    },
    {
      id: 'stat-3',
      category: 'MARINE IMPACT',
      value: '8.7M+',
      label: 'Marine animals affected',
    },
    {
      id: 'stat-4',
      category: 'INVESTIGATIONS',
      value: '1,200+',
      label: 'Maritime incidents investigated',
    },
  ];

  const logoAssets = [
    { name: 'Oceanic Intelligence', src: '/logos/oceanic.svg' },
    { name: 'Maritime Safety Bureau', src: '/logos/safety.svg' },
    { name: 'Bluewater Analytics', src: '/logos/bluewater.svg' },
    { name: 'Coastal Systems', src: '/logos/coastal.svg' },
    { name: 'Marine Operations', src: '/logos/operations.svg' },
    { name: 'Ocean Research Network', src: '/logos/research.svg' },
    { name: 'SeaWatch', src: '/logos/seawatch.svg' },
    { name: 'Nautical Intelligence', src: '/logos/nautical.svg' },
  ];

  return (
    <section className="impact-section">
      <div className="impact-container">
        {/* Section Header */}
        <div className="impact-header">
          <h2 className="impact-heading">
            Maritime Intelligence, by the Numbers
          </h2>
          <p className="impact-subtitle">
            Understanding the scale of maritime incidents and the intelligence required to investigate them.
          </p>
        </div>

        {/* Compact Balanced 2x2 Cards Grid */}
        <div className="impact-stats-grid">
          {stats.map((item) => (
            <div key={item.id} className="impact-stat-card">
              <span className="impact-stat-category">{item.category}</span>
              <div className="impact-stat-number">{item.value}</div>
              <p className="impact-stat-label">{item.label}</p>
            </div>
          ))}
        </div>

        {/* Dark Rounded Logo Marquee Container */}
        <div className="impact-marquee-box">
          <div className="marquee-box-label">
            TARGET ORGANIZATIONS
          </div>

          <div className="impact-marquee-track">
            {/* Track Group 1 */}
            <div className="impact-marquee-content">
              {logoAssets.map((logo, i) => (
                <div key={`g1-${i}`} className="impact-logo-item">
                  <img
                    src={logo.src}
                    alt={logo.name}
                    className="impact-logo-img"
                  />
                </div>
              ))}
            </div>

            {/* Track Group 2 (Duplicated for 100% seamless right-to-left loop) */}
            <div className="impact-marquee-content">
              {logoAssets.map((logo, i) => (
                <div key={`g2-${i}`} className="impact-logo-item">
                  <img
                    src={logo.src}
                    alt={logo.name}
                    className="impact-logo-img"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
