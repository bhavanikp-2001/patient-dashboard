import React from 'react';
import { PlusCircle, Users, User, ShieldAlert } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const NurseHome = ({ onViewChange }) => {
  const { currentUser } = useAuth();

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      <div className="card" style={{ padding: '2.5rem', textAlign: 'center', marginBottom: '2rem', background: 'linear-gradient(135deg, #ffffff 0%, #f4f7fc 100%)' }}>
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            backgroundColor: '#f3e8ff',
            color: '#a855f7',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1rem'
          }}
        >
          <User size={32} />
        </div>

        <h1 style={{ fontSize: '1.75rem', fontWeight: '800', color: '#0f1c30', marginBottom: '0.4rem' }}>
          Welcome, {currentUser ? currentUser.name : 'Nurse'}
        </h1>
        <p style={{ fontSize: '0.95rem', color: '#64748b', maxWidth: '500px', margin: '0 auto 1.75rem auto' }}>
          You can enter patient encounters and view patient records for rural outreach clinics.
        </p>

        {/* 3 Action Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
          <div
            className="card"
            onClick={() => onViewChange('new-encounter')}
            style={{
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '1.75rem',
              transition: 'all 0.2s ease',
              border: '1px solid #bfdbfe'
            }}
          >
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: '#e6f0ff', color: '#0066ff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
              <PlusCircle size={24} />
            </div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: '#0f1c30', marginBottom: '0.25rem' }}>Now Encounter</h3>
            <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Enter patient data</span>
          </div>

          <div
            className="card"
            onClick={() => onViewChange('patients')}
            style={{
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '1.75rem',
              transition: 'all 0.2s ease',
              border: '1px solid #a7f3d0'
            }}
          >
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: '#d1fae5', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
              <Users size={24} />
            </div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: '#0f1c30', marginBottom: '0.25rem' }}>View Patients</h3>
            <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Check patient records</span>
          </div>

          <div
            className="card"
            onClick={() => alert(`Nurse Profile Info:\nID: ${currentUser?.id}\nName: ${currentUser?.name}\nEmail: ${currentUser?.email}\nShift: Outreach Team Alpha`)}
            style={{
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '1.75rem',
              transition: 'all 0.2s ease',
              border: '1px solid #e9d5ff'
            }}
          >
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: '#f3e8ff', color: '#a855f7', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
              <User size={24} />
            </div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: '#0f1c30', marginBottom: '0.25rem' }}>My Profile</h3>
            <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Update your details</span>
          </div>
        </div>
      </div>

      {/* Role permission disclaimer */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          backgroundColor: '#fffbe5',
          border: '1px solid #fef3c7',
          padding: '1rem 1.25rem',
          borderRadius: '10px',
          color: '#b45309',
          fontSize: '0.875rem'
        }}
      >
        <ShieldAlert size={20} color="#f59e0b" />
        <span>You have limited access. Contact your administrator for additional permissions.</span>
      </div>
    </div>
  );
};
