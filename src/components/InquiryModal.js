'use client';

import { useState, useEffect } from 'react';

export default function InquiryModal({ isOpen, onClose, initialPackageName, onSuccessLead }) {
  const [formData, setFormData] = useState({
    clientName: '',
    clientPhone: '',
    startDate: '',
    numTravelers: '2',
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

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.clientName || !formData.clientPhone) {
      alert('Please fill in your name and phone number.');
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
          travelDates: formData.startDate ? `Travel Date: ${formData.startDate}` : 'Flexible Dates',
          packageName: formData.packageName,
          notes: formData.notes
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
              Direct quotation dispatched to your WhatsApp
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
              Your inquiry has been logged in our central CMS. Our travel desk will message you at <strong>{formData.clientPhone}</strong> with complete pricing and vehicle schedule.
            </p>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <a
                href={`https://wa.me/919647878373?text=${encodeURIComponent(`Hi Sandesh Travels, I just submitted an inquiry for "${formData.packageName}". My name is ${formData.clientName}.`)}`}
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

            <div className="form-group">
              <label className="form-label">Full Name *</label>
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
              <label className="form-label">WhatsApp / Phone Number *</label>
              <input
                type="tel"
                required
                placeholder="+91 98765 43210"
                className="form-input"
                value={formData.clientPhone}
                onChange={(e) => setFormData({ ...formData, clientPhone: e.target.value })}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Tentative Date</label>
                <input
                  type="date"
                  className="form-input"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Travelers Count</label>
                <select
                  className="form-select"
                  value={formData.numTravelers}
                  onChange={(e) => setFormData({ ...formData, numTravelers: e.target.value })}
                >
                  <option value="1">1 Person</option>
                  <option value="2">2 Persons (Couple)</option>
                  <option value="3">3 Persons</option>
                  <option value="4">4 Persons</option>
                  <option value="5">5 Persons</option>
                  <option value="6">6 Persons (SUV Group)</option>
                  <option value="8">7-10 Persons</option>
                  <option value="15">10+ Persons (Tempo)</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Notes / Specific Requirements (Optional)</label>
              <textarea
                rows="2"
                placeholder="e.g. Need Innova pickup from Bagdogra, Zero Point permit required..."
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
