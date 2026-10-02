'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppWidget from '@/components/WhatsAppWidget';
import InquiryModal from '@/components/InquiryModal';

export default function AboutPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState('');

  const handleOpenInquiry = (packageName = 'About Page Consultation') => {
    setSelectedPackage(packageName);
    setModalOpen(true);
  };

  const credentials = [
    {
      title: 'Company Registration',
      number: '1667/DoT&CAv/Gtk/24/TA',
      authority: 'Department of Tourism & Civil Aviation, Government of Sikkim',
      icon: 'fa-certificate',
      color: '#34d399'
    },
    {
      title: 'Official State License',
      number: 'E06/AHY/0282',
      authority: 'Licensed Tours & Travel Operator (Pakyong District)',
      icon: 'fa-id-card',
      color: '#fbbf24'
    },
    {
      title: 'Goods & Services Tax (GSTIN)',
      number: '11AXXPR3863J1ZT',
      authority: 'Central & State GST Registered Business',
      icon: 'fa-file-invoice',
      color: '#60a5fa'
    },
    {
      title: 'Permanent Account Number (PAN)',
      number: 'AXXPR3863J',
      authority: 'Income Tax Department, Government of India',
      icon: 'fa-shield-halved',
      color: '#a78bfa'
    }
  ];

  const services = [
    {
      icon: 'fa-briefcase',
      title: 'Corporate and Business Travel Management',
      desc: 'Dedicated transport logistics, luxury SUVs for executives, timely airport transfers from Bagdogra / Pakyong, and clean GST invoicing.'
    },
    {
      icon: 'fa-champagne-glasses',
      title: 'Luxury and Family Holiday Packages',
      desc: 'Bespoke mountain getaways for couples, honeymooners, and extended families with curated luxury resorts, scenic rooms, and mountain views.'
    },
    {
      icon: 'fa-map-location-dot',
      title: 'Customized Tours and Travel Planning',
      desc: 'Flexible, customized itineraries designed around your preferences—from tranquil village homestays to high-altitude frozen lakes.'
    },
    {
      icon: 'fa-car-side',
      title: 'Transport and Vehicle Rentals',
      desc: '20+ company-owned cabs including Toyota Innova Crysta, Mahindra Scorpio 4x4, and Force Tempo Travellers, maintained to highest safety standards.'
    },
    {
      icon: 'fa-compass-drafting',
      title: 'Travel Consultation and Assistance',
      desc: 'Complete guidance on weather conditions, packing recommendations, high-altitude acclimatization, and zero-hassle Sikkim military permits.'
    }
  ];

  const whyChooseUs = [
    {
      icon: 'fa-landmark',
      title: 'Registered under the Government of Sikkim',
      desc: 'Official registration under Dept. of Tourism & Civil Aviation (Reg: 1667/DoT&CAv/Gtk/24/TA) ensures strict consumer protection and compliance.'
    },
    {
      icon: 'fa-award',
      title: 'Licensed & Legitimate Operator',
      desc: 'Operating with official License No. E06/AHY/0282. We operate with complete transparency, no hidden fees, and zero unauthorized middlemen.'
    },
    {
      icon: 'fa-user-tie',
      title: 'Professional and Experienced Staff',
      desc: 'Our ground coordinators and mountain pilots have over 10+ years of high-altitude Himalayan expertise, trained in mountain safety & hospitality.'
    },
    {
      icon: 'fa-sliders',
      title: 'Tailored Travel Solutions',
      desc: 'No cookie-cutter trips. Every package is personalized to your schedule, group size, children, and budget requirements.'
    },
    {
      icon: 'fa-tag',
      title: 'Competitive Direct-Fleet Pricing',
      desc: 'Because we own our 20+ vehicle fleet, you get direct local pricing without third-party commission markups.'
    },
    {
      icon: 'fa-heart-pulse',
      title: 'Commitment to Safety and Comfort',
      desc: 'Sanitized vehicles, high-altitude emergency readiness, winter snow chains, and a 24/7 on-tour monitoring desk.'
    }
  ];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-main)' }}>
      {/* Navigation */}
      <Navbar onOpenInquiry={handleOpenInquiry} />

      {/* Hero Header */}
      <section style={{
        padding: '5rem 0 4rem',
        backgroundImage: 'linear-gradient(180deg, rgba(8, 12, 20, 0.85) 0%, rgba(8, 12, 20, 0.98) 100%), url(/images/gurudongmar.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center 40%',
        borderBottom: '1px solid var(--border)',
        textAlign: 'center'
      }}>
        <div className="container" style={{ maxWidth: '850px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
            <span className="badge badge-emerald">
              <span className="pulse-dot"></span> Official Government of Sikkim Registered Agency
            </span>
          </div>

          <h1 style={{
            fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)',
            lineHeight: 1.15,
            marginBottom: '1rem',
            letterSpacing: '-0.02em'
          }}>
            About <span className="text-gradient-emerald">Sandesh Travels</span>
          </h1>

          <p style={{
            fontSize: '1.35rem',
            color: 'var(--accent-gold)',
            fontStyle: 'italic',
            fontWeight: 600,
            marginBottom: '1.5rem',
            letterSpacing: '0.02em'
          }}>
            “Travel Smart, Travel Sandesh.”
          </p>

          <p style={{
            color: 'var(--text-secondary)',
            fontSize: '1.1rem',
            lineHeight: 1.65,
            maxWidth: '720px',
            margin: '0 auto 2rem'
          }}>
            M/s Sandesh Travels is a licensed and registered tours and travel company under the Government of Sikkim, based in Pakyong. We specialize in providing personalized travel experiences, catering to corporate clients, families, and luxury travelers.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => handleOpenInquiry('About Page Quote')}
              className="btn btn-primary"
            >
              <i className="fa-solid fa-paper-plane"></i> Plan Your Journey
            </button>
            <a
              href="https://wa.me/919647878373"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp"
            >
              <i className="fa-brands fa-whatsapp"></i> Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Official Government Accreditation Details */}
      <section style={{ padding: '4.5rem 0 3.5rem', borderBottom: '1px solid var(--border)', background: 'var(--bg-surface)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 3rem' }}>
            <span className="badge badge-gold" style={{ marginBottom: '0.75rem' }}>
              <i className="fa-solid fa-stamp"></i> Legal Authenticity & Verification
            </span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', color: '#fff', marginBottom: '0.5rem' }}>
              Company Information & Legal Credentials
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
              All permits, bookings, and receipts are issued under our registered entity in full compliance with Sikkim state tourism regulations.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.5rem',
            marginBottom: '3rem'
          }}>
            {credentials.map((cred, i) => (
              <div
                key={i}
                className="glass-card"
                style={{
                  padding: '1.75rem',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(15, 23, 42, 0.7)'
                }}
              >
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: cred.color,
                  fontSize: '1.4rem',
                  marginBottom: '1rem'
                }}>
                  <i className={`fa-solid ${cred.icon}`}></i>
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
                  {cred.title}
                </div>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff', margin: '0.25rem 0 0.5rem' }}>
                  {cred.number}
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                  {cred.authority}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Registration Table Card */}
          <div style={{
            background: 'rgba(15, 23, 42, 0.85)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-md)',
            padding: '2rem',
            maxWidth: '850px',
            margin: '0 auto'
          }}>
            <h3 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <i className="fa-solid fa-circle-check" style={{ color: 'var(--primary)' }}></i>
              Official Registration Summary
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem', fontSize: '0.9rem' }}>
              <div>
                <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.8rem' }}>Registered Name:</span>
                <strong style={{ color: '#fff' }}>M/s Sandesh Travels</strong>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.8rem' }}>Registration No.:</span>
                <strong style={{ color: '#34d399' }}>1667/DoT&CAv/Gtk/24/TA</strong>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.8rem' }}>State License No.:</span>
                <strong style={{ color: '#60a5fa' }}>E06/AHY/0282</strong>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.8rem' }}>Registered Authority:</span>
                <strong style={{ color: '#fff' }}>Government of Sikkim</strong>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.8rem' }}>Tax Identification:</span>
                <strong style={{ color: '#fff' }}>PAN: AXXPR3863J</strong>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.8rem' }}>GSTIN:</span>
                <strong style={{ color: '#fbbf24' }}>11AXXPR3863J1ZT</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section style={{ padding: '4.5rem 0', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2.5rem'
          }}>
            {/* Mission */}
            <div className="glass-card" style={{
              padding: '2.5rem',
              border: '1px solid rgba(16, 185, 129, 0.35)',
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(15, 23, 42, 0.9) 100%)',
              borderRadius: 'var(--radius-lg)'
            }}>
              <div style={{
                width: '52px',
                height: '52px',
                borderRadius: '14px',
                background: 'rgba(16, 185, 129, 0.2)',
                color: '#34d399',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                marginBottom: '1.25rem'
              }}>
                <i className="fa-solid fa-bullseye"></i>
              </div>
              <h2 style={{ fontSize: '1.75rem', color: '#fff', marginBottom: '0.75rem' }}>Our Mission</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.7, margin: 0 }}>
                To deliver seamless, trustworthy, and premium travel services that exceed customer expectations, enabling them to explore the world with comfort and confidence.
              </p>
            </div>

            {/* Vision */}
            <div className="glass-card" style={{
              padding: '2.5rem',
              border: '1px solid rgba(59, 130, 246, 0.35)',
              background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(15, 23, 42, 0.9) 100%)',
              borderRadius: 'var(--radius-lg)'
            }}>
              <div style={{
                width: '52px',
                height: '52px',
                borderRadius: '14px',
                background: 'rgba(59, 130, 246, 0.2)',
                color: '#60a5fa',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                marginBottom: '1.25rem'
              }}>
                <i className="fa-solid fa-eye"></i>
              </div>
              <h2 style={{ fontSize: '1.75rem', color: '#fff', marginBottom: '0.75rem' }}>Our Vision</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.7, margin: 0 }}>
                To be the most preferred travel partner known for quality, reliability, and exceptional customer experience in the Northeast region and beyond.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Offered */}
      <section style={{ padding: '4.5rem 0', background: 'var(--bg-surface)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 3.5rem' }}>
            <span className="badge badge-emerald" style={{ marginBottom: '0.75rem' }}>
              <i className="fa-solid fa-sliders"></i> What We Do
            </span>
            <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', color: '#fff', marginBottom: '0.75rem' }}>
              Services Offered by Sandesh Travels
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.02rem' }}>
              From individual taxi hires to full corporate delegate movements, we provide end-to-end Himalayan travel solutions.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.75rem'
          }}>
            {services.map((item, idx) => (
              <div
                key={idx}
                className="glass-card"
                style={{
                  padding: '2rem',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(15, 23, 42, 0.65)'
                }}
              >
                <div style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '12px',
                  background: 'rgba(16, 185, 129, 0.15)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--primary)',
                  fontSize: '1.25rem',
                  marginBottom: '1.25rem'
                }}>
                  <i className={`fa-solid ${item.icon}`}></i>
                </div>
                <h3 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '0.75rem' }}>
                  {item.title}
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6, margin: 0 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Sandesh Travels */}
      <section style={{ padding: '5rem 0', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 3.5rem' }}>
            <span className="badge badge-gold" style={{ marginBottom: '0.75rem' }}>
              <i className="fa-solid fa-star"></i> Proven Excellence
            </span>
            <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', color: '#fff', marginBottom: '0.75rem' }}>
              Why Choose Sandesh Travels?
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.02rem' }}>
              Experience the peace of mind that comes with booking directly with a verified local operator.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem'
          }}>
            {whyChooseUs.map((w, idx) => (
              <div
                key={idx}
                className="glass-card"
                style={{
                  padding: '1.85rem',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  gap: '1.15rem',
                  alignItems: 'flex-start'
                }}
              >
                <div style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '10px',
                  background: 'rgba(245, 158, 11, 0.15)',
                  border: '1px solid rgba(245, 158, 11, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--accent-gold)',
                  fontSize: '1.15rem',
                  flexShrink: 0
                }}>
                  <i className={`fa-solid ${w.icon}`}></i>
                </div>
                <div>
                  <h3 style={{ fontSize: '1.12rem', color: '#fff', marginBottom: '0.45rem' }}>
                    {w.title}
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>
                    {w.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Registered Address & Connect With Us */}
      <section style={{ padding: '5rem 0', background: 'var(--bg-surface)' }}>
        <div className="container" style={{ maxWidth: '1050px' }}>
          <div style={{
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.12) 0%, rgba(15, 23, 42, 0.95) 100%)',
            border: '1px solid rgba(16, 185, 129, 0.35)',
            borderRadius: 'var(--radius-lg)',
            padding: '3rem',
            boxShadow: 'var(--shadow-glow)'
          }}>
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <span className="badge badge-emerald" style={{ marginBottom: '0.75rem' }}>
                <i className="fa-solid fa-headset"></i> Connect With Us
              </span>
              <h2 style={{ fontSize: '2.2rem', color: '#fff', marginBottom: '0.5rem' }}>
                Visit or Contact Our Office
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', maxWidth: '600px', margin: '0 auto' }}>
                For bookings, inquiries, and travel assistance, please reach out via phone, email, or visit our registered office.
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '2rem',
              marginBottom: '2.5rem'
            }}>
              {/* Address */}
              <div style={{
                background: 'rgba(8, 12, 20, 0.7)',
                padding: '1.5rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border)'
              }}>
                <i className="fa-solid fa-location-dot" style={{ color: 'var(--primary)', fontSize: '1.5rem', marginBottom: '0.75rem' }}></i>
                <h4 style={{ color: '#fff', fontSize: '1.05rem', marginBottom: '0.4rem' }}>Office Address</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>
                  Chotta Singtam, Near Kishan School,<br />
                  Aho Busty, Aho Yangtam GPU,<br />
                  Pakyong - 737135, Sikkim
                </p>
              </div>

              {/* Calling Phones */}
              <div style={{
                background: 'rgba(8, 12, 20, 0.7)',
                padding: '1.5rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border)'
              }}>
                <i className="fa-solid fa-phone" style={{ color: 'var(--accent-teal)', fontSize: '1.5rem', marginBottom: '0.75rem' }}></i>
                <h4 style={{ color: '#fff', fontSize: '1.05rem', marginBottom: '0.4rem' }}>Helpline Numbers</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.92rem' }}>
                  <a href="tel:+919647878373" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 600 }}>
                    +91 96478 78373
                  </a>
                  <a href="tel:+918391879493" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 600 }}>
                    +91 83918 79493
                  </a>
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                  Available 24/7 for active travelers
                </div>
              </div>

              {/* Email & Website */}
              <div style={{
                background: 'rgba(8, 12, 20, 0.7)',
                padding: '1.5rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border)'
              }}>
                <i className="fa-solid fa-envelope-open-text" style={{ color: 'var(--accent-gold)', fontSize: '1.5rem', marginBottom: '0.75rem' }}></i>
                <h4 style={{ color: '#fff', fontSize: '1.05rem', marginBottom: '0.4rem' }}>Digital Channels</h4>
                <div style={{ fontSize: '0.88rem', marginBottom: '0.4rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Email: </span>
                  <a href="mailto:sandeshtravelsgtk@gmail.com" style={{ color: '#fff', textDecoration: 'none' }}>
                    sandeshtravelsgtk@gmail.com
                  </a>
                </div>
                <div style={{ fontSize: '0.88rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Website: </span>
                  <a href="https://www.sandeshtravels.in" target="_blank" rel="noopener noreferrer" style={{ color: '#60a5fa', textDecoration: 'none' }}>
                    www.sandeshtravels.in
                  </a>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <button
                onClick={() => handleOpenInquiry('About Us Contact Form')}
                className="btn btn-primary btn-lg"
              >
                <i className="fa-solid fa-paper-plane"></i> Send Instant Inquiry
              </button>
              <a
                href="https://wa.me/919647878373?text=Hi%20Sandesh%20Travels,%20I%20am%20visiting%20your%20About%20Us%20page%20and%20would%20like%20to%20plan%20a%20trip."
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp btn-lg"
              >
                <i className="fa-brands fa-whatsapp"></i> Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Floating 24/7 WhatsApp */}
      <WhatsAppWidget />

      {/* Inquiry Modal */}
      <InquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialPackageName={selectedPackage}
      />
    </div>
  );
}
