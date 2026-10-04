import React, { useState } from 'react';
import { X, Code, Copy, Check } from 'lucide-react';

export const ApiDocModal = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const sampleJson = `{
  "status": "success",
  "data": [
    {
      "patientId": "P-2587",
      "ageGroup": "25-45",
      "gender": "Female",
      "lastVisit": "2025-09-06",
      "encountersCount": 4
    },
    {
      "patientId": "P-2142",
      "ageGroup": "45-60",
      "gender": "Male",
      "lastVisit": "2025-09-05",
      "encountersCount": 2
    }
  ],
  "meta": {
    "total": 1248,
    "page": 1,
    "limit": 5
  }
}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(sampleJson);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" style={{ maxWidth: '650px' }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-icon info">
            <Code size={22} />
          </div>
          <div style={{ flex: 1 }}>
            <h3 className="modal-title">API Specification & Live Response</h3>
            <span className="chart-subtitle">RESTful endpoint documentation for third-party integrations</span>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <div style={{ marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.825rem', fontWeight: '700', color: '#0f1c30' }}>
                GET /api/patients?startDate=2025-09-01&endDate=2025-09-30
              </span>
              <button
                className="btn btn-secondary btn-sm"
                onClick={handleCopy}
                style={{ fontSize: '0.75rem', gap: '0.35rem' }}
              >
                {copied ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
                <span>{copied ? 'Copied' : 'Copy JSON'}</span>
              </button>
            </div>

            <pre className="code-block">
              <code>{sampleJson}</code>
            </pre>
          </div>

          <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
            <strong>Authentication Header:</strong> <code>Authorization: Bearer &lt;JWT_TOKEN&gt;</code>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-primary" onClick={onClose}>
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
};
