'use client';

export default function Footer() {
  return (
    <footer style={{ background: '#05080e', borderTop: '1px solid var(--border)', padding: '4.5rem 0 2rem' }}>
      <div className="container">
        {/* Top Government Credentials Verification Strip */}
        <div style={{
          background: 'rgba(15, 23, 42, 0.75)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: 'var(--radius-md)',
          padding: '1.25rem 1.75rem',
          marginBottom: '3.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.25rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <span className="badge badge-emerald" style={{ fontSize: '0.72rem' }}>
              <i className="fa-solid fa-building-shield"></i> Govt. of Sikkim Verified
            </span>
            <div style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>
              <strong style={{ color: '#fff' }}>Reg Name:</strong> M/s Sandesh Travels | <strong style={{ color: '#fff' }}>Reg No:</strong> 1667/DoT&CAv/Gtk/24/TA | <strong style={{ color: '#fff' }}>License:</strong> E06/AHY/0282
            </div>
          </div>
          <div style={{ display: 'flex', gap: '1.25rem', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            <span>PAN: <strong style={{ color: '#e2e8f0' }}>AXXPR3863J</strong></span>
            <span>GSTIN: <strong style={{ color: '#e2e8f0' }}>11AXXPR3863J1ZT</strong></span>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '3rem',
          marginBottom: '3.5rem'
        }}>
          {/* Col 1: Brand & Overview */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <img
                src="/logo.png"
                alt="Sandesh Travels Logo"
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '8px',
                  objectFit: 'contain',
                  background: '#ffffff',
                  padding: '3px',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  flexShrink: 0
                }}
              />
              <div>
                <span style={{ fontSize: '1.3rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', display: 'block', lineHeight: 1.1 }}>
                  Sandesh Travels
                </span>
                <span style={{ fontSize: '0.7rem', color: '#34d399', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                  Tours & Travel Company
                </span>
              </div>
            </div>

            <p style={{ color: 'var(--accent-gold)', fontSize: '0.88rem', fontWeight: 600, fontStyle: 'italic', marginBottom: '0.85rem' }}>
              “Travel Smart, Travel Sandesh.”
            </p>

            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              M/s Sandesh Travels is a licensed & registered tours and travel company under the Government of Sikkim based in Pakyong. We specialize in corporate, family, and luxury journeys across the Himalayas with 20+ company-owned vehicles.
            </p>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <a href="https://wa.me/919647878373" target="_blank" rel="noopener noreferrer" style={{
                width: '36px', height: '36px', borderRadius: '50%', background: 'var(--bg-surface-elevated)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#25D366', textDecoration: 'none'
              }} title="WhatsApp Support">
                <i className="fa-brands fa-whatsapp"></i>
              </a>
              <a href="tel:+919647878373" style={{
                width: '36px', height: '36px', borderRadius: '50%', background: 'var(--bg-surface-elevated)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', textDecoration: 'none'
              }} title="Call Helpline">
                <i className="fa-solid fa-phone"></i>
              </a>
              <a href="mailto:sandeshtravelsgtk@gmail.com" style={{
                width: '36px', height: '36px', borderRadius: '50%', background: 'var(--bg-surface-elevated)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-teal)', textDecoration: 'none'
              }} title="Email Official Desk">
                <i className="fa-solid fa-envelope"></i>
              </a>
            </div>
          </div>

          {/* Col 2: Popular Tour Circuits */}
          <div>
            <h4 style={{ fontSize: '1.1rem', color: '#fff', marginBottom: '1.25rem' }}>Popular Circuits</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.88rem' }}>
              <li>
                <a href="/#packages" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
                  North Sikkim (Gurudongmar & Lachung)
                </a>
              </li>
              <li>
                <a href="/#packages" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
                  Gangtok & Tsomgo Lake / Nathula Pass
                </a>
              </li>
              <li>
                <a href="/#packages" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
                  Pelling Glass Skywalk & Rabdentse
                </a>
              </li>
              <li>
                <a href="/#packages" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
                  Old Silk Route & Zuluk Hairpins
                </a>
              </li>
              <li>
                <a href="/#packages" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
                  Darjeeling Tea Gardens & Tiger Hill
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Company & Services */}
          <div>
            <h4 style={{ fontSize: '1.1rem', color: '#fff', marginBottom: '1.25rem' }}>Company & Fleet</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.88rem' }}>
              <li>
                <a href="/about" style={{ color: '#34d399', textDecoration: 'none', fontWeight: 600 }}>
                  <i className="fa-solid fa-building-columns" style={{ marginRight: '6px', fontSize: '0.8rem' }}></i> About Sandesh Travels
                </a>
              </li>
              <li>
                <a href="/#fleet" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
                  Innova Crysta Luxury Rental
                </a>
              </li>
              <li>
                <a href="/#fleet" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
                  Mahindra Scorpio 4x4 Mountain Cab
                </a>
              </li>
              <li>
                <a href="/#fleet" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
                  Force Tempo Traveller Group Hire
                </a>
              </li>
              <li>
                <a href="/#permits" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
                  Sikkim Inner Line Permit Guide
                </a>
              </li>
              <li>
                <a href="/feedback" style={{ color: '#fbbf24', textDecoration: 'none', fontWeight: 600 }}>
                  <i className="fa-solid fa-star" style={{ marginRight: '5px', fontSize: '0.8rem' }}></i> Submit Tour Feedback
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Office */}
          <div>
            <h4 style={{ fontSize: '1.1rem', color: '#fff', marginBottom: '1.25rem' }}>Registered Office</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.86rem', color: 'var(--text-secondary)' }}>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <i className="fa-solid fa-location-dot" style={{ color: 'var(--primary)', marginTop: '0.2rem' }}></i>
                <div>
                  <strong style={{ color: '#fff', display: 'block' }}>M/s Sandesh Travels</strong>
                  Chotta Singtam, Near Kishan School, Aho Busty, Aho Yangtam GPU, Pakyong - 737135, Sikkim
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <i className="fa-solid fa-phone" style={{ color: 'var(--accent-teal)', marginTop: '0.2rem' }}></i>
                <div>
                  <a href="tel:+919647878373" style={{ color: '#fff', textDecoration: 'none', display: 'block' }}>+91 96478 78373</a>
                  <a href="tel:+918391879493" style={{ color: '#cbd5e1', textDecoration: 'none', display: 'block' }}>+91 83918 79493</a>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <i className="fa-solid fa-envelope" style={{ color: 'var(--accent-gold)', marginTop: '0.2rem' }}></i>
                <a href="mailto:sandeshtravelsgtk@gmail.com" style={{ color: '#fff', textDecoration: 'none' }}>
                  sandeshtravelsgtk@gmail.com
                </a>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <i className="fa-solid fa-globe" style={{ color: '#60a5fa', marginTop: '0.2rem' }}></i>
                <a href="https://www.sandeshtravels.in" target="_blank" rel="noopener noreferrer" style={{ color: '#60a5fa', textDecoration: 'none' }}>
                  www.sandeshtravels.in
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid var(--border)',
          paddingTop: '1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          fontSize: '0.82rem',
          color: 'var(--text-muted)'
        }}>
          <div>
            © {new Date().getFullYear()} M/s Sandesh Travels. All rights reserved. Government of Sikkim Registered Tours & Travel Operator (Reg: 1667/DoT&CAv/Gtk/24/TA).
          </div>
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <a href="/about" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>About Us</a>
            <a href="/#permits" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Permit FAQs</a>
            <a href="/feedback" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Write Review</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
