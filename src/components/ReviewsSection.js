'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ReviewsSection({ onOpenReviewModal }) {
  const fallbackReviews = [
    {
      id: 1,
      name: 'Dr. Vivek Sengupta',
      location: 'Kolkata',
      rating: 5,
      tour: 'North Sikkim 3N/4D Tour (Gurudongmar & Yumthang)',
      text: 'Exceptional service by Sandesh Travels! We booked an Innova for our family trip to Lachen & Lachung. The driver was extremely polite, knowledgeable on high altitude mountain roads, and the permits were ready before we even reached Gangtok.',
      date: 'Visited Oct 2025'
    },
    {
      id: 2,
      name: 'Megha & Rohan Iyer',
      location: 'Bangalore',
      rating: 5,
      tour: 'Gangtok, Nathula & Pelling 6D/5N Honeymoon Circuit',
      text: 'Received quotation and day-wise itinerary on WhatsApp within 3 minutes of submitting our request. The hotel stays and scenic viewpoint timings recommended were spot on. 10/10 local tour operators in Sikkim.',
      date: 'Visited Dec 2025'
    },
    {
      id: 3,
      name: 'Sunil Mathur & Group',
      location: 'Mumbai',
      rating: 5,
      tour: 'Silk Route 4D/3N (Zuluk, Thambi & Kupup Lake)',
      text: 'Traveling with an 8-member group in their Tempo Traveller. Everything from Rongli permits to homestays in Zuluk was taken care of seamlessly. Very transparent pricing with no hidden charges.',
      date: 'Visited Jan 2026'
    }
  ];

  const [reviews, setReviews] = useState(fallbackReviews);
  const [loading, setLoading] = useState(true);

  const fetchLiveReviews = () => {
    fetch('/api/reviews')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.reviews && data.reviews.length > 0) {
          setReviews(data.reviews);
        }
      })
      .catch(err => console.error('Failed to load reviews:', err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchLiveReviews();
  }, []);

  return (
    <section id="reviews" className="section-padding" style={{ background: 'var(--bg-surface)', borderTop: '1px solid var(--border)', position: 'relative' }}>
      <div className="container">
        {/* Header with CTA */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: '1.5rem', marginBottom: '3.5rem' }}>
          <div style={{ maxWidth: '650px' }}>
            <span className="badge badge-gold" style={{ marginBottom: '0.85rem' }}>
              <i className="fa-solid fa-star"></i> 4.9 / 5.0 Rated by 1,200+ Travelers
            </span>
            <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', marginBottom: '0.75rem' }}>
              Traveler Stories & Feedback
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', margin: 0 }}>
              Real experiences from families, couples, and adventurers who explored Sikkim & Himalayas with Sandesh Travels.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button
              onClick={onOpenReviewModal}
              className="btn btn-primary"
              id="write-review-btn"
              style={{ boxShadow: '0 4px 16px var(--primary-glow)' }}
            >
              <i className="fa-solid fa-pen-to-square"></i>
              <span>Write a Review</span>
            </button>
            <Link
              href="/admin/reviews"
              className="btn btn-secondary btn-sm"
              title="Admin Moderation Portal"
              style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem', padding: '0.5rem 0.85rem' }}
            >
              <i className="fa-solid fa-shield-halved" style={{ color: 'var(--accent-gold)' }}></i>
              <span>Admin Panel</span>
            </Link>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid-3">
          {reviews.map((rev, idx) => (
            <div
              key={rev.id || idx}
              className="glass-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease'
              }}
            >
              <div>
                {/* Stars */}
                <div style={{ display: 'flex', gap: '0.25rem', color: '#fbbf24', fontSize: '0.9rem', marginBottom: '0.75rem' }}>
                  {[...Array(rev.rating || 5)].map((_, i) => (
                    <i key={i} className="fa-solid fa-star"></i>
                  ))}
                </div>

                {rev.tour && (
                  <div style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 600, marginBottom: '0.5rem' }}>
                    <i className="fa-solid fa-tag"></i> {rev.tour}
                  </div>
                )}

                <p style={{ color: '#e2e8f0', fontSize: '0.92rem', lineHeight: 1.6, fontStyle: 'italic', marginBottom: '1.5rem' }}>
                  "{rev.text}"
                </p>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
                <div>
                  <div style={{ fontWeight: 700, color: '#fff', fontSize: '0.95rem' }}>{rev.name}</div>
                  {rev.location && (
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{rev.location}</div>
                  )}
                </div>
                {rev.date && (
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{rev.date}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
