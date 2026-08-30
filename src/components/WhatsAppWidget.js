'use client';

import { useState } from 'react';

export default function WhatsAppWidget() {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 900 }}>
      {/* Tooltip */}
      {showTooltip && (
        <div style={{
          position: 'absolute',
          bottom: '70px',
          right: '0',
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-highlight)',
          borderRadius: 'var(--radius-md)',
          padding: '1rem 1.25rem',
          width: '280px',
          boxShadow: 'var(--shadow-glow), 0 10px 25px rgba(0,0,0,0.5)',
          animation: 'slideUp 0.25s ease-out'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
            <span className="pulse-dot"></span>
            <strong style={{ fontSize: '0.9rem', color: '#fff' }}>Trip Expert Online</strong>
          </div>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.4, marginBottom: '0.75rem' }}>
            Need a fast custom quote or cab booking? Chat directly with Sandesh Travels on WhatsApp.
          </p>
          <a
            href="https://wa.me/919647878373?text=Hi%20Sandesh%20Travels,%20I%20am%20planning%20a%20Sikkim%20trip%20and%20need%20assistance."
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp btn-sm"
            style={{ width: '100%' }}
          >
            <i className="fa-brands fa-whatsapp"></i> Start WhatsApp Chat
          </a>
        </div>
      )}

      {/* Floating Button */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <button
          onClick={() => setShowTooltip(!showTooltip)}
          style={{
            width: '58px',
            height: '58px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #25D366, #128C7E)',
            color: '#fff',
            border: 'none',
            fontSize: '1.8rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 6px 20px rgba(37, 211, 102, 0.45)',
            transition: 'var(--transition)'
          }}
          aria-label="WhatsApp Support"
        >
          <i className="fa-brands fa-whatsapp"></i>
        </button>
      </div>
    </div>
  );
}
