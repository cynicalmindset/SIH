import React from 'react';

export default function FeaturePanelSection() {
  return (
    <section className="blue-panel-section">
      <div className="blue-panel-container">
        <div className="blue-panel-card">
          
          {/* Left Column: Headline, Supporting Copy & Aligned Metrics */}
          <div className="blue-panel-left">
            <h2 className="blue-panel-title">
              See the evidence behind every incident.
            </h2>

            <p className="blue-panel-desc">
              Connect satellite imagery, vessel movement and environmental signals to build a clearer picture of what happened at sea.
            </p>

            <div className="blue-panel-metrics">
              <div className="blue-metric-item">
                <span className="blue-metric-val">98%</span>
                <div className="blue-metric-label-group">
                  <span className="blue-metric-label-line">Delivery</span>
                  <span className="blue-metric-label-line">success rate</span>
                </div>
              </div>

              <div className="blue-metric-divider" />

              <div className="blue-metric-item">
                <span className="blue-metric-val">5 ★</span>
                <div className="blue-metric-label-group">
                  <span className="blue-metric-label-line">Client</span>
                  <span className="blue-metric-label-line">satisfaction</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Group: Oil Worker Portrait + Overlapping Review Card */}
          <div className="blue-panel-right-group">
            {/* Center-Right Portrait: Oil Worker Image */}
            <div className="blue-panel-image-frame">
              <img
                src="/oilworker.png"
                alt="Offshore Oil Worker"
                className="blue-panel-image"
              />
            </div>

            {/* Overlapping White Testimonial/Review Card */}
            <div className="blue-panel-review-card">
              <div className="review-stars" aria-label="4 out of 5 stars">
                ★★★★☆
              </div>
              <p className="review-quote">
                I've used many shipping services before, but none as reliable and responsive as this one. My packages always arrive on time, and the support team actually cares. It's the kind of peace of mind every business owner needs.
              </p>
              <div className="review-author-row">
                <img
                  src="/oilworker.png"
                  alt="Hrithik"
                  className="review-author-avatar"
                />
                <div className="review-author-info">
                  <span className="review-author-name">Hrithik</span>
                  <span className="review-author-title">Small Business Owner</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
