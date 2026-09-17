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
    }
  }, [isAuthenticated]);

  const handleLogin = (e) => {
    e.preventDefault();
    // Accept standard master password or admin pin
    if (adminPin === 'admin123' || adminPin === 'sandesh2026' || adminPin === 'admin') {
      sessionStorage.setItem('sandesh_admin_auth', 'true');
      setIsAuthenticated(true);
      setPinError('');
    } else {
      setPinError('Invalid Admin Passcode. Try admin123 or sandesh2026');
    }
  };

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
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
            Enter Admin Passcode to approve or moderate customer reviews submitted on Sandesh Travels
          </p>

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input
              type="password"
              placeholder="Enter Admin Passcode (e.g. admin123)"
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
            zIndex: 1000,
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
              <h1 style={{ fontSize: '1.6rem', color: '#fff' }}>Reviews Moderation Control</h1>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginTop: '0.25rem' }}>
              Approve or hide traveler reviews before they appear live on the Sandesh Travels website.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
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
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.35rem' }}>
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
    </div>
  );
}
