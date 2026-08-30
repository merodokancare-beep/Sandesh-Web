'use client';

export default function ReviewsSection() {
  const reviews = [
    {
      name: 'Dr. Vivek Sengupta',
      location: 'Kolkata',
      rating: 5,
      tour: 'North Sikkim 3N/4D Tour (Gurudongmar & Yumthang)',
      text: 'Exceptional service by Sandesh Travels! We booked an Innova for our family trip to Lachen & Lachung. The driver was extremely polite, knowledgeable on high altitude mountain roads, and the permits were ready before we even reached Gangtok.',
      date: 'Visited Oct 2025'
    },
    {
      name: 'Megha & Rohan Iyer',
      location: 'Bangalore',
      rating: 5,
      tour: 'Gangtok, Nathula & Pelling 6D/5N Honeymoon Circuit',
      text: 'Received quotation and day-wise itinerary on WhatsApp within 3 minutes of submitting our request. The hotel stays and scenic viewpoint timings recommended were spot on. 10/10 local tour operators in Sikkim.',
      date: 'Visited Dec 2025'
    },
    {
      name: 'Sunil Mathur & Group',
      location: 'Mumbai',
      rating: 5,
      tour: 'Silk Route 4D/3N (Zuluk, Thambi & Kupup Lake)',
      text: 'Traveling with an 8-member group in their Tempo Traveller. Everything from Rongli permits to homestays in Zuluk was taken care of seamlessly. Very transparent pricing with no hidden charges.',
      date: 'Visited Jan 2026'
    }
  ];

  return (
    <section id="reviews" className="section-padding" style={{ background: 'var(--bg-surface)', borderTop: '1px solid var(--border)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 3.5rem' }}>
          <span className="badge badge-gold" style={{ marginBottom: '0.85rem' }}>
            <i className="fa-solid fa-star"></i> 4.9 / 5.0 Rated by 1,200+ Travelers
          </span>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', marginBottom: '1rem' }}>
            Traveler Stories & Feedback
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>
            Hear from families, couples, and adventurers who explored the Eastern Himalayas with Sandesh Travels.
          </p>
        </div>

        <div className="grid-3">
          {reviews.map((rev, idx) => (
            <div key={idx} className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                {/* Stars */}
                <div style={{ display: 'flex', gap: '0.25rem', color: '#fbbf24', fontSize: '0.9rem', marginBottom: '0.75rem' }}>
                  {[...Array(rev.rating)].map((_, i) => (
                    <i key={i} className="fa-solid fa-star"></i>
                  ))}
                </div>

                <div style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 600, marginBottom: '0.5rem' }}>
                  <i className="fa-solid fa-tag"></i> {rev.tour}
                </div>

                <p style={{ color: '#e2e8f0', fontSize: '0.92rem', lineHeight: 1.6, fontStyle: 'italic', marginBottom: '1.5rem' }}>
                  "{rev.text}"
                </p>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
                <div>
                  <div style={{ fontWeight: 700, color: '#fff', fontSize: '0.95rem' }}>{rev.name}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{rev.location}</div>
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{rev.date}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
