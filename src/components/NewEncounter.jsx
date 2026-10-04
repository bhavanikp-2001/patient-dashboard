import React, { useState, useEffect } from 'react';
import { Save, RotateCcw, CheckCircle, ShieldAlert } from 'lucide-react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';

export const NewEncounter = ({ initialPatientId, onShowInvalidModal }) => {
  const { addEncounter } = useData();
  const { currentUser } = useAuth();

  const [formData, setFormData] = useState({
    patientId: initialPatientId || ('P-' + Math.floor(2000 + Math.random() * 8000)),
    ageGroup: '25-45',
    gender: 'Female',
    dateOfVisit: new Date().toISOString().split('T')[0],
    symptoms: 'Fever, cough, headache',
    diagnosis: 'Viral Fever',
    treatment: 'Paracetamol 500mg, rest, fluids'
  });

  useEffect(() => {
    if (initialPatientId) {
      setFormData(prev => ({ ...prev, patientId: initialPatientId }));
    }
  }, [initialPatientId]);

  const [formErrors, setFormErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const errors = {};
    if (!formData.patientId.trim()) errors.patientId = 'Patient ID is required';
    if (!formData.symptoms.trim()) errors.symptoms = 'Symptoms are required';
    if (!formData.diagnosis.trim()) errors.diagnosis = 'Diagnosis is required';
    if (!formData.treatment.trim()) errors.treatment = 'Treatment details are required';
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate();

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      if (onShowInvalidModal) {
        onShowInvalidModal('Please fill out all required fields correctly before saving.');
      }
      return;
    }

    // Save to context & SQLite database
    const created = await addEncounter(formData, currentUser ? currentUser.name : 'Doctor');
    const encounterIdStr = created ? created.id : 'ENC-SUCCESS';
    setSuccessMsg(`Encounter ${encounterIdStr} saved successfully into database! Real-time metrics updated.`);

    // Reset after 4s
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  const handleReset = () => {
    setFormData({
      patientId: 'P-' + Math.floor(2000 + Math.random() * 8000),
      ageGroup: '25-45',
      gender: 'Female',
      dateOfVisit: new Date().toISOString().split('T')[0],
      symptoms: '',
      diagnosis: 'Viral Fever',
      treatment: ''
    });
    setFormErrors({});
    setSuccessMsg('');
  };

  return (
    <div style={{ maxWidth: '900px' }}>
      <div className="page-header">
        <div className="page-title">
          <h1>New Patient Encounter</h1>
          <p>Record anonymized patient encounter data in real-time</p>
        </div>
      </div>

      {successMsg && (
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
          <CheckCircle size={20} />
          <span>{successMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="card" style={{ padding: '2rem' }}>
        {/* Section 1: Anonymized Patient Details */}
        <div style={{ marginBottom: '1.75rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#0f1c30', marginBottom: '0.25rem' }}>
            Patient Details <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: '400' }}>(Anonymized)</span>
          </h3>
          <p style={{ fontSize: '0.825rem', color: '#64748b', marginBottom: '1.25rem' }}>
            To protect patient privacy, no personally identifiable information (PII) is stored.
          </p>

          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="patientId">Patient ID *</label>
              <input
                id="patientId"
                name="patientId"
                type="text"
                className={`form-control ${formErrors.patientId ? 'error' : ''}`}
                value={formData.patientId}
                onChange={handleChange}
                placeholder="e.g. P-2587"
              />
              {formErrors.patientId && <span className="form-error-msg">{formErrors.patientId}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="ageGroup">Age Group *</label>
              <select
                id="ageGroup"
                name="ageGroup"
                className="form-control"
                value={formData.ageGroup}
                onChange={handleChange}
              >
                <option value="0-18">0 - 18</option>
                <option value="19-30">19 - 30</option>
                <option value="25-45">25 - 45</option>
                <option value="45-60">45 - 60</option>
                <option value="60+">60+</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="gender">Gender *</label>
              <select
                id="gender"
                name="gender"
                className="form-control"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0', margin: '1.75rem 0' }} />

        {/* Section 2: Encounter Details */}
        <div style={{ marginBottom: '1.75rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#0f1c30', marginBottom: '1.25rem' }}>
            Encounter Details
          </h3>

          <div className="form-grid" style={{ marginBottom: '1.25rem' }}>
            <div className="form-group">
              <label htmlFor="dateOfVisit">Date of Visit *</label>
              <input
                id="dateOfVisit"
                name="dateOfVisit"
                type="date"
                className="form-control"
                value={formData.dateOfVisit}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="diagnosis">Diagnosis *</label>
              <select
                id="diagnosis"
                name="diagnosis"
                className={`form-control ${formErrors.diagnosis ? 'error' : ''}`}
                value={formData.diagnosis}
                onChange={handleChange}
              >
                <option value="Viral Fever">Viral Fever</option>
                <option value="Hypertension">Hypertension</option>
                <option value="Diabetes">Diabetes</option>
                <option value="Malaria">Malaria</option>
                <option value="Respiratory Infection">Respiratory Infection</option>
                <option value="Gastroenteritis">Gastroenteritis</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: '1.25rem' }}>
            <label htmlFor="symptoms">Symptoms *</label>
            <input
              id="symptoms"
              name="symptoms"
              type="text"
              className={`form-control ${formErrors.symptoms ? 'error' : ''}`}
              placeholder="e.g. Fever, cough, headache, bodyache"
              value={formData.symptoms}
              onChange={handleChange}
            />
            {formErrors.symptoms && <span className="form-error-msg">{formErrors.symptoms}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="treatment">Treatment & Prescribed Medicines *</label>
            <textarea
              id="treatment"
              name="treatment"
              rows={3}
              className={`form-control ${formErrors.treatment ? 'error' : ''}`}
              placeholder="e.g. Paracetamol 500mg, rest, hydration, follow-up in 3 days"
              value={formData.treatment}
              onChange={handleChange}
            />
            {formErrors.treatment && <span className="form-error-msg">{formErrors.treatment}</span>}
          </div>
        </div>

        {/* Buttons Action Bar */}
        <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
          <button type="submit" className="btn btn-primary" style={{ padding: '0.75rem 1.75rem' }}>
            <Save size={18} />
            <span>Save Encounter</span>
          </button>
          <button type="button" className="btn btn-secondary" onClick={handleReset}>
            <RotateCcw size={18} />
            <span>Reset</span>
          </button>
        </div>
      </form>
    </div>
  );
};
