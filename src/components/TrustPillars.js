'use client';

export default function TrustPillars({ onOpenInquiry }) {
  const pillars = [
    {
      icon: 'fa-car-tunnel',
      title: 'Direct 20+ Fleet Owner',
      desc: 'No broker markups or third-party middlemen. You get direct local operator pricing and guaranteed sanitized, company-owned vehicles.',
      badge: 'Zero Commission',
      color: 'var(--primary)'
    },
    {
      icon: 'fa-shield-halved',
      title: '100% Guaranteed Permits',
      desc: 'North Sikkim & Nathula Pass military permits are processed directly by our Gangtok desk with zero documentation hassle for you.',
      badge: 'Hassle-Free',
      color: 'var(--secondary)'
    },
    {
      icon: 'fa-user-shield',
      title: 'Mountain-Certified Drivers',
      desc: 'All our drivers have 10+ years of high-altitude Himalayan experience, snow chains expertise, and verified background checks.',
      badge: 'Safety First',
      color: 'var(--accent-gold)'
    },
    {
      icon: 'fa-headset',
      title: '24/7 Live On-Tour Support',
      desc: 'Real-time monitoring of road conditions, hotel check-ins, and immediate backup vehicle dispatch in case of weather roadblocks.',
      badge: 'Round-the-Clock',
      color: 'var(--accent-teal)'
    }
  ];

  return (
    <section style={{
      background: 'linear-gradient(180deg, #0d1322 0%, #080c14 100%)',
      padding: '4rem 0 3.5rem',
      borderBottom: '1px solid var(--border)'
    }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 3rem' }}>
          <span className="badge badge-emerald" style={{ marginBottom: '0.85rem' }}>
            <i className="fa-solid fa-circle-check"></i> The Sandesh Travels Advantage
          </span>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', marginBottom: '0.75rem' }}>
            Why 15,000+ Travelers Choose Us
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>
            Planning high-altitude Himalayan travel requires safety, reliability, and local expertise. Here is how we guarantee a seamless experience.
          </p>
        </div>

        <div className="grid-4">
          {pillars.map((item, idx) => (
            <div
              key={idx}
              className="glass-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '1.5rem',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                background: 'rgba(15, 23, 42, 0.65)'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: 'var(--bg-surface-elevated)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.4rem',
                    color: item.color,
                    border: '1px solid var(--border)'
                  }}>
                    <i className={`fa-solid ${item.icon}`}></i>
                  </div>
                  <span className="badge badge-emerald" style={{ fontSize: '0.7rem' }}>{item.badge}</span>
                </div>

                <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem', color: '#fff' }}>{item.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.5 }}>
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
