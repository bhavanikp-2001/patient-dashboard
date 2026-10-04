import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, 'healthtech.db');
const db = new Database(dbPath);

// Enable Foreign Keys & Write-Ahead Logging for performance
db.pragma('journal_mode = WAL');

// Initialize database schema tables
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    role TEXT NOT NULL,
    status TEXT DEFAULT 'Active',
    avatar TEXT
  );

  CREATE TABLE IF NOT EXISTS patients (
    id TEXT PRIMARY KEY,
    age_group TEXT NOT NULL,
    gender TEXT NOT NULL,
    last_visit TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS encounters (
    id TEXT PRIMARY KEY,
    patient_id TEXT NOT NULL,
    age_group TEXT NOT NULL,
    gender TEXT NOT NULL,
    date_of_visit TEXT NOT NULL,
    symptoms TEXT NOT NULL,
    diagnosis TEXT NOT NULL,
    treatment TEXT NOT NULL,
    clinician TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES patients(id)
  );

  CREATE TABLE IF NOT EXISTS audit_logs (
    id TEXT PRIMARY KEY,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    user TEXT NOT NULL,
    action TEXT NOT NULL,
    details TEXT NOT NULL,
    ip TEXT DEFAULT '192.168.1.45'
  );
`);

// Seed initial records if database tables are empty
const userCount = db.prepare('SELECT COUNT(*) as count FROM users').get().count;
if (userCount === 0) {
  const insertUser = db.prepare('INSERT INTO users (id, name, email, role, status, avatar) VALUES (?, ?, ?, ?, ?, ?)');
  insertUser.run('U-101', 'Dr. Priya Sharma', 'doctor@healthtech.com', 'doctor', 'Active', 'PS');
  insertUser.run('U-102', 'Ravi Kumar', 'nurse@healthtech.com', 'nurse', 'Active', 'RK');
  insertUser.run('U-103', 'Sneha Patel', 'admin@healthtech.com', 'admin', 'Active', 'SP');

  const insertPatient = db.prepare('INSERT INTO patients (id, age_group, gender, last_visit) VALUES (?, ?, ?, ?)');
  insertPatient.run('P-2587', '25-45', 'Female', '2025-09-06');
  insertPatient.run('P-2142', '45-60', 'Male', '2025-09-05');
  insertPatient.run('P-2210', '0-18', 'Female', '2025-09-04');
  insertPatient.run('P-1987', '60+', 'Male', '2025-09-03');
  insertPatient.run('P-1785', '25-45', 'Female', '2025-09-02');
  insertPatient.run('P-3012', '19-30', 'Male', '2025-09-01');
  insertPatient.run('P-3140', '31-45', 'Female', '2025-08-31');

  const insertEncounter = db.prepare(`
    INSERT INTO encounters (id, patient_id, age_group, gender, date_of_visit, symptoms, diagnosis, treatment, clinician)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  insertEncounter.run('ENC-9001', 'P-2587', '25-45', 'Female', '2025-09-06', 'Fever, cough, headache', 'Viral Fever', 'Paracetamol, rest, fluids', 'Dr. Priya Sharma');
  insertEncounter.run('ENC-9002', 'P-2142', '45-60', 'Male', '2025-09-05', 'High blood pressure, dizziness', 'Hypertension', 'Amlodipine 5mg, low salt diet', 'Dr. Priya Sharma');
  insertEncounter.run('ENC-9003', 'P-2210', '0-18', 'Female', '2025-09-04', 'High thirst, fatigue', 'Diabetes', 'Insulin evaluation, dietary changes', 'Ravi Kumar');

  const insertAudit = db.prepare('INSERT INTO audit_logs (id, timestamp, user, action, details, ip) VALUES (?, ?, ?, ?, ?, ?)');
  insertAudit.run('LOG-501', '2025-09-06 09:15:22', 'Dr. Priya Sharma (Doctor)', 'ENCOUNTER_CREATED', 'Created encounter for P-2587 (Viral Fever)', '192.168.1.45');
  insertAudit.run('LOG-502', '2025-09-05 14:20:10', 'Dr. Priya Sharma (Doctor)', 'PATIENT_UPDATED', 'Updated patient file P-2142', '192.168.1.45');
  insertAudit.run('LOG-503', '2025-09-05 11:05:00', 'Ravi Kumar (Nurse)', 'LOGIN_SUCCESS', 'Logged into mobile node', '192.168.1.88');
  insertAudit.run('LOG-504', '2025-09-04 16:45:12', 'Sneha Patel (Admin)', 'USER_ROLE_CHANGED', 'Assigned Nurse privileges to Ravi Kumar', '192.168.1.12');
}

export default db;
