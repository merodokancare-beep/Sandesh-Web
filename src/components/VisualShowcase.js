'use client';

import { useState } from 'react';

export default function VisualShowcase({ onOpenInquiry }) {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const galleryItems = [
    {
      id: 1,
      category: 'snow',
      title: 'Gurudongmar Sacred Lake (15,900 ft)',
      location: 'North Sikkim',
      image: '/images/gurudongmar.jpg',
      badge: 'Highest Lake in India',
      tag: 'Glacial Turquoise Water & Snow Peaks',
      desc: 'Surreal azure water surrounded by giant snow-clad mountain peaks under deep blue sky.',
      tourQuery: 'North Sikkim Gurudongmar & Lachen Tour'
    },
    {
      id: 2,
      category: 'flowers',
      title: 'Yumthang Valley of Flowers',
      location: 'North Sikkim',
      image: '/images/yumthang.jpg',
      badge: 'Spring Blossom Peak',
      tag: '24 Rhododendron Species & Hot Springs',
      desc: 'Lush alpine meadows carpeted in crimson blooms alongside crystal Himalayan river streams.',
      tourQuery: 'Yumthang Valley & Lachung Tour'
    },
    {
      id: 3,
      category: 'snow',
      title: 'Tsomgo / Changu Frozen Lake',
      location: 'East Sikkim (12,400 ft)',
      image: '/images/tsomgo.jpg',
      badge: 'Winter Snow Wonderland',
      tag: 'Decorated Yaks & Sacred Glacial Lake',
      desc: 'Iconic frozen lake near Indo-China border with snow-draped prayer flags and yak rides.',
      tourQuery: 'Gangtok & Tsomgo Lake / Nathula Tour'
    },
    {
      id: 4,
      category: 'fleet',
      title: 'Our 20+ Dedicated Mountain Fleet',
      location: 'Gangtok – North Sikkim Route',
      image: '/images/fleet.jpg',
      badge: 'Direct Company Owned',
      tag: 'Toyota Innova Crysta & Scorpio 4x4',
      desc: 'Luxury chauffeured SUVs navigating scenic misty mountain highways with verified local drivers.',
      tourQuery: 'Private Cab Hire & Fleet Booking'
    }
  ];

  const filtered = galleryItems.filter(item => {
    if (activeTab === 'all') return true;
    return item.category === activeTab;
  });

  return (
    <section id="visual-attractions" className="section-padding" style={{
      background: 'radial-gradient(ellipse 60% 40% at 50% 10%, rgba(16, 185, 129, 0.12) 0%, transparent 80%), #080c14',
      borderTop: '1px solid var(--border)',
      position: 'relative'
    }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 3.5rem' }}>
          <span className="badge badge-gold" style={{ marginBottom: '0.85rem' }}>
            <i className="fa-solid fa-camera-retro"></i> Live Visual Experience
          </span>
          <h2 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', marginBottom: '1rem', letterSpacing: '-0.03em' }}>
            Visual Attractions of <span className="text-gradient-emerald">Sikkim</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.6 }}>
            Immerse yourself in real high-definition snapshots of your upcoming journey. Click any destination to view details or plan an instant itinerary.
          </p>

          {/* Filter Tabs */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '0.65rem',
            marginTop: '2rem'
          }}>
            {[
              { id: 'all', label: 'All Visual Highlights', icon: 'fa-globe' },
              { id: 'snow', label: 'Snow & High-Altitude Lakes', icon: 'fa-snowflake' },
              { id: 'flowers', label: 'Valley of Flowers & Valleys', icon: 'fa-seedling' },
              { id: 'fleet', label: 'Our Cabs in Action', icon: 'fa-car-side' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`btn btn-sm ${activeTab === tab.id ? 'btn-primary' : 'btn-secondary'}`}
                style={{
                  borderRadius: 'var(--radius-full)',
                  padding: '0.6rem 1.35rem',
                  fontSize: '0.88rem'
                }}
              >
                <i className={`fa-solid ${tab.icon}`} style={{ marginRight: '6px' }}></i>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Visual Gallery Grid */}
        <div className="grid-2" style={{ gap: '2rem' }}>
          {filtered.map((item) => (
            <div
              key={item.id}
              className="glass-card"
              style={{
                padding: 0,
                overflow: 'hidden',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                boxShadow: '0 15px 35px rgba(0,0,0,0.5)',
                transition: 'var(--transition)'
              }}
            >
              {/* Image Container with Zoom and Overlay */}
              <div
                style={{
                  position: 'relative',
                  height: '320px',
                  overflow: 'hidden',
                  cursor: 'pointer'
                }}
                onClick={() => setSelectedPhoto(item)}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease',
                    display: 'block'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.06)'}
                  onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                />

                {/* Top Badges */}
                <div style={{
                  position: 'absolute',
                  top: '16px',
                  left: '16px',
                  right: '16px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  pointerEvents: 'none'
                }}>
                  <span className="badge badge-emerald" style={{ backdropFilter: 'blur(10px)', background: 'rgba(8, 12, 20, 0.75)' }}>
                    <i className="fa-solid fa-location-dot"></i> {item.location}
                  </span>
                  <span className="badge badge-gold" style={{ backdropFilter: 'blur(10px)', background: 'rgba(8, 12, 20, 0.75)' }}>
                    {item.badge}
                  </span>
                </div>

                {/* Bottom Gradient for Title Readability */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(8, 12, 20, 0.95) 0%, rgba(8, 12, 20, 0.2) 50%, transparent 100%)',
                  pointerEvents: 'none'
                }}></div>

                {/* Click to expand hint */}
                <div style={{
                  position: 'absolute',
                  bottom: '16px',
                  right: '16px',
                  background: 'rgba(16, 185, 129, 0.85)',
                  color: '#fff',
                  borderRadius: '50%',
                  width: '38px',
                  height: '38px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1rem',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
                }}>
                  <i className="fa-solid fa-expand"></i>
                </div>
              </div>

              {/* Card Body */}
              <div style={{ padding: '1.75rem', background: 'var(--bg-surface)' }}>
                <h3 style={{ fontSize: '1.45rem', marginBottom: '0.35rem', color: '#fff' }}>
                  {item.title}
                </h3>
                <div style={{ fontSize: '0.85rem', color: 'var(--accent-teal)', fontWeight: 600, marginBottom: '0.75rem' }}>
                  <i className="fa-solid fa-sparkles" style={{ marginRight: '5px' }}></i> {item.tag}
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.5, marginBottom: '1.5rem' }}>
                  {item.desc}
                </p>

                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button
                    onClick={() => onOpenInquiry(`Visual Inquiry: ${item.title}`)}
                    className="btn btn-primary"
                    style={{ flex: 1 }}
                  >
                    <i className="fa-solid fa-paper-plane"></i> Plan Trip to Here
                  </button>
                  <a
                    href={`https://wa.me/919647878373?text=${encodeURIComponent(`Hi Sandesh Travels, I saw the photo of ${item.title} on your website. Please send me the package itinerary & quote.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-whatsapp btn-sm"
                    style={{ padding: '0.75rem 1.15rem' }}
                  >
                    <i className="fa-brands fa-whatsapp" style={{ fontSize: '1.2rem' }}></i>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Fullscreen Modal */}
      {selectedPhoto && (
        <div className="modal-overlay" onClick={() => setSelectedPhoto(null)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '880px', padding: 0, overflow: 'hidden', background: '#080c14' }}
          >
            <div style={{ position: 'relative' }}>
              <img
                src={selectedPhoto.image}
                alt={selectedPhoto.title}
                style={{ width: '100%', maxHeight: '65vh', objectFit: 'cover', display: 'block' }}
              />
              <button
                onClick={() => setSelectedPhoto(null)}
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  background: 'rgba(0,0,0,0.7)',
                  border: 'none',
                  color: '#fff',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            <div style={{ padding: '1.75rem', background: 'var(--bg-surface)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span className="badge badge-emerald">{selectedPhoto.location}</span>
                <span style={{ color: 'var(--accent-gold)', fontSize: '0.85rem', fontWeight: 600 }}>{selectedPhoto.badge}</span>
              </div>
              <h3 style={{ fontSize: '1.6rem', color: '#fff', marginBottom: '0.5rem' }}>{selectedPhoto.title}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                {selectedPhoto.desc}
              </p>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button
                  onClick={() => {
                    const name = selectedPhoto.title;
                    setSelectedPhoto(null);
                    onOpenInquiry(`Visual Lightbox: ${name}`);
                  }}
                  className="btn btn-primary"
                  style={{ flex: 1 }}
                >
                  <i className="fa-solid fa-paper-plane"></i> Get Free WhatsApp Quote for This Spot
                </button>
                <button onClick={() => setSelectedPhoto(null)} className="btn btn-secondary">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
