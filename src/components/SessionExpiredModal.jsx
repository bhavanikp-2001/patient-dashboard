import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const SessionExpiredModal = () => {
  const { sessionExpired, resetSessionExpired, logout } = useAuth();

  if (!sessionExpired) return null;

  const handleReLogin = () => {
    resetSessionExpired();
    logout();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card" style={{ borderTop: '4px solid #ef4444', textAlign: 'center', maxWidth: '420px' }}>
        <div
          className="modal-icon danger"
          style={{ width: '54px', height: '54px', margin: '0 auto 1rem auto' }}
        >
          <AlertTriangle size={32} />
        </div>

        <h3 className="modal-title" style={{ fontSize: '1.35rem', marginBottom: '0.5rem', color: '#991b1b' }}>
          Session Expired
        </h3>

        <p className="modal-body" style={{ color: '#64748b', marginBottom: '1.75rem' }}>
          Your security session has expired due to inactivity or token revocation. Please log in again to continue data entry.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button
            className="btn btn-danger btn-block"
            onClick={handleReLogin}
            style={{ padding: '0.75rem', fontSize: '0.95rem' }}
          >
            Go to Login
          </button>
        </div>
      </div>
    </div>
  );
};
