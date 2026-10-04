import React from 'react';
import { Menu, Code, Clock, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Navbar = ({ onToggleSidebar, onOpenApiModal, currentView }) => {
  const { currentUser, logout, triggerSessionExpired } = useAuth();

  if (!currentUser) return null;

  return (
    <header className="navbar">
      <div className="navbar-left">
        <button
          className="navbar-toggle-btn"
          onClick={onToggleSidebar}
          title="Toggle Navigation Menu"
          aria-label="Toggle Menu"
        >
          <Menu size={20} />
        </button>
        <span className="navbar-title">
          {currentView === 'dashboard' && 'Dashboard Overview'}
          {currentView === 'patients' && 'Patient Records'}
          {currentView === 'new-encounter' && 'New Patient Encounter'}
          {currentView === 'analytics' && 'Health Trends Analytics'}
          {currentView === 'nurse-home' && 'Nurse Portal'}
          {currentView === 'users' && 'Manage Users'}
          {currentView === 'audit' && 'Audit Logs & Security'}
        </span>
      </div>

      <div className="navbar-right">
        {/* Quick action for edge case demo */}
        <button
          className="btn btn-secondary btn-sm"
          onClick={triggerSessionExpired}
          title="Simulate Session Timeout Edge Case"
          style={{ fontSize: '0.75rem', gap: '0.35rem' }}
        >
          <Clock size={14} color="#f59e0b" />
          <span>Simulate Expiry</span>
        </button>

        {/* API Drawer Trigger */}
        <button
          className="btn btn-secondary btn-sm"
          onClick={onOpenApiModal}
          title="View REST API JSON Documentation"
          style={{ fontSize: '0.75rem', gap: '0.35rem' }}
        >
          <Code size={14} color="#0066ff" />
          <span>API Specs</span>
        </button>

        {/* Logged in User Profile Pill */}
        <div className="user-profile-pill">
          <div className="user-avatar">{currentUser.avatar}</div>
          <div className="user-info">
            <span className="user-name">{currentUser.name}</span>
            <span className="user-role-badge">{currentUser.role}</span>
          </div>
        </div>

        <button
          className="navbar-toggle-btn"
          onClick={logout}
          title="Logout"
          style={{ color: '#ef4444' }}
        >
          <LogOut size={18} />
        </button>
      </div>
    </header>
  );
};
