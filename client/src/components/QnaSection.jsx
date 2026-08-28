import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { CONTACT_EMAIL } from '../config';

const faqs = [
  {
    id: 'faq-1',
    question: 'How does Planet detect maritime incidents?',
    answer: 'Planet integrates synthetic aperture radar (SAR), optical satellite imagery, and automatic identification system (AIS) telemetry to automatically detect and flag anomalous ocean events in real time.',
  },
  {
    id: 'faq-2',
    question: 'Which data sources does Planet use?',
    answer: 'Our platform fuses commercial Earth observation satellite constellations, global AIS vessel tracking feeds, oceanographic weather models, and official maritime registry databases.',
  },
  {
    id: 'faq-3',
    question: 'How does vessel attribution work?',
    answer: 'By cross-referencing historical kinematic tracks, last known positions, gap analysis, and spatial proximity modeling when AIS signals are intentionally disabled or spoofed.',
  },
  {
    id: 'faq-4',
    question: 'Can Planet help investigate historical incidents?',
    answer: 'Yes. Our deep data archive enables investigators to reconstruct past maritime timelines, analyze voyage trajectories, and generate audit-ready forensic evidence reports.',
  },
  {
    id: 'faq-5',
    question: 'Who can use the platform?',
    answer: 'Planet is designed for coast guards, maritime safety agencies, environmental enforcement teams, marine insurers, and commercial shipping operators.',
  },
  {
    id: 'faq-6',
    question: 'How does Planet combine satellite and vessel data?',
    answer: 'Our automated AI pipelines cross-reference satellite-detected vessel positions with live AIS broadcasts to instantly highlight dark vessels, oil slicks, and illegal activities at sea.',
  },
];

export default function QnaSection() {
  const [openId, setOpenId] = useState('faq-3');

  const toggleFaq = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="qna-section" id="faq">
      <div className="qna-container">
        {/* Section Heading */}
        <div className="qna-header">
          <h2 className="qna-title">
            Need help? <span className="qna-title-accent">We've got answers.</span>
          </h2>
        </div>

        {/* Accordion Cards List */}
        <div className="qna-accordion-list">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`qna-card ${isOpen ? 'qna-card-open' : ''}`}
              >
                <button
                  className="qna-card-header"
                  onClick={() => toggleFaq(faq.id)}
                  aria-expanded={isOpen}
                  type="button"
                >
                  <span className="qna-question">{faq.question}</span>
                  <span className={`qna-icon-wrapper ${isOpen ? 'icon-rotated' : ''}`}>
                    <ChevronDown size={18} />
                  </span>
                </button>

                {isOpen && (
                  <div className="qna-answer-body">
                    <p className="qna-answer-text">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Action Pill */}
        <div className="qna-bottom-cta">
          <a href={`mailto:${CONTACT_EMAIL}`} className="qna-view-all-btn">
            Contact Team
          </a>
        </div>
      </div>
    </section>
  );
}
