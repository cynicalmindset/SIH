import React, { useState } from 'react';

export default function CtaSection() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateEmail = (val) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('Please enter your email address.');
      return;
    }
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setError('');
    setLoading(true);

    // Frontend demo submission state
    // Structured for future backend contact endpoint connection (e.g. POST /api/contact)
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 500);
  };

  return (
    <section className="cta-section" id="contact">
      <div className="cta-container">
        <div className="cta-card">
          <div className="cta-content-left">
            <div className="cta-eyebrow">GET IN TOUCH</div>
            <h2 className="cta-title">
              Let’s talk maritime intelligence.
            </h2>
            <p className="cta-description">
              Tell us where you’d like to take your maritime intelligence workflow.
            </p>
          </div>

          <div className="cta-form-right">
            {submitted ? (
              <div className="cta-success-message">
                <div className="cta-success-badge">✓</div>
                <h3 className="cta-success-title">Message Received</h3>
                <p className="cta-success-desc">
                  Thank you! We’ll be in touch with you shortly.
                </p>
                <button
                  type="button"
                  className="cta-reset-btn"
                  onClick={() => {
                    setSubmitted(false);
                    setEmail('');
                  }}
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="cta-form" noValidate>
                <div className="cta-input-group">
                  <input
                    type="email"
                    className={`cta-email-input ${error ? 'cta-input-error' : ''}`}
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError('');
                    }}
                    aria-label="Email address"
                    disabled={loading}
                  />
                  <button
                    type="submit"
                    className="cta-submit-btn"
                    disabled={loading}
                  >
                    {loading ? 'Sending...' : 'Send →'}
                  </button>
                </div>

                {error && <p className="cta-error-text">{error}</p>}

                <p className="cta-disclaimer">
                  We’ll only use your email to respond to your enquiry.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
