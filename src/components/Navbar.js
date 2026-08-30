'use client';

import { useState, useEffect } from 'react';

export default function Navbar({ onOpenInquiry }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: scrolled ? 'rgba(8, 12, 20, 0.92)' : 'rgba(8, 12, 20, 0.7)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--border)',
        transition: 'var(--transition)'
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '76px' }}>
        {/* Brand */}
        <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', textDecoration: 'none' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #10b981, #059669)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontSize: '1.25rem',
            boxShadow: '0 4px 12px var(--primary-glow)'
          }}>
            <i className="fa-solid fa-mountain-sun"></i>
          </div>
          <div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
              Sandesh Travels
            </div>
            <div style={{ fontSize: '0.72rem', color: '#34d399', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
              Sikkim & Himalayan Journeys
            </div>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '1.75rem' }} className="desktop-nav">
          <a href="#visual-attractions" style={{ color: 'var(--accent-gold)', textDecoration: 'none', fontSize: '0.92rem', fontWeight: 600, transition: 'var(--transition)' }}>
            <i className="fa-solid fa-camera-retro" style={{ marginRight: '4px' }}></i> Visual Spots
          </a>
          <a href="#packages" style={{ color: 'var(--text-main)', textDecoration: 'none', fontSize: '0.92rem', fontWeight: 500, transition: 'var(--transition)' }}>
            Tour Packages
          </a>
          <a href="#custom-planner" style={{ color: 'var(--text-main)', textDecoration: 'none', fontSize: '0.92rem', fontWeight: 500, transition: 'var(--transition)' }}>
            Custom Planner
          </a>
          <a href="#fleet" style={{ color: 'var(--text-main)', textDecoration: 'none', fontSize: '0.92rem', fontWeight: 500, transition: 'var(--transition)' }}>
            Fleet & Cabs
          </a>
          <a href="#permits" style={{ color: 'var(--text-main)', textDecoration: 'none', fontSize: '0.92rem', fontWeight: 500, transition: 'var(--transition)' }}>
            Permits & FAQ
          </a>
          <a href="#reviews" style={{ color: 'var(--text-main)', textDecoration: 'none', fontSize: '0.92rem', fontWeight: 500, transition: 'var(--transition)' }}>
            Reviews
          </a>
        </nav>

        {/* Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <a
            href="tel:+919647878373"
            className="btn btn-secondary btn-sm"
            style={{ display: 'none', '@media (minWidth: 992px)': { display: 'inline-flex' } }}
            title="Call 24/7 Helpline"
          >
            <i className="fa-solid fa-phone" style={{ color: 'var(--primary)', fontSize: '0.85rem' }}></i>
            <span style={{ fontSize: '0.85rem' }}>+91 9647878373</span>
          </a>

          <button
            onClick={() => onOpenInquiry('General Website Inquiry')}
            className="btn btn-primary btn-sm"
            id="nav-quick-quote-btn"
          >
            <i className="fa-solid fa-paper-plane"></i>
            <span>Get Free Quote</span>
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#fff',
              fontSize: '1.35rem',
              cursor: 'pointer',
              display: 'none',
              padding: '0.5rem'
            }}
            className="mobile-toggle"
            aria-label="Toggle menu"
          >
            <i className={`fa-solid ${mobileMenuOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div style={{
          background: 'var(--bg-surface)',
          borderBottom: '1px solid var(--border)',
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          <a href="#visual-attractions" onClick={() => setMobileMenuOpen(false)} style={{ color: '#fbbf24', textDecoration: 'none', fontSize: '1rem', padding: '0.5rem 0', fontWeight: 600 }}>
            <i className="fa-solid fa-camera-retro" style={{ width: '24px', color: '#fbbf24' }}></i> Visual Attractions
          </a>
          <a href="#packages" onClick={() => setMobileMenuOpen(false)} style={{ color: '#fff', textDecoration: 'none', fontSize: '1rem', padding: '0.5rem 0' }}>
            <i className="fa-solid fa-map-location-dot" style={{ width: '24px', color: 'var(--primary)' }}></i> Tour Packages
          </a>
          <a href="#custom-planner" onClick={() => setMobileMenuOpen(false)} style={{ color: '#fff', textDecoration: 'none', fontSize: '1rem', padding: '0.5rem 0' }}>
            <i className="fa-solid fa-sliders" style={{ width: '24px', color: 'var(--accent-teal)' }}></i> Custom Planner
          </a>
          <a href="#fleet" onClick={() => setMobileMenuOpen(false)} style={{ color: '#fff', textDecoration: 'none', fontSize: '1rem', padding: '0.5rem 0' }}>
            <i className="fa-solid fa-car" style={{ width: '24px', color: 'var(--accent-gold)' }}></i> Fleet & Cabs
          </a>
          <a href="#permits" onClick={() => setMobileMenuOpen(false)} style={{ color: '#fff', textDecoration: 'none', fontSize: '1rem', padding: '0.5rem 0' }}>
            <i className="fa-solid fa-passport" style={{ width: '24px', color: 'var(--secondary)' }}></i> Permits & FAQ
          </a>
          <a href="#reviews" onClick={() => setMobileMenuOpen(false)} style={{ color: '#fff', textDecoration: 'none', fontSize: '1rem', padding: '0.5rem 0' }}>
            <i className="fa-solid fa-star" style={{ width: '24px', color: '#fbbf24' }}></i> Reviews
          </a>

          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1rem', display: 'flex', gap: '0.5rem' }}>
            <a href="tel:+919647878373" className="btn btn-secondary btn-sm" style={{ flex: 1 }}>
              <i className="fa-solid fa-phone"></i> Call
            </a>
            <a href="https://wa.me/919647878373" target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp btn-sm" style={{ flex: 1 }}>
              <i className="fa-brands fa-whatsapp"></i> WhatsApp
            </a>
          </div>
        </div>
      )}

      <style jsx>{`
        @media (max-width: 868px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-toggle {
            display: block !important;
          }
        }
      `}</style>
    </header>
  );
}
