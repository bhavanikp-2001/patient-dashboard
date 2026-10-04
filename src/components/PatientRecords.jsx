import React, { useState } from 'react';
import { Search, Plus, Eye, Edit2, X, FileText } from 'lucide-react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';

export const PatientRecords = ({ onNavigateToEncounter }) => {
  const { patients, encounters, addPatient, updatePatient } = useData();
  const { currentUser } = useAuth();

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [editingPatient, setEditingPatient] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newPatientData, setNewPatientData] = useState({
    id: `P-${Math.floor(2000 + Math.random() * 8000)}`,
    ageGroup: '25-45',
    gender: 'Female'
  });

  const isNurse = currentUser?.role === 'nurse';

  const filteredPatients = patients.filter((p) => {
    const term = searchTerm.toLowerCase();
    return (
      p.id.toLowerCase().includes(term) ||
      p.ageGroup.toLowerCase().includes(term) ||
      p.gender.toLowerCase().includes(term)
    );
  });

  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredPatients.length / itemsPerPage) || 1;
  const displayedPatients = filteredPatients.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleCreatePatient = (e) => {
    e.preventDefault();
    addPatient(newPatientData, currentUser ? currentUser.name : 'User');
    setShowAddModal(false);
    setNewPatientData({
      id: `P-${Math.floor(2000 + Math.random() * 8000)}`,
      ageGroup: '25-45',
      gender: 'Female'
    });
  };

  return (
    <div>
      <div className="page-header">
        <div className="page-title">
          <h1>Patient Records</h1>
          <p>Search, filter, and view anonymized patient health files</p>
        </div>

        <button
          className="btn btn-primary"
          onClick={() => setShowAddModal(true)}
        >
          <Plus size={18} />
          <span>Add Patient</span>
        </button>
      </div>

      {/* Search & Actions Bar */}
      <div className="card" style={{ marginBottom: '1.25rem', padding: '1rem' }}>
        <div style={{ position: 'relative', width: '100%', maxWidth: '400px' }}>
          <input
            type="text"
            className="form-control"
            placeholder="Search by Patient ID, Age or Gender..."
            style={{ paddingLeft: '2.5rem', width: '100%' }}
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
          <Search
            size={18}
            style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }}
          />
        </div>
      </div>

      {/* Patient Table */}
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Patient ID</th>
              <th>Age Group</th>
              <th>Gender</th>
              <th>Last Visit</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayedPatients.length > 0 ? (
              displayedPatients.map((patient) => (
                <tr key={patient.id}>
                  <td style={{ fontWeight: '700', color: '#0066ff' }}>{patient.id}</td>
                  <td>{patient.ageGroup}</td>
                  <td>{patient.gender}</td>
                  <td>{patient.lastVisit}</td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => setSelectedPatient(patient)}
                        style={{ color: '#0066ff', borderColor: '#bfdbfe' }}
                      >
                        <Eye size={14} />
                        <span>View</span>
                      </button>

                      {/* Editing enabled for Doctors/Admins, disabled alert for Nurse */}
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => {
                          if (isNurse) {
                            alert('Access Restricted: Nurses can enter new encounters but cannot modify existing doctor diagnostic records.');
                          } else {
                            setEditingPatient({ ...patient });
                          }
                        }}
                        style={{ color: isNurse ? '#94a3b8' : '#3b82f6' }}
                      >
                        <Edit2 size={14} />
                        <span>Edit</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>
                  No matching patient records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: '1.25rem',
          fontSize: '0.85rem',
          color: '#64748b'
        }}
      >
        <span>
          Showing {displayedPatients.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}–
          {Math.min(currentPage * itemsPerPage, filteredPatients.length)} of {filteredPatients.length} total
        </span>

        <div style={{ display: 'flex', gap: '0.35rem' }}>
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => i + 1).map((pageNum) => (
            <button
              key={pageNum}
              className={`btn btn-sm ${currentPage === pageNum ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setCurrentPage(pageNum)}
              style={{ width: '36px', height: '36px', padding: 0 }}
            >
              {pageNum}
            </button>
          ))}
        </div>
      </div>

      {/* Patient Encounter Details Modal */}
      {selectedPatient && (
        <div className="modal-overlay" onClick={() => setSelectedPatient(null)}>
          <div className="modal-card" style={{ maxWidth: '650px' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-icon info">
                <FileText size={22} />
              </div>
              <div style={{ flex: 1 }}>
                <h3 className="modal-title">Patient Record - {selectedPatient.id}</h3>
                <span className="chart-subtitle">
                  Age: {selectedPatient.ageGroup} | Gender: {selectedPatient.gender}
                </span>
              </div>
              <button
                onClick={() => setSelectedPatient(null)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}
              >
                <X size={20} />
              </button>
            </div>

            <div className="modal-body" style={{ maxHeight: '400px', overflowY: 'auto' }}>
              <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: '#0f1c30', marginBottom: '0.75rem' }}>
                Encounter History
              </h4>

              {encounters.filter((e) => e.patientId === selectedPatient.id).length > 0 ? (
                encounters
                  .filter((e) => e.patientId === selectedPatient.id)
                  .map((enc) => (
                    <div
                      key={enc.id}
                      style={{
                        padding: '1rem',
                        backgroundColor: '#f8fafc',
                        borderRadius: '8px',
                        border: '1px solid #e2e8f0',
                        marginBottom: '0.75rem'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                        <span style={{ fontWeight: '700', color: '#0066ff', fontSize: '0.85rem' }}>{enc.id}</span>
                        <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Date: {enc.dateOfVisit}</span>
                      </div>
                      <div style={{ fontSize: '0.85rem', marginBottom: '0.25rem' }}>
                        <strong>Diagnosis:</strong> {enc.diagnosis}
                      </div>
                      <div style={{ fontSize: '0.85rem', marginBottom: '0.25rem' }}>
                        <strong>Symptoms:</strong> {enc.symptoms}
                      </div>
                      <div style={{ fontSize: '0.85rem', marginBottom: '0.25rem' }}>
                        <strong>Treatment:</strong> {enc.treatment}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.4rem' }}>
                        Attending Clinician: {enc.clinician}
                      </div>
                    </div>
                  ))
              ) : (
                <div style={{ padding: '1.5rem', textAlign: 'center', color: '#64748b', backgroundColor: '#f8fafc', borderRadius: '8px' }}>
                  No past encounters on file for this patient ID.
                </div>
              )}
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setSelectedPatient(null)}>
                Close
              </button>
              <button
                className="btn btn-primary"
                onClick={() => {
                  const pid = selectedPatient.id;
                  setSelectedPatient(null);
                  if (onNavigateToEncounter) onNavigateToEncounter(pid);
                }}
              >
                + New Encounter
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Patient Modal */}
      {editingPatient && (
        <div className="modal-overlay" onClick={() => setEditingPatient(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Edit Patient Record - {editingPatient.id}</h3>
              <button onClick={() => setEditingPatient(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}>
                <X size={20} />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                updatePatient(editingPatient.id, {
                  ageGroup: editingPatient.ageGroup,
                  gender: editingPatient.gender
                }, currentUser ? currentUser.name : 'Doctor');
                setEditingPatient(null);
              }}
            >
              <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div className="form-group">
                  <label htmlFor="editPatientId">Patient ID (Read-only)</label>
                  <input
                    id="editPatientId"
                    type="text"
                    className="form-control"
                    value={editingPatient.id}
                    disabled
                    style={{ backgroundColor: '#f1f5f9', cursor: 'not-allowed' }}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="editAgeGroup">Age Group</label>
                  <select
                    id="editAgeGroup"
                    className="form-control"
                    value={editingPatient.ageGroup}
                    onChange={(e) => setEditingPatient({ ...editingPatient, ageGroup: e.target.value })}
                  >
                    <option value="0-18">0 - 18</option>
                    <option value="19-30">19 - 30</option>
                    <option value="25-45">25 - 45</option>
                    <option value="45-60">45 - 60</option>
                    <option value="60+">60+</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="editGender">Gender</label>
                  <select
                    id="editGender"
                    className="form-control"
                    value={editingPatient.gender}
                    onChange={(e) => setEditingPatient({ ...editingPatient, gender: e.target.value })}
                  >
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setEditingPatient(null)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Patient Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Add Anonymized Patient</h3>
              <button onClick={() => setShowAddModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreatePatient}>
              <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div className="form-group">
                  <label htmlFor="modalPatientId">Patient ID</label>
                  <input
                    id="modalPatientId"
                    type="text"
                    className="form-control"
                    value={newPatientData.id}
                    onChange={(e) => setNewPatientData({ ...newPatientData, id: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="modalAgeGroup">Age Group</label>
                  <select
                    id="modalAgeGroup"
                    className="form-control"
                    value={newPatientData.ageGroup}
                    onChange={(e) => setNewPatientData({ ...newPatientData, ageGroup: e.target.value })}
                  >
                    <option value="0-18">0 - 18</option>
                    <option value="19-30">19 - 30</option>
                    <option value="25-45">25 - 45</option>
                    <option value="45-60">45 - 60</option>
                    <option value="60+">60+</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="modalGender">Gender</label>
                  <select
                    id="modalGender"
                    className="form-control"
                    value={newPatientData.gender}
                    onChange={(e) => setNewPatientData({ ...newPatientData, gender: e.target.value })}
                  >
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowAddModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Patient Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
