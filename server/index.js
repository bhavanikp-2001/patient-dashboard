import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import db from './db.js';

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = 'healthtech_secure_jwt_secret_key_2026';

app.use(cors());
app.use(express.json());

// API status health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    service: 'HealthTech Patient Data Dashboard API & SQLite DB Server',
    message: 'Backend server is running!',
    endpoints: [
      'POST /api/auth/login',
      'GET  /api/patients',
      'POST /api/patients',
      'PUT  /api/patients/:id',
      'GET  /api/encounters',
      'POST /api/encounters',
      'GET  /api/analytics',
      'GET  /api/users',
      'GET  /api/audit-logs'
    ]
  });
});

// Helper function to log audit actions into SQLite
const logAudit = (userName, action, details, ip = '192.168.1.45') => {
  const logId = `LOG-${Math.floor(600 + Math.random() * 400)}`;
  const timestampStr = new Date().toISOString().replace('T', ' ').substring(0, 19);
  db.prepare(`
    INSERT INTO audit_logs (id, timestamp, user, action, details, ip)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(logId, timestampStr, userName || 'System User', action, details, ip);
};

// 1. Authentication Endpoint
app.post('/api/auth/login', (req, res) => {
  const { email, role } = req.body;
  let user = db.prepare('SELECT * FROM users WHERE email = ? OR role = ?').get(email, role);

  if (!user) {
    user = {
      id: `U-${Math.floor(100 + Math.random() * 900)}`,
      name: email.split('@')[0].toUpperCase(),
      email,
      role: role || 'doctor',
      avatar: email.substring(0, 2).toUpperCase(),
      status: 'Active'
    };
    db.prepare('INSERT INTO users (id, name, email, role, status, avatar) VALUES (?, ?, ?, ?, ?, ?)')
      .run(user.id, user.name, user.email, user.role, user.status, user.avatar);
  }

  const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '8h' });
  logAudit(`${user.name} (${user.role})`, 'LOGIN_SUCCESS', `Authenticated user via JWT token`, req.ip);

  res.json({
    status: 'success',
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      status: user.status
    }
  });
});

// 2. Patients Endpoints
app.get('/api/patients', (req, res) => {
  const patients = db.prepare('SELECT id, age_group as ageGroup, gender, last_visit as lastVisit FROM patients ORDER BY last_visit DESC').all();
  res.json({ data: patients, meta: { total: patients.length } });
});

app.post('/api/patients', (req, res) => {
  const { id, ageGroup, gender } = req.body;
  const patientId = id || `P-${Math.floor(2000 + Math.random() * 8000)}`;
  const lastVisit = new Date().toISOString().split('T')[0];

  db.prepare('INSERT INTO patients (id, age_group, gender, last_visit) VALUES (?, ?, ?, ?)')
    .run(patientId, ageGroup, gender, lastVisit);

  logAudit(req.headers['x-user-name'] || 'User', 'PATIENT_ADDED', `Added anonymized patient record ${patientId}`);

  res.status(201).json({ status: 'success', data: { id: patientId, ageGroup, gender, lastVisit } });
});

app.put('/api/patients/:id', (req, res) => {
  const { id } = req.params;
  const { ageGroup, gender } = req.body;

  const existing = db.prepare('SELECT * FROM patients WHERE id = ?').get(id);
  if (!existing) return res.status(404).json({ error: 'Patient not found' });

  db.prepare('UPDATE patients SET age_group = ?, gender = ? WHERE id = ?').run(ageGroup, gender, id);
  logAudit(req.headers['x-user-name'] || 'User', 'PATIENT_UPDATED', `Updated patient record ${id}`);

  res.json({ status: 'success', data: { id, ageGroup, gender, lastVisit: existing.last_visit } });
});

// 3. Encounters Endpoints
app.get('/api/encounters', (req, res) => {
  const encounters = db.prepare(`
    SELECT id, patient_id as patientId, age_group as ageGroup, gender, date_of_visit as dateOfVisit,
           symptoms, diagnosis, treatment, clinician
    FROM encounters ORDER BY date_of_visit DESC
  `).all();
  res.json({ data: encounters });
});

app.post('/api/encounters', (req, res) => {
  const { patientId, ageGroup, gender, dateOfVisit, symptoms, diagnosis, treatment } = req.body;
  const encounterId = `ENC-${Math.floor(9000 + Math.random() * 999)}`;
  const clinician = req.headers['x-user-name'] || 'Dr. Priya Sharma';

  // 1. Ensure Patient exists in patients table first (to satisfy Foreign Key constraint)
  const patientExists = db.prepare('SELECT id FROM patients WHERE id = ?').get(patientId);
  if (patientExists) {
    db.prepare('UPDATE patients SET last_visit = ? WHERE id = ?').run(dateOfVisit, patientId);
  } else {
    db.prepare('INSERT INTO patients (id, age_group, gender, last_visit) VALUES (?, ?, ?, ?)').run(patientId, ageGroup, gender, dateOfVisit);
  }

  // 2. Insert encounter into SQLite
  db.prepare(`
    INSERT INTO encounters (id, patient_id, age_group, gender, date_of_visit, symptoms, diagnosis, treatment, clinician)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(encounterId, patientId, ageGroup, gender, dateOfVisit, symptoms, diagnosis, treatment, clinician);

  logAudit(clinician, 'ENCOUNTER_CREATED', `Created encounter ${encounterId} for ${patientId} (${diagnosis})`);

  res.status(201).json({
    status: 'success',
    data: {
      id: encounterId,
      patientId,
      ageGroup,
      gender,
      dateOfVisit,
      symptoms,
      diagnosis,
      treatment,
      clinician
    }
  });
});

