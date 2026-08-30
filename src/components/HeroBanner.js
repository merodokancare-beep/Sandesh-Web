'use client';

import { useState } from 'react';

export default function HeroBanner({ onSuccessLead }) {
  const [formData, setFormData] = useState({
    clientName: '',
    clientPhone: '',
    startDate: '',
    region: 'North Sikkim (Gurudongmar & Yumthang)',
    numTravelers: '2'
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.clientName || !formData.clientPhone) {
      alert('Please enter your name and phone number.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientName: formData.clientName,
          clientPhone: formData.clientPhone,
          startDate: formData.startDate || null,
          numTravelers: parseInt(formData.numTravelers, 10) || 2,
          travelDates: formData.startDate ? `Starts on ${formData.startDate}` : 'Flexible Dates',
          packageName: `Hero Quick Search: ${formData.region}`,
          notes: `Region: ${formData.region}`
        })
      });

      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
        if (onSuccessLead) onSuccessLead(data.lead);
      } else {
        alert(data.error || 'Failed to submit inquiry.');
      }
    } catch (err) {
      console.error(err);
      alert('Network error. Please reach us directly via WhatsApp.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section style={{
      position: 'relative',
      padding: '6rem 0 5rem',
      backgroundImage: 'linear-gradient(180deg, rgba(8, 12, 20, 0.75) 0%, rgba(8, 12, 20, 0.95) 100%), url(/images/gurudongmar.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center 30%',
      borderBottom: '1px solid var(--border)',
      overflow: 'hidden'
    }}>
      {/* Subtle Background Glows */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '5%',
        width: '350px',
        height: '350px',
        background: 'radial-gradient(circle, rgba(16, 185, 129, 0.08) 0%, transparent 70%)',
        filter: 'blur(40px)',
        pointerEvents: 'none'
      }}></div>
      <div style={{
        position: 'absolute',
        top: '30%',
        right: '5%',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, transparent 70%)',
        filter: 'blur(50px)',
        pointerEvents: 'none'
      }}></div>

      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '880px', margin: '0 auto', textAlign: 'center', marginBottom: '3.5rem' }}>
          {/* Top verified badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
            <span className="badge badge-emerald">
              <span className="pulse-dot"></span> Official Local Tour Operator & 20+ Fleet Owner
            </span>
          </div>

          {/* Heading */}
          <h1 style={{
            fontSize: 'clamp(2.4rem, 5vw, 4rem)',
            lineHeight: 1.12,
            marginBottom: '1.5rem',
            letterSpacing: '-0.03em'
          }}>
            Experience Sikkim Like Never Before with <span className="text-gradient-emerald">Custom Tailored Journeys</span>
          </h1>

          <p style={{
            color: 'var(--text-secondary)',
            fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
            maxWidth: '720px',
            margin: '0 auto 2.5rem',
            lineHeight: 1.6
          }}>
            From Gurudongmar Lake’s crystal turquoise waters to the scenic Silk Route and Pelling Skywalk. Plan your personalized Himalayan vacation with direct local pricing and instant WhatsApp itineraries.
          </p>

          {/* Quick Key Highlights */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '1.5rem',
            marginBottom: '1rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#cbd5e1', fontSize: '0.9rem' }}>
              <i className="fa-solid fa-car-side" style={{ color: 'var(--primary)' }}></i> 20+ Company-Owned Cabs
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#cbd5e1', fontSize: '0.9rem' }}>
              <i className="fa-solid fa-file-shield" style={{ color: 'var(--accent-gold)' }}></i> Hassle-Free Permits
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#cbd5e1', fontSize: '0.9rem' }}>
              <i className="fa-solid fa-headset" style={{ color: 'var(--accent-teal)' }}></i> 24/7 On-Trip Assistance
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#cbd5e1', fontSize: '0.9rem' }}>
              <i className="fa-solid fa-bolt" style={{ color: '#60a5fa' }}></i> Instant WhatsApp Quotation
            </div>
          </div>
        </div>

        {/* Floating Quick Lead Inquiry Bar */}
        <div className="glass-card" style={{
          maxWidth: '1050px',
          margin: '0 auto',
          padding: '2rem',
          boxShadow: 'var(--shadow-glow), 0 20px 40px rgba(0,0,0,0.5)',
          border: '1px solid rgba(16, 185, 129, 0.25)',
          background: 'rgba(15, 23, 42, 0.85)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <i className="fa-solid fa-compass" style={{ color: 'var(--primary)', fontSize: '1.2rem' }}></i>
              <h3 style={{ fontSize: '1.2rem', margin: 0 }}>Instant Trip Inquiry & Custom Quote</h3>
            </div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              ⚡ Average quotation turnaround: <strong>Under 5 minutes</strong>
            </span>
          </div>

          {submitted ? (
            <div style={{
              background: 'rgba(16, 185, 129, 0.12)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              borderRadius: 'var(--radius-md)',
              padding: '1.75rem',
              textAlign: 'center'
            }}>
              <i className="fa-solid fa-circle-check" style={{ fontSize: '2.5rem', color: '#34d399', marginBottom: '0.75rem' }}></i>
              <h4 style={{ fontSize: '1.3rem', color: '#fff', marginBottom: '0.5rem' }}>Inquiry Received Successfully!</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: '600px', margin: '0 auto 1.25rem' }}>
                Thank you, <strong>{formData.clientName}</strong>. Our travel specialist has received your inquiry in our CMS and will send your customized itinerary with vehicle details to <strong>{formData.clientPhone}</strong> via WhatsApp.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="btn btn-secondary btn-sm"
              >
                Submit Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '1rem',
              alignItems: 'flex-end'
            }}>
              {/* Destination selector */}
              <div className="form-group">
                <label className="form-label">
                  <i className="fa-solid fa-map-pin" style={{ color: 'var(--primary)', marginRight: '4px' }}></i> Destination Region
                </label>
                <select
                  className="form-select"
                  value={formData.region}
                  onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                >
                  <option value="North Sikkim (Gurudongmar & Yumthang)">North Sikkim (Lachen & Lachung)</option>
                  <option value="Gangtok, Tsomgo Lake & Nathula">Gangtok & East Sikkim</option>
                  <option value="Pelling & West Sikkim Heritage">Pelling & West Sikkim</option>
                  <option value="Old Silk Route & Zuluk Circuit">Old Silk Route & Zuluk</option>
                  <option value="Darjeeling & Kalimpong Combo">Darjeeling & Kalimpong</option>
                  <option value="Complete Sikkim Grand Tour (7-10 Days)">Complete Sikkim Grand Tour</option>
                </select>
              </div>

              {/* Start Date */}
              <div className="form-group">
                <label className="form-label">
                  <i className="fa-regular fa-calendar" style={{ color: 'var(--accent-teal)', marginRight: '4px' }}></i> Travel Date
                </label>
                <input
                  type="date"
                  className="form-input"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              {/* Travelers */}
              <div className="form-group">
                <label className="form-label">
                  <i className="fa-solid fa-users" style={{ color: 'var(--accent-gold)', marginRight: '4px' }}></i> Travelers
                </label>
                <select
                  className="form-select"
                  value={formData.numTravelers}
                  onChange={(e) => setFormData({ ...formData, numTravelers: e.target.value })}
                >
                  <option value="1">1 Solo Traveler</option>
                  <option value="2">2 Travelers (Couple)</option>
                  <option value="4">3-4 Travelers (Family)</option>
                  <option value="6">5-6 Travelers (SUV Group)</option>
                  <option value="10">7-12+ Travelers (Tempo Group)</option>
                </select>
              </div>

              {/* Your Name */}
              <div className="form-group">
                <label className="form-label">
                  <i className="fa-regular fa-user" style={{ color: '#60a5fa', marginRight: '4px' }}></i> Your Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  className="form-input"
                  value={formData.clientName}
                  onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                />
              </div>

              {/* Phone / WhatsApp */}
              <div className="form-group">
                <label className="form-label">
                  <i className="fa-brands fa-whatsapp" style={{ color: '#25D366', marginRight: '4px' }}></i> Phone / WhatsApp *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  className="form-input"
                  value={formData.clientPhone}
                  onChange={(e) => setFormData({ ...formData, clientPhone: e.target.value })}
                />
              </div>

              {/* Submit CTA */}
              <div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn btn-primary"
                  style={{ width: '100%', height: '46px', fontSize: '0.95rem' }}
                  id="hero-search-submit-btn"
                >
                  {submitting ? (
                    <>
                      <i className="fa-solid fa-spinner fa-spin"></i> Submitting...
                    </>
                  ) : (
                    <>
                      <i className="fa-solid fa-paper-plane"></i> Get Quote
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
