import React from 'react';
import { Radar, Compass, Ship, FileSearch } from 'lucide-react';

export default function CapabilitiesSection() {
  return (
    <section className="capabilities-section">
      <div className="capabilities-container">
        {/* Centered Section Header */}
        <div className="section-header">
          <h2 className="section-title">
            Maritime Intelligence,{' '}
            <span className="title-highlight">
              Unified.
              <span className="corner-dot top-left" />
              <span className="corner-dot top-right" />
              <span className="corner-dot bottom-left" />
              <span className="corner-dot bottom-right" />
            </span>
          </h2>
          <p className="section-subtitle">
            Connect satellite imagery, vessel movements, and environmental intelligence to investigate incidents at sea.
          </p>
        </div>

        {/* 4 Product Capability Cards with Intentionally Asymmetric Internal Layouts */}
        <div className="capabilities-grid">
          {/* Card 1: Spill Detection - Icon Top-Left, Text at Bottom */}
          <div className="capability-card card-variant-1">
            <div className="card-icon-wrapper">
              <Radar className="card-icon" size={22} />
            </div>
            <div className="card-text-group">
              <h3 className="card-title">Spill Detection</h3>
              <p className="card-description">
                Identify and map suspected oil spills from satellite imagery.
              </p>
            </div>
          </div>

          {/* Card 2: Origin Tracing - Text Top-Left, Icon at Bottom-Right */}
          <div className="capability-card card-variant-2">
            <div className="card-text-group">
              <h3 className="card-title">Origin Tracing</h3>
              <p className="card-description">
                Reconstruct likely spill origins using ocean and environmental data.
              </p>
            </div>
            <div className="card-icon-wrapper align-self-end">
              <Compass className="card-icon" size={22} />
            </div>
          </div>

          {/* Card 3: Vessel Attribution - Icon Top-Right, Text at Bottom */}
          <div className="capability-card card-variant-3">
            <div className="card-top-row flex-justify-between">
              <div className="empty-spacer" />
              <div className="card-icon-wrapper">
                <Ship className="card-icon" size={22} />
              </div>
            </div>
            <div className="card-text-group">
              <h3 className="card-title">Vessel Attribution</h3>
              <p className="card-description">
                Correlate vessel movements with the inferred spill origin and time.
              </p>
            </div>
          </div>

          {/* Card 4: Investigation Intelligence - Text Top-Left, Icon at Bottom-Left */}
          <div className="capability-card card-variant-4">
            <div className="card-text-group">
              <h3 className="card-title">Investigation Intelligence</h3>
              <p className="card-description">
                Rank potential vessels and bring supporting evidence into one view.
              </p>
            </div>
            <div className="card-icon-wrapper">
              <FileSearch className="card-icon" size={22} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
