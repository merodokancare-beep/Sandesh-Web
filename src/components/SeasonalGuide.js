'use client';

import { useState } from 'react';

export default function SeasonalGuide({ onOpenInquiry }) {
  const [activeSeason, setActiveSeason] = useState('autumn');

  const seasons = [
    {
      id: 'autumn',
      name: 'Autumn / Peak Clear (Oct – Dec)',
      icon: 'fa-sun',
      color: '#f59e0b',
      badge: 'Best Visibility',
      temp: '10°C to 18°C (Days) / 0°C to 5°C (Nights)',
      vibe: 'Crystal clear panoramic views of Mt. Kanchenjunga, vibrant autumn festivals, and crisp Himalayan mountain air.',
      recommended: [
        'North Sikkim (Gurudongmar Lake has deepest azure blue water)',
        'Pelling & Ravangla (Best snow-peak visibility across the horizon)',
        'Tsomgo Lake & Nathula Pass (Pleasant daytime travel)',
        'Old Silk Route (Clear 32-hairpin views at Thambi)'
      ],
      clothing: 'Heavy woolens, windproof jackets, thermals for high altitude nights.',
      quoteText: 'Oct-Dec Peak Season Tour'
    },
    {
      id: 'winter',
      name: 'Winter & Snow Season (Jan – Mar)',
      icon: 'fa-snowflake',
      color: '#38bdf8',
      badge: 'Snowfall Lovers',
      temp: '-5°C to 10°C (High Altitude sub-zero)',
      vibe: 'Magical snow wonderland. Zero Point, Yumthang Valley, Lachen, and Changu Lake are blanketed in white powder snow.',
      recommended: [
        'Yumthang Valley & Zero Point (Guaranteed snow play & hot springs)',
        'Changu / Tsomgo Lake (Frozen lake with snowy yak rides)',
        'Lachen & Lachung (Snowy village stays & bonfires)',
        'Gangtok Ropeway & MG Marg Winter Carnival'
      ],
      clothing: 'Heavy down jackets, waterproof snow gloves, thermal innerwear, snow boots.',
      quoteText: 'Winter Snow & Jeep Adventure Tour'
    },
    {
      id: 'spring',
      name: 'Spring & Flower Blooms (Apr – Jun)',
      icon: 'fa-seedling',
      color: '#34d399',
      badge: 'Family & Flowers',
      temp: '15°C to 24°C (Very pleasant)',
      vibe: 'The Valley of Flowers comes alive! 24 species of wild Rhododendrons, primulas, and orchids bloom in radiant crimson and purple.',
      recommended: [
        'Singhba Rhododendron Sanctuary & Yumthang (Peak blooming)',
        'Darjeeling & Kalimpong (Lush green tea gardens & toy train rides)',
        'Pelling Glass Skywalk & Khecheopalri Sacred Lake',
        'Gangtok Flower Exhibition & Ban Jhakri Waterfalls'
      ],
      clothing: 'Light woolens, cotton layers for day, light jackets for evenings.',
      quoteText: 'Spring & Summer Family Himalayan Tour'
    },
    {
      id: 'monsoon',
      name: 'Monsoon & Serene Green (Jul – Sep)',
      icon: 'fa-cloud-showers-heavy',
      color: '#10b981',
      badge: 'Budget & Waterfalls',
      temp: '18°C to 26°C',
      vibe: 'Lush misty emerald valleys and thundering waterfalls at their peak volume (Seven Sisters, Bakthang, Rimbi). Off-peak hotel deals.',
      recommended: [
        'Gangtok & West Sikkim Cultural Monasteries',
        'Darjeeling Tea Estate Retreats',
        'Namchi Chardham & Ravangla Buddha Park',
        'Waterfalls & Nature Photography Trails'
      ],
      clothing: 'Raincoats, umbrellas, quick-dry clothing, waterproof footwear.',
      quoteText: 'Monsoon Green Valley Tour'
    }
  ];

  const current = seasons.find(s => s.id === activeSeason) || seasons[0];

  return (
    <section className="section-padding" style={{ background: 'var(--bg-surface)', borderTop: '1px solid var(--border)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 3.5rem' }}>
          <span className="badge badge-blue" style={{ marginBottom: '0.85rem' }}>
            <i className="fa-solid fa-calendar-days"></i> When to Plan Your Trip
          </span>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', marginBottom: '1rem' }}>
            Sikkim Seasonal Weather & Travel Guide
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>
            Every season in Sikkim offers a unique experience. Select a travel season below to see what to expect and which circuits are best.
          </p>

          {/* Season Selector Tabs */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '0.65rem',
            marginTop: '2rem'
          }}>
            {seasons.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveSeason(s.id)}
                className={`btn btn-sm ${activeSeason === s.id ? 'btn-primary' : 'btn-secondary'}`}
                style={{
                  borderRadius: 'var(--radius-full)',
                  padding: '0.6rem 1.25rem',
                  fontSize: '0.88rem'
                }}
              >
                <i className={`fa-solid ${s.icon}`} style={{ marginRight: '6px', color: activeSeason === s.id ? '#fff' : s.color }}></i>
                {s.name}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Season Card */}
        <div className="glass-card" style={{ maxWidth: '960px', margin: '0 auto', padding: '2.5rem', background: 'rgba(15, 23, 42, 0.85)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '1.25rem' }}>
            <div>
              <span className="badge badge-gold" style={{ marginBottom: '0.5rem' }}>{current.badge}</span>
              <h3 style={{ fontSize: '1.6rem', color: '#fff' }}>{current.name}</h3>
            </div>
            <div style={{ background: 'var(--bg-surface-elevated)', padding: '0.6rem 1.25rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', fontSize: '0.85rem' }}>
              <strong style={{ color: 'var(--accent-teal)' }}><i className="fa-solid fa-temperature-half"></i> Temperature: </strong>
              <span style={{ color: '#cbd5e1' }}>{current.temp}</span>
            </div>
          </div>

          <p style={{ fontSize: '1.05rem', color: '#e2e8f0', lineHeight: 1.6, marginBottom: '1.75rem' }}>
            {current.vibe}
          </p>

          <div className="grid-2" style={{ marginBottom: '2rem' }}>
            <div style={{ background: 'var(--bg-surface-elevated)', padding: '1.25rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                <i className="fa-solid fa-map-location-dot" style={{ marginRight: '6px' }}></i> Top Recommended Circuits:
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.88rem' }}>
                {current.recommended.map((rec, rIdx) => (
                  <li key={rIdx} style={{ color: '#cbd5e1', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <i className="fa-solid fa-circle-check" style={{ color: 'var(--primary)', fontSize: '0.75rem' }}></i> {rec}
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ background: 'var(--bg-surface-elevated)', padding: '1.25rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-gold)', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                  <i className="fa-solid fa-shirt" style={{ marginRight: '6px' }}></i> What to Pack & Wear:
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.5 }}>
                  {current.clothing}
                </p>
              </div>

              <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border)', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                <i className="fa-solid fa-shield-heart" style={{ color: 'var(--secondary)', marginRight: '4px' }}></i> All Sandesh Travels vehicles include heater, snow chains, and warm blankets on high-altitude routes.
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => onOpenInquiry(`Season Inquiry: ${current.quoteText}`)}
              className="btn btn-primary"
            >
              <i className="fa-solid fa-paper-plane"></i> Plan {current.name.split('(')[0]} Tour
            </button>
            <a
              href={`https://wa.me/919647878373?text=${encodeURIComponent(`Hi Sandesh Travels, I am planning to visit Sikkim during ${current.name}. Please share itinerary and quote.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp"
            >
              <i className="fa-brands fa-whatsapp"></i> WhatsApp Quote for This Season
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
