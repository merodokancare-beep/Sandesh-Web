'use client';

import { useState } from 'react';

export default function CustomTripPlanner({ onSuccessLead }) {
  const [step, setStep] = useState(1);
  const [plan, setPlan] = useState({
    destinations: ['North Sikkim (Gurudongmar/Lachung)'],
    daysCount: 5,
    startDate: '',
    vehicle: 'Toyota Innova Crysta / Luxury SUV',
    hotelCategory: 'Deluxe Himalayan Resort (3-Star & 4-Star)',
    travelersCount: 2,
    clientName: '',
    clientPhone: '',
    specialNotes: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const destinationOptions = [
    { id: 'North Sikkim (Gurudongmar/Lachung)', label: 'North Sikkim', desc: 'Gurudongmar Lake, Yumthang Valley & Zero Point', icon: 'fa-snowflake' },
    { id: 'Gangtok & Tsomgo Lake', label: 'Gangtok & East', desc: 'Changu Lake, Baba Mandir, Nathula Pass & M.G. Marg', icon: 'fa-water' },
    { id: 'Pelling & Ravangla', label: 'West & South', desc: 'Glass Skywalk, Buddha Park, Pemayangtse & Chardham', icon: 'fa-gopuram' },
    { id: 'Old Silk Route & Zuluk', label: 'Old Silk Route', desc: '32-Hairpin Loop, Kupup Elephant Lake & Gnathang', icon: 'fa-route' },
    { id: 'Darjeeling Queen of Hills', label: 'Darjeeling Extension', desc: 'Tiger Hill Sunrise, Toy Train & Tea Gardens', icon: 'fa-mug-hot' }
  ];

  const vehicleOptions = [
    { id: 'Toyota Innova Crysta / Luxury SUV', name: 'Innova Crysta / Fortuner', desc: 'Maximum luxury & mountain comfort (4-6 Seats)' },
    { id: 'Mahindra Scorpio / Xylo / Bolero 4x4', name: 'Scorpio / Xylo 4x4', desc: 'Rugged high-clearance mountain terrain cab (6-7 Seats)' },
    { id: 'Force Luxury Tempo Traveller', name: 'Force Tempo Traveller', desc: 'Ideal for large family & corporate groups (12-18 Seats)' },
    { id: 'Budget Hatchback / Swift Dzire', name: 'Sedan / Hatchback', desc: 'Best for Gangtok city & Darjeeling local drops (2-3 Seats)' }
  ];

  const toggleDestination = (destId) => {
    if (plan.destinations.includes(destId)) {
      if (plan.destinations.length > 1) {
        setPlan({ ...plan, destinations: plan.destinations.filter(d => d !== destId) });
      }
    } else {
      setPlan({ ...plan, destinations: [...plan.destinations, destId] });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!plan.clientName || !plan.clientPhone) {
      alert('Please enter your name and phone number.');
      return;
    }

    setSubmitting(true);
    try {
      const notes = `Custom Tour Plan: ${plan.destinations.join(', ')} | Vehicle: ${plan.vehicle} | Hotel: ${plan.hotelCategory} | Duration: ${plan.daysCount} Days | Notes: ${plan.specialNotes || 'None'}`;

      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientName: plan.clientName,
          clientPhone: plan.clientPhone,
          startDate: plan.startDate || null,
          numTravelers: parseInt(plan.travelersCount, 10) || 2,
          travelDates: `${plan.daysCount} Days (${plan.startDate ? 'Starting ' + plan.startDate : 'Flexible Dates'})`,
          packageName: `Custom Trip Planner (${plan.destinations.length} Regions)`,
          vehicleType: plan.vehicle,
          notes: notes
        })
      });

      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
        if (onSuccessLead) onSuccessLead(data.lead);
      } else {
        alert(data.error || 'Failed to submit plan.');
      }
    } catch (err) {
      console.error(err);
      alert('Network error. Please try again or WhatsApp us.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="custom-planner" className="section-padding" style={{
      background: 'linear-gradient(180deg, #0d1322 0%, #080c14 100%)',
      borderTop: '1px solid var(--border)',
      borderBottom: '1px solid var(--border)'
    }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 3rem' }}>
          <span className="badge badge-gold" style={{ marginBottom: '0.85rem' }}>
            <i className="fa-solid fa-sliders"></i> Tailor-Made Itinerary Engine
          </span>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', marginBottom: '1rem' }}>
            Build Your Custom Himalayan Itinerary
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>
            Select your dream destinations, preferred vehicle class, and group size. We will calculate the route and dispatch a tailored WhatsApp proposal instantly.
          </p>
        </div>

        <div className="glass-card" style={{ maxWidth: '900px', margin: '0 auto', padding: '2.5rem', background: 'rgba(15, 23, 42, 0.9)' }}>
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
              <div style={{
                width: '70px',
                height: '70px',
                borderRadius: '50%',
                background: 'rgba(16, 185, 129, 0.15)',
                color: '#10b981',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem',
                margin: '0 auto 1.5rem',
                border: '1px solid rgba(16, 185, 129, 0.3)'
              }}>
                <i className="fa-solid fa-check"></i>
              </div>
              <h3 style={{ fontSize: '1.75rem', marginBottom: '0.75rem' }}>Custom Itinerary Request Received!</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto 1.5rem', lineHeight: 1.6 }}>
                We have generated a lead on our CMS dashboard for <strong>{plan.clientName}</strong>. Our tour manager will prepare the route schedule and message you at <strong>{plan.clientPhone}</strong>.
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <a
                  href={`https://wa.me/919647878373?text=${encodeURIComponent(`Hi Sandesh Travels, I just built a custom ${plan.daysCount}-day itinerary for ${plan.destinations.join(', ')}. My phone is ${plan.clientPhone}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp"
                >
                  <i className="fa-brands fa-whatsapp"></i> Chat with Trip Designer
                </a>
                <button
                  onClick={() => { setSubmitted(false); setStep(1); }}
                  className="btn btn-secondary"
                >
                  Plan Another Route
                </button>
              </div>
            </div>
          ) : (
            <div>
              {/* Step indicator */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', position: 'relative' }}>
                {[
                  { num: 1, label: 'Destinations' },
                  { num: 2, label: 'Vehicle & Stay' },
                  { num: 3, label: 'Contact & Submit' }
                ].map((s) => (
                  <div key={s.num} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.35rem', zIndex: 2 }}>
                    <div style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      background: step >= s.num ? 'var(--primary)' : 'var(--bg-surface-elevated)',
                      color: step >= s.num ? '#fff' : 'var(--text-muted)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: '0.9rem',
                      border: '2px solid',
                      borderColor: step >= s.num ? 'var(--primary)' : 'var(--border)'
                    }}>
                      {step > s.num ? <i className="fa-solid fa-check"></i> : s.num}
                    </div>
                    <span style={{ fontSize: '0.78rem', color: step >= s.num ? '#fff' : 'var(--text-muted)', fontWeight: 600 }}>
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* STEP 1: DESTINATIONS */}
              {step === 1 && (
                <div>
                  <h4 style={{ fontSize: '1.25rem', marginBottom: '1.25rem' }}>
                    1. Select one or more regions to include:
                  </h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                    {destinationOptions.map(dest => {
                      const isSelected = plan.destinations.includes(dest.id);
                      return (
                        <div
                          key={dest.id}
                          onClick={() => toggleDestination(dest.id)}
                          style={{
                            padding: '1.25rem',
                            borderRadius: 'var(--radius-sm)',
                            border: '1px solid',
                            borderColor: isSelected ? 'var(--primary)' : 'var(--border)',
                            background: isSelected ? 'rgba(16, 185, 129, 0.1)' : 'var(--bg-surface-elevated)',
                            cursor: 'pointer',
                            transition: 'var(--transition)'
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                            <span style={{ fontWeight: 700, color: isSelected ? '#34d399' : '#fff' }}>{dest.label}</span>
                            <i className={`fa-solid ${dest.icon}`} style={{ color: isSelected ? 'var(--primary)' : 'var(--text-muted)' }}></i>
                          </div>
                          <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', lineHeight: 1.4 }}>{dest.desc}</p>
                        </div>
                      );
                    })}
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                    <div className="form-group">
                      <label className="form-label">Total Trip Duration (Days):</label>
                      <select
                        className="form-select"
                        value={plan.daysCount}
                        onChange={(e) => setPlan({ ...plan, daysCount: parseInt(e.target.value, 10) })}
                      >
                        <option value={3}>3 Days / 2 Nights (Short Escape)</option>
                        <option value={4}>4 Days / 3 Nights (Popular)</option>
                        <option value={5}>5 Days / 4 Nights (Standard)</option>
                        <option value={6}>6 Days / 5 Nights (Multi-Region)</option>
                        <option value={7}>7 Days / 6 Nights (Grand Circuit)</option>
                        <option value={9}>9+ Days (Complete Himalayan Explorer)</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Tentative Start Date:</label>
                      <input
                        type="date"
                        className="form-input"
                        value={plan.startDate}
                        onChange={(e) => setPlan({ ...plan, startDate: e.target.value })}
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="btn btn-primary"
                    >
                      Next: Choose Vehicle & Stay <i className="fa-solid fa-arrow-right"></i>
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: VEHICLE & STAY */}
              {step === 2 && (
                <div>
                  <h4 style={{ fontSize: '1.25rem', marginBottom: '1.25rem' }}>
                    2. Choose Your Preferred Vehicle & Accommodation:
                  </h4>

                  <div style={{ marginBottom: '2rem' }}>
                    <label className="form-label" style={{ marginBottom: '0.75rem', display: 'block' }}>Preferred Cab / Fleet Class:</label>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                      {vehicleOptions.map(veh => {
                        const isSelected = plan.vehicle === veh.id;
                        return (
                          <div
                            key={veh.id}
                            onClick={() => setPlan({ ...plan, vehicle: veh.id })}
                            style={{
                              padding: '1.25rem',
                              borderRadius: 'var(--radius-sm)',
                              border: '1px solid',
                              borderColor: isSelected ? 'var(--primary)' : 'var(--border)',
                              background: isSelected ? 'rgba(16, 185, 129, 0.1)' : 'var(--bg-surface-elevated)',
                              cursor: 'pointer',
                              transition: 'var(--transition)'
                            }}
                          >
                            <div style={{ fontWeight: 700, color: isSelected ? '#34d399' : '#fff', marginBottom: '0.35rem' }}>
                              {veh.name}
                            </div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{veh.desc}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                    <div className="form-group">
                      <label className="form-label">Hotel Category:</label>
                      <select
                        className="form-select"
                        value={plan.hotelCategory}
                        onChange={(e) => setPlan({ ...plan, hotelCategory: e.target.value })}
                      >
                        <option value="Deluxe Himalayan Resort (3-Star & 4-Star)">Deluxe Resort (3-Star / 4-Star with View)</option>
                        <option value="Luxury 5-Star Boutique & Heritage Stay">Luxury 5-Star & Heritage Stays</option>
                        <option value="Cozy Homestay & Authentic Local Village Experience">Authentic Homestay / Eco-cottages</option>
                        <option value="Cab Only (No Hotel Required)">Cab Only (I will book my own hotels)</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Total Number of Travelers:</label>
                      <input
                        type="number"
                        min="1"
                        max="50"
                        className="form-input"
                        value={plan.travelersCount}
                        onChange={(e) => setPlan({ ...plan, travelersCount: e.target.value })}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="btn btn-secondary"
                    >
                      <i className="fa-solid fa-arrow-left"></i> Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="btn btn-primary"
                    >
                      Next: Contact Information <i className="fa-solid fa-arrow-right"></i>
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: CONTACT & SUBMISSION */}
              {step === 3 && (
                <form onSubmit={handleSubmit}>
                  <h4 style={{ fontSize: '1.25rem', marginBottom: '1.25rem' }}>
                    3. Where should we send your custom quotation?
                  </h4>

                  {/* Summary card */}
                  <div style={{
                    background: 'var(--bg-surface-elevated)',
                    padding: '1.25rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border)',
                    marginBottom: '1.5rem',
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '1.5rem',
                    fontSize: '0.85rem'
                  }}>
                    <div>
                      <span style={{ color: 'var(--text-muted)' }}>Destinations: </span>
                      <strong>{plan.destinations.join(' + ')}</strong>
                    </div>
                    <div>
                      <span style={{ color: 'var(--text-muted)' }}>Duration: </span>
                      <strong>{plan.daysCount} Days</strong>
                    </div>
                    <div>
                      <span style={{ color: 'var(--text-muted)' }}>Vehicle: </span>
                      <strong>{plan.vehicle.split('/')[0]}</strong>
                    </div>
                    <div>
                      <span style={{ color: 'var(--text-muted)' }}>Travelers: </span>
                      <strong>{plan.travelersCount} Person(s)</strong>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
                    <div className="form-group">
                      <label className="form-label">Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Ankit Verma"
                        className="form-input"
                        value={plan.clientName}
                        onChange={(e) => setPlan({ ...plan, clientName: e.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">WhatsApp / Contact Number *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        className="form-input"
                        value={plan.clientPhone}
                        onChange={(e) => setPlan({ ...plan, clientPhone: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-group" style={{ marginBottom: '2rem' }}>
                    <label className="form-label">Special Requests / Sightseeing Preferences (Optional):</label>
                    <textarea
                      rows="3"
                      className="form-textarea"
                      placeholder="e.g., Need senior citizen friendly rooms, want Zero Point permit included, pickup from Bagdogra Airport at 11 AM..."
                      value={plan.specialNotes}
                      onChange={(e) => setPlan({ ...plan, specialNotes: e.target.value })}
                    ></textarea>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="btn btn-secondary"
                    >
                      <i className="fa-solid fa-arrow-left"></i> Back
                    </button>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="btn btn-primary btn-lg"
                      id="custom-planner-submit-btn"
                    >
                      {submitting ? (
                        <>
                          <i className="fa-solid fa-spinner fa-spin"></i> Submitting to CMS...
                        </>
                      ) : (
                        <>
                          <i className="fa-solid fa-paper-plane"></i> Submit Itinerary Request
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
