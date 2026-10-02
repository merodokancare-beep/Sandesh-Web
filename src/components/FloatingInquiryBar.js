'use client';

import { useState, useEffect } from 'react';

export default function FloatingInquiryBar({ onSuccessLead }) {
  const [visible, setVisible] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [formData, setFormData] = useState({
    clientName: '',
    clientPhone: '',
    region: 'North Sikkim (Gurudongmar & Yumthang)',
    startDate: '',
    numAdults: '2',
    numChildren: '0',
    childrenAges: []
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show floating bar once user scrolls past the hero section (e.g. > 450px)
      if (window.scrollY > 450) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  const handleChildrenCountChange = (value) => {
    const count = parseInt(value, 10) || 0;
    const currentAges = [...formData.childrenAges];
    const updatedAges = [];
    for (let i = 0; i < count; i++) {
      updatedAges.push(currentAges[i] || '5 Years');
    }
    setFormData(prev => ({
      ...prev,
      numChildren: value,
      childrenAges: updatedAges
    }));
  };

  const handleChildAgeChange = (index, age) => {
    const updatedAges = [...formData.childrenAges];
    updatedAges[index] = age;
    setFormData(prev => ({
      ...prev,
      childrenAges: updatedAges
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.clientName || !formData.clientPhone) {
      alert('Please enter your name and phone number.');
      return;
    }

    const adultsNum = parseInt(formData.numAdults, 10) || 2;
    const childrenNum = parseInt(formData.numChildren, 10) || 0;
    const totalTravelers = adultsNum + childrenNum;
    const childAgesSummary = childrenNum > 0 ? formData.childrenAges.slice(0, childrenNum).join(', ') : '';

    setSubmitting(true);
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientName: formData.clientName,
          clientPhone: formData.clientPhone,
          startDate: formData.startDate || null,
          numTravelers: totalTravelers,
          numAdults: adultsNum,
          numChildren: childrenNum,
          childrenAges: formData.childrenAges.slice(0, childrenNum),
          travelDates: formData.startDate ? `Starts on ${formData.startDate}` : 'Flexible Dates',
          packageName: `Floating Bar: ${formData.region}`,
          notes: `Region: ${formData.region} (Captured from floating bar)${childrenNum > 0 ? ` | Children: ${childrenNum} (Ages: ${childAgesSummary})` : ''}`
        })
      });

      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
        if (onSuccessLead) onSuccessLead(data.lead);
        setTimeout(() => {
          setSubmitted(false);
        }, 5000);
      } else {
        alert(data.error || 'Failed to submit inquiry.');
      }
    } catch (err) {
      console.error(err);
      alert('Network error. Please try again or reach out on WhatsApp.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 850,
        width: '95%',
        maxWidth: '1180px',
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        animation: 'slideUp 0.35s ease-out'
      }}
    >
      <div
        style={{
          background: 'rgba(11, 17, 30, 0.95)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(16, 185, 129, 0.4)',
          borderRadius: 'var(--radius-md)',
          padding: minimized ? '0.75rem 1.25rem' : '1.1rem 1.5rem',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.7), 0 0 25px rgba(16, 185, 129, 0.25)'
        }}
      >
        {/* Top Mini Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: minimized ? 0 : '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span className="pulse-dot"></span>
            <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <i className="fa-solid fa-bolt" style={{ color: 'var(--accent-gold)' }}></i>
              <span>Instant Trip Quote & WhatsApp Itinerary</span>
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'none', '@media (minWidth: 768px)': { display: 'inline' } }}>
              (⚡ Average turnaround: &lt; 5 mins)
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button
              onClick={() => setMinimized(!minimized)}
              style={{
                background: 'var(--bg-surface-elevated)',
                border: '1px solid var(--border)',
                color: '#cbd5e1',
                borderRadius: '6px',
                padding: '0.25rem 0.6rem',
                fontSize: '0.75rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem'
              }}
            >
              <span>{minimized ? 'Expand Form ▲' : 'Minimize ▼'}</span>
            </button>
          </div>
        </div>

        {/* Form Body (Hidden if Minimized) */}
        {!minimized && (
          <div>
            {submitted ? (
              <div style={{
                background: 'rgba(16, 185, 129, 0.15)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-sm)',
                textAlign: 'center',
                color: '#34d399',
                fontSize: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem'
              }}>
                <i className="fa-solid fa-circle-check" style={{ fontSize: '1.2rem' }}></i>
                <span>Inquiry received for <strong>{formData.clientName}</strong>! Our travel specialist will WhatsApp you at <strong>{formData.clientPhone}</strong>.</span>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                  gap: '0.75rem',
                  alignItems: 'center'
                }}
              >
                {/* Destination */}
                <div style={{ position: 'relative' }}>
                  <select
                    className="form-select"
                    style={{ padding: '0.6rem 0.8rem', fontSize: '0.85rem', height: '40px' }}
                    value={formData.region}
                    onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                  >
                    <option value="North Sikkim (Gurudongmar & Yumthang)">North Sikkim (Lachen/Lachung)</option>
                    <option value="Gangtok, Tsomgo Lake & Nathula">Gangtok & East Sikkim</option>
                    <option value="Pelling & West Sikkim Heritage">Pelling & West Sikkim</option>
                    <option value="Old Silk Route & Zuluk Circuit">Old Silk Route & Zuluk</option>
                    <option value="Complete Sikkim Grand Tour">Complete Sikkim Grand Tour</option>
                  </select>
                </div>

                {/* Date */}
                <div>
                  <input
                    type="date"
                    className="form-input"
                    style={{ padding: '0.6rem 0.8rem', fontSize: '0.85rem', height: '40px' }}
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    min={new Date().toISOString().split('T')[0]}
                    placeholder="Travel Date"
                  />
                </div>

                {/* Adults */}
                <div>
                  <select
                    className="form-select"
                    style={{ padding: '0.6rem 0.8rem', fontSize: '0.85rem', height: '40px' }}
                    value={formData.numAdults}
                    onChange={(e) => setFormData({ ...formData, numAdults: e.target.value })}
                  >
                    <option value="1">1 Adult</option>
                    <option value="2">2 Adults (Couple)</option>
                    <option value="3">3 Adults</option>
                    <option value="4">4 Adults</option>
                    <option value="6">5-6 Adults</option>
                    <option value="10">7-10+ (Tempo)</option>
                  </select>
                </div>

                {/* Children */}
                <div>
                  <select
                    className="form-select"
                    style={{
                      padding: '0.6rem 0.8rem',
                      fontSize: '0.85rem',
                      height: '40px',
                      borderColor: parseInt(formData.numChildren, 10) > 0 ? '#38bdf8' : undefined
                    }}
                    value={formData.numChildren}
                    onChange={(e) => handleChildrenCountChange(e.target.value)}
                  >
                    <option value="0">0 Kids</option>
                    <option value="1">1 Child</option>
                    <option value="2">2 Kids</option>
                    <option value="3">3 Kids</option>
                  </select>
                </div>

                {/* Name */}
                <div>
                  <input
                    type="text"
                    required
                    placeholder="Your Name *"
                    className="form-input"
                    style={{ padding: '0.6rem 0.8rem', fontSize: '0.85rem', height: '40px' }}
                    value={formData.clientName}
                    onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                  />
                </div>

                {/* WhatsApp Phone */}
                <div>
                  <input
                    type="tel"
                    required
                    placeholder="WhatsApp Phone *"
                    className="form-input"
                    style={{ padding: '0.6rem 0.8rem', fontSize: '0.85rem', height: '40px' }}
                    value={formData.clientPhone}
                    onChange={(e) => setFormData({ ...formData, clientPhone: e.target.value })}
                  />
                </div>

                {/* Submit Button */}
                <div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn btn-primary"
                    style={{ width: '100%', height: '40px', padding: '0.4rem 1rem', fontSize: '0.9rem' }}
                    id="floating-quote-submit-btn"
                  >
                    {submitting ? (
                      <i className="fa-solid fa-spinner fa-spin"></i>
                    ) : (
                      <>
                        <i className="fa-solid fa-paper-plane"></i> Get Quote
                      </>
                    )}
                  </button>
                </div>

                {/* Floating Bar Child Ages row when children > 0 */}
                {parseInt(formData.numChildren, 10) > 0 && (
                  <div style={{
                    gridColumn: '1 / -1',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    flexWrap: 'wrap',
                    background: 'rgba(56, 189, 248, 0.1)',
                    border: '1px solid rgba(56, 189, 248, 0.3)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '0.5rem 0.85rem',
                    marginTop: '0.25rem'
                  }}>
                    <span style={{ fontSize: '0.78rem', color: '#38bdf8', fontWeight: 600 }}>
                      <i className="fa-solid fa-child" style={{ marginRight: '4px' }}></i> Child Ages:
                    </span>
                    {Array.from({ length: parseInt(formData.numChildren, 10) }).map((_, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Child {idx + 1}:</span>
                        <select
                          className="form-select"
                          value={formData.childrenAges[idx] || '5 Years'}
                          onChange={(e) => handleChildAgeChange(idx, e.target.value)}
                          style={{
                            height: '32px',
                            padding: '0.2rem 0.5rem',
                            fontSize: '0.78rem',
                            background: '#0b111e',
                            minWidth: '100px'
                          }}
                        >
                          <option value="Under 2 (Infant)">Under 2 (Infant)</option>
                          <option value="2 Years">2 Years</option>
                          <option value="3 Years">3 Years</option>
                          <option value="4 Years">4 Years</option>
                          <option value="5 Years">5 Years</option>
                          <option value="6 Years">6 Years</option>
                          <option value="7 Years">7 Years</option>
                          <option value="8 Years">8 Years</option>
                          <option value="9 Years">9 Years</option>
                          <option value="10 Years">10 Years</option>
                          <option value="11 Years">11 Years</option>
                          <option value="12 Years">12 Years</option>
                          <option value="13-17 (Teen)">13-17 (Teen)</option>
                        </select>
                      </div>
                    ))}
                  </div>
                )}
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
