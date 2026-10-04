import React, { useState } from 'react';
import { HeartPulse, Lock, Mail, ShieldCheck, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Login = () => {
  const { login, DEMO_USERS } = useAuth();
  const [email, setEmail] = useState('doctor@healthtech.com');
  const [password, setPassword] = useState('password123');
  const [role, setRole] = useState('doctor');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password, role);
  };

  const handleQuickLogin = (demoUser) => {
    setEmail(demoUser.email);
    setRole(demoUser.role);
    login(demoUser.email, 'password123', demoUser.role);
  };

  return (
    <div className="login-container">
      {/* Left visual branding panel */}
      <div className="login-left">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
          <div className="sidebar-logo-icon" style={{ width: '48px', height: '48px' }}>
            <HeartPulse size={28} />
          </div>
          <div style={{ textAlign: 'left' }}>
            <h1 style={{ fontSize: '1.75rem', color: '#0f1c30', fontWeight: '800' }}>HealthTech</h1>
            <span style={{ fontSize: '0.9rem', color: '#0066ff', fontWeight: '600' }}>
              Better Data • Healthier Communities
            </span>
          </div>
        </div>

        <div className="login-illustration">
          <svg viewBox="0 0 500 320" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto' }}>
            {/* Health Center Building */}
            <path d="M50 280 L250 120 L450 280 Z" fill="#e2e8f0" stroke="#0066ff" strokeWidth="4" />
            <rect x="100" y="200" width="300" height="100" rx="8" fill="#ffffff" stroke="#0066ff" strokeWidth="4" />
            <rect x="220" y="240" width="60" height="60" fill="#0066ff" />
            <path d="M250 220 V200 M240 210 H260" stroke="#ef4444" strokeWidth="6" strokeLinecap="round" />

            {/* Doctor & Patient Silhouette */}
            <circle cx="160" cy="220" r="18" fill="#0066ff" />
            <path d="M140 260 C140 240, 180 240, 180 260" fill="#0066ff" />
            
            <circle cx="340" cy="225" r="16" fill="#10b981" />
            <path d="M320 260 C320 245, 360 245, 360 260" fill="#10b981" />

            <path d="M20 300 H480" stroke="#cbd5e1" strokeWidth="4" />
          </svg>
        </div>

        <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#0f1c30', marginBottom: '0.5rem' }}>
          Secure. Simple. Smarter Healthcare.
        </h3>
        <p style={{ fontSize: '0.9rem', color: '#64748b', maxWidth: '380px' }}>
          Manage patient encounters • Track health trends • Improve lives in rural outreach & telemedicine clinics.
        </p>
      </div>

      {/* Right Login Form */}
      <div className="login-right">
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: '800', color: '#0f1c30' }}>Welcome Back</h2>
          <p style={{ fontSize: '0.9rem', color: '#64748b' }}>Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div className="form-group">
            <label htmlFor="email">Email or Username</label>
            <div style={{ position: 'relative' }}>
              <input
                id="email"
                type="email"
                className="form-control"
                style={{ paddingLeft: '2.5rem', width: '100%' }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Mail size={18} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            </div>
          </div>

          <div className="form-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label htmlFor="password">Password</label>
              <a href="#forgot" onClick={(e) => { e.preventDefault(); alert('Password reset email dispatched to ' + email); }} style={{ fontSize: '0.78rem', color: '#0066ff', textDecoration: 'none', fontWeight: '600' }}>
                Forgot password?
              </a>
            </div>
            <div style={{ position: 'relative' }}>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                className="form-control"
                style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem', width: '100%' }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Lock size={18} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: '0.85rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="role">Select Role (if multiple roles)</label>
            <select
              id="role"
              className="form-control"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="doctor">Doctor (Clinical Diagnostics & Records)</option>
              <option value="nurse">Nurse (Encounter Entry & Profile)</option>
              <option value="admin">Admin (User Management & Audit Logs)</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary btn-block" style={{ padding: '0.85rem', fontSize: '1rem', marginTop: '0.5rem' }}>
            Login
          </button>
        </form>

        {/* 1-Click Quick Demo Sign-in */}
        <div className="demo-account-pills">
          <div className="demo-pills-title">⚡ Quick 1-Click Demo Accounts:</div>
          <div className="demo-buttons-group">
            {DEMO_USERS.map((u) => (
              <button
                key={u.id}
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => handleQuickLogin(u)}
                style={{ flex: 1, textTransform: 'capitalize', fontSize: '0.75rem', gap: '0.35rem' }}
              >
                <span>{u.role === 'doctor' ? '👨‍⚕️' : u.role === 'nurse' ? '👩‍⚕️' : '🛡️'}</span>
                <span>{u.name.split(' ')[0]} ({u.role})</span>
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginTop: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: '#64748b', fontSize: '0.8rem' }}>
          <ShieldCheck size={16} color="#10b981" />
          <span>Your data is safe with us (AES-256 + JWT RBAC)</span>
        </div>
      </div>
    </div>
  );
};
