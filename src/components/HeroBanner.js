'use client';

import { useState } from 'react';

export default function HeroBanner({ onSuccessLead }) {
  const [formData, setFormData] = useState({
    clientName: '',
    clientPhone: '',
    startDate: '',
    region: 'North Sikkim (Gurudongmar & Yumthang)',
    numAdults: 2,
    numChildren: 0,
    childrenAges: []
  });
  const [travelersOpen, setTravelersOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const getTravelersSummaryText = () => {
    const adults = `${formData.numAdults} Adult${formData.numAdults > 1 ? 's' : ''}`;
    if (formData.numChildren === 0) return adults;
    return `${adults}, ${formData.numChildren} Child${formData.numChildren > 1 ? 'ren' : ''}`;
  };

  const updateAdults = (delta) => {
    setFormData(prev => ({
      ...prev,
      numAdults: Math.max(1, Math.min(20, prev.numAdults + delta))
    }));
  };

  const updateChildren = (delta) => {
    setFormData(prev => {
      const newCount = Math.max(0, Math.min(6, prev.numChildren + delta));
      const newAges = [...prev.childrenAges];
      while (newAges.length < newCount) {
        newAges.push('5 Years');
      }
      return {
        ...prev,
        numChildren: newCount,
        childrenAges: newAges.slice(0, newCount)
      };
    });
  };

  const handleChildAgeChange = (index, age) => {
    setFormData(prev => {
      const updated = [...prev.childrenAges];
      updated[index] = age;
      return { ...prev, childrenAges: updated };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.clientName || !formData.clientPhone) {
      alert('Please enter your name and phone number.');
      return;
    }

    const adultsNum = formData.numAdults || 2;
    const childrenNum = formData.numChildren || 0;
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
          packageName: `Hero Quick Search: ${formData.region}`,
          notes: `Region: ${formData.region}${childrenNum > 0 ? ` | Children: ${childrenNum} (Ages: ${childAgesSummary})` : ''}`
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
      padding: '5.5rem 0 4.5rem',
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
        <div style={{ maxWidth: '880px', margin: '0 auto', textAlign: 'center', marginBottom: '3rem' }}>
          {/* Top verified badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
            <span className="badge badge-emerald">
              <span className="pulse-dot"></span> Govt. of Sikkim Registered Operator (Reg: 1667/DoT&CAv/Gtk/24/TA) • 20+ Owned Fleet
            </span>
          </div>

          {/* Heading */}
          <h1 style={{
            fontSize: 'clamp(2.3rem, 4.8vw, 3.8rem)',
            lineHeight: 1.14,
            marginBottom: '1.25rem',
            letterSpacing: '-0.03em'
          }}>
            Experience Sikkim Like Never Before with <span className="text-gradient-emerald">Custom Tailored Journeys</span>
          </h1>

          <p style={{
            color: 'var(--text-secondary)',
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            maxWidth: '720px',
            margin: '0 auto 2.25rem',
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
            marginBottom: '0.5rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#cbd5e1', fontSize: '0.88rem' }}>
              <i className="fa-solid fa-car-side" style={{ color: 'var(--primary)' }}></i> 20+ Company-Owned Cabs
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-gold)' }}>
              <i className="fa-solid fa-file-shield"></i> Hassle-Free Permits
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-teal)' }}>
              <i className="fa-solid fa-headset"></i> 24/7 On-Trip Assistance
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#60a5fa', fontSize: '0.88rem' }}>
              <i className="fa-solid fa-bolt"></i> Instant WhatsApp Quotation
            </div>
          </div>
        </div>

        {/* Quick Lead Inquiry Bar */}
        <div className="glass-card" style={{
          maxWidth: '1160px',
          margin: '0 auto',
          padding: '1.75rem 2rem',
          boxShadow: 'var(--shadow-glow), 0 20px 40px rgba(0,0,0,0.5)',
          border: '1px solid rgba(16, 185, 129, 0.25)',
          background: 'rgba(15, 23, 42, 0.92)'
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
                Thank you, <strong>{formData.clientName}</strong>. Our travel specialist has received your inquiry for <strong>{formData.numAdults} Adult(s){formData.numChildren > 0 ? ` & ${formData.numChildren} Child(ren) (Ages: ${formData.childrenAges.join(', ')})` : ''}</strong> in our CMS and will send your customized itinerary with vehicle details to <strong>{formData.clientPhone}</strong> via WhatsApp.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="btn btn-secondary btn-sm"
              >
                Submit Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="hero-quote-form">
                {/* 1. Destination selector */}
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label" style={{ marginBottom: '6px' }}>
                    <i className="fa-solid fa-map-pin" style={{ color: 'var(--primary)', marginRight: '4px' }}></i> Destination Region
                  </label>
                  <select
                    className="form-select"
                    style={{ height: '46px', fontSize: '0.88rem' }}
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

                {/* 2. Start Date */}
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label" style={{ marginBottom: '6px' }}>
                    <i className="fa-regular fa-calendar" style={{ color: 'var(--accent-teal)', marginRight: '4px' }}></i> Travel Date
                  </label>
                  <input
                    type="date"
                    className="form-input"
                    style={{ height: '46px', fontSize: '0.88rem' }}
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>

                {/* 3. Travelers */}
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label" style={{ marginBottom: '6px' }}>
                    <i className="fa-solid fa-users" style={{ color: 'var(--accent-gold)', marginRight: '4px' }}></i> Travelers
                  </label>
                  <button
                    type="button"
                    onClick={() => setTravelersOpen(!travelersOpen)}
                    className="form-input"
                    id="hero-travelers-btn"
                    style={{
                      height: '46px',
                      fontSize: '0.88rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                      textAlign: 'left',
                      padding: '0 0.85rem',
                      background: 'rgba(15, 23, 42, 0.85)',
                      borderColor: travelersOpen ? 'var(--primary)' : (formData.numChildren > 0 ? '#38bdf8' : 'var(--border)'),
                      color: '#fff'
                    }}
                  >
                    <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {getTravelersSummaryText()}
                    </span>
                    <i className={`fa-solid fa-chevron-${travelersOpen ? 'up' : 'down'}`} style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginLeft: '6px' }}></i>
                  </button>
                </div>

                {/* 4. Your Name */}
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label" style={{ marginBottom: '6px' }}>
                    <i className="fa-regular fa-user" style={{ color: '#60a5fa', marginRight: '4px' }}></i> Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    className="form-input"
                    style={{ height: '46px', fontSize: '0.88rem' }}
                    value={formData.clientName}
                    onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                  />
                </div>

                {/* 5. Phone / WhatsApp */}
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label" style={{ marginBottom: '6px' }}>
                    <i className="fa-brands fa-whatsapp" style={{ color: '#25D366', marginRight: '4px' }}></i> WhatsApp Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    className="form-input"
                    style={{ height: '46px', fontSize: '0.88rem' }}
                    value={formData.clientPhone}
                    onChange={(e) => setFormData({ ...formData, clientPhone: e.target.value })}
                  />
                </div>

                {/* 6. Submit CTA */}
                <div style={{ margin: 0 }}>
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
              </div>

              {/* Inline Travelers & Child Details Tray (Cleanly inside card, no overflow/overlap) */}
              {travelersOpen && (
                <div style={{
                  marginTop: '1.25rem',
                  padding: '1rem 1.25rem',
                  background: 'rgba(9, 15, 27, 0.95)',
                  border: '1px solid rgba(56, 189, 248, 0.35)',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.85rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#38bdf8', fontSize: '0.88rem', fontWeight: 600 }}>
                      <i className="fa-solid fa-users"></i>
                      <span>Travelers & Child Details</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <span style={{ fontSize: '0.74rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <i className="fa-solid fa-shield-halved" style={{ color: 'var(--accent-gold)' }}></i>
                        Required by Sikkim Tourism Dept for high-altitude permits & vehicle seating
                      </span>
                      <button
                        type="button"
                        onClick={() => setTravelersOpen(false)}
                        className="btn btn-primary btn-sm"
                        style={{ height: '30px', padding: '0 0.85rem', fontSize: '0.8rem' }}
                      >
                        Done
                      </button>
                    </div>
                  </div>

                  {/* Adults & Children Counters */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '1.75rem',
                    paddingBottom: formData.numChildren > 0 ? '0.75rem' : '0.25rem',
                    borderBottom: formData.numChildren > 0 ? '1px solid rgba(255, 255, 255, 0.08)' : 'none'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <span style={{ fontSize: '0.85rem', color: '#fff', fontWeight: 500 }}>Adults (12+ yrs):</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                        <button
                          type="button"
                          onClick={() => updateAdults(-1)}
                          disabled={formData.numAdults <= 1}
                          style={{
                            width: '30px',
                            height: '30px',
                            borderRadius: '6px',
                            border: '1px solid var(--border)',
                            background: formData.numAdults <= 1 ? 'rgba(255,255,255,0.05)' : 'var(--bg-surface-elevated)',
                            color: formData.numAdults <= 1 ? 'var(--text-muted)' : '#fff',
                            cursor: formData.numAdults <= 1 ? 'not-allowed' : 'pointer',
                            fontWeight: 700,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          -
                        </button>
                        <span style={{ minWidth: '24px', textAlign: 'center', fontWeight: 700, color: '#fff', fontSize: '0.95rem' }}>
                          {formData.numAdults}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateAdults(1)}
                          style={{
                            width: '30px',
                            height: '30px',
                            borderRadius: '6px',
                            border: '1px solid var(--border)',
                            background: 'var(--bg-surface-elevated)',
                            color: '#fff',
                            cursor: 'pointer',
                            fontWeight: 700,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <span style={{ fontSize: '0.85rem', color: '#38bdf8', fontWeight: 500 }}>Children (0-11 yrs):</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                        <button
                          type="button"
                          onClick={() => updateChildren(-1)}
                          disabled={formData.numChildren <= 0}
                          style={{
                            width: '30px',
                            height: '30px',
                            borderRadius: '6px',
                            border: '1px solid var(--border)',
                            background: formData.numChildren <= 0 ? 'rgba(255,255,255,0.05)' : 'var(--bg-surface-elevated)',
                            color: formData.numChildren <= 0 ? 'var(--text-muted)' : '#fff',
                            cursor: formData.numChildren <= 0 ? 'not-allowed' : 'pointer',
                            fontWeight: 700,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          -
                        </button>
                        <span style={{ minWidth: '24px', textAlign: 'center', fontWeight: 700, color: '#38bdf8', fontSize: '0.95rem' }}>
                          {formData.numChildren}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateChildren(1)}
                          disabled={formData.numChildren >= 6}
                          style={{
                            width: '30px',
                            height: '30px',
                            borderRadius: '6px',
                            border: '1px solid var(--border)',
                            background: 'var(--bg-surface-elevated)',
                            color: '#fff',
                            cursor: formData.numChildren >= 6 ? 'not-allowed' : 'pointer',
                            fontWeight: 700,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Child Age Selectors */}
                  {formData.numChildren > 0 && (
                    <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                      {Array.from({ length: formData.numChildren }).map((_, idx) => (
                        <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <label style={{ fontSize: '0.8rem', color: '#cbd5e1', whiteSpace: 'nowrap' }}>
                            Child {idx + 1} Age:
                          </label>
                          <select
                            className="form-select"
                            value={formData.childrenAges[idx] || '5 Years'}
                            onChange={(e) => handleChildAgeChange(idx, e.target.value)}
                            style={{
                              height: '36px',
                              fontSize: '0.82rem',
                              padding: '0.2rem 0.65rem',
                              minWidth: '140px',
                              background: '#060a12',
                              borderColor: 'rgba(56, 189, 248, 0.4)'
                            }}
                          >
                            <option value="Under 2 (Infant)">Under 2 yrs (Infant)</option>
                            <option value="2 Years">2 Years Old</option>
                            <option value="3 Years">3 Years Old</option>
                            <option value="4 Years">4 Years Old</option>
                            <option value="5 Years">5 Years Old</option>
                            <option value="6 Years">6 Years Old</option>
                            <option value="7 Years">7 Years Old</option>
                            <option value="8 Years">8 Years Old</option>
                            <option value="9 Years">9 Years Old</option>
                            <option value="10 Years">10 Years Old</option>
                            <option value="11 Years">11 Years Old</option>
                          </select>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </form>
          )}
        </div>
      </div>

      <style jsx>{`
        .hero-quote-form {
          display: grid;
          grid-template-columns: 1.3fr 1fr 1.15fr 1fr 1.15fr 0.95fr;
          gap: 0.85rem;
          align-items: flex-end;
        }

        @media (max-width: 1040px) and (min-width: 680px) {
          .hero-quote-form {
            grid-template-columns: 1fr 1fr 1fr;
            gap: 1rem;
          }
        }

        @media (max-width: 679px) {
          .hero-quote-form {
            grid-template-columns: 1fr;
            gap: 0.9rem;
          }
        }
      `}</style>
    </section>
  );
}
