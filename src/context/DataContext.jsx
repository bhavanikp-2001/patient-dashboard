import React, { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const [patients, setPatients] = useState([]);
  const [encounters, setEncounters] = useState([]);
  const [users, setUsers] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);
  const [metrics, setMetrics] = useState({
    totalPatients: 0,
    totalEncounters: 0,
    activeCases: 0,
    todayEncounters: 0
  });
  const [casesByDiagnosis, setCasesByDiagnosis] = useState([]);
  const [totalCases, setTotalCases] = useState(0);
  const [illnessTrends, setIllnessTrends] = useState([]);
  const [ageDistribution, setAgeDistribution] = useState([]);
  const [genderDistribution, setGenderDistribution] = useState([]);

  // Fetch real data from SQLite backend API
  const fetchAllData = async () => {
    try {
      const [resPatients, resEncounters, resUsers, resAudit, resAnalytics] = await Promise.all([
        fetch('/api/patients'),
        fetch('/api/encounters'),
        fetch('/api/users'),
        fetch('/api/audit-logs'),
        fetch('/api/analytics')
      ]);

      if (resPatients.ok) {
        const pData = await resPatients.json();
        setPatients(pData.data || []);
      }
      if (resEncounters.ok) {
        const eData = await resEncounters.json();
        setEncounters(eData.data || []);
      }
      if (resUsers.ok) {
        const uData = await resUsers.json();
        setUsers(uData.data || []);
      }
      if (resAudit.ok) {
        const aData = await resAudit.json();
        setAuditLogs(aData.data || []);
      }
      if (resAnalytics.ok) {
        const anData = await resAnalytics.json();
        if (anData.metrics) setMetrics(anData.metrics);
        if (anData.casesByDiagnosis) setCasesByDiagnosis(anData.casesByDiagnosis);
        if (anData.totalCases) setTotalCases(anData.totalCases);
        if (anData.illnessTrends) setIllnessTrends(anData.illnessTrends);
        if (anData.ageDistribution) setAgeDistribution(anData.ageDistribution);
        if (anData.genderDistribution) setGenderDistribution(anData.genderDistribution);
      }
    } catch (err) {
      console.warn('Backend API connection warning, using local state sync:', err);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  // Add new encounter into SQLite via REST API
  const addEncounter = async (encounterData, userName) => {
    try {
      const res = await fetch('/api/encounters', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-name': userName || 'Doctor'
        },
        body: JSON.stringify(encounterData)
      });

      if (res.ok) {
        const json = await res.json();
        const newEnc = json.data;
        setEncounters(prev => [newEnc, ...prev]);

        // Refresh database state
        fetchAllData();
        return newEnc;
      }
    } catch (err) {
      console.error('Error adding encounter to SQLite DB:', err);
    }

    // Client fallback
    const fallback = { id: `ENC-${Math.floor(9000 + Math.random() * 999)}`, ...encounterData, clinician: userName || 'Doctor' };
    setEncounters(prev => [fallback, ...prev]);
    return fallback;
  };

  // Add new anonymized patient into SQLite via REST API
  const addPatient = async (patientData, userName) => {
    try {
      const res = await fetch('/api/patients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-name': userName || 'User'
        },
        body: JSON.stringify(patientData)
      });

      if (res.ok) {
        const json = await res.json();
        const newP = json.data;
        setPatients(prev => [newP, ...prev]);
        fetchAllData();
        return newP;
      }
    } catch (err) {
      console.error('Error adding patient to SQLite DB:', err);
    }
  };

  // Update existing anonymized patient in SQLite via REST API
  const updatePatient = async (id, updatedData, userName) => {
    try {
      const res = await fetch(`/api/patients/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-user-name': userName || 'User'
        },
        body: JSON.stringify(updatedData)
      });

      if (res.ok) {
        fetchAllData();
      }
    } catch (err) {
      console.error('Error updating patient in SQLite DB:', err);
    }
  };

  // Add new user account into SQLite via REST API
  const addUser = async (userData, currentUser) => {
    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-name': currentUser || 'Admin'
        },
        body: JSON.stringify(userData)
      });

      if (res.ok) {
        const json = await res.json();
        const newU = json.data;
        setUsers(prev => [...prev, newU]);
        fetchAllData();
        return newU;
      }
    } catch (err) {
      console.error('Error creating user in SQLite DB:', err);
    }
  };

  // Toggle user status in SQLite via REST API
  const toggleUserStatus = async (userId, currentUser) => {
    try {
      const res = await fetch(`/api/users/${userId}/status`, {
        method: 'PATCH',
        headers: {
          'x-user-name': currentUser || 'Admin'
        }
      });

      if (res.ok) {
        fetchAllData();
      }
    } catch (err) {
      console.error('Error toggling user status in SQLite DB:', err);
    }
  };

  return (
    <DataContext.Provider
      value={{
        patients,
        encounters,
        users,
        auditLogs,
        metrics,
        casesByDiagnosis,
        totalCases,
        illnessTrends,
        ageDistribution,
        genderDistribution,
        addEncounter,
        addPatient,
        updatePatient,
        addUser,
        toggleUserStatus,
        refetchData: fetchAllData
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
