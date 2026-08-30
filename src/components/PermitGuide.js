'use client';

export default function PermitGuide() {
  const permitPoints = [
    {
      title: 'North Sikkim (Lachen & Lachung)',
      desc: 'Inner Line Permit (ILP) is required for Gurudongmar Lake, Chopta Valley, and Yumthang Valley. Issued 1 day prior to travel.',
      docs: '2 Passport Photos + Voter ID / Passport copy per traveler',
      icon: 'fa-mountain'
    },
    {
      title: 'Tsomgo Lake, Baba Mandir & Nathula Pass',
      desc: 'Nathula Pass (Indo-China border at 14,140 ft) requires special army and tourism permits. Nathula remains closed on Mondays & Tuesdays.',
      docs: 'Original ID proof + 2 Passport photos submitted in Gangtok',
      icon: 'fa-id-card'
    },
    {
      title: 'Old Silk Route & Zuluk',
      desc: 'Permits are processed at Rongli Sub-Division office on the same day during transit towards Zuluk and Gnathang Valley.',
      docs: 'Govt. Photo ID (Voter ID / Passport / Driving License)',
      icon: 'fa-shield-halved'
    },
    {
      title: 'Foreign Tourists / OCI Guidelines',
      desc: 'Foreign nationals require Protected Area Permits (PAP) and must travel in groups of 2 or more through registered tour operators.',
      docs: 'Valid Indian Visa + Passport + 4 Passport Photographs',
      icon: 'fa-earth-asia'
    }
  ];

  const faqs = [
    {
      q: 'Do you arrange Sikkim permits on our behalf?',
      a: 'Yes! When you book with Sandesh Travels, all permit paperwork, verification, and checkpost submissions are completely taken care of by our Gangtok operations office.'
    },
    {
      q: 'What vehicles are permitted for North Sikkim tours?',
      a: 'Only high-clearance commercial luxury SUVs (like Mahindra Scorpio, Xylo, Bolero 4x4, or Innova) registered with Sikkim Tourism are permitted to ply to Lachen, Gurudongmar, and Lachung.'
    },
    {
      q: 'Can we get pickup from Bagdogra Airport (IXB) or NJP Railway Station?',
      a: 'Absolutely. We provide door-to-door private airport and railway pickups with our fleet directly to your hotel in Gangtok, Darjeeling, Pelling, or Kalimpong.'
    },
    {
      q: 'How does your instant WhatsApp quotation work?',
      a: 'Once you submit your inquiry on this website, our travel manager generates a day-by-day customized itinerary with transparent taxi rates and hotel vouchers, delivered straight to your WhatsApp within minutes.'
    }
  ];

  return (
    <section id="permits" className="section-padding" style={{ background: 'var(--bg-base)' }}>
      <div className="container">
        {/* Permits Section */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 3.5rem' }}>
          <span className="badge badge-blue" style={{ marginBottom: '0.85rem' }}>
            <i className="fa-solid fa-passport"></i> 100% Hassle-Free Documentation
          </span>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', marginBottom: '1rem' }}>
            Sikkim Travel Permits & Essential Guidelines
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>
            Restricted area permits are mandatory for North Sikkim, Nathula, and Silk Route. We handle all paperwork seamlessly for you.
          </p>
        </div>

        <div className="grid-2" style={{ marginBottom: '4rem' }}>
          {permitPoints.map((item, idx) => (
            <div key={idx} className="glass-card" style={{ display: 'flex', gap: '1.25rem' }}>
              <div style={{
                width: '50px',
                height: '50px',
                borderRadius: '12px',
                background: 'rgba(59, 130, 246, 0.15)',
                color: 'var(--secondary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                flexShrink: 0,
                border: '1px solid rgba(59, 130, 246, 0.3)'
              }}>
                <i className={`fa-solid ${item.icon}`}></i>
              </div>
              <div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.4rem' }}>{item.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.5, marginBottom: '0.6rem' }}>
                  {item.desc}
                </p>
                <div style={{ fontSize: '0.8rem', color: '#cbd5e1', background: 'var(--bg-surface-elevated)', padding: '0.4rem 0.75rem', borderRadius: '6px', border: '1px solid var(--border)' }}>
                  <strong style={{ color: '#34d399' }}><i className="fa-solid fa-file-lines"></i> Required: </strong>{item.docs}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FAQs */}
        <div style={{ maxWidth: '850px', margin: '0 auto' }}>
          <h3 style={{ fontSize: '1.8rem', textAlign: 'center', marginBottom: '2rem' }}>
            Frequently Asked Questions
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {faqs.map((faq, fIdx) => (
              <div key={fIdx} className="glass-card" style={{ padding: '1.25rem 1.5rem' }}>
                <h4 style={{ fontSize: '1.05rem', color: '#fff', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <i className="fa-solid fa-circle-question" style={{ color: 'var(--accent-teal)' }}></i> {faq.q}
                </h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5, marginLeft: '1.5rem' }}>
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
