import React from 'react';
import Navbar from './Navbar';

export default function Hero({ currentView, onNavigate }) {
  return (
    <div className="page-wrapper">
      <section className="hero-container">
        {/* Background Image: heroimage.png */}
        <img
          src="/heroimage.png"
          alt="Maritime Container Ship at Sea"
          className="hero-bg-image"
        />

        {/* Subtle Dark/Oceanic Overlay for Text Legibility */}
        <div className="hero-overlay" />

        {/* Navbar inside top portion of hero container */}
        <Navbar currentView={currentView} onNavigate={onNavigate} />

        {/* Minimal Hero Content positioned in lower part of hero */}
        <div className="hero-body">
          <h1 className="hero-headline">
            Maritime Intelligence Platform
          </h1>

          <p className="supporting-desc">
            Satellite intelligence and vessel data for detecting, tracing, and attributing incidents at sea.
          </p>
        </div>
      </section>
    </div>
  );
}
