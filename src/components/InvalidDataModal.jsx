import React from 'react';
import { AlertCircle } from 'lucide-react';

export const InvalidDataModal = ({ isOpen, message, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" style={{ borderTop: '4px solid #10b981', textAlign: 'center', maxWidth: '400px' }} onClick={(e) => e.stopPropagation()}>
        <div
          className="modal-icon emerald"
          style={{ width: '50px', height: '50px', margin: '0 auto 1rem auto', backgroundColor: '#d1fae5', color: '#10b981' }}
        >
          <AlertCircle size={30} />
        </div>

        <h3 className="modal-title" style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: '#065f46' }}>
          Invalid Data
        </h3>

        <p className="modal-body" style={{ color: '#475569', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
          {message || 'Please enter all required fields correctly.'}
        </p>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button
            className="btn btn-primary"
            onClick={onClose}
            style={{ minWidth: '120px', backgroundColor: '#10b981', borderColor: '#10b981' }}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};
