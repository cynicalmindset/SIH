import React, { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle } from 'lucide-react';

/**
 * ContactPage Component
 * ────────────────────
 * Standalone Contact Page replicating the visual structure & proportions
 * of the design reference while maintaining Planet's visual identity:
 *   • WHITE canvas background (#ffffff)
 *   • Black primary typography (#0f172a / #111827)
 *   • Planet Blue buttons & accents (#2563eb)
 *   • Split layout: Left Contact Form + Right Direct Contact Info
 *   • Temporary frontend submission (shows "Message sent successfully.")
 *   • Form validation (required fields, email format)
 *   • Reuses shared Navbar & Footer
 */

export default function ContactPage({ onNavigate }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required.';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message cannot be empty.';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Frontend-only submission handling
    setIsSubmitted(true);
  };

  return (
    <div className="contact-page-canvas">
      {/* Navigation Header */}
      <header className="contact-page-header">
        <Navbar currentView="contact" theme="light" onNavigate={onNavigate} />
      </header>

      {/* Main Contact Container */}
      <main className="contact-main-container">
        
        {/* Page Title */}
        <div className="contact-hero-head">
          <span className="contact-eyebrow">GET IN TOUCH</span>
          <h1 className="contact-main-title">Reach out today</h1>
          <p className="contact-subtitle">
            Have questions about Planet maritime intelligence, satellite tracking, or custom enterprise integration? Send us a message.
          </p>
        </div>

        {/* Split Grid: Left Form + Right Contact Info */}
        <div className="contact-split-grid">
          
          {/* Left Column: Contact Form */}
          <div className="contact-form-card">
            {isSubmitted ? (
              <div className="contact-success-state">
                <CheckCircle2 size={48} className="contact-success-icon" />
                <h3 className="contact-success-title">Message sent successfully.</h3>
                <p className="contact-success-desc">
                  Thank you for reaching out to Planet. Our operational team has received your message and will follow up shortly.
                </p>
                <button
                  type="button"
                  className="dash-btn-primary"
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({ fullName: '', email: '', message: '' });
                  }}
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form" noValidate>
                
                {/* Full Name */}
                <div className="form-group">
                  <label htmlFor="fullName" className="form-label">
                    Full name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    placeholder="Your full name"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={`form-input ${errors.fullName ? 'form-input--error' : ''}`}
                  />
                  {errors.fullName && (
                    <span className="form-error">
                      <AlertCircle size={13} /> {errors.fullName}
                    </span>
                  )}
                </div>

                {/* Email Address */}
                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Your email address"
                    value={formData.email}
                    onChange={handleChange}
                    className={`form-input ${errors.email ? 'form-input--error' : ''}`}
                  />
                  {errors.email && (
                    <span className="form-error">
                      <AlertCircle size={13} /> {errors.email}
                    </span>
                  )}
                </div>

                {/* Messages */}
                <div className="form-group">
                  <label htmlFor="message" className="form-label">
                    Messages
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder="Your messages here.."
                    value={formData.message}
                    onChange={handleChange}
                    className={`form-textarea ${errors.message ? 'form-input--error' : ''}`}
                  />
                  {errors.message && (
                    <span className="form-error">
                      <AlertCircle size={13} /> {errors.message}
                    </span>
                  )}
                </div>

                {/* Submit Button */}
                <div className="form-submit-wrap">
                  <button type="submit" className="contact-submit-btn">
                    <span>Submit</span>
                    <Send size={15} />
                  </button>
                </div>

              </form>
            )}
          </div>

          {/* Right Column: Direct Contact Info (Matching Reference Layout) */}
          <div className="contact-info-col">
            
            <div className="info-block">
              <span className="info-label">Email:</span>
              <a href="mailto:consulting@planetmaritime.com" className="info-value-link">
                consulting@planetmaritime.com
              </a>
            </div>

            <div className="info-block">
              <span className="info-label">Phone:</span>
              <span className="info-value">+1 (123) 456-7890</span>
            </div>

            <div className="info-block">
              <span className="info-label">Office:</span>
              <address className="info-value-address">
                456 Business Ave, New York, NY 10001
              </address>
            </div>

            {/* Follow Us */}
            <div className="info-block margin-top-20">
              <span className="info-label">Follow Us:</span>
              <div className="social-icons-row">
                <a href="#youtube" onClick={(e) => e.preventDefault()} className="social-circle-btn" aria-label="YouTube">
                  <span>▶</span>
                </a>
                <a href="#facebook" onClick={(e) => e.preventDefault()} className="social-circle-btn" aria-label="Facebook">
                  <span>f</span>
                </a>
                <a href="#linkedin" onClick={(e) => e.preventDefault()} className="social-circle-btn" aria-label="LinkedIn">
                  <span>in</span>
                </a>
                <a href="#x" onClick={(e) => e.preventDefault()} className="social-circle-btn" aria-label="X">
                  <span>𝕏</span>
                </a>
              </div>
            </div>

          </div>

        </div>

      </main>

      {/* Shared Footer */}
      <Footer onNavigate={onNavigate} />
    </div>
  );
}
