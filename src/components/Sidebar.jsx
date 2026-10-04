import React from 'react';
import {
  Activity,
  Users,
  PlusCircle,
  TrendingUp,
  ShieldCheck,
  UserCheck,
  LogOut,
  HeartPulse,
  Settings,
  Building2,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Sidebar = ({ currentView, onViewChange, isOpen }) => {
  const { currentUser, logout } = useAuth();

  if (!currentUser) return null;

  const isAdmin = currentUser.role === 'admin';

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-logo">
        <div className="sidebar-logo-icon">
          <HeartPulse size={22} />
        </div>
        <div className="sidebar-brand">
          <h2>HealthTech</h2>
          <span>Better Data • Healthier Communities</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        <button
          className={`sidebar-item ${currentView === 'dashboard' ? 'active' : ''}`}
          onClick={() => onViewChange('dashboard')}
        >
          <Activity size={18} />
          <span>Dashboard</span>
        </button>

        <button
          className={`sidebar-item ${currentView === 'patients' ? 'active' : ''}`}
          onClick={() => onViewChange('patients')}
        >
          <Users size={18} />
          <span>Patients</span>
        </button>

        <button
          className={`sidebar-item ${currentView === 'new-encounter' ? 'active' : ''}`}
          onClick={() => onViewChange('new-encounter')}
        >
          <PlusCircle size={18} />
          <span>New Encounter</span>
        </button>

        <button
          className={`sidebar-item ${currentView === 'analytics' ? 'active' : ''}`}
          onClick={() => onViewChange('analytics')}
        >
          <TrendingUp size={18} />
          <span>Analytics</span>
        </button>

        <button
          className={`sidebar-item ${currentView === 'clinic-nodes' ? 'active' : ''}`}
          onClick={() => onViewChange('clinic-nodes')}
        >
          <Building2 size={18} />
          <span>Clinic Nodes</span>
        </button>

        {/* Admin only option */}
        {isAdmin && (
          <button
            className={`sidebar-item ${currentView === 'users' ? 'active' : ''}`}
            onClick={() => onViewChange('users')}
          >
            <UserCheck size={18} />
            <span>Manage Users</span>
          </button>
        )}

        <button
          className={`sidebar-item ${currentView === 'audit' ? 'active' : ''}`}
          onClick={() => onViewChange('audit')}
        >
          <ShieldCheck size={18} />
          <span>Audit Logs</span>
        </button>

        <button
          className={`sidebar-item ${currentView === 'settings' ? 'active' : ''}`}
          onClick={() => onViewChange('settings')}
        >
          <Settings size={18} />
          <span>Settings</span>
        </button>
      </nav>

      <div className="sidebar-footer">
        <button className="sidebar-item" onClick={logout} style={{ color: '#f87171' }}>
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};
