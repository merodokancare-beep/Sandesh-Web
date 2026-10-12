'use client';

import { useState } from 'react';

export default function HeroBanner({ onSuccessLead }) {
  const [formData, setFormData] = useState({
    clientName: '',
    clientPhone: '',
    startDate: '',
    endDate: '',
    region: 'North Sikkim (Gurudongmar & Yumthang)',
    numAdults: 2,
    numChildren: 0,
    numElderly: 0,
    childrenAges: []
  });
  const [travelersOpen, setTravelersOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const calculateDuration = () => {
    if (!formData.startDate || !formData.endDate) return null;
    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    const diffTime = end.getTime() - start.getTime();
    const diffDays = Math.round(diffTime / (1000 * 3600 * 24)) + 1;
    if (diffDays <= 0) return null;
    const nights = Math.max(0, diffDays - 1);
    return `${diffDays}D / ${nights}N`;
  };

  const getTravelersSummaryText = () => {
    const parts = [];
    if (formData.numAdults > 0) parts.push(`${formData.numAdults} Adult${formData.numAdults > 1 ? 's' : ''}`);
    if (formData.numChildren > 0) parts.push(`${formData.numChildren} Child${formData.numChildren > 1 ? 'ren' : ''}`);
    if (formData.numElderly > 0) parts.push(`${formData.numElderly} Senior${formData.numElderly > 1 ? 's' : ''}`);
    const total = formData.numAdults + formData.numChildren + (formData.numElderly || 0);
    return parts.length > 0 ? `${parts.join(', ')} (${total})` : '2 Adults';
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

  const updateElderly = (delta) => {
    setFormData(prev => ({
      ...prev,
      numElderly: Math.max(0, Math.min(10, (prev.numElderly || 0) + delta))
    }));
  };

  const handleStartDateChange = (val) => {
    setFormData(prev => {
      const next = { ...prev, startDate: val };
      if (prev.endDate && prev.endDate < val) {
        next.endDate = val;
      }
      return next;
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
    const elderlyNum = formData.numElderly || 0;
    const totalTravelers = adultsNum + childrenNum + elderlyNum;
    const childAgesSummary = childrenNum > 0 ? formData.childrenAges.slice(0, childrenNum).join(', ') : '';

    const dur = calculateDuration();
    let datesSummary = 'Flexible Dates';
    if (formData.startDate && formData.endDate) {
      datesSummary = `${formData.startDate} to ${formData.endDate}${dur ? ` (${dur})` : ''}`;
    } else if (formData.startDate) {
      datesSummary = `Starts on ${formData.startDate}`;
    }

    const travelerNotesArr = [];
    if (adultsNum > 0) travelerNotesArr.push(`${adultsNum} Adult(s)`);
    if (childrenNum > 0) travelerNotesArr.push(`${childrenNum} Child(ren) (Ages: ${childAgesSummary || 'Not specified'})`);
    if (elderlyNum > 0) travelerNotesArr.push(`${elderlyNum} Elderly / Senior(s) (60+)`);

    setSubmitting(true);
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientName: formData.clientName,
          clientPhone: formData.clientPhone,
          startDate: formData.startDate || null,
          endDate: formData.endDate || null,
          numTravelers: totalTravelers,
          numAdults: adultsNum,
          numChildren: childrenNum,
          numElderly: elderlyNum,
          childrenAges: formData.childrenAges.slice(0, childrenNum),
          travelDates: datesSummary,
          packageName: `Hero Quick Search: ${formData.region}`,
          notes: `Region: ${formData.region} | Travelers: ${travelerNotesArr.join(', ')}${elderlyNum > 0 ? ' [Requires senior-friendly seating/acclimatization]' : ''}`
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
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: '650px', margin: '0 auto 1.25rem' }}>
                Thank you, <strong>{formData.clientName}</strong>. Our travel specialist has received your inquiry for <strong>{formData.numAdults} Adult(s){formData.numChildren > 0 ? `, ${formData.numChildren} Child(ren)` : ''}{formData.numElderly > 0 ? `, ${formData.numElderly} Senior Citizen(s)` : ''}</strong> {formData.startDate ? `(${formData.startDate}${formData.endDate ? ` to ${formData.endDate}` : ''})` : ''} in our CMS and will send your customized itinerary with vehicle details to <strong>{formData.clientPhone}</strong> via WhatsApp.
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
                {/* ROW 1: Trip Parameters */}
                <div className="hero-quote-row-1">
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
                      <i className="fa-regular fa-calendar-plus" style={{ color: 'var(--accent-teal)', marginRight: '4px' }}></i> Start Date
                    </label>
                    <input
                      type="date"
                      className="form-input"
                      style={{ height: '46px', fontSize: '0.88rem' }}
                      value={formData.startDate}
                      onChange={(e) => handleStartDateChange(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>

                  {/* 3. End Date */}
                  <div className="form-group" style={{ margin: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <label className="form-label" style={{ margin: 0 }}>
                        <i className="fa-regular fa-calendar-check" style={{ color: '#38bdf8', marginRight: '4px' }}></i> End Date
                      </label>
                      {calculateDuration() && (
                        <span style={{ fontSize: '0.72rem', color: '#34d399', fontWeight: 700, background: 'rgba(16, 185, 129, 0.15)', padding: '2px 6px', borderRadius: '4px', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                          {calculateDuration()}
                        </span>
                      )}
                    </div>
                    <input
                      type="date"
                      className="form-input"
                      style={{ height: '46px', fontSize: '0.88rem' }}
                      value={formData.endDate}
                      onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                      min={formData.startDate || new Date().toISOString().split('T')[0]}
                    />
                  </div>

                  {/* 4. Travelers button */}
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
                        borderColor: travelersOpen ? 'var(--primary)' : (formData.numElderly > 0 ? 'var(--accent-gold)' : formData.numChildren > 0 ? '#38bdf8' : 'var(--border)'),
                        color: '#fff'
                      }}
                    >
                      <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {getTravelersSummaryText()}
                      </span>
                      <i className={`fa-solid fa-chevron-${travelersOpen ? 'up' : 'down'}`} style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginLeft: '6px' }}></i>
                    </button>
                  </div>
                </div>

                {/* ROW 2: Contact & Submit CTA */}
                <div className="hero-quote-row-2">
                  {/* 5. Your Name */}
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

                  {/* 6. Phone / WhatsApp */}
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

                  {/* 7. Submit CTA */}
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
              </div>

              {/* Inline Travelers & Categories Tray */}
              {travelersOpen && (
                <div style={{
                  marginTop: '1.25rem',
                  padding: '1.2rem 1.35rem',
                  background: 'rgba(9, 15, 27, 0.98)',
                  border: '1px solid rgba(56, 189, 248, 0.35)',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                  animation: 'fadeIn 0.2s ease-out'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#38bdf8', fontSize: '0.9rem', fontWeight: 700 }}>
                      <i className="fa-solid fa-users"></i>
                      <span>Traveler Categories (Adults, Children & Elderly)</span>
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
                        style={{ height: '30px', padding: '0 0.9rem', fontSize: '0.8rem' }}
                      >
                        Done
                      </button>
                    </div>
                  </div>

                  {/* 3 Categories: Adults, Children, Elderly */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
                    gap: '1.25rem',
                    padding: '0.75rem 0',
                    borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                    borderBottom: (formData.numChildren > 0 || formData.numElderly > 0) ? '1px solid rgba(255, 255, 255, 0.08)' : 'none'
                  }}>
                    {/* Category 1: Adults */}
                    <div style={{
                      background: 'rgba(15, 23, 42, 0.6)',
                      padding: '0.85rem 1rem',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}>
                      <div>
                        <div style={{ fontSize: '0.88rem', color: '#fff', fontWeight: 600 }}>
                          <i className="fa-solid fa-user" style={{ color: '#60a5fa', marginRight: '6px' }}></i> Adults
                        </div>
                        <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>Age 12 - 59 yrs</div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                        <button
                          type="button"
                          onClick={() => updateAdults(-1)}
                          disabled={formData.numAdults <= 1}
                          style={{
                            width: '32px',
                            height: '32px',
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
                        <span style={{ minWidth: '24px', textAlign: 'center', fontWeight: 700, color: '#fff', fontSize: '1rem' }}>
                          {formData.numAdults}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateAdults(1)}
                          style={{
                            width: '32px',
                            height: '32px',
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

                    {/* Category 2: Children */}
                    <div style={{
                      background: 'rgba(15, 23, 42, 0.6)',
                      padding: '0.85rem 1rem',
                      borderRadius: 'var(--radius-sm)',
                      border: formData.numChildren > 0 ? '1px solid rgba(56, 189, 248, 0.4)' : '1px solid var(--border)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}>
                      <div>
                        <div style={{ fontSize: '0.88rem', color: '#38bdf8', fontWeight: 600 }}>
                          <i className="fa-solid fa-child" style={{ color: '#38bdf8', marginRight: '6px' }}></i> Children
                        </div>
                        <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>Age 0 - 11 yrs</div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                        <button
                          type="button"
                          onClick={() => updateChildren(-1)}
                          disabled={formData.numChildren <= 0}
                          style={{
                            width: '32px',
                            height: '32px',
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
                        <span style={{ minWidth: '24px', textAlign: 'center', fontWeight: 700, color: '#38bdf8', fontSize: '1rem' }}>
                          {formData.numChildren}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateChildren(1)}
                          disabled={formData.numChildren >= 6}
                          style={{
                            width: '32px',
                            height: '32px',
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

                    {/* Category 3: Elderly Passengers */}
                    <div style={{
                      background: formData.numElderly > 0 ? 'rgba(245, 158, 11, 0.08)' : 'rgba(15, 23, 42, 0.6)',
                      padding: '0.85rem 1rem',
                      borderRadius: 'var(--radius-sm)',
                      border: formData.numElderly > 0 ? '1px solid rgba(245, 158, 11, 0.45)' : '1px solid var(--border)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}>
                      <div>
                        <div style={{ fontSize: '0.88rem', color: 'var(--accent-gold)', fontWeight: 600 }}>
                          <i className="fa-solid fa-person-cane" style={{ color: 'var(--accent-gold)', marginRight: '6px' }}></i> Elderly
                        </div>
                        <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>Age 60+ yrs (Seniors)</div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                        <button
                          type="button"
                          onClick={() => updateElderly(-1)}
                          disabled={formData.numElderly <= 0}
                          style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '6px',
                            border: '1px solid var(--border)',
                            background: formData.numElderly <= 0 ? 'rgba(255,255,255,0.05)' : 'var(--bg-surface-elevated)',
                            color: formData.numElderly <= 0 ? 'var(--text-muted)' : '#fff',
                            cursor: formData.numElderly <= 0 ? 'not-allowed' : 'pointer',
                            fontWeight: 700,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          -
                        </button>
                        <span style={{ minWidth: '24px', textAlign: 'center', fontWeight: 700, color: 'var(--accent-gold)', fontSize: '1rem' }}>
                          {formData.numElderly}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateElderly(1)}
                          disabled={formData.numElderly >= 10}
                          style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '6px',
                            border: '1px solid var(--border)',
                            background: 'var(--bg-surface-elevated)',
                            color: '#fff',
                            cursor: formData.numElderly >= 10 ? 'not-allowed' : 'pointer',
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

                  {/* Senior Citizen Care Alert */}
                  {formData.numElderly > 0 && (
                    <div style={{
                      background: 'rgba(245, 158, 11, 0.1)',
                      border: '1px solid rgba(245, 158, 11, 0.3)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '0.65rem 0.9rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.65rem',
                      fontSize: '0.8rem',
                      color: '#fbbf24'
                    }}>
                      <i className="fa-solid fa-heart-pulse" style={{ fontSize: '1.05rem', color: 'var(--accent-gold)', flexShrink: 0 }}></i>
                      <span>
                        <strong>Senior Citizen Comfort Care:</strong> We allocate middle-row low-vibration seating (Innova/Scorpio), plan relaxed high-altitude acclimatization, and provide portable oxygen assistance upon request for North Sikkim passes.
                      </span>
                    </div>
                  )}

                  {/* Child Age Selectors */}
                  {formData.numChildren > 0 && (
                    <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '0.85rem' }}>
                      <span style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: 600 }}>
                        <i className="fa-solid fa-child-reaching" style={{ color: '#38bdf8', marginRight: '4px' }}></i> Child Ages:
                      </span>
                      {Array.from({ length: formData.numChildren }).map((_, idx) => (
                        <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <label style={{ fontSize: '0.78rem', color: '#cbd5e1', whiteSpace: 'nowrap' }}>
                            Child {idx + 1}:
                          </label>
                          <select
                            className="form-select"
                            value={formData.childrenAges[idx] || '5 Years'}
                            onChange={(e) => handleChildAgeChange(idx, e.target.value)}
                            style={{
                              height: '34px',
                              fontSize: '0.8rem',
                              padding: '0.2rem 0.6rem',
                              minWidth: '130px',
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
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .hero-quote-row-1 {
          display: grid;
          grid-template-columns: 1.35fr 1fr 1fr 1.25fr;
          gap: 0.85rem;
          align-items: flex-end;
        }

        .hero-quote-row-2 {
          display: grid;
          grid-template-columns: 1.4fr 1.4fr 1.1fr;
          gap: 0.85rem;
          align-items: flex-end;
        }

        @media (max-width: 1040px) and (min-width: 680px) {
          .hero-quote-row-1 {
            grid-template-columns: 1fr 1fr;
            gap: 0.85rem;
          }
          .hero-quote-row-2 {
            grid-template-columns: 1fr 1fr 1fr;
            gap: 0.85rem;
          }
        }

        @media (max-width: 679px) {
          .hero-quote-row-1 {
            grid-template-columns: 1fr;
            gap: 0.85rem;
          }
          .hero-quote-row-2 {
            grid-template-columns: 1fr;
            gap: 0.85rem;
          }
        }
      `}</style>
    </section>
  );
}
