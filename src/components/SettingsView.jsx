import React, { useState, useEffect } from 'react';
import { Moon, Sun, Shield, Building2, Bell, Lock, Check } from 'lucide-react';

export const SettingsView = () => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('healthtech_theme') || 'light';
  });

  const [clinicName, setClinicName] = useState('Primary Rural Outreach Center - District Alpha');
  const [nodeId, setNodeId] = useState('NODE-7882-TELEMED');
  const [anonymizationStyle, setAnonymizationStyle] = useState('synthetic_id');
  const [savedMsg, setSavedMsg] = useState('');

  useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
    localStorage.setItem('healthtech_theme', theme);
  }, [theme]);

  const handleSave = (e) => {
    e.preventDefault();
    setSavedMsg('Settings saved successfully!');
    setTimeout(() => setSavedMsg(''), 3000);
  };

  return (
    <div style={{ maxWidth: '900px' }}>
      <div className="page-header">
        <div className="page-title">
          <h1>Settings & System Preferences</h1>
          <p>Configure interface themes, patient privacy rules, and outreach node settings</p>
        </div>
      </div>

      {savedMsg && (
        <div
          style={{
            backgroundColor: '#d1fae5',
            color: '#065f46',
            padding: '1rem',
            borderRadius: '8px',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            fontWeight: '600'
          }}
        >
          <Check size={20} />
          <span>{savedMsg}</span>
        </div>
      )}

      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {/* Appearance & Theme Section */}
        <div className="card" style={{ padding: '1.75rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-main)', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Sun size={20} color="#0066ff" />
            <span>Appearance & Interface Theme</span>
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
            Select your visual mode for comfortable viewing in rural day clinics or night shifts.
          </p>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <button
              type="button"
              className={`btn ${theme === 'light' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setTheme('light')}
              style={{ flex: 1, padding: '1rem', gap: '0.75rem', justifyContent: 'center' }}
            >
              <Sun size={20} />
              <span>Light Mode</span>
            </button>

            <button
              type="button"
              className={`btn ${theme === 'dark' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setTheme('dark')}
              style={{ flex: 1, padding: '1rem', gap: '0.75rem', justifyContent: 'center' }}
            >
              <Moon size={20} />
              <span>Dark Mode</span>
            </button>
          </div>
        </div>

        {/* Patient Name & Privacy Anonymization Section */}
        <div className="card" style={{ padding: '1.75rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-main)', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Shield size={20} color="#10b981" />
            <span>Patient Name Anonymization & Security</span>
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
            Configure how patient identities are masked in records and reports.
          </p>

          <div className="form-group" style={{ marginBottom: '1rem' }}>
            <label>Patient ID Masking Format</label>
            <select
              className="form-control"
              value={anonymizationStyle}
              onChange={(e) => setAnonymizationStyle(e.target.value)}
            >
              <option value="synthetic_id">Synthetic IDs (e.g. P-2587, P-2142)</option>
              <option value="anonymized_alias">Clinical Aliases (e.g. Patient Alpha-9)</option>
              <option value="encrypted_hash">SHA-256 Hash Masking (e.g. 7f8a92...)</option>
            </select>
          </div>
        </div>

        {/* Clinic & Outreach Center Location */}
        <div className="card" style={{ padding: '1.75rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-main)', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Building2 size={20} color="#a855f7" />
            <span>Clinic & Telemedicine Node Config</span>
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
            Identify your rural outreach health node location.
          </p>

          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="clinicName">Clinic Facility Name</label>
              <input
                id="clinicName"
                type="text"
                className="form-control"
                value={clinicName}
                onChange={(e) => setClinicName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="nodeId">Node Telemedicine ID</label>
              <input
                id="nodeId"
                type="text"
                className="form-control"
                value={nodeId}
                onChange={(e) => setNodeId(e.target.value)}
              />
            </div>
          </div>
        </div>

        <button type="submit" className="btn btn-primary" style={{ padding: '0.85rem 2rem', width: 'fit-content' }}>
          Save System Preferences
        </button>
      </form>
    </div>
  );
};
