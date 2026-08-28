import React from 'react';

export default function Section3() {
  const cards = [
    {
      id: 'card-1',
      title: 'SATELLITE INTELLIGENCE',
      description: 'Detect patterns across satellite imagery.',
      image: '/section3/contimg1.png',
    },
    {
      id: 'card-2',
      title: 'VESSEL INTELLIGENCE',
      description: 'Understand vessel movement at sea.',
      image: '/section3/image.png',
    },
    {
      id: 'card-3',
      title: 'ENVIRONMENTAL CONTEXT',
      description: 'Add ocean and weather context.',
      image: '/section3/image copy.png',
    },
    {
      id: 'card-4',
      title: 'MARITIME INVESTIGATION',
      description: 'Connect evidence to investigate incidents.',
      image: '/section3/image copy 2.png',
    },
  ];

  return (
    <section className="section3-wrapper">
      <div className="section3-container">
        {/* Top-Centered Main Heading */}
        <div className="section3-header">
          <h2 className="section3-heading">
            From detection to attribution, <br />
            we turn ocean data into maritime intelligence.
          </h2>
        </div>

        {/* Full-Width 2x2 Image Cards Grid */}
        <div className="section3-grid">
          {cards.map((card) => (
            <div key={card.id} className="section3-card">
              <img
                src={card.image}
                alt={card.title}
                className="section3-card-image"
              />
              <div className="section3-card-overlay">
                <span className="section3-card-category">{card.title}</span>
                <p className="section3-card-desc">{card.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
