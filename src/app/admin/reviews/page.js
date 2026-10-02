'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminReviewsPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminPin, setAdminPin] = useState('');
  const [pinError, setPinError] = useState('');
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('ALL'); // 'ALL' | 'PENDING' | 'APPROVED'
  const [actionLoadingId, setActionLoadingId] = useState(null);
  const [toast, setToast] = useState(null);

  // Share Feedback Link Modal & CRM State
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [shareTab, setShareTab] = useState('crm'); // 'crm' | 'custom' | 'qr'
  const [crmLeads, setCrmLeads] = useState([]);
  const [crmLoading, setCrmLoading] = useState(false);
  const [crmSearch, setCrmSearch] = useState('');
  const [crmFilter, setCrmFilter] = useState('all'); // 'all' | 'completed'
  const [customName, setCustomName] = useState('');
  const [customPhone, setCustomPhone] = useState('');
  const [customTour, setCustomTour] = useState('North Sikkim 3N/4D (Gurudongmar & Yumthang)');
  const [sendingLeadId, setSendingLeadId] = useState(null);
  const [origin, setOrigin] = useState('https://ls.sandeshtravels.in');

  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.origin) {
      setOrigin(window.location.origin);
    }
  }, []);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/reviews', {
        headers: { 'x-admin-key': 'sandesh-admin-2026' }
      });
      const data = await res.json();
      if (data.success && data.reviews) {
        setReviews(data.reviews);
        if (data.stats && data.stats.pending > 0 && filter === 'ALL') {
          setFilter('PENDING');
        }
      }
    } catch (err) {
      console.error(err);
      showToast('Error loading reviews.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const fetchCrmLeads = async () => {
    setCrmLoading(true);
    try {
      const res = await fetch(`/api/admin/crm-leads?filter=${crmFilter}&search=${encodeURIComponent(crmSearch)}`, {
        headers: { 'x-admin-key': 'sandesh-admin-2026' }
      });
      const data = await res.json();
      if (data.success && data.leads) {
        setCrmLeads(data.leads);
      }
    } catch (err) {
      console.error('Failed to load CRM leads:', err);
    } finally {
      setCrmLoading(false);
    }
  };

  useEffect(() => {
    // Check if session storage has authenticated flag
    const stored = sessionStorage.getItem('sandesh_admin_auth');
    if (stored === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchReviews();
      fetchCrmLeads();
    }
  }, [isAuthenticated, crmFilter]);

  // Debounced search on CRM leads
  useEffect(() => {
    if (!isAuthenticated) return;
    const timeout = setTimeout(() => {
      fetchCrmLeads();
    }, 350);
    return () => clearTimeout(timeout);
  }, [crmSearch]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (adminPin === 'admin123' || adminPin === 'sandesh2026' || adminPin === 'admin') {
      sessionStorage.setItem('sandesh_admin_auth', 'true');
      setIsAuthenticated(true);
      setPinError('');
    } else {
      setPinError('Invalid Admin Passcode. Please try again.');
    }
  };

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const cleanPhoneNumber = (rawPhone) => {
    if (!rawPhone) return '';
    let digits = rawPhone.replace(/[^0-9]/g, '');
    if (digits.length === 10) {
      digits = '91' + digits;
    }
    return digits;
  };

  const handleSendWhatsAppToLead = async (lead) => {
    const cleanPhone = cleanPhoneNumber(lead.client_phone);
    if (!cleanPhone) {
      showToast('Client does not have a valid phone number', 'error');
      return;
    }

    setSendingLeadId(lead.id);
    const feedbackUrl = `${origin}/feedback?lead_id=${lead.id}&name=${encodeURIComponent(lead.client_name)}&phone=${encodeURIComponent(lead.client_phone || '')}`;
    const message = `Namaste ${lead.client_name}! 🏔️✨\n\nThank you for traveling with Sandesh Travels Sikkim. We hope you had an unforgettable holiday!\n\nWe would be deeply grateful if you could take 1 minute to share your rating & travel review here:\n${feedbackUrl}\n\nYour feedback helps fellow travelers and means the world to our mountain team! — Sandesh Travels`;

    try {
      // Mark feedback_sent_at in shared database
      await fetch('/api/admin/crm-leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-key': 'sandesh-admin-2026'
        },
        body: JSON.stringify({ leadId: lead.id })
      });

      // Update local CRM state
      setCrmLeads(prev => prev.map(l => l.id === lead.id ? { ...l, feedback_sent_at: new Date().toISOString() } : l));

      // Open WhatsApp chat
      window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`, '_blank');
      showToast(`WhatsApp feedback invite opened for ${lead.client_name}!`);
    } catch (err) {
      console.error(err);
      window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`, '_blank');
    } finally {
      setSendingLeadId(null);
    }
  };

  const handleCopyLeadLink = (lead) => {
    const feedbackUrl = `${origin}/feedback?lead_id=${lead.id}&name=${encodeURIComponent(lead.client_name)}&phone=${encodeURIComponent(lead.client_phone || '')}`;
    navigator.clipboard.writeText(feedbackUrl);
    showToast(`Personalized feedback link copied for ${lead.client_name}!`);
  };

  const handleCopyPublicLink = () => {
    const feedbackUrl = `${origin}/feedback`;
    navigator.clipboard.writeText(feedbackUrl);
    showToast('Public feedback link (https://.../feedback) copied to clipboard!');
  };

  const handleSendCustomWhatsApp = () => {
    const cleanPhone = cleanPhoneNumber(customPhone);
    if (!cleanPhone) {
      showToast('Please enter a valid 10-digit WhatsApp number.', 'error');
      return;
    }

    const feedbackUrl = `${origin}/feedback?name=${encodeURIComponent(customName || 'Traveler')}&phone=${encodeURIComponent(customPhone)}&tour=${encodeURIComponent(customTour)}`;
    const message = `Namaste ${customName ? customName : 'Traveler'}! 🏔️✨\n\nThank you for choosing Sandesh Travels for your Sikkim journey (${customTour}). We hope you had a memorable holiday!\n\nPlease take 1 minute to share your honest travel review and rating here:\n${feedbackUrl}\n\nYour feedback means a lot to our team! — Sandesh Travels`;

    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`, '_blank');
    showToast(`WhatsApp feedback invite opened for ${customName || customPhone}!`);
  };

  const handleToggleApproval = async (id, currentApproved) => {
    setActionLoadingId(id);
    try {
      const newStatus = !currentApproved;
      const res = await fetch('/api/admin/reviews', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-key': 'sandesh-admin-2026'
        },
        body: JSON.stringify({ id, is_approved: newStatus })
      });
      const data = await res.json();
      if (data.success) {
        setReviews(prev => prev.map(r => r.id === id ? { ...r, is_approved: newStatus } : r));
        showToast(newStatus ? 'Review approved and published to website!' : 'Review hidden from website.');
      } else {
        showToast(data.error || 'Failed to update status', 'error');
      }
    } catch (err) {
      console.error(err);
      showToast('Network error updating status.', 'error');
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleDeleteReview = async (id, clientName) => {
    if (!window.confirm(`Are you sure you want to permanently delete the review by "${clientName}"?`)) {
      return;
    }

    setActionLoadingId(id);
    try {
      const res = await fetch(`/api/admin/reviews?id=${id}`, {
        method: 'DELETE',
        headers: { 'x-admin-key': 'sandesh-admin-2026' }
      });
      const data = await res.json();
      if (data.success) {
        setReviews(prev => prev.filter(r => r.id !== id));
        showToast(`Review by ${clientName} deleted successfully.`);
      } else {
        showToast(data.error || 'Failed to delete review.', 'error');
      }
    } catch (err) {
      console.error(err);
      showToast('Network error deleting review.', 'error');
    } finally {
      setActionLoadingId(null);
    }
  };

  const pendingCount = reviews.filter(r => !r.is_approved).length;
  const approvedCount = reviews.filter(r => r.is_approved).length;

  const filteredReviews = reviews.filter(r => {
    if (filter === 'PENDING') return !r.is_approved;
    if (filter === 'APPROVED') return r.is_approved;
    return true;
  });

  if (!isAuthenticated) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--bg-base)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
        <div className="glass-card" style={{ maxWidth: '420px', width: '100%', padding: '2.5rem 2rem', textAlign: 'center' }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '12px',
            background: 'var(--primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontSize: '1.5rem',
            margin: '0 auto 1.25rem',
            boxShadow: '0 4px 16px var(--primary-glow)'
          }}>
            <i className="fa-solid fa-shield-halved"></i>
          </div>

          <h2 style={{ fontSize: '1.5rem', color: '#fff', marginBottom: '0.4rem' }}>Admin Reviews Portal</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1.75rem' }}>
            Enter Admin Passcode to share feedback links and moderate traveler reviews
          </p>

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input
              type="password"
              placeholder="Enter Admin Passcode"
              value={adminPin}
              onChange={(e) => setAdminPin(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '0.85rem 1rem',
                borderRadius: 'var(--radius-sm)',
                background: 'var(--bg-surface-elevated)',
                border: '1px solid var(--border)',
                color: '#fff',
                fontSize: '0.95rem',
                textAlign: 'center'
              }}
            />

            {pinError && (
              <p style={{ color: '#ef4444', fontSize: '0.8rem', margin: 0 }}>{pinError}</p>
            )}

            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
              <i className="fa-solid fa-lock-open"></i> Unlock Dashboard
            </button>
          </form>

          <div style={{ marginTop: '1.5rem', borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
            <Link href="/" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.85rem' }}>
              ← Return to Main Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const publicFeedbackUrl = `${origin}/feedback`;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)', padding: '2rem 0 4rem' }}>
      <div className="container">
        {/* Toast Notification */}
        {toast && (
          <div style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            background: toast.type === 'error' ? '#ef4444' : 'linear-gradient(135deg, #10b981, #059669)',
            color: '#fff',
            padding: '0.85rem 1.25rem',
            borderRadius: 'var(--radius-sm)',
            boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
            zIndex: 1100,
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            fontSize: '0.9rem',
            fontWeight: 600
          }}>
            <i className={toast.type === 'error' ? 'fa-solid fa-circle-exclamation' : 'fa-solid fa-circle-check'}></i>
            {toast.message}
          </div>
        )}

        {/* Top Header */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid var(--border)', paddingBottom: '1.25rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <img
                src="/logo.png"
                alt="Sandesh Travels Logo"
                style={{ width: '38px', height: '38px', borderRadius: '8px', background: '#fff', padding: '2px' }}
              />
              <h1 style={{ fontSize: '1.6rem', color: '#fff' }}>Reviews & Feedback Hub</h1>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginTop: '0.25rem' }}>
              Share direct feedback links to travelers anytime & moderate reviews before publishing live.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => setShareModalOpen(true)}
              className="btn btn-primary btn-sm"
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', boxShadow: '0 4px 16px var(--primary-glow)' }}
            >
              <i className="fa-solid fa-paper-plane"></i> Share Feedback Link
            </button>
            <button
              onClick={fetchReviews}
              className="btn btn-secondary btn-sm"
              disabled={loading}
              title="Refresh Reviews"
            >
              <i className={`fa-solid fa-arrows-rotate ${loading ? 'fa-spin' : ''}`}></i> Refresh
            </button>
            <Link href="/" className="btn btn-secondary btn-sm">
              <i className="fa-solid fa-arrow-left"></i> View Website
            </Link>
            <button
              onClick={() => {
                sessionStorage.removeItem('sandesh_admin_auth');
                setIsAuthenticated(false);
              }}
              className="btn btn-sm"
              style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.3)' }}
            >
              <i className="fa-solid fa-arrow-right-from-bracket"></i> Logout
            </button>
          </div>
        </div>

        {/* Share Feedback Quick Banner */}
        <div className="glass-card" style={{
          padding: '1.25rem 1.5rem',
          marginBottom: '2rem',
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.08), rgba(6, 78, 59, 0.15))',
          border: '1px solid rgba(16, 185, 129, 0.25)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
              <span className="badge badge-emerald" style={{ fontSize: '0.72rem' }}>
                <i className="fa-solid fa-link"></i> Customer Feedback Link
              </span>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                Direct review link for WhatsApp, SMS, or QR code:
              </span>
            </div>
            <code style={{
              display: 'inline-block',
              background: 'rgba(0, 0, 0, 0.35)',
              padding: '0.35rem 0.75rem',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--primary)',
              fontSize: '0.92rem',
              fontWeight: 600
            }}>
              {publicFeedbackUrl}
            </code>
          </div>

          <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
            <button
              onClick={handleCopyPublicLink}
              className="btn btn-secondary btn-sm"
              style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
            >
              <i className="fa-solid fa-copy"></i> Copy Public Link
            </button>
            <button
              onClick={() => { setShareTab('crm'); setShareModalOpen(true); }}
              className="btn btn-primary btn-sm"
              style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
            >
              <i className="fa-brands fa-whatsapp"></i> Send to CRM Travelers
            </button>
            <button
              onClick={() => { setShareTab('qr'); setShareModalOpen(true); }}
              className="btn btn-secondary btn-sm"
              style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
            >
              <i className="fa-solid fa-qrcode"></i> Show QR
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          <div className="glass-card" style={{ padding: '1.25rem', borderLeft: '4px solid var(--accent-gold)' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: 600 }}>
              Pending Approval
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#fbbf24', marginTop: '0.25rem' }}>
              {pendingCount}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Awaiting admin moderation
            </div>
          </div>

          <div className="glass-card" style={{ padding: '1.25rem', borderLeft: '4px solid var(--primary)' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: 600 }}>
              Live on Website
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary)', marginTop: '0.25rem' }}>
              {approvedCount}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Visible to public visitors
            </div>
          </div>

          <div className="glass-card" style={{ padding: '1.25rem', borderLeft: '4px solid var(--secondary)' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: 600 }}>
              Total Submissions
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#fff', marginTop: '0.25rem' }}>
              {reviews.length}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              All customer entries
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem' }}>
          <button
            onClick={() => setFilter('PENDING')}
            className={`btn btn-sm ${filter === 'PENDING' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ borderRadius: 'var(--radius-full)' }}
          >
            <i className="fa-solid fa-clock-rotate-left"></i> Pending Approval ({pendingCount})
          </button>
          <button
            onClick={() => setFilter('APPROVED')}
            className={`btn btn-sm ${filter === 'APPROVED' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ borderRadius: 'var(--radius-full)' }}
          >
            <i className="fa-solid fa-circle-check"></i> Live on Website ({approvedCount})
          </button>
          <button
            onClick={() => setFilter('ALL')}
            className={`btn btn-sm ${filter === 'ALL' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ borderRadius: 'var(--radius-full)' }}
          >
            <i className="fa-solid fa-list"></i> All ({reviews.length})
          </button>
        </div>

        {/* Reviews List */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-secondary)' }}>
            <i className="fa-solid fa-circle-notch fa-spin" style={{ fontSize: '2rem', color: 'var(--primary)', marginBottom: '1rem' }}></i>
            <p>Loading customer reviews...</p>
          </div>
        ) : filteredReviews.length === 0 ? (
          <div className="glass-card" style={{ textAlign: 'center', padding: '3.5rem 1rem' }}>
            <i className="fa-solid fa-comment-dots" style={{ fontSize: '2.5rem', color: 'var(--text-muted)', marginBottom: '1rem' }}></i>
            <h3 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '0.5rem' }}>No reviews found in this tab</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
              {filter === 'PENDING' ? 'All customer feedback has been reviewed and moderated!' : 'No reviews match your selected filter.'}
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {filteredReviews.map((rev) => (
              <div
                key={rev.id}
                className="glass-card"
                style={{
                  borderLeft: rev.is_approved ? '4px solid var(--primary)' : '4px solid #fbbf24',
                  padding: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem'
                }}
              >
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.35rem', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '1.15rem', fontWeight: 700, color: '#fff' }}>
                        {rev.client_name}
                      </span>
                      {rev.location && (
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                          • {rev.location}
                        </span>
                      )}
                      <span
                        className={`badge ${rev.is_approved ? 'badge-emerald' : 'badge-gold'}`}
                        style={{ fontSize: '0.72rem' }}
                      >
                        {rev.is_approved ? 'Live on Website' : 'Pending Approval'}
                      </span>
                      {rev.lead_id && (
                        <span className="badge badge-teal" style={{ fontSize: '0.72rem' }}>
                          <i className="fa-solid fa-user-check"></i> CRM Traveler #{rev.lead_id}
                        </span>
                      )}
                    </div>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                      {rev.client_phone && (
                        <span>
                          <i className="fa-solid fa-phone" style={{ color: 'var(--primary)', marginRight: '4px' }}></i> {rev.client_phone}
                        </span>
                      )}
                      {rev.client_email && (
                        <span>
                          <i className="fa-solid fa-envelope" style={{ color: 'var(--secondary)', marginRight: '4px' }}></i> {rev.client_email}
                        </span>
                      )}
                      {rev.tour_name && (
                        <span style={{ color: 'var(--accent-teal)' }}>
                          <i className="fa-solid fa-map-location-dot" style={{ marginRight: '4px' }}></i> {rev.tour_name}
                        </span>
                      )}
                      {rev.travel_date && (
                        <span>
                          <i className="fa-solid fa-calendar" style={{ marginRight: '4px' }}></i> {rev.travel_date}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Stars */}
                  <div style={{ display: 'flex', gap: '0.2rem', color: '#fbbf24', fontSize: '1rem' }}>
                    {[...Array(rev.rating || 5)].map((_, i) => (
                      <i key={i} className="fa-solid fa-star"></i>
                    ))}
                  </div>
                </div>

                {/* Review Message Text */}
                <div style={{
                  background: 'var(--bg-surface-elevated)',
                  padding: '1rem 1.25rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border)',
                  color: '#e2e8f0',
                  fontSize: '0.92rem',
                  lineHeight: 1.6,
                  fontStyle: 'italic'
                }}>
                  "{rev.review_text}"
                </div>

                {/* Action Toolbar */}
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border)' }}>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    Submitted on: {rev.created_at ? new Date(rev.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'Recent'}
                  </div>

                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button
                      onClick={() => handleToggleApproval(rev.id, rev.is_approved)}
                      disabled={actionLoadingId === rev.id}
                      className={`btn btn-sm ${rev.is_approved ? 'btn-secondary' : 'btn-primary'}`}
                      style={{
                        background: rev.is_approved ? 'rgba(239, 68, 68, 0.15)' : undefined,
                        borderColor: rev.is_approved ? 'rgba(239, 68, 68, 0.3)' : undefined,
                        color: rev.is_approved ? '#f87171' : undefined
                      }}
                    >
                      {actionLoadingId === rev.id ? (
                        <i className="fa-solid fa-spinner fa-spin"></i>
                      ) : rev.is_approved ? (
                        <>
                          <i className="fa-solid fa-eye-slash"></i> Hide from Website
                        </>
                      ) : (
                        <>
                          <i className="fa-solid fa-circle-check"></i> Approve & Show on Website
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => handleDeleteReview(rev.id, rev.client_name)}
                      disabled={actionLoadingId === rev.id}
                      className="btn btn-secondary btn-sm"
                      style={{ color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.2)' }}
                      title="Permanently Delete Review"
                    >
                      <i className="fa-solid fa-trash"></i> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Share Feedback Link Modal */}
      {shareModalOpen && (
        <div className="modal-overlay" onClick={() => setShareModalOpen(false)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '780px', width: '95%', maxHeight: '90vh', overflowY: 'auto', padding: '2rem' }}
          >
            {/* Modal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>
              <div>
                <span className="badge badge-emerald" style={{ marginBottom: '0.4rem', fontSize: '0.72rem' }}>
                  <i className="fa-solid fa-share-nodes"></i> Share Feedback Link
                </span>
                <h3 style={{ fontSize: '1.4rem', color: '#fff', fontWeight: 700 }}>
                  Send Feedback Request to Travelers
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  Send via WhatsApp, copy personalized URLs, or share with travelers anytime
                </p>
              </div>
              <button
                onClick={() => setShareModalOpen(false)}
                style={{
                  background: 'var(--bg-surface-elevated)',
                  border: '1px solid var(--border)',
                  color: '#fff',
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            {/* Modal Tabs */}
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem' }}>
              <button
                onClick={() => setShareTab('crm')}
                className={`btn btn-sm ${shareTab === 'crm' ? 'btn-primary' : 'btn-secondary'}`}
                style={{ borderRadius: 'var(--radius-full)' }}
              >
                <i className="fa-solid fa-users"></i> CRM Travelers (Live DB)
              </button>
              <button
                onClick={() => setShareTab('custom')}
                className={`btn btn-sm ${shareTab === 'custom' ? 'btn-primary' : 'btn-secondary'}`}
                style={{ borderRadius: 'var(--radius-full)' }}
              >
                <i className="fa-solid fa-pen-nib"></i> Custom / Walk-in
              </button>
              <button
                onClick={() => setShareTab('qr')}
                className={`btn btn-sm ${shareTab === 'qr' ? 'btn-primary' : 'btn-secondary'}`}
                style={{ borderRadius: 'var(--radius-full)' }}
              >
                <i className="fa-solid fa-qrcode"></i> Public Link & QR
              </button>
            </div>

            {/* TAB 1: CRM Travelers */}
            {shareTab === 'crm' && (
              <div>
                <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
                  <div style={{ flex: 1, minWidth: '220px', position: 'relative' }}>
                    <i className="fa-solid fa-magnifying-glass" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}></i>
                    <input
                      type="text"
                      placeholder="Search traveler by name or phone..."
                      value={crmSearch}
                      onChange={(e) => setCrmSearch(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.65rem 1rem 0.65rem 2.25rem',
                        borderRadius: 'var(--radius-sm)',
                        background: 'var(--bg-surface-elevated)',
                        border: '1px solid var(--border)',
                        color: '#fff',
                        fontSize: '0.88rem'
                      }}
                    />
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      onClick={() => setCrmFilter('all')}
                      className={`btn btn-sm ${crmFilter === 'all' ? 'btn-primary' : 'btn-secondary'}`}
                    >
                      All Leads
                    </button>
                    <button
                      onClick={() => setCrmFilter('completed')}
                      className={`btn btn-sm ${crmFilter === 'completed' ? 'btn-primary' : 'btn-secondary'}`}
                    >
                      Completed Trips Only
                    </button>
                  </div>
                </div>

                {crmLoading ? (
                  <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--text-secondary)' }}>
                    <i className="fa-solid fa-circle-notch fa-spin" style={{ fontSize: '1.75rem', color: 'var(--primary)', marginBottom: '0.75rem' }}></i>
                    <p>Loading travelers from shared database...</p>
                  </div>
                ) : crmLeads.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '2.5rem 1rem', background: 'var(--bg-surface-elevated)', borderRadius: 'var(--radius-md)' }}>
                    <p style={{ color: 'var(--text-secondary)', margin: 0 }}>No travelers found matching your query.</p>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '420px', overflowY: 'auto', paddingRight: '4px' }}>
                    {crmLeads.map((lead) => (
                      <div
                        key={lead.id}
                        style={{
                          background: 'var(--bg-surface-elevated)',
                          border: '1px solid var(--border)',
                          borderRadius: 'var(--radius-sm)',
                          padding: '0.9rem 1.15rem',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          flexWrap: 'wrap',
                          gap: '0.75rem'
                        }}
                      >
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.2rem' }}>
                            <span style={{ fontWeight: 700, color: '#fff', fontSize: '0.98rem' }}>
                              {lead.client_name}
                            </span>
                            <span className={`badge ${lead.status === 'completed' ? 'badge-emerald' : 'badge-gold'}`} style={{ fontSize: '0.68rem' }}>
                              {lead.status || 'lead'}
                            </span>
                            {lead.has_reviewed ? (
                              <span className="badge badge-teal" style={{ fontSize: '0.68rem' }}>
                                <i className="fa-solid fa-star"></i> Reviewed ({lead.review_rating || 5}★)
                              </span>
                            ) : lead.feedback_sent_at ? (
                              <span className="badge" style={{ background: 'rgba(59, 130, 246, 0.2)', color: '#60a5fa', fontSize: '0.68rem' }}>
                                <i className="fa-solid fa-check"></i> Invite Sent
                              </span>
                            ) : null}
                          </div>

                          <div style={{ display: 'flex', gap: '0.85rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                            <span>
                              <i className="fa-solid fa-phone" style={{ color: 'var(--primary)', marginRight: '3px' }}></i> {lead.client_phone}
                            </span>
                            {lead.package_name && (
                              <span style={{ color: 'var(--accent-teal)' }}>
                                <i className="fa-solid fa-map-pin" style={{ marginRight: '3px' }}></i> {lead.package_name}
                              </span>
                            )}
                            {lead.travel_dates && lead.travel_dates.includes('Travelers:') && (
                              <span style={{ color: '#38bdf8' }}>
                                <i className="fa-solid fa-users" style={{ marginRight: '3px' }}></i>
                                {lead.travel_dates.split('Travelers:')[1]?.split(']')[0]?.trim()}
                              </span>
                            )}
                          </div>
                        </div>

                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button
                            onClick={() => handleSendWhatsAppToLead(lead)}
                            disabled={sendingLeadId === lead.id}
                            className="btn btn-primary btn-sm"
                            style={{ background: '#25D366', borderColor: '#25D366', color: '#fff' }}
                            title="Send WhatsApp Feedback Request"
                          >
                            {sendingLeadId === lead.id ? (
                              <i className="fa-solid fa-circle-notch fa-spin"></i>
                            ) : (
                              <>
                                <i className="fa-brands fa-whatsapp"></i> WhatsApp Link
                              </>
                            )}
                          </button>
                          <button
                            onClick={() => handleCopyLeadLink(lead)}
                            className="btn btn-secondary btn-sm"
                            title="Copy Direct Link"
                          >
                            <i className="fa-solid fa-copy"></i>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: Custom / Walk-in */}
            {shareTab === 'custom' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', margin: 0 }}>
                  Generate a personalized feedback request for walk-in travelers or custom offline bookings:
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#fff', marginBottom: '0.35rem' }}>
                      Traveler Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Anand Verma"
                      value={customName}
                      onChange={(e) => setCustomName(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        borderRadius: 'var(--radius-sm)',
                        background: 'var(--bg-surface-elevated)',
                        border: '1px solid var(--border)',
                        color: '#fff',
                        fontSize: '0.9rem'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#fff', marginBottom: '0.35rem' }}>
                      WhatsApp Number (10 Digits)
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. 9876543210"
                      value={customPhone}
                      onChange={(e) => setCustomPhone(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        borderRadius: 'var(--radius-sm)',
                        background: 'var(--bg-surface-elevated)',
                        border: '1px solid var(--border)',
                        color: '#fff',
                        fontSize: '0.9rem'
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#fff', marginBottom: '0.35rem' }}>
                    Tour Circuit / Destination
                  </label>
                  <select
                    value={customTour}
                    onChange={(e) => setCustomTour(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: 'var(--radius-sm)',
                      background: 'var(--bg-surface-elevated)',
                      border: '1px solid var(--border)',
                      color: '#fff',
                      fontSize: '0.9rem'
                    }}
                  >
                    <option value="North Sikkim 3N/4D (Gurudongmar & Yumthang)">North Sikkim 3N/4D (Gurudongmar & Yumthang)</option>
                    <option value="Gangtok & Tsomgo Lake / Nathula Pass">Gangtok & Tsomgo Lake / Nathula Pass</option>
                    <option value="Silk Route 4D/3N (Zuluk, Thambi & Kupup Lake)">Silk Route 4D/3N (Zuluk, Thambi & Kupup Lake)</option>
                    <option value="Pelling & West Sikkim Heritage Circuit">Pelling & West Sikkim Heritage Circuit</option>
                    <option value="Complete Sikkim Grand Odyssey 7N/8D">Complete Sikkim Grand Odyssey 7N/8D</option>
                    <option value="Darjeeling & Gangtok Combined Explorer">Darjeeling & Gangtok Combined Explorer</option>
                  </select>
                </div>

                {/* Message Preview */}
                <div style={{
                  background: 'var(--bg-surface-elevated)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '1rem',
                  fontSize: '0.85rem',
                  color: 'var(--text-secondary)'
                }}>
                  <div style={{ fontWeight: 700, color: '#fff', marginBottom: '0.35rem' }}>WhatsApp Message Preview:</div>
                  <div style={{ whiteSpace: 'pre-wrap', fontStyle: 'italic', lineHeight: 1.5 }}>
                    Namaste {customName || 'Traveler'}! 🏔️✨{'\n\n'}
                    Thank you for choosing Sandesh Travels for your Sikkim journey ({customTour}). We hope you had a memorable holiday!{'\n\n'}
                    Please take 1 minute to share your honest travel review and rating here:{'\n'}
                    <span style={{ color: 'var(--primary)', wordBreak: 'break-all' }}>
                      {origin}/feedback?name={encodeURIComponent(customName || 'Traveler')}&phone={encodeURIComponent(customPhone)}&tour={encodeURIComponent(customTour)}
                    </span>{'\n\n'}
                    Your feedback means a lot to our team! — Sandesh Travels
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button
                    onClick={handleSendCustomWhatsApp}
                    className="btn btn-primary"
                    style={{ background: '#25D366', borderColor: '#25D366', color: '#fff', flex: 1 }}
                  >
                    <i className="fa-brands fa-whatsapp"></i> Send via WhatsApp
                  </button>
                  <button
                    onClick={() => {
                      const link = `${origin}/feedback?name=${encodeURIComponent(customName || 'Traveler')}&phone=${encodeURIComponent(customPhone)}&tour=${encodeURIComponent(customTour)}`;
                      navigator.clipboard.writeText(link);
                      showToast('Custom link copied to clipboard!');
                    }}
                    className="btn btn-secondary"
                  >
                    <i className="fa-solid fa-copy"></i> Copy Link
                  </button>
                </div>
              </div>
            )}

            {/* TAB 3: QR Code & Public Link */}
            {shareTab === 'qr' && (
              <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                <div style={{
                  display: 'inline-block',
                  background: '#fff',
                  padding: '1rem',
                  borderRadius: '12px',
                  boxShadow: '0 8px 30px rgba(0,0,0,0.5)',
                  marginBottom: '1.25rem'
                }}>
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(publicFeedbackUrl)}`}
                    alt="Scan to Give Review"
                    style={{ width: '220px', height: '220px', display: 'block' }}
                  />
                </div>

                <h4 style={{ color: '#fff', fontSize: '1.15rem', marginBottom: '0.35rem' }}>
                  Scan to Share Review
                </h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', maxWidth: '440px', margin: '0 auto 1.5rem' }}>
                  Show this QR code on a mobile device or tablet to travelers at airport/station drop-offs so they can rate Sandesh Travels instantly.
                </p>

                <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <button onClick={handleCopyPublicLink} className="btn btn-primary">
                    <i className="fa-solid fa-copy"></i> Copy Public Link
                  </button>
                  <a href={publicFeedbackUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                    <i className="fa-solid fa-arrow-up-right-from-square"></i> Open Feedback Page
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
