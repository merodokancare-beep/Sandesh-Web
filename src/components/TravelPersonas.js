'use client';

export default function TravelPersonas({ onOpenInquiry }) {
  const personas = [
    {
      id: 'honeymoon',
      title: 'Romantic & Honeymoon Escapes',
      subtitle: 'Luxury, Privacy & Majestic Mountain Views',
      desc: 'Handpicked boutique resorts with panoramic Kanchenjunga balconies, candlelight dining setups, private chauffeured Innova, and leisurely scenic walks.',
      highlights: ['Kanchenjunga Balcony Stays', 'Private Luxury Innova', 'Candlelight Dinner Setup', 'Flower Bed Decor & Cake'],
      badge: 'Honeymoon Special',
      badgeClass: 'badge-gold',
      icon: 'fa-heart',
      color: '#f43f5e',
      gradient: 'linear-gradient(135deg, rgba(244, 63, 94, 0.15) 0%, rgba(15, 23, 42, 0.8) 100%)',
      packageName: 'Custom Romantic & Honeymoon Tour (5-7 Days)'
    },
    {
      id: 'family',
      title: 'Family & Senior Friendly Holidays',
      subtitle: 'Comfortable Pacing & Kid-Safe Itineraries',
      desc: 'Thoughtfully planned routes avoiding strenuous travel, spacious child/senior-friendly hotels, elevator access, and comfortable private SUV transfers.',
      highlights: ['Spacious 7-Seater Innova', 'Low-Altitude Acclimatization', 'Senior & Kid Friendly Stays', 'Experienced Polite Driver'],
      badge: 'Family Favorite',
      badgeClass: 'badge-blue',
      icon: 'fa-people-roof',
      color: '#38bdf8',
      gradient: 'linear-gradient(135deg, rgba(56, 189, 248, 0.15) 0%, rgba(15, 23, 42, 0.8) 100%)',
      packageName: 'Custom Family Himalayan Holiday (5-6 Days)'
    },
    {
      id: 'adventure',
      title: 'Snow & Jeep Safari Adventure',
      subtitle: 'Gurudongmar (15,900 ft), Zero Point & 4x4 Trails',
      desc: 'For thrill-seekers and snow lovers! Conquer high-altitude passes, pristine alpine lakes, Yumthang snow valleys, and rugged mountain off-roading.',
      highlights: ['4x4 Scorpio/Bolero Jeep', 'Gurudongmar & Zero Point', 'Snow Chains & Oxygen Gear', 'Permit Clearance Included'],
      badge: 'High Altitude Thrill',
      badgeClass: 'badge-emerald',
      icon: 'fa-snowflake',
      color: '#34d399',
      gradient: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(15, 23, 42, 0.8) 100%)',
      packageName: 'North Sikkim Snow & Jeep Adventure (3-4 Days)'
    },
    {
      id: 'heritage',
      title: 'Spiritual, Monasteries & Heritage',
      subtitle: 'Sacred Lakes, Ancient Gompas & Buddha Parks',
      desc: 'Immerse in peace and tranquility. Visit centuries-old Buddhist monasteries, the sacred wishing lake at Khecheopalri, Ravangla Buddha Park, and Chardham.',
      highlights: ['Rumtek & Pemayangtse Monasteries', 'Wishing Lake Khecheopalri', '130ft Ravangla Buddha Park', 'Namchi Chardham Pilgrimage'],
      badge: 'Peace & Serenity',
      badgeClass: 'badge-gold',
      icon: 'fa-gopuram',
      color: '#fbbf24',
      gradient: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(15, 23, 42, 0.8) 100%)',
      packageName: 'Sikkim Spiritual & Heritage Circuit (4-6 Days)'
    }
  ];

  return (
    <section className="section-padding" style={{ background: 'var(--bg-base)', position: 'relative' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 3.5rem' }}>
          <span className="badge badge-gold" style={{ marginBottom: '0.85rem' }}>
            <i className="fa-solid fa-compass"></i> Personalized Travel Styles
          </span>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', marginBottom: '1rem' }}>
            Find Your Ideal Himalayan Vibe
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>
            Whether you are planning an intimate honeymoon, a relaxing family retreat, or a high-altitude snow expedition, we have tailored experiences for every traveler.
          </p>
        </div>

        <div className="grid-2">
          {personas.map((item) => (
            <div
              key={item.id}
              className="glass-card"
              style={{
                background: item.gradient,
                border: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '1.25rem',
                position: 'relative'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <span className={`badge ${item.badgeClass}`}>
                    <i className={`fa-solid ${item.icon}`}></i> {item.badge}
                  </span>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    background: 'rgba(255, 255, 255, 0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.2rem',
                    color: item.color
                  }}>
                    <i className={`fa-solid ${item.icon}`}></i>
                  </div>
                </div>

                <h3 style={{ fontSize: '1.45rem', color: '#fff', marginBottom: '0.35rem' }}>{item.title}</h3>
                <div style={{ fontSize: '0.85rem', color: item.color, fontWeight: 600, marginBottom: '0.75rem' }}>
                  {item.subtitle}
                </div>

                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                  {item.desc}
                </p>

                {/* Key Highlights */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '0.5rem',
                  background: 'rgba(15, 23, 42, 0.6)',
                  padding: '1rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border)',
                  marginBottom: '1rem'
                }}>
                  {item.highlights.map((hl, hIdx) => (
                    <div key={hIdx} style={{ fontSize: '0.82rem', color: '#f1f5f9', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <i className="fa-solid fa-circle-check" style={{ color: item.color, fontSize: '0.75rem' }}></i> {hl}
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border)' }}>
                <button
                  onClick={() => onOpenInquiry(item.packageName)}
                  className="btn btn-primary"
                  style={{ flex: 1 }}
                >
                  <i className="fa-solid fa-paper-plane"></i> Plan This Experience
                </button>
                <a
                  href={`https://wa.me/919647878373?text=${encodeURIComponent(`Hi Sandesh Travels, I want to inquire about the "${item.title}". Please send available packages & quotes.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp btn-sm"
                  style={{ padding: '0.75rem 1rem' }}
                >
                  <i className="fa-brands fa-whatsapp" style={{ fontSize: '1.15rem' }}></i>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
