'use client';

export default function DestinationGallery({ onOpenInquiry }) {
  const destinations = [
    {
      name: 'Gurudongmar Sacred Lake',
      region: 'North Sikkim',
      altitude: '15,900 ft (4,846 m)',
      bestSeason: 'Oct to May',
      tag: 'Sacred High Altitude',
      desc: 'One of the highest lakes in the world, surrounded by snow-capped peaks. Legend holds that Guru Padmasambhava blessed a portion of this water to never freeze even in harsh winters.',
      mustSee: ['Chopta Valley', 'Thangu Alpine Settlement', 'Surreal Turquoise Water'],
      icon: 'fa-snowflake',
      accent: '#38bdf8'
    },
    {
      name: 'Yumthang Valley & Zero Point',
      region: 'North Sikkim',
      altitude: '11,800 ft – 15,300 ft',
      bestSeason: 'All Year (Flowers in Apr-May, Snow in Dec-Mar)',
      tag: 'Valley of Flowers',
      desc: 'Known as the "Switzerland of the East". In spring, 24 species of rhododendrons carpet the valley, while Zero Point offers year-round snow landscapes and steaming natural sulfur hot springs.',
      mustSee: ['Singhba Rhododendron Sanctuary', 'Zero Point (Yumesamdong)', 'Natural Hot Springs'],
      icon: 'fa-tree',
      accent: '#34d399'
    },
    {
      name: 'Pelling Glass Skywalk & Rabdentse',
      region: 'West Sikkim',
      altitude: '7,200 ft (2,150 m)',
      bestSeason: 'Sep to Jun',
      tag: 'Architectural Wonder',
      desc: 'Walk on transparent glass overlooking the mist-filled Himalayan valley with clear views of Mt. Kanchenjunga. Visit ancient Rabdentse palace ruins and the sacred wishing lake at Khecheopalri.',
      mustSee: ['India\'s First Glass Skywalk', 'Chenrezig 137ft Colossus', 'Rabdentse Palace Ruins'],
      icon: 'fa-mountain-city',
      accent: '#fbbf24'
    },
    {
      name: 'Old Silk Route & Zuluk',
      region: 'East Sikkim Loop',
      altitude: '9,400 ft – 13,000 ft',
      bestSeason: 'Oct to Jun',
      tag: 'Historic Trade Trail',
      desc: 'Relive the ancient Indo-Tibet trade route with its world-famous 32-hairpin curves at Thambi Viewpoint, high-altitude Kupup Elephant Lake, and authentic cozy mountain homestays.',
      mustSee: ['Thambi 32-Zigzag Viewpoint', 'Kupup Elephant Lake', 'Old Baba Mandir Bunker'],
      icon: 'fa-route',
      accent: '#f43f5e'
    },
    {
      name: 'Tsomgo Lake & Nathula Pass',
      region: 'East Sikkim',
      altitude: '12,400 ft – 14,140 ft',
      bestSeason: 'Oct to May',
      tag: 'Indo-China Border',
      desc: 'A glacial lake revered by locals that changes color with the seasons. Just 18 km further lies Nathula Pass on the historic Indo-China border, flanked by snow peaks and army memorials.',
      mustSee: ['Yak Rides at Changu Lake', 'Nathula Pass Border Post', 'Baba Harbhajan Singh Shrine'],
      icon: 'fa-shield-halved',
      accent: '#60a5fa'
    },
    {
      name: 'Darjeeling & Tiger Hill',
      region: 'Queen of the Hills',
      altitude: '6,700 ft (2,042 m)',
      bestSeason: 'Sep to May',
      tag: 'UNESCO Heritage',
      desc: 'Witness the iconic golden sunrise turning Mt. Kanchenjunga into molten gold from Tiger Hill. Ride the historic Darjeeling Himalayan Toy Train through lush rolling tea estates.',
      mustSee: ['Tiger Hill Sunrise', 'Batasia Loop & Toy Train', 'Happy Valley Tea Estate'],
      icon: 'fa-mug-hot',
      accent: '#10b981'
    }
  ];

  return (
    <section className="section-padding" style={{ background: 'linear-gradient(180deg, #080c14 0%, #0d1322 100%)', borderTop: '1px solid var(--border)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 3.5rem' }}>
          <span className="badge badge-emerald" style={{ marginBottom: '0.85rem' }}>
            <i className="fa-solid fa-camera"></i> Iconic Himalayan Landmarks
          </span>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', marginBottom: '1rem' }}>
            Must-Visit Sikkim Destinations
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>
            Experience legendary sacred lakes, high-altitude passes, and mountain skywalks managed safely with our company-owned 4x4 fleet.
          </p>
        </div>

        <div className="grid-3">
          {destinations.map((dest, idx) => (
            <div
              key={idx}
              className="glass-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '1.25rem',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                background: 'rgba(15, 23, 42, 0.75)'
              }}
            >
              <div>
                {/* Top Badge & Altitude */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
                  <span className="badge badge-emerald" style={{ fontSize: '0.72rem' }}>
                    <i className={`fa-solid ${dest.icon}`} style={{ color: dest.accent }}></i> {dest.tag}
                  </span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    <i className="fa-solid fa-gauge-high" style={{ color: dest.accent, marginRight: '4px' }}></i> {dest.altitude}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.3rem', color: '#fff', marginBottom: '0.25rem' }}>{dest.name}</h3>
                <div style={{ fontSize: '0.82rem', color: dest.accent, fontWeight: 600, marginBottom: '0.85rem' }}>
                  {dest.region} • Best: {dest.bestSeason}
                </div>

                <p style={{ color: 'var(--text-secondary)', fontSize: '0.86rem', lineHeight: 1.5, marginBottom: '1rem' }}>
                  {dest.desc}
                </p>

                {/* Highlights */}
                <div style={{ background: 'var(--bg-surface-elevated)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                    Key Highlights
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                    {dest.mustSee.map((ms, mIdx) => (
                      <div key={mIdx} style={{ fontSize: '0.8rem', color: '#e2e8f0', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <i className="fa-solid fa-check" style={{ color: 'var(--primary)', fontSize: '0.7rem' }}></i> {ms}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border)' }}>
                <button
                  onClick={() => onOpenInquiry(`Destination Inquiry: ${dest.name} (${dest.region})`)}
                  className="btn btn-primary btn-sm"
                  style={{ flex: 1 }}
                >
                  <i className="fa-solid fa-paper-plane"></i> Inquire Route
                </button>
                <a
                  href={`https://wa.me/919647878373?text=${encodeURIComponent(`Hi Sandesh Travels, I want to plan a trip to ${dest.name} in ${dest.region}. What are the cab & permit details?`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp btn-sm"
                  style={{ padding: '0.5rem 0.85rem' }}
                >
                  <i className="fa-brands fa-whatsapp"></i>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