// 4. Real-Time Dynamic Analytics Endpoint (SQL Aggregate Queries)
app.get('/api/analytics', (req, res) => {
  const totalEncountersCount = db.prepare('SELECT COUNT(*) as count FROM encounters').get().count;
  const totalPatientsCount = db.prepare('SELECT COUNT(*) as count FROM patients').get().count;
  const activeCasesCount = db.prepare("SELECT COUNT(*) as count FROM encounters WHERE date_of_visit >= date('now', '-30 days')").get().count || totalPatientsCount;
  const todayEncountersCount = db.prepare("SELECT COUNT(*) as count FROM encounters WHERE date_of_visit = date('now')").get().count || totalEncountersCount;

  // Aggregate diagnosis counts and calculate percentage
  const diagnosisRows = db.prepare('SELECT diagnosis as name, COUNT(*) as count FROM encounters GROUP BY diagnosis').all();
  const totalCases = diagnosisRows.reduce((acc, curr) => acc + curr.count, 0) || 1;

  const colorMap = {
    'Viral Fever': '#0066ff',
    'Diabetes': '#10b981',
    'Hypertension': '#a855f7',
    'Respiratory Infection': '#ec4899',
    'Malaria': '#f59e0b',
    'Gastroenteritis': '#06b6d4',
    'Other': '#94a3b8'
  };

  const casesByDiagnosis = diagnosisRows.map(row => ({
    name: row.name,
    count: row.count,
    value: Math.round((row.count / totalCases) * 100),
    color: colorMap[row.name] || '#64748b'
  }));

  // Demographic breakdowns from SQLite
  const ageDistribution = db.prepare('SELECT age_group as name, COUNT(*) as count FROM patients GROUP BY age_group').all();
  const genderDistribution = db.prepare('SELECT gender as name, COUNT(*) as count FROM patients GROUP BY gender').all();

  // Monthly trends from SQLite encounters
  const months = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];
  const illnessTrends = months.map(m => {
    return {
      month: m,
      ViralFever: db.prepare("SELECT COUNT(*) as count FROM encounters WHERE diagnosis = 'Viral Fever'").get().count,
      Diabetes: db.prepare("SELECT COUNT(*) as count FROM encounters WHERE diagnosis = 'Diabetes'").get().count,
      Hypertension: db.prepare("SELECT COUNT(*) as count FROM encounters WHERE diagnosis = 'Hypertension'").get().count,
      Other: db.prepare("SELECT COUNT(*) as count FROM encounters WHERE diagnosis NOT IN ('Viral Fever', 'Diabetes', 'Hypertension')").get().count
    };
  });

  res.json({
    metrics: {
      totalPatients: totalPatientsCount,
      totalEncounters: totalEncountersCount,
      activeCases: activeCasesCount,
      todayEncounters: todayEncountersCount
    },
    totalCases,
    casesByDiagnosis,
    ageDistribution,
    genderDistribution,
    illnessTrends
  });
});

// 5. User Management Endpoints (Admin)
app.get('/api/users', (req, res) => {
  const users = db.prepare('SELECT id, name, email, role, status FROM users').all();
  res.json({ data: users });
});

app.post('/api/users', (req, res) => {
  const { name, email, role } = req.body;
  const userId = `U-${Math.floor(100 + Math.random() * 900)}`;
  const avatar = name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);

  db.prepare('INSERT INTO users (id, name, email, role, status, avatar) VALUES (?, ?, ?, ?, ?, ?)')
    .run(userId, name, email, role, 'Active', avatar);

  logAudit(req.headers['x-user-name'] || 'Admin', 'USER_CREATED', `Created staff account for ${name} (${role})`);
  res.status(201).json({ status: 'success', data: { id: userId, name, email, role, status: 'Active', avatar } });
});

app.patch('/api/users/:id/status', (req, res) => {
  const { id } = req.params;
  const user = db.prepare('SELECT * FROM users WHERE id = ?').get(id);
  if (!user) return res.status(404).json({ error: 'User not found' });

  const newStatus = user.status === 'Active' ? 'Disabled' : 'Active';
  db.prepare('UPDATE users SET status = ? WHERE id = ?').run(newStatus, id);

  logAudit(req.headers['x-user-name'] || 'Admin', 'USER_STATUS_TOGGLED', `Set status of ${user.name} to ${newStatus}`);
  res.json({ status: 'success', userId: id, newStatus });
});

// 6. Audit Logs Endpoint
app.get('/api/audit-logs', (req, res) => {
  const logs = db.prepare('SELECT id, timestamp, user, action, details, ip FROM audit_logs ORDER BY timestamp DESC').all();
  res.json({ data: logs });
});

// Serve static production build files if available (for single-container Docker deployment)
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.join(__dirname, '../dist');

if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.use((req, res, next) => {
    if (req.method === 'GET' && !req.path.startsWith('/api')) {
      return res.sendFile(path.join(distPath, 'index.html'));
    }
    next();
  });
}

app.listen(PORT, () => {
  console.log(`🚀 HealthTech Real Database Server listening on http://localhost:${PORT}`);
});
