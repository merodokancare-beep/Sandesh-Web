'use client';

import { useState } from 'react';

export default function ReviewModal({ isOpen, onClose, onReviewSubmitted }) {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [location, setLocation] = useState('');
  const [tourName, setTourName] = useState('North Sikkim 3N/4D (Gurudongmar & Yumthang)');
  const [customTour, setCustomTour] = useState('');
  const [travelDate, setTravelDate] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!clientName || !clientPhone || !reviewText) {
      alert('Please fill in your name, contact phone, and your travel review.');
      return;
    }

    setSubmitting(true);
    try {
      const finalTour = tourName === 'Other / Customized Tour' && customTour ? customTour : tourName;
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientName,
          clientPhone,
          clientEmail,
          location: location || 'India',
          tourName: finalTour,
          rating,
          reviewText,
          travelDate: travelDate || `Visited ${new Date().toLocaleString('en-US', { month: 'short', year: 'numeric' })}`
        })
      });

      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
        if (onReviewSubmitted) onReviewSubmitted();
      } else {
        alert(data.error || 'Failed to submit review. Please try again.');
      }
    } catch (err) {
      console.error(err);
      alert('Network error. Please try again or share your feedback directly on WhatsApp.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setClientName('');
    setClientPhone('');
    setClientEmail('');
    setLocation('');
    setReviewText('');
    setTravelDate('');
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={handleResetAndClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()} 
        style={{ maxWidth: '580px', padding: '2rem', maxHeight: '90vh', overflowY: 'auto' }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>
          <div>
            <div className="badge badge-gold" style={{ marginBottom: '0.4rem', fontSize: '0.72rem' }}>
              <i className="fa-solid fa-heart"></i> Traveler Feedback
            </div>
            <h3 style={{ fontSize: '1.35rem', color: '#fff', fontWeight: 700 }}>
              {submitted ? 'Review Received' : 'Share Your Travel Experience'}
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              Help fellow Himalayan travelers by sharing your tour experience with Sandesh Travels
            </p>
          </div>
          <button
            onClick={handleResetAndClose}
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
          <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'rgba(16, 185, 129, 0.15)',
              color: '#10b981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2rem',
              margin: '0 auto 1.25rem',
              border: '1px solid rgba(16, 185, 129, 0.3)'
            }}>
              <i className="fa-solid fa-check"></i>
            </div>
            <h4 style={{ fontSize: '1.35rem', color: '#fff', marginBottom: '0.5rem' }}>
              Thank You, {clientName}!
            </h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '1.75rem' }}>
              Your feedback has been successfully recorded in our central CRM. To maintain authenticity and quality, all traveler reviews are reviewed by our team before going live on the website.
            </p>
            <button
              type="button"
              onClick={handleResetAndClose}
              className="btn btn-primary"
              style={{ width: '100%' }}
            >
              Done & Return to Site
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
            {/* Star Rating Picker */}
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', fontWeight: 600 }}>
                Overall Experience Rating *
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <div style={{ display: 'flex', gap: '0.35rem', fontSize: '1.6rem', cursor: 'pointer' }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <i
                      key={star}
                      className="fa-solid fa-star"
                      style={{
                        color: (hoverRating || rating) >= star ? '#fbbf24' : '#334155',
                        transition: 'color 0.15s ease',
                        transform: (hoverRating || rating) >= star ? 'scale(1.08)' : 'scale(1)'
                      }}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(star)}
                    />
                  ))}
                </div>
                <span style={{ fontSize: '0.85rem', color: '#fbbf24', fontWeight: 700, marginLeft: '0.5rem' }}>
                  {rating === 5 && 'Outstanding (5/5)'}
                  {rating === 4 && 'Very Good (4/5)'}
                  {rating === 3 && 'Good (3/5)'}
                  {rating === 2 && 'Fair (2/5)'}
                  {rating === 1 && 'Needs Improvement (1/5)'}
                </span>
              </div>
            </div>

            {/* Client Name & Location */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.4rem', fontWeight: 500 }}>
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Chandra"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    borderRadius: 'var(--radius-sm)',
                    background: 'var(--bg-surface-elevated)',
                    border: '1px solid var(--border)',
                    color: '#fff',
                    fontSize: '0.9rem'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.4rem', fontWeight: 500 }}>
                  Your Home City / State
                </label>
                <input
                  type="text"
                  placeholder="e.g. Kolkata, West Bengal"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    borderRadius: 'var(--radius-sm)',
                    background: 'var(--bg-surface-elevated)',
                    border: '1px solid var(--border)',
                    color: '#fff',
                    fontSize: '0.9rem'
                  }}
                />
              </div>
            </div>

            {/* Phone & Email */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.4rem', fontWeight: 500 }}>
                  Phone / WhatsApp (Verification) *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 9876543210"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    borderRadius: 'var(--radius-sm)',
                    background: 'var(--bg-surface-elevated)',
                    border: '1px solid var(--border)',
                    color: '#fff',
                    fontSize: '0.9rem'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.4rem', fontWeight: 500 }}>
                  Email Address (Optional)
                </label>
                <input
                  type="email"
                  placeholder="e.g. ramesh@example.com"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    borderRadius: 'var(--radius-sm)',
                    background: 'var(--bg-surface-elevated)',
                    border: '1px solid var(--border)',
                    color: '#fff',
                    fontSize: '0.9rem'
                  }}
                />
              </div>
            </div>

            {/* Tour Completed & Travel Date */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.4rem', fontWeight: 500 }}>
                  Tour Completed
                </label>
                <select
                  value={tourName}
                  onChange={(e) => setTourName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    borderRadius: 'var(--radius-sm)',
                    background: 'var(--bg-surface-elevated)',
                    border: '1px solid var(--border)',
                    color: '#fff',
                    fontSize: '0.9rem'
                  }}
                >
                  <option value="North Sikkim 3N/4D (Gurudongmar & Yumthang)">North Sikkim 3N/4D (Gurudongmar & Yumthang)</option>
                  <option value="Gangtok & Tsomgo Lake / Baba Mandir 4D">Gangtok & Tsomgo Lake / Baba Mandir 4D</option>
                  <option value="Pelling & Kalimpong Heritage Circuit 5D">Pelling & Kalimpong Heritage Circuit 5D</option>
                  <option value="Silk Route & Zuluk Himalayan Loop 4D">Silk Route & Zuluk Himalayan Loop 4D</option>
                  <option value="Complete Sikkim Grand Circuit 7D">Complete Sikkim Grand Circuit 7D</option>
                  <option value="Innova Car Rental & Dedicated Driver">Innova Car Rental & Dedicated Driver</option>
                  <option value="Other / Customized Tour">Other / Customized Tour</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.4rem', fontWeight: 500 }}>
                  Travel Month / Year
                </label>
                <input
                  type="text"
                  placeholder="e.g. Visited Feb 2026"
                  value={travelDate}
                  onChange={(e) => setTravelDate(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    borderRadius: 'var(--radius-sm)',
                    background: 'var(--bg-surface-elevated)',
                    border: '1px solid var(--border)',
                    color: '#fff',
                    fontSize: '0.9rem'
                  }}
                />
              </div>
            </div>

            {tourName === 'Other / Customized Tour' && (
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.4rem', fontWeight: 500 }}>
                  Specify Your Tour Destination / Route
                </label>
                <input
                  type="text"
                  placeholder="e.g. Ravangla & Namchi Day Tour"
                  value={customTour}
                  onChange={(e) => setCustomTour(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    borderRadius: 'var(--radius-sm)',
                    background: 'var(--bg-surface-elevated)',
                    border: '1px solid var(--border)',
                    color: '#fff',
                    fontSize: '0.9rem'
                  }}
                />
              </div>
            )}

            {/* Review Description */}
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.4rem', fontWeight: 500 }}>
                Your Detailed Feedback & Experience *
              </label>
              <textarea
                required
                rows={4}
                placeholder="Share your experience about the driver, vehicle cleanliness, route management, punctuality, and scenic halts..."
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--bg-surface-elevated)',
                  border: '1px solid var(--border)',
                  color: '#fff',
                  fontSize: '0.9rem',
                  lineHeight: 1.5,
                  resize: 'vertical'
                }}
              />
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
              <button
                type="button"
                onClick={handleResetAndClose}
                className="btn btn-secondary"
                style={{ flex: 1 }}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="btn btn-primary"
                style={{ flex: 2 }}
              >
                {submitting ? (
                  <>
                    <i className="fa-solid fa-spinner fa-spin"></i> Submitting...
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-paper-plane"></i> Submit Review
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
