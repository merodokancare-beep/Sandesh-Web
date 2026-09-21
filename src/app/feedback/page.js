'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

function FeedbackForm() {
  const searchParams = useSearchParams();

  const urlLeadId = searchParams.get('lead_id') || searchParams.get('leadId') || '';
  const urlName = searchParams.get('name') || searchParams.get('clientName') || '';
  const urlPhone = searchParams.get('phone') || searchParams.get('clientPhone') || '';
  const urlTour = searchParams.get('tour') || searchParams.get('tourName') || searchParams.get('package') || '';
  const urlRating = parseInt(searchParams.get('rating') || '5', 10);

  const [rating, setRating] = useState(urlRating >= 1 && urlRating <= 5 ? urlRating : 5);
  const [hoverRating, setHoverRating] = useState(0);
  const [clientName, setClientName] = useState(urlName);
  const [clientPhone, setClientPhone] = useState(urlPhone);
  const [clientEmail, setClientEmail] = useState('');
  const [location, setLocation] = useState('');
  const [tourName, setTourName] = useState(urlTour || 'North Sikkim 3N/4D (Gurudongmar & Yumthang)');
  const [customTour, setCustomTour] = useState('');
  const [travelDate, setTravelDate] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [leadId, setLeadId] = useState(urlLeadId);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (urlName && !clientName) setClientName(urlName);
    if (urlPhone && !clientPhone) setClientPhone(urlPhone);
    if (urlTour && !customTour) {
      const predefinedTours = [
        'North Sikkim 3N/4D (Gurudongmar & Yumthang)',
        'Gangtok & Tsomgo Lake / Nathula Pass',
        'Silk Route 4D/3N (Zuluk, Thambi & Kupup Lake)',
        'Pelling & West Sikkim Heritage Circuit',
        'Complete Sikkim Grand Odyssey 7N/8D',
        'Darjeeling & Gangtok Combined Explorer'
      ];
      if (predefinedTours.includes(urlTour)) {
        setTourName(urlTour);
      } else {
        setTourName('Other / Customized Tour');
        setCustomTour(urlTour);
      }
    }
    if (urlLeadId && !leadId) setLeadId(urlLeadId);
  }, [urlName, urlPhone, urlTour, urlLeadId]);

  const ratingDescriptions = {
    1: 'Needs Improvement',
    2: 'Fair Experience',
    3: 'Good Trip',
    4: 'Very Good & Memorable',
    5: 'Outstanding & Highly Recommended!'
  };

  const currentDisplayRating = hoverRating || rating;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!clientName.trim() || !clientPhone.trim() || !reviewText.trim()) {
      alert('Please enter your name, contact phone number, and a brief description of your experience.');
      return;
    }

    setSubmitting(true);
    try {
      const finalTour = tourName === 'Other / Customized Tour' && customTour ? customTour.trim() : tourName;
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientName: clientName.trim(),
          clientPhone: clientPhone.trim(),
          clientEmail: clientEmail ? clientEmail.trim() : null,
          location: location.trim() || 'India',
          tourName: finalTour,
          rating,
          reviewText: reviewText.trim(),
          travelDate: travelDate.trim() || `Visited ${new Date().toLocaleString('en-US', { month: 'short', year: 'numeric' })}`,
          leadId: leadId ? parseInt(leadId, 10) : null
        })
      });

      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        alert(data.error || 'Failed to submit review. Please try again or WhatsApp us directly.');
      }
    } catch (err) {
      console.error(err);
      alert('Network error submitting feedback. Please try again or connect via WhatsApp.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--bg-base)', padding: '3rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="glass-card" style={{ maxWidth: '600px', width: '100%', padding: '3.5rem 2.5rem', textAlign: 'center', position: 'relative' }}>
          {/* Animated checkmark circle */}
          <div style={{
            width: '84px',
            height: '84px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(5, 150, 105, 0.4))',
            border: '2px solid var(--primary)',
            color: 'var(--primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2.5rem',
            margin: '0 auto 1.75rem',
            boxShadow: '0 0 35px var(--primary-glow)'
          }}>
            <i className="fa-solid fa-check"></i>
          </div>

          <span className="badge badge-emerald" style={{ marginBottom: '1rem', padding: '0.4rem 1rem' }}>
            <i className="fa-solid fa-circle-check"></i> Feedback Submitted
          </span>

          <h1 style={{ fontSize: '2rem', color: '#fff', fontWeight: 800, marginBottom: '0.75rem' }}>
            Thank You, {clientName}!
          </h1>

          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '2rem' }}>
            Your review and rating have been safely received. Every traveler story helps us maintain high standards and assists upcoming visitors in planning their dream trip to Sikkim.
          </p>

          <div style={{
            background: 'var(--bg-surface-elevated)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-md)',
            padding: '1.25rem 1.5rem',
            marginBottom: '2.25rem',
            textAlign: 'left'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <div style={{ fontWeight: 700, color: '#fff', fontSize: '1rem' }}>{tourName}</div>
              <div style={{ display: 'flex', gap: '2px', color: 'var(--accent-gold)' }}>
                {[...Array(rating)].map((_, i) => (
                  <i key={i} className="fa-solid fa-star"></i>
                ))}
              </div>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', fontStyle: 'italic', margin: 0 }}>
              "{reviewText}"
            </p>
          </div>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/" className="btn btn-primary">
              <i className="fa-solid fa-house"></i> Return to Homepage
            </Link>
            <a
              href="https://wa.me/919647878373?text=Hi%20Sandesh%20Travels,%20I%20just%20submitted%20my%20feedback%20for%20my%20Sikkim%20trip!"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
              style={{ color: '#25D366' }}
            >
              <i className="fa-brands fa-whatsapp"></i> Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)', padding: '2rem 1.5rem 5rem' }}>
      {/* Top Bar / Brand */}
      <div className="container" style={{ maxWidth: '680px', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
            <img
              src="/logo.png"
              alt="Sandesh Travels"
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '8px',
                background: '#fff',
                padding: '2px',
                objectFit: 'contain'
              }}
            />
            <div>
              <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
                Sandesh Travels
              </div>
              <div style={{ fontSize: '0.68rem', color: 'var(--primary)', fontWeight: 600, textTransform: 'uppercase' }}>
                Sikkim Tour & Fleet Operator
              </div>
            </div>
          </Link>

          <Link href="/" className="btn btn-secondary btn-sm">
            <i className="fa-solid fa-arrow-left"></i> Home
          </Link>
        </div>
      </div>

      <div className="container" style={{ maxWidth: '680px' }}>
        <div className="glass-card" style={{ padding: 'clamp(1.75rem, 5vw, 2.75rem)' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '2.25rem' }}>
            <span className="badge badge-gold" style={{ marginBottom: '0.75rem' }}>
              <i className="fa-solid fa-heart"></i> Traveler Feedback
            </span>
            <h1 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', color: '#fff', fontWeight: 800, marginBottom: '0.5rem' }}>
              How Was Your Himalayan Trip?
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', margin: 0 }}>
              Your honest feedback helps us serve future travelers better and rewards our mountain drivers & local tour team.
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.6rem' }}>
            {/* 1. Star Rating Picker */}
            <div style={{
              background: 'var(--bg-surface-elevated)',
              padding: '1.5rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border)',
              textAlign: 'center'
            }}>
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 700, color: '#fff', marginBottom: '0.75rem' }}>
                Overall Rating <span style={{ color: '#ef4444' }}>*</span>
              </label>

              <div style={{ display: 'flex', justifyContent: 'center', gap: '0.6rem', fontSize: '2.2rem', marginBottom: '0.5rem' }}>
                {[1, 2, 3, 4, 5].map((star) => {
                  const isFilled = star <= currentDisplayRating;
                  return (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: isFilled ? '#fbbf24' : 'rgba(255, 255, 255, 0.18)',
                        cursor: 'pointer',
                        padding: '0.2rem',
                        transition: 'transform 0.15s ease, color 0.15s ease',
                        transform: star <= currentDisplayRating ? 'scale(1.1)' : 'scale(1)'
                      }}
                      title={`${star} Star`}
                    >
                      <i className="fa-solid fa-star"></i>
                    </button>
                  );
                })}
              </div>

              <div style={{
                fontSize: '0.92rem',
                fontWeight: 600,
                color: currentDisplayRating >= 4 ? 'var(--primary)' : currentDisplayRating === 3 ? 'var(--accent-gold)' : '#f87171'
              }}>
                {ratingDescriptions[currentDisplayRating]}
              </div>
            </div>

            {/* 2. Customer Details */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#fff', marginBottom: '0.4rem' }}>
                  Full Name <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.85rem 1rem',
                    borderRadius: 'var(--radius-sm)',
                    background: 'var(--bg-surface-elevated)',
                    border: '1px solid var(--border)',
                    color: '#fff',
                    fontSize: '0.95rem'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#fff', marginBottom: '0.4rem' }}>
                  WhatsApp / Phone Number <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. +91 98765 43210"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.85rem 1rem',
                    borderRadius: 'var(--radius-sm)',
                    background: 'var(--bg-surface-elevated)',
                    border: '1px solid var(--border)',
                    color: '#fff',
                    fontSize: '0.95rem'
                  }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#fff', marginBottom: '0.4rem' }}>
                  Your City / Home State
                </label>
                <input
                  type="text"
                  placeholder="e.g. Kolkata, West Bengal"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.85rem 1rem',
                    borderRadius: 'var(--radius-sm)',
                    background: 'var(--bg-surface-elevated)',
                    border: '1px solid var(--border)',
                    color: '#fff',
                    fontSize: '0.95rem'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#fff', marginBottom: '0.4rem' }}>
                  Email Address <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>(Optional)</span>
                </label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.85rem 1rem',
                    borderRadius: 'var(--radius-sm)',
                    background: 'var(--bg-surface-elevated)',
                    border: '1px solid var(--border)',
                    color: '#fff',
                    fontSize: '0.95rem'
                  }}
                />
              </div>
            </div>

            {/* 3. Tour & Date */}
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#fff', marginBottom: '0.4rem' }}>
                Tour Circuit / Package Taken
              </label>
              <select
                value={tourName}
                onChange={(e) => setTourName(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.85rem 1rem',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--bg-surface-elevated)',
                  border: '1px solid var(--border)',
                  color: '#fff',
                  fontSize: '0.95rem'
                }}
              >
                <option value="North Sikkim 3N/4D (Gurudongmar & Yumthang)">North Sikkim 3N/4D (Gurudongmar & Yumthang)</option>
                <option value="Gangtok & Tsomgo Lake / Nathula Pass">Gangtok & Tsomgo Lake / Nathula Pass</option>
                <option value="Silk Route 4D/3N (Zuluk, Thambi & Kupup Lake)">Silk Route 4D/3N (Zuluk, Thambi & Kupup Lake)</option>
                <option value="Pelling & West Sikkim Heritage Circuit">Pelling & West Sikkim Heritage Circuit</option>
                <option value="Complete Sikkim Grand Odyssey 7N/8D">Complete Sikkim Grand Odyssey 7N/8D</option>
                <option value="Darjeeling & Gangtok Combined Explorer">Darjeeling & Gangtok Combined Explorer</option>
                <option value="Other / Customized Tour">Other / Customized Tour</option>
              </select>
            </div>

            {tourName === 'Other / Customized Tour' && (
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#fff', marginBottom: '0.4rem' }}>
                  Please specify your Tour / Destinations
                </label>
                <input
                  type="text"
                  placeholder="e.g. Ravangla, Namchi & Gangtok 4 Days"
                  value={customTour}
                  onChange={(e) => setCustomTour(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.85rem 1rem',
                    borderRadius: 'var(--radius-sm)',
                    background: 'var(--bg-surface-elevated)',
                    border: '1px solid var(--border)',
                    color: '#fff',
                    fontSize: '0.95rem'
                  }}
                />
              </div>
            )}

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#fff', marginBottom: '0.4rem' }}>
                When did you travel?
              </label>
              <input
                type="text"
                placeholder="e.g. Visited Sep 2026 or First week of Autumn"
                value={travelDate}
                onChange={(e) => setTravelDate(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.85rem 1rem',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--bg-surface-elevated)',
                  border: '1px solid var(--border)',
                  color: '#fff',
                  fontSize: '0.95rem'
                }}
              />
            </div>

            {/* 4. Detailed Experience */}
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#fff', marginBottom: '0.4rem' }}>
                Your Review & Travel Experience <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <textarea
                required
                rows={5}
                placeholder="Tell us about the vehicle condition, mountain driver behavior, permits assistance, scenic viewpoints, or any highlights that made your Sikkim journey special..."
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.95rem 1rem',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--bg-surface-elevated)',
                  border: '1px solid var(--border)',
                  color: '#fff',
                  fontSize: '0.95rem',
                  lineHeight: 1.6,
                  resize: 'vertical'
                }}
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting}
              className="btn btn-primary"
              style={{
                width: '100%',
                padding: '1rem',
                fontSize: '1.05rem',
                fontWeight: 700,
                marginTop: '0.5rem',
                boxShadow: '0 4px 20px var(--primary-glow)'
              }}
            >
              {submitting ? (
                <>
                  <i className="fa-solid fa-circle-notch fa-spin"></i> Submitting Feedback...
                </>
              ) : (
                <>
                  <i className="fa-solid fa-paper-plane"></i> Submit Traveler Review
                </>
              )}
            </button>

            <div style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              <i className="fa-solid fa-shield-halved" style={{ color: 'var(--primary)', marginRight: '4px' }}></i>
              Reviews are verified by Sandesh Travels to ensure genuine traveler transparency.
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function FeedbackPage() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: '100vh', background: 'var(--bg-base)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
        <i className="fa-solid fa-circle-notch fa-spin" style={{ fontSize: '2rem', color: 'var(--primary)' }}></i>
      </div>
    }>
      <FeedbackForm />
    </Suspense>
  );
}
