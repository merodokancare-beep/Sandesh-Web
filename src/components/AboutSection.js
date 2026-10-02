'use client';

export default function AboutSection({ onOpenInquiry }) {
  const credentials = [
    {
      icon: 'fa-building-columns',
      label: 'Registered Entity',
      val: 'M/s Sandesh Travels',
      sub: 'Govt. of Sikkim Registered',
      color: '#34d399'
    },
    {
      icon: 'fa-certificate',
      label: 'Registration Number',
      val: '1667/DoT&CAv/Gtk/24/TA',
      sub: 'Dept. of Tourism & Civil Aviation',
      color: '#fbbf24'
    },
    {
      icon: 'fa-id-card-clip',
      label: 'Official License No.',
      val: 'E06/AHY/0282',
      sub: 'Verified Tour Operator License',
      color: '#60a5fa'
    },
    {
      icon: 'fa-file-invoice-dollar',
      label: 'GST & Tax Compliance',
      val: 'GSTIN: 11AXXPR3863J1ZT',
      sub: 'PAN: AXXPR3863J',
      color: '#a78bfa'
    }
  ];

  const services = [
    {
      icon: 'fa-briefcase',
      title: 'Corporate & Business Travel',
      desc: 'Seamless end-to-end transport management, executive SUVs, dedicated account coordinators, and transparent GST compliance.'
    },
    {
      icon: 'fa-champagne-glasses',
      title: 'Luxury & Family Holidays',
      desc: 'Handcrafted itineraries for couples, honeymooners, and multi-generational families with verified luxury mountain resorts.'
    },
    {
      icon: 'fa-map-location-dot',
      title: 'Customized Tour Planning',
      desc: 'Tailor-made Himalayan routes covering North Sikkim, Silk Route, West Sikkim & Darjeeling customized to your pace and budget.'
    },
    {
      icon: 'fa-car-side',
      title: 'Transport & Vehicle Rentals',
      desc: '20+ company-owned cabs including Innova Crysta, Scorpio 4x4, and Force Tempo Travellers driven by mountain-certified pilots.'
    },
    {
      icon: 'fa-compass-drafting',
      title: 'Travel Consultation & Permits',
      desc: 'Direct processing of Inner Line Permits (ILP), Gurudongmar Lake, Zero Point, and Nathula Pass documentation.'
    }
  ];

  const whyChooseUs = [
    {
      title: 'Government of Sikkim Registered',
      desc: 'Registered under the Department of Tourism & Civil Aviation (Reg: 1667/DoT&CAv/Gtk/24/TA) ensuring complete legal credibility and consumer safety.'
    },
    {
      title: 'Officially Licensed Operator',
      desc: 'Possessing valid state license E06/AHY/0282, guaranteeing transparent pricing without hidden tourist markups or unauthorized middle-men.'
    },
    {
      title: 'Professional & Experienced Staff',
      desc: 'Courteous local tour specialists and senior Himalayan mountain drivers with 10+ years of high-altitude driving experience.'
    },
    {
      title: 'Tailored Travel Solutions',
      desc: 'Every itinerary is thoughtfully curated around your dates, hotel preferences, family requirements, and child age guidelines.'
    },
    {
      title: 'Direct-Fleet Pricing & Luxury Options',
      desc: 'Own fleet of 20+ pristine cabs from comfortable budget transfers to luxury Innova Crysta & Fortuner escorts.'
    },
    {
      title: 'Safety, Oxygen & 24/7 Support',
      desc: 'Uncompromising commitment to passenger safety with real-time road condition monitoring, snow chains, and 24/7 on-call helpline.'
    }
  ];

  return (
    <section id="about" style={{
      padding: '5.5rem 0 4.5rem',
      background: 'linear-gradient(180deg, #080c14 0%, #0c1322 50%, #080c14 100%)',
      borderTop: '1px solid var(--border)',
      borderBottom: '1px solid var(--border)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background radial highlights */}
      <div style={{
        position: 'absolute',
        top: '15%',
        right: '-5%',
        width: '450px',
        height: '450px',
        background: 'radial-gradient(circle, rgba(16, 185, 129, 0.06) 0%, transparent 70%)',
        filter: 'blur(60px)',
        pointerEvents: 'none'
      }}></div>
      <div style={{
        position: 'absolute',
        bottom: '10%',
        left: '-5%',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(59, 130, 246, 0.06) 0%, transparent 70%)',
        filter: 'blur(50px)',
        pointerEvents: 'none'
      }}></div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 3.5rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <span className="badge badge-emerald" style={{ padding: '0.45rem 1rem' }}>
              <i className="fa-solid fa-building-shield"></i> Licensed & Verified Sikkim Operator
            </span>
          </div>

          <h2 style={{
            fontSize: 'clamp(2rem, 3.8vw, 3rem)',
            lineHeight: 1.15,
            marginBottom: '1rem',
            letterSpacing: '-0.02em'
          }}>
            About <span className="text-gradient-emerald">M/s Sandesh Travels</span>
          </h2>

          <p style={{
            fontSize: '1.2rem',
            color: 'var(--accent-gold)',
            fontStyle: 'italic',
            fontWeight: 600,
            marginBottom: '1rem',
            letterSpacing: '0.02em'
          }}>
            “Travel Smart, Travel Sandesh.”
          </p>

          <p style={{
            color: 'var(--text-secondary)',
            fontSize: '1.05rem',
            lineHeight: 1.65,
            margin: '0 auto'
          }}>
            M/s Sandesh Travels is a licensed and registered tours and travel company under the Government of Sikkim, based in Pakyong. We specialize in providing personalized travel experiences, catering to corporate clients, families, and luxury travelers. Our dedicated team ensures safe, comfortable, and memorable journeys across the Eastern Himalayas.
          </p>
        </div>

        {/* Official Government Credentials Ribbon */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
          gap: '1.25rem',
          marginBottom: '3.5rem'
        }}>
          {credentials.map((c, i) => (
            <div
              key={i}
              className="glass-card"
              style={{
                padding: '1.4rem',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                background: 'rgba(15, 23, 42, 0.75)',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '1rem',
                borderRadius: 'var(--radius-md)'
              }}
            >
              <div style={{
                width: '46px',
                height: '46px',
                borderRadius: '10px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: c.color,
                fontSize: '1.3rem',
                flexShrink: 0
              }}>
                <i className={`fa-solid ${c.icon}`}></i>
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.04em' }}>
                  {c.label}
                </div>
                <div style={{ fontSize: '1rem', fontWeight: 700, color: '#fff', margin: '0.2rem 0' }}>
                  {c.val}
                </div>
                <div style={{ fontSize: '0.78rem', color: c.color, fontWeight: 500 }}>
                  {c.sub}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mission & Vision Side-by-Side */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem',
          marginBottom: '3.5rem'
        }}>
          {/* Mission Card */}
          <div className="glass-card" style={{
            padding: '2.25rem',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(15, 23, 42, 0.85) 100%)',
            borderRadius: 'var(--radius-md)',
            position: 'relative'
          }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: 'rgba(16, 185, 129, 0.2)',
              color: '#34d399',
              fontSize: '1.35rem',
              marginBottom: '1.25rem'
            }}>
              <i className="fa-solid fa-bullseye"></i>
            </div>
            <h3 style={{ fontSize: '1.4rem', color: '#fff', marginBottom: '0.75rem' }}>Our Mission</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.02rem', lineHeight: 1.7, margin: 0 }}>
              To deliver seamless, trustworthy, and premium travel services that exceed customer expectations, enabling them to explore the world with comfort, security, and absolute confidence.
            </p>
          </div>

          {/* Vision Card */}
          <div className="glass-card" style={{
            padding: '2.25rem',
            border: '1px solid rgba(59, 130, 246, 0.3)',
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, rgba(15, 23, 42, 0.85) 100%)',
            borderRadius: 'var(--radius-md)',
            position: 'relative'
          }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: 'rgba(59, 130, 246, 0.2)',
              color: '#60a5fa',
              fontSize: '1.35rem',
              marginBottom: '1.25rem'
            }}>
              <i className="fa-solid fa-eye"></i>
            </div>
            <h3 style={{ fontSize: '1.4rem', color: '#fff', marginBottom: '0.75rem' }}>Our Vision</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.02rem', lineHeight: 1.7, margin: 0 }}>
              To be the most preferred travel partner known for quality, reliability, and exceptional customer experience throughout Sikkim, the Northeast Himalayan region, and beyond.
            </p>
          </div>
        </div>

        {/* Services Offered */}
        <div style={{ marginBottom: '3.5rem' }}>
          <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto 2.25rem' }}>
            <span className="badge badge-gold" style={{ marginBottom: '0.5rem' }}>
              <i className="fa-solid fa-award"></i> Comprehensive Travel Solutions
            </span>
            <h3 style={{ fontSize: 'clamp(1.6rem, 2.8vw, 2.2rem)', color: '#fff' }}>
              Services Offered by Sandesh Travels
            </h3>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem'
          }}>
            {services.map((s, idx) => (
              <div
                key={idx}
                className="glass-card"
                style={{
                  padding: '1.75rem',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  background: 'rgba(15, 23, 42, 0.65)',
                  borderRadius: 'var(--radius-md)',
                  transition: 'var(--transition)'
                }}
              >
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '10px',
                  background: 'rgba(16, 185, 129, 0.15)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--primary)',
                  fontSize: '1.2rem',
                  marginBottom: '1.15rem'
                }}>
                  <i className={`fa-solid ${s.icon}`}></i>
                </div>
                <h4 style={{ fontSize: '1.15rem', color: '#fff', marginBottom: '0.65rem' }}>{s.title}</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose Sandesh Travels? (6 Credibility Points) */}
        <div style={{
          background: 'rgba(15, 23, 42, 0.9)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: 'var(--radius-lg)',
          padding: '2.5rem',
          boxShadow: 'var(--shadow-glow), 0 20px 40px rgba(0,0,0,0.5)',
          marginBottom: '3.5rem'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '2.25rem' }}>
            <span className="badge badge-blue" style={{ marginBottom: '0.6rem' }}>
              <i className="fa-solid fa-check-double"></i> Pure Local Authenticity
            </span>
            <h3 style={{ fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)', color: '#fff' }}>
              Why Choose Sandesh Travels?
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: '620px', margin: '0.5rem auto 0' }}>
              We bring government compliance, transparent local pricing, and authentic Himalayan hospitality together.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem'
          }}>
            {whyChooseUs.map((item, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'rgba(16, 185, 129, 0.15)',
                  border: '1px solid rgba(16, 185, 129, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#34d399',
                  fontSize: '0.85rem',
                  flexShrink: 0,
                  marginTop: '2px'
                }}>
                  <i className="fa-solid fa-check"></i>
                </div>
                <div>
                  <h4 style={{ fontSize: '1.05rem', color: '#fff', marginBottom: '0.35rem' }}>{item.title}</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.55, margin: 0 }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Registered Address & Direct Connect Card */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.12) 0%, rgba(15, 23, 42, 0.95) 100%)',
          border: '1px solid rgba(16, 185, 129, 0.35)',
          borderRadius: 'var(--radius-lg)',
          padding: '2.5rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2.5rem',
          alignItems: 'center'
        }}>
          <div>
            <div className="badge badge-emerald" style={{ marginBottom: '0.75rem' }}>
              <i className="fa-solid fa-map-pin"></i> Head Office & Travel Desk
            </div>
            <h3 style={{ fontSize: '1.6rem', color: '#fff', marginBottom: '0.75rem' }}>
              Connect with M/s Sandesh Travels
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              For bookings, high-altitude permit inquiries, custom corporate itineraries, or cab reservations, our travel coordinators in Pakyong are available 7 days a week.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.92rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <i className="fa-solid fa-location-dot" style={{ color: 'var(--primary)', marginTop: '0.25rem', fontSize: '1.1rem' }}></i>
                <div>
                  <strong style={{ color: '#fff' }}>Registered Address:</strong>
                  <div style={{ color: 'var(--text-secondary)' }}>
                    Chotta Singtam, Near Kishan School, Aho Busty, Aho Yangtam GPU, Pakyong - 737135, Sikkim
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <i className="fa-solid fa-phone" style={{ color: 'var(--accent-teal)', fontSize: '1.1rem' }}></i>
                <div>
                  <strong style={{ color: '#fff' }}>Call Helpline:</strong>{' '}
                  <a href="tel:+919647878373" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 600 }}>
                    +91 96478 78373
                  </a>
                  {' / '}
                  <a href="tel:+918391879493" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 600 }}>
                    +91 83918 79493
                  </a>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <i className="fa-solid fa-envelope" style={{ color: 'var(--accent-gold)', fontSize: '1.1rem' }}></i>
                <div>
                  <strong style={{ color: '#fff' }}>Email:</strong>{' '}
                  <a href="mailto:sandeshtravelsgtk@gmail.com" style={{ color: '#fff', textDecoration: 'none' }}>
                    sandeshtravelsgtk@gmail.com
                  </a>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <i className="fa-solid fa-globe" style={{ color: '#60a5fa', fontSize: '1.1rem' }}></i>
                <div>
                  <strong style={{ color: '#fff' }}>Official Website:</strong>{' '}
                  <a href="https://www.sandeshtravels.in" target="_blank" rel="noopener noreferrer" style={{ color: '#60a5fa', textDecoration: 'none' }}>
                    www.sandeshtravels.in
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div style={{
            background: 'rgba(8, 12, 20, 0.8)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: 'var(--radius-md)',
            padding: '1.75rem',
            textAlign: 'center'
          }}>
            <h4 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '0.5rem' }}>
              Instant WhatsApp Support
            </h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: '1.5rem' }}>
              Directly connect with our tour specialist for immediate quotes, hotel availability, and vehicle scheduling.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <a
                href="https://wa.me/919647878373?text=Hi%20Sandesh%20Travels,%20I%20would%20like%20to%20inquire%20about%20Sikkim%20tour%20packages%20and%20cabs."
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp"
                style={{ width: '100%', height: '46px' }}
              >
                <i className="fa-brands fa-whatsapp"></i> Chat on WhatsApp (+91 96478 78373)
              </a>
              <button
                onClick={() => onOpenInquiry ? onOpenInquiry('General Tour Consultation') : null}
                className="btn btn-primary"
                style={{ width: '100%', height: '46px' }}
              >
                <i className="fa-solid fa-paper-plane"></i> Request Instant Quote
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
