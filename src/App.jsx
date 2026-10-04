import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DataProvider } from './context/DataContext';

import { Login } from './components/Login';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { NewEncounter } from './components/NewEncounter';
import { PatientRecords } from './components/PatientRecords';
import { HealthAnalytics } from './components/HealthAnalytics';
import { NurseHome } from './components/NurseHome';
import { ManageUsers } from './components/ManageUsers';
import { AuditLogs } from './components/AuditLogs';
import { SettingsView } from './components/SettingsView';
import { ClinicNodes } from './components/ClinicNodes';
import { MiniAiAssistant } from './components/MiniAiAssistant';
import { ApiDocModal } from './components/ApiDocModal';
import { SessionExpiredModal } from './components/SessionExpiredModal';
import { InvalidDataModal } from './components/InvalidDataModal';
import { FooterBadges } from './components/FooterBadges';

const MainLayout = () => {
  const { currentUser } = useAuth();
  
  const [currentView, setCurrentView] = useState(() => {
    if (currentUser?.role === 'nurse') return 'nurse-home';
    return 'dashboard';
  });

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [apiModalOpen, setApiModalOpen] = useState(false);
  const [invalidModalMessage, setInvalidModalMessage] = useState('');
  const [selectedPatientIdForEncounter, setSelectedPatientIdForEncounter] = useState('');

  if (!currentUser) {
    return <Login />;
  }

  const handleViewChange = (view) => {
    setCurrentView(view);
    setSidebarOpen(false);
  };

  const handleNavigateToEncounter = (patientId = '') => {
    setSelectedPatientIdForEncounter(patientId);
    setCurrentView('new-encounter');
    setSidebarOpen(false);
  };

  return (
    <div className="app-container">
      <Sidebar
        currentView={currentView}
        onViewChange={handleViewChange}
        isOpen={sidebarOpen}
      />
      {sidebarOpen && (
        <div className="sidebar-backdrop" onClick={() => setSidebarOpen(false)} />
      )}

      <div className="main-wrapper">
        <Navbar
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          onOpenApiModal={() => setApiModalOpen(true)}
          currentView={currentView}
        />

        <main className="content-body">
          {currentView === 'dashboard' && <Dashboard />}
          {currentView === 'nurse-home' && <NurseHome onViewChange={handleViewChange} />}
          {currentView === 'new-encounter' && (
            <NewEncounter
              initialPatientId={selectedPatientIdForEncounter}
              onShowInvalidModal={(msg) => setInvalidModalMessage(msg)}
            />
          )}
          {currentView === 'patients' && (
            <PatientRecords
              onNavigateToEncounter={handleNavigateToEncounter}
            />
          )}
          {currentView === 'analytics' && <HealthAnalytics />}
          {currentView === 'clinic-nodes' && <ClinicNodes />}
          {currentView === 'users' && <ManageUsers />}
          {currentView === 'audit' && <AuditLogs />}
          {currentView === 'settings' && <SettingsView />}

          <FooterBadges />
        </main>
      </div>

      {/* Mini AI Assistant Widget */}
      <MiniAiAssistant />

      {/* Edge Case & Documentation Modals */}
      <ApiDocModal isOpen={apiModalOpen} onClose={() => setApiModalOpen(false)} />
      <SessionExpiredModal />
      <InvalidDataModal
        isOpen={!!invalidModalMessage}
        message={invalidModalMessage}
        onClose={() => setInvalidModalMessage('')}
      />
    </div>
  );
};

import { ErrorBoundary } from './components/ErrorBoundary';

export function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <DataProvider>
          <MainLayout />
        </DataProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
