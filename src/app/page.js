'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import HeroBanner from '@/components/HeroBanner';
import TrustPillars from '@/components/TrustPillars';
import VisualShowcase from '@/components/VisualShowcase';
import TravelPersonas from '@/components/TravelPersonas';
import PackageList from '@/components/PackageList';
import DestinationGallery from '@/components/DestinationGallery';
import CustomTripPlanner from '@/components/CustomTripPlanner';
import SeasonalGuide from '@/components/SeasonalGuide';
import FleetShowcase from '@/components/FleetShowcase';
import PermitGuide from '@/components/PermitGuide';
import ReviewsSection from '@/components/ReviewsSection';
import Footer from '@/components/Footer';
import WhatsAppWidget from '@/components/WhatsAppWidget';
import FloatingInquiryBar from '@/components/FloatingInquiryBar';
import InquiryModal from '@/components/InquiryModal';

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState('');
  const [toastMessage, setToastMessage] = useState(null);

  const handleOpenInquiry = (packageName = '') => {
    setSelectedPackage(packageName);
    setModalOpen(true);
  };

  const handleSuccessLead = (lead) => {
    setToastMessage(`Inquiry received for ${lead.client_name}! Our travel specialist is preparing your quotation.`);
    setTimeout(() => {
      setToastMessage(null);
    }, 6000);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      {/* Toast Notification Bar */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          background: 'linear-gradient(135deg, #10b981, #059669)',
          color: '#fff',
          padding: '1rem 1.5rem',
          borderRadius: 'var(--radius-md)',
          boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          animation: 'slideUp 0.3s ease-out'
        }}>
          <i className="fa-solid fa-circle-check" style={{ fontSize: '1.25rem' }}></i>
          <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', marginLeft: '0.5rem' }}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
      )}

      {/* Main Header / Navigation */}
      <Navbar onOpenInquiry={handleOpenInquiry} />

      {/* Hero Section & Quick Search Bar */}
      <HeroBanner onSuccessLead={handleSuccessLead} />

      {/* 4 Trust Pillars (Direct Fleet, Permits, Drivers, Support) */}
      <TrustPillars onOpenInquiry={handleOpenInquiry} />

      {/* Visual Attractions Showcase & Lightbox Gallery */}
      <VisualShowcase onOpenInquiry={handleOpenInquiry} />

      {/* Curated Travel Personas (Honeymoon, Family, Snow, Heritage) */}
      <TravelPersonas onOpenInquiry={handleOpenInquiry} />

      {/* Dynamic Tour Packages from PostgreSQL DB */}
      <PackageList onOpenInquiry={handleOpenInquiry} />

      {/* Iconic Destination Showcase */}
      <DestinationGallery onOpenInquiry={handleOpenInquiry} />

      {/* Interactive Custom Trip Planner */}
      <CustomTripPlanner onSuccessLead={handleSuccessLead} />

      {/* Seasonal Weather & Best Time to Visit Matrix */}
      <SeasonalGuide onOpenInquiry={handleOpenInquiry} />

      {/* 20+ Vehicles Fleet Showcase */}
      <FleetShowcase onOpenInquiry={handleOpenInquiry} />

      {/* Sikkim Permits & FAQs */}
      <PermitGuide />

      {/* Reviews & Social Proof */}
      <ReviewsSection />

      {/* Footer */}
      <Footer />

      {/* Floating 24/7 WhatsApp Widget */}
      <WhatsAppWidget />

      {/* Sticky Floating Quick Inquiry Bar */}
      <FloatingInquiryBar onSuccessLead={handleSuccessLead} />

      {/* Context-aware Lead Inquiry Modal */}
      <InquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialPackageName={selectedPackage}
        onSuccessLead={handleSuccessLead}
      />
    </div>
  );
}
