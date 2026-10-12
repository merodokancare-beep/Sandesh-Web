'use client';

import { useState, useEffect } from 'react';

export default function InquiryModal({ isOpen, onClose, initialPackageName, onSuccessLead }) {
  const [formData, setFormData] = useState({
    clientName: '',
    clientPhone: '',
    startDate: '',
    endDate: '',
    numAdults: '2',
    numChildren: '0',
    numElderly: '0',
    childrenAges: [],
    notes: '',
    packageName: initialPackageName || ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (initialPackageName) {
      setFormData(prev => ({ ...prev, packageName: initialPackageName }));
    }
    setSubmitted(false);
  }, [initialPackageName, isOpen]);

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

  const handleStartDateChange = (val) => {
    setFormData(prev => {
      const next = { ...prev, startDate: val };
      if (prev.endDate && prev.endDate < val) {
        next.endDate = val;
      }
      return next;
    });
  };

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

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.clientName || !formData.clientPhone) {
      alert('Please fill in your name and phone number.');
      return;
    }

    const adultsNum = parseInt(formData.numAdults, 10) || 2;
    const childrenNum = parseInt(formData.numChildren, 10) || 0;
    const elderlyNum = parseInt(formData.numElderly, 10) || 0;
    const totalTravelers = adultsNum + childrenNum + elderlyNum;
    const childAgesSummary = childrenNum > 0 ? formData.childrenAges.slice(0, childrenNum).join(', ') : '';

    const dur = calculateDuration();
    let datesSummary = 'Flexible Dates';
    if (formData.startDate && formData.endDate) {
      datesSummary = `${formData.startDate} to ${formData.endDate}${dur ? ` (${dur})` : ''}`;
    } else if (formData.startDate) {
      datesSummary = `Starts on ${formData.startDate}`;
    }

    const travelerBreakdown = [];
    if (adultsNum > 0) travelerBreakdown.push(`${adultsNum} Adult(s)`);
    if (childrenNum > 0) travelerBreakdown.push(`${childrenNum} Child(ren)${childAgesSummary ? ` (Ages: ${childAgesSummary})` : ''}`);
    if (elderlyNum > 0) travelerBreakdown.push(`${elderlyNum} Senior(s) (60+)`);

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
          packageName: formData.packageName,
          notes: `${formData.notes || ''} [Travelers: ${travelerBreakdown.join(', ')}]${elderlyNum > 0 ? ' [Senior citizen care requested]' : ''}`.trim()
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
      alert('Network error. Please try again or reach out on WhatsApp.');
    } finally {
      setSubmitting(false);
    }
  };

  const getWhatsAppMessage = () => {
    const adults = parseInt(formData.numAdults, 10) || 2;
    const children = parseInt(formData.numChildren, 10) || 0;
    const elderly = parseInt(formData.numElderly, 10) || 0;
    const dates = formData.startDate 
      ? `${formData.startDate}${formData.endDate ? ` to ${formData.endDate}` : ''}`
      : 'Flexible Dates';
    
    let msg = `Hi Sandesh Travels, I just submitted an inquiry for "${formData.packageName}". My name is ${formData.clientName}.\nDates: ${dates}\nTravelers: ${adults} Adults`;
    if (children > 0) {
      msg += `, ${children} Children (Ages: ${formData.childrenAges.slice(0, children).join(', ')})`;
    }
    if (elderly > 0) {
      msg += `, ${elderly} Senior Citizen(s) (60+)`;
    }
    return msg;
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: '2rem' }}>
        {/* Modal Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>
          <div>
            <h3 style={{ fontSize: '1.4rem', color: '#fff' }}>
              {submitted ? 'Inquiry Submitted' : 'Request Instant Quotation'}
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              Direct customized itinerary dispatched to your WhatsApp
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'var(--bg-surface-elevated)',
              border: '1px solid var(--border)',
              color: '#fff',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.9rem'
            }}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: 'rgba(16, 185, 129, 0.15)',
              color: '#10b981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.8rem',
              margin: '0 auto 1.25rem',
              border: '1px solid rgba(16, 185, 129, 0.3)'
            }}>
              <i className="fa-solid fa-check"></i>
            </div>
            <h4 style={{ fontSize: '1.3rem', color: '#fff', marginBottom: '0.5rem' }}>Thank You, {formData.clientName}!</h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginBottom: '1.5rem', lineHeight: 1.5 }}>
              Your inquiry for <strong>{formData.numAdults} Adult(s){parseInt(formData.numChildren, 10) > 0 ? `, ${formData.numChildren} Child(ren)` : ''}{parseInt(formData.numElderly, 10) > 0 ? `, ${formData.numElderly} Senior Citizen(s)` : ''}</strong> has been logged in our central CMS. Our travel desk will message you at <strong>{formData.clientPhone}</strong> with complete pricing and vehicle schedule.
            </p>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <a
                href={`https://wa.me/919647878373?text=${encodeURIComponent(getWhatsAppMessage())}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp"
                style={{ flex: 1 }}
              >
                <i className="fa-brands fa-whatsapp"></i> Chat Now
              </a>
              <button onClick={onClose} className="btn btn-secondary" style={{ flex: 1 }}>
                Close
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
            {formData.packageName && (
              <div style={{
                background: 'rgba(16, 185, 129, 0.1)',
                border: '1px solid rgba(16, 185, 129, 0.25)',
                padding: '0.6rem 0.85rem',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.85rem',
                color: '#34d399',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <i className="fa-solid fa-bookmark"></i>
                <span><strong>Selected:</strong> {formData.packageName}</span>
              </div>
            )}

            {/* Name & Phone */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.85rem' }}>
              <div className="form-group">
                <label className="form-label">
                  <i className="fa-regular fa-user" style={{ color: '#60a5fa', marginRight: '4px' }}></i> Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Priya Sharma"
                  className="form-input"
                  value={formData.clientName}
                  onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  <i className="fa-brands fa-whatsapp" style={{ color: '#25D366', marginRight: '4px' }}></i> WhatsApp / Phone *
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
            </div>

            {/* Travel Dates: Start Date & End Date */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.85rem' }}>
              <div className="form-group">
                <label className="form-label">
                  <i className="fa-regular fa-calendar-plus" style={{ color: 'var(--accent-teal)', marginRight: '4px' }}></i> Travel Start Date
                </label>
                <input
                  type="date"
                  className="form-input"
                  value={formData.startDate}
                  onChange={(e) => handleStartDateChange(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div className="form-group">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <label className="form-label" style={{ margin: 0 }}>
                    <i className="fa-regular fa-calendar-check" style={{ color: '#38bdf8', marginRight: '4px' }}></i> Travel End Date
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
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  min={formData.startDate || new Date().toISOString().split('T')[0]}
                />
              </div>
            </div>

            {/* Traveler Categories: Adults, Children, Elderly */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <label className="form-label" style={{ margin: 0 }}>
                  <i className="fa-solid fa-users" style={{ color: 'var(--accent-gold)', marginRight: '4px' }}></i> Traveler Categories
                </label>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  Total: {parseInt(formData.numAdults, 10) + parseInt(formData.numChildren, 10) + parseInt(formData.numElderly, 10)} Passengers
                </span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.75rem' }}>
                {/* Adults */}
                <div className="form-group">
                  <label style={{ fontSize: '0.78rem', color: '#cbd5e1', marginBottom: '4px', display: 'block' }}>
                    Adults (12-59 yrs)
                  </label>
                  <select
                    className="form-select"
                    value={formData.numAdults}
                    onChange={(e) => setFormData({ ...formData, numAdults: e.target.value })}
                  >
                    <option value="1">1 Adult (Solo)</option>
                    <option value="2">2 Adults (Couple)</option>
                    <option value="3">3 Adults</option>
                    <option value="4">4 Adults</option>
                    <option value="5">5 Adults</option>
                    <option value="6">6 Adults</option>
                    <option value="8">7-8 Adults</option>
                    <option value="10">9-10 Adults</option>
                    <option value="12">11-12+ Adults</option>
                  </select>
                </div>

                {/* Children */}
                <div className="form-group">
                  <label style={{ fontSize: '0.78rem', color: '#38bdf8', marginBottom: '4px', display: 'block' }}>
                    Children (0-11 yrs)
                  </label>
                  <select
                    className="form-select"
                    value={formData.numChildren}
                    onChange={(e) => handleChildrenCountChange(e.target.value)}
                    style={{
                      borderColor: parseInt(formData.numChildren, 10) > 0 ? '#38bdf8' : undefined
                    }}
                  >
                    <option value="0">0 Children</option>
                    <option value="1">1 Child</option>
                    <option value="2">2 Children</option>
                    <option value="3">3 Children</option>
                    <option value="4">4 Children</option>
                    <option value="5">5 Children</option>
                  </select>
                </div>

                {/* Elderly */}
                <div className="form-group">
                  <label style={{ fontSize: '0.78rem', color: 'var(--accent-gold)', marginBottom: '4px', display: 'block' }}>
                    Elderly (60+ yrs)
                  </label>
                  <select
                    className="form-select"
                    value={formData.numElderly}
                    onChange={(e) => setFormData({ ...formData, numElderly: e.target.value })}
                    style={{
                      borderColor: parseInt(formData.numElderly, 10) > 0 ? 'var(--accent-gold)' : undefined
                    }}
                  >
                    <option value="0">0 Seniors</option>
                    <option value="1">1 Senior (60+)</option>
                    <option value="2">2 Seniors (60+)</option>
                    <option value="3">3 Seniors (60+)</option>
                    <option value="4">4+ Seniors</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Senior Care Notice if Elderly selected */}
            {parseInt(formData.numElderly, 10) > 0 && (
              <div style={{
                background: 'rgba(245, 158, 11, 0.1)',
                border: '1px solid rgba(245, 158, 11, 0.3)',
                borderRadius: 'var(--radius-sm)',
                padding: '0.75rem 0.95rem',
                fontSize: '0.8rem',
                color: '#fbbf24',
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem'
              }}>
                <i className="fa-solid fa-heart-pulse" style={{ fontSize: '1.1rem', flexShrink: 0 }}></i>
                <span>
                  <strong>Senior Citizen Comfort:</strong> We arrange low-step entry cabs (Innova Crysta), spacious middle seating, and gentle acclimatization timings for high altitude regions.
                </span>
              </div>
            )}

            {/* Dynamic Child Ages in Modal */}
            {parseInt(formData.numChildren, 10) > 0 && (
              <div style={{
                background: 'rgba(56, 189, 248, 0.08)',
                border: '1px solid rgba(56, 189, 248, 0.25)',
                borderRadius: 'var(--radius-sm)',
                padding: '0.85rem 1rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.6rem', flexWrap: 'wrap', gap: '0.25rem' }}>
                  <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#38bdf8', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <i className="fa-solid fa-child-reaching"></i> Age of Children (Required for Permits & Cab Seating):
                  </span>
                  <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                    High-altitude permit regulations apply
                  </span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.65rem' }}>
                  {Array.from({ length: parseInt(formData.numChildren, 10) }).map((_, idx) => (
                    <div key={idx}>
                      <label style={{ fontSize: '0.75rem', color: '#cbd5e1', marginBottom: '3px', display: 'block' }}>
                        Child {idx + 1} Age *
                      </label>
                      <select
                        className="form-select"
                        value={formData.childrenAges[idx] || '5 Years'}
                        onChange={(e) => handleChildAgeChange(idx, e.target.value)}
                        style={{ fontSize: '0.85rem', height: '36px', padding: '0.35rem 0.65rem' }}
                      >
                        <option value="Under 2 (Infant)">Under 2 yrs (Infant)</option>
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
                        <option value="13-17 (Teen)">13-17 yrs (Teen)</option>
                      </select>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="form-group">
              <label className="form-label">Notes / Specific Requirements (Optional)</label>
              <textarea
                rows="2"
                placeholder="e.g. Need Innova pickup from Bagdogra, Zero Point permit required, senior-friendly ground-floor hotels..."
                className="form-textarea"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="btn btn-primary btn-lg"
              style={{ width: '100%', marginTop: '0.5rem' }}
              id="modal-submit-lead-btn"
            >
              {submitting ? (
                <>
                  <i className="fa-solid fa-spinner fa-spin"></i> Submitting to CMS...
                </>
              ) : (
                <>
                  <i className="fa-solid fa-paper-plane"></i> Send Inquiry
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
