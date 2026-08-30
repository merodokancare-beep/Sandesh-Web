'use client';

import { useState, useEffect } from 'react';

export default function PackageList({ onOpenInquiry }) {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [expandedPackageId, setExpandedPackageId] = useState(null);

  useEffect(() => {
    fetch('/api/packages')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.packages) {
          setPackages(data.packages);
        }
      })
      .catch(err => console.error('Failed to load packages:', err))
      .finally(() => setLoading(false));
  }, []);

  const getRegionTag = (region) => {
    switch (region?.toLowerCase()) {
      case 'north':
        return { label: 'North Sikkim', color: 'badge-emerald', icon: 'fa-mountain' };
      case 'east':
        return { label: 'East Sikkim & Gangtok', color: 'badge-blue', icon: 'fa-city' };
      case 'west':
        return { label: 'West Sikkim & Pelling', color: 'badge-gold', icon: 'fa-monastery' };
      case 'silk route':
        return { label: 'Old Silk Route & Zuluk', color: 'badge-emerald', icon: 'fa-road' };
      default:
        return { label: region || 'Himalayan Tour', color: 'badge-blue', icon: 'fa-map' };
    }
  };

  const getPackageImage = (pkg) => {
    const name = (pkg.name || '').toLowerCase();
    const region = (pkg.region || '').toLowerCase();
    if (region === 'north' || name.includes('north') || name.includes('gurudongmar') || name.includes('lachen')) {
      return '/images/gurudongmar.jpg';
    }
    if (region === 'east' || name.includes('gangtok') || name.includes('tsomgo') || name.includes('changu')) {
      return '/images/tsomgo.jpg';
    }
    if (name.includes('yumthang') || name.includes('valley')) {
      return '/images/yumthang.jpg';
    }
    if (region === 'west' || name.includes('pelling')) {
      return '/images/yumthang.jpg';
    }
    return '/images/fleet.jpg';
  };

  const filteredPackages = packages.filter(pkg => {
    if (activeFilter === 'ALL') return true;
    if (activeFilter === 'NORTH') return pkg.region?.toLowerCase() === 'north';
    if (activeFilter === 'EAST') return pkg.region?.toLowerCase() === 'east';
    if (activeFilter === 'WEST') return pkg.region?.toLowerCase() === 'west';
    if (activeFilter === 'SILK ROUTE') return pkg.region?.toLowerCase().includes('silk');
    return true;
  });

  return (
    <section id="packages" className="section-padding" style={{ background: 'var(--bg-base)', position: 'relative' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 3.5rem' }}>
          <span className="badge badge-emerald" style={{ marginBottom: '0.85rem' }}>
            <i className="fa-solid fa-sparkles"></i> Handcrafted Himalayan Itineraries
          </span>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', marginBottom: '1rem' }}>
            Popular Sikkim Tour Packages
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>
            Fully customizable day-by-day tour templates managed live by our local travel team with dedicated cab and permit arrangements.
          </p>

          {/* Region Filter Buttons */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '0.5rem',
            marginTop: '2rem'
          }}>
            {[
              { id: 'ALL', label: 'All Packages', icon: 'fa-layer-group' },
              { id: 'NORTH', label: 'North Sikkim (Gurudongmar/Lachung)', icon: 'fa-mountain' },
              { id: 'EAST', label: 'East Sikkim (Gangtok/Tsomgo)', icon: 'fa-water' },
              { id: 'WEST', label: 'West Sikkim (Pelling/Kalimpong)', icon: 'fa-gopuram' },
              { id: 'SILK ROUTE', label: 'Silk Route & Zuluk', icon: 'fa-route' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`btn btn-sm ${activeFilter === tab.id ? 'btn-primary' : 'btn-secondary'}`}
                style={{
                  borderRadius: 'var(--radius-full)',
                  padding: '0.5rem 1.15rem'
                }}
              >
                <i className={`fa-solid ${tab.icon}`} style={{ marginRight: '4px' }}></i> {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Loading Skeleton */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-secondary)' }}>
            <i className="fa-solid fa-circle-notch fa-spin" style={{ fontSize: '2.5rem', color: 'var(--primary)', marginBottom: '1rem' }}></i>
            <p>Loading real-time packages from CMS database...</p>
          </div>
        )}

        {/* Packages Grid */}
        <div className="grid-2">
          {filteredPackages.map((pkg) => {
            const tag = getRegionTag(pkg.region);
            const isExpanded = expandedPackageId === pkg.id;

            return (
              <div
                key={pkg.id}
                className="glass-card"
                style={{
                  padding: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 0,
                  position: 'relative',
                  overflow: 'hidden',
                  borderRadius: 'var(--radius-lg)'
                }}
              >
                {/* Photo Header */}
                <div style={{ position: 'relative', height: '180px', overflow: 'hidden' }}>
                  <img
                    src={getPackageImage(pkg)}
                    alt={pkg.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(15, 23, 42, 0.95) 0%, rgba(15, 23, 42, 0.2) 60%, transparent 100%)'
                  }}></div>
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    right: '12px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <span className={`badge ${tag.color}`} style={{ backdropFilter: 'blur(8px)', background: 'rgba(8, 12, 20, 0.8)' }}>
                      <i className={`fa-solid ${tag.icon}`}></i> {tag.label}
                    </span>
                    <span style={{ fontSize: '0.8rem', color: '#fff', background: 'rgba(8, 12, 20, 0.8)', padding: '0.25rem 0.65rem', borderRadius: 'var(--radius-full)', backdropFilter: 'blur(8px)' }}>
                      <i className="fa-regular fa-clock" style={{ color: 'var(--accent-teal)', marginRight: '4px' }}></i> {pkg.totalDays}D / {pkg.totalDays - 1}N
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', flexGrow: 1 }}>
                  {/* Title */}
                  <h3 style={{ fontSize: '1.25rem', lineHeight: '1.3' }}>
                    {pkg.name}
                  </h3>

                {/* Price Display */}
                <div style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: '0.5rem',
                  background: 'rgba(16, 185, 129, 0.06)',
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid rgba(16, 185, 129, 0.15)'
                }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Starting from:</span>
                  <span style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--primary)' }}>
                    Rs. {Number(pkg.estimatedPrice).toLocaleString('en-IN')}
                  </span>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>/ private vehicle & stay</span>
                </div>

                {/* Day-by-Day Accordion Preview */}
                <div style={{ flexGrow: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                      <i className="fa-solid fa-list-check" style={{ color: 'var(--secondary)', marginRight: '6px' }}></i> Day-by-Day Highlights:
                    </span>
                    <button
                      onClick={() => setExpandedPackageId(isExpanded ? null : pkg.id)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--primary)',
                        fontSize: '0.82rem',
                        cursor: 'pointer',
                        fontWeight: 600
                      }}
                    >
                      {isExpanded ? 'Hide Details ▲' : 'View All Days ▼'}
                    </button>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                    {(isExpanded ? pkg.days : pkg.days?.slice(0, 2))?.map((day, dIdx) => (
                      <div
                        key={dIdx}
                        style={{
                          background: 'var(--bg-surface-elevated)',
                          padding: '0.75rem 1rem',
                          borderRadius: 'var(--radius-sm)',
                          fontSize: '0.85rem',
                          border: '1px solid var(--border)'
                        }}
                      >
                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'baseline', marginBottom: '0.2rem' }}>
                          <span style={{
                            fontWeight: 700,
                            color: 'var(--accent-teal)',
                            fontSize: '0.8rem',
                            textTransform: 'uppercase'
                          }}>
                            Day {day.dayNumber || dIdx + 1}:
                          </span>
                          <span style={{ fontWeight: 600, color: '#f1f5f9' }}>{day.activities}</span>
                        </div>
                        {isExpanded && day.description && (
                          <p style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', marginTop: '0.35rem', lineHeight: 1.45 }}>
                            {day.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
                  <button
                    onClick={() => onOpenInquiry(`Package Inquiry: ${pkg.name}`)}
                    className="btn btn-primary"
                    style={{ flex: 1 }}
                    id={`package-book-btn-${pkg.id}`}
                  >
                    <i className="fa-solid fa-paper-plane"></i> Book / Inquire Now
                  </button>

                  <a
                    href={`https://wa.me/919647878373?text=${encodeURIComponent(`Hi Sandesh Travels, I am interested in "${pkg.name}". Please share the quotation and vehicle options.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-whatsapp btn-sm"
                    title="Inquire via WhatsApp"
                    style={{ padding: '0.75rem 1rem' }}
                  >
                    <i className="fa-brands fa-whatsapp" style={{ fontSize: '1.2rem' }}></i>
                  </a>
                </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
