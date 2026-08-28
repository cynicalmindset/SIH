import React from 'react';

export default function EditorialTypographySection() {
  const marqueeText = "DELIVERING OCEAN DATA AND MARITIME INTELLIGENCE WITH PRECISION";

  return (
    <section className="editorial-section">
      <div className="editorial-container">
        {/* Large Oversized Light Gray Background Marquee Typography (Right -> Left) */}
        <div className="editorial-bg-marquee-wrapper" aria-hidden="true">
          <div className="editorial-bg-marquee-track">
            <span>{marqueeText} &nbsp;&bull;&nbsp;&nbsp;</span>
            <span>{marqueeText} &nbsp;&bull;&nbsp;&nbsp;</span>
            <span>{marqueeText} &nbsp;&bull;&nbsp;&nbsp;</span>
          </div>
        </div>

        {/* Fixed Stationary Foreground Blue Content */}
        <div className="editorial-fg-content">
          <h2 className="editorial-blue-highlight">
            Your Data, Our Intelligence.
          </h2>
        </div>
      </div>
    </section>
  );
}
