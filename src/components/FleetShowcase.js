'use client';

export default function FleetShowcase({ onOpenInquiry }) {
  const fleetData = [
    {
      name: 'Toyota Innova Crysta',
      category: 'Luxury Executive MPV',
      seats: '6-7 Seats',
      luggage: '4 Large Bags',
      terrain: 'City & All Mountain Highways',
      features: ['Dual AC / Heater', 'Captain Recliner Seats', 'Smooth Himalayan Suspension', 'Music & USB Charging'],
      idealFor: 'Families & Premium Sightseeing in Gangtok, Pelling & Darjeeling',
      badge: 'Most Popular'
    },
    {
      name: 'Mahindra Scorpio / Xylo 4WD',
      category: 'Rugged Mountain SUV',
      seats: '6-7 Seats',
      luggage: '4 Bags + Top Carrier',
      terrain: 'High Altitude & Snow Trails',
      features: ['4x4 High Ground Clearance', 'All-Weather Mountain Tyres', 'Snow Chains for High Passes', 'Expert Mountain Driver'],
      idealFor: 'North Sikkim (Gurudongmar, Zero Point, Lachen & Lachung)',
      badge: 'Best for North Sikkim'
    },
    {
      name: 'Force Luxury Tempo Traveller',
      category: 'Group Explorer (12-18 Seater)',
      seats: '12 / 17 / 26 Seats',
      luggage: 'Spacious Rear Boot & Carrier',
      terrain: 'Major Highway Circuits',
      features: ['Pushback Luxury Seats', 'Ample Legroom & Headroom', 'High-Roof Panoramic Windows', 'PA System & Sound Setup'],
      idealFor: 'Corporate Teams, Extended Families & Group Expeditions',
      badge: 'Group Choice'
    },
    {
      name: 'Tata Sumo Gold / Bolero Maxi',
      category: 'Affordable Hill Workhorse',
      seats: '8-9 Seats',
      luggage: 'Roof Luggage Rack',
      terrain: 'Steep Rough Roads & Remote Passes',
      features: ['Reliable Heavy Duty Engine', 'Spacious Bench Capacity', 'Trained Local Driver', 'Budget Friendly'],
      idealFor: 'Budget travelers, Silk Route Loops & Shared Transfers',
      badge: 'Value Pick'
    }
  ];

  return (
    <section id="fleet" className="section-padding" style={{ background: 'var(--bg-surface)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 3.5rem' }}>
          <span className="badge badge-emerald" style={{ marginBottom: '0.85rem' }}>
            <i className="fa-solid fa-car-side"></i> 20+ Dedicated Himalayan Fleet
          </span>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', marginBottom: '1rem' }}>
            Our Mountain-Ready Fleet & Private Cabs
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>
            We own and operate our fleet directly—no third-party middleman commissions, guaranteed verified commercial drivers, and round-the-clock replacement support.
          </p>
        </div>

        {/* Fleet Photo Showcase Banner */}
        <div style={{
          position: 'relative',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          marginBottom: '3rem',
          height: '280px',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.6)'
        }}>
          <img
            src="/images/fleet.jpg"
            alt="Sandesh Travels Fleet on Mountain Highway"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to right, rgba(8, 12, 20, 0.9) 0%, rgba(8, 12, 20, 0.4) 60%, transparent 100%)',
            display: 'flex',
            alignItems: 'center',
            padding: '2rem 2.5rem'
          }}>
            <div style={{ maxWidth: '520px' }}>
              <span className="badge badge-gold" style={{ marginBottom: '0.5rem' }}>
                <i className="fa-solid fa-car"></i> Verified Mountain Vehicles
              </span>
              <h3 style={{ fontSize: '1.8rem', color: '#fff', marginBottom: '0.5rem' }}>
                Travel High-Altitude Passes in Premium Comfort
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.5 }}>
                Equipped with snow chains, high ground clearance, heater, luggage carriers, and verified local drivers who know every turn of Sikkim.
              </p>
            </div>
          </div>
        </div>

        <div className="grid-2">
          {fleetData.map((vehicle, idx) => (
            <div
              key={idx}
              className="glass-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                background: 'rgba(15, 23, 42, 0.75)',
                border: '1px solid var(--border)'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <span className="badge badge-gold">{vehicle.badge}</span>
                  <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{vehicle.category}</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
                  <div style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '12px',
                    background: 'var(--bg-surface-elevated)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.75rem',
                    color: 'var(--primary)',
                    border: '1px solid var(--border)'
                  }}>
                    <i className="fa-solid fa-car-rear"></i>
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.4rem', marginBottom: '0.2rem' }}>{vehicle.name}</h3>
                    <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                      <span><i className="fa-solid fa-users" style={{ color: 'var(--accent-teal)' }}></i> {vehicle.seats}</span>
                      <span><i className="fa-solid fa-suitcase-rolling" style={{ color: 'var(--accent-gold)' }}></i> {vehicle.luggage}</span>
                    </div>
                  </div>
                </div>

                {/* Features List */}
                <div style={{
                  background: 'var(--bg-surface-elevated)',
                  padding: '1rem',
                  borderRadius: 'var(--radius-sm)',
                  marginBottom: '1rem',
                  border: '1px solid var(--border)'
                }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                    Vehicle Amenities & Specs
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem' }}>
                    {vehicle.features.map((feat, fIdx) => (
                      <div key={fIdx} style={{ fontSize: '0.82rem', color: '#e2e8f0', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <i className="fa-solid fa-check" style={{ color: 'var(--primary)', fontSize: '0.75rem' }}></i> {feat}
                      </div>
                    ))}
                  </div>
                </div>

                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.4, marginBottom: '1.25rem' }}>
                  <strong style={{ color: '#fff' }}>Recommended for: </strong>{vehicle.idealFor}
                </p>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
                <button
                  onClick={() => onOpenInquiry(`Fleet Booking: ${vehicle.name}`)}
                  className="btn btn-primary"
                  style={{ flex: 1 }}
                >
                  <i className="fa-solid fa-taxi"></i> Hire / Enquire Rates
                </button>
                <a
                  href={`https://wa.me/919647878373?text=${encodeURIComponent(`Hi Sandesh Travels, I want to check taxi rental availability and rates for ${vehicle.name}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp btn-sm"
                  style={{ padding: '0.75rem 1rem' }}
                >
                  <i className="fa-brands fa-whatsapp" style={{ fontSize: '1.15rem' }}></i>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
