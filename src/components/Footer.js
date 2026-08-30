'use client';

export default function Footer() {
  return (
    <footer style={{ background: '#05080e', borderTop: '1px solid var(--border)', padding: '4.5rem 0 2rem' }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '3rem',
          marginBottom: '3.5rem'
        }}>
          {/* Col 1: Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '8px',
                background: 'var(--primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontSize: '1.15rem'
              }}>
                <i className="fa-solid fa-mountain-sun"></i>
              </div>
              <span style={{ fontSize: '1.3rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' }}>
                Sandesh Travels
              </span>
            </div>

            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              Specialized Himalayan destination management company with 20+ company-owned vehicles, registered mountain drivers, and instant quotation engine for Sikkim & Darjeeling.
            </p>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <a href="https://wa.me/919647878373" target="_blank" rel="noopener noreferrer" style={{
                width: '36px', height: '36px', borderRadius: '50%', background: 'var(--bg-surface-elevated)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#25D366', textDecoration: 'none'
              }}>
                <i className="fa-brands fa-whatsapp"></i>
              </a>
              <a href="tel:+919647878373" style={{
                width: '36px', height: '36px', borderRadius: '50%', background: 'var(--bg-surface-elevated)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', textDecoration: 'none'
              }}>
                <i className="fa-solid fa-phone"></i>
              </a>
              <a href="mailto:santeshtravelsgtk@gmail.com" style={{
                width: '36px', height: '36px', borderRadius: '50%', background: 'var(--bg-surface-elevated)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-teal)', textDecoration: 'none'
              }}>
                <i className="fa-solid fa-envelope"></i>
              </a>
            </div>
          </div>

          {/* Col 2: Popular Tour Circuits */}
          <div>
            <h4 style={{ fontSize: '1.1rem', color: '#fff', marginBottom: '1.25rem' }}>Popular Circuits</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.88rem' }}>
              <li>
                <a href="#packages" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
                  North Sikkim (Gurudongmar & Lachung)
                </a>
              </li>
              <li>
                <a href="#packages" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
                  Gangtok & Tsomgo Lake / Nathula Pass
                </a>
              </li>
              <li>
                <a href="#packages" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
                  Pelling Glass Skywalk & Rabdentse
                </a>
              </li>
              <li>
                <a href="#packages" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
                  Old Silk Route & Zuluk Hairpins
                </a>
              </li>
              <li>
                <a href="#packages" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
                  Darjeeling Tea Gardens & Tiger Hill
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Quick Links & Fleet */}
          <div>
            <h4 style={{ fontSize: '1.1rem', color: '#fff', marginBottom: '1.25rem' }}>Fleet & Services</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.88rem' }}>
              <li>
                <a href="#fleet" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
                  Innova Crysta Luxury Rental
                </a>
              </li>
              <li>
                <a href="#fleet" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
                  Mahindra Scorpio 4x4 Mountain Cab
                </a>
              </li>
              <li>
                <a href="#fleet" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
                  Force Tempo Traveller Group Hire
                </a>
              </li>
              <li>
                <a href="#permits" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
                  Sikkim Inner Line Permit Guide
                </a>
              </li>
              <li>
                <a href="#custom-planner" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
                  Custom Tailor-Made Planner
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Office */}
          <div>
            <h4 style={{ fontSize: '1.1rem', color: '#fff', marginBottom: '1.25rem' }}>Registered Travel Desk</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <i className="fa-solid fa-location-dot" style={{ color: 'var(--primary)', marginTop: '0.2rem' }}></i>
                <span>Chota Singtam, Near Kishan School, Aho Busty, Pakyong, Sikkim - 737135</span>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <i className="fa-solid fa-phone" style={{ color: 'var(--accent-teal)', marginTop: '0.2rem' }}></i>
                <a href="tel:+919647878373" style={{ color: '#fff', textDecoration: 'none' }}>+91 9647878373</a>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <i className="fa-solid fa-envelope" style={{ color: 'var(--accent-gold)', marginTop: '0.2rem' }}></i>
                <a href="mailto:santeshtravelsgtk@gmail.com" style={{ color: '#fff', textDecoration: 'none' }}>santeshtravelsgtk@gmail.com</a>
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
            © {new Date().getFullYear()} Sandesh Travels. All rights reserved. Registered Sikkim Tour & Fleet Operator.
          </div>
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <span>Powered by Vani Travels Shared CMS Hub</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
