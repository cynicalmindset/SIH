import React from 'react';

export default function Marquee() {
  const marqueeText = "MARITIME INTELLIGENCE PLATFORM";

  return (
    <div className="marquee-container">
      <div className="marquee-track">
        {/* Render 2 identical groups to allow seamless 0% to -50% continuous loop */}
        <div className="marquee-content">
          {[...Array(4)].map((_, i) => (
            <div key={`group1-${i}`} className="marquee-item">
              <span>{marqueeText}</span>
              <span className="marquee-bullet" />
            </div>
          ))}
        </div>
        <div className="marquee-content">
          {[...Array(4)].map((_, i) => (
            <div key={`group2-${i}`} className="marquee-item">
              <span>{marqueeText}</span>
              <span className="marquee-bullet" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
