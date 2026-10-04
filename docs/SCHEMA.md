# HealthTech Database Schemas & Data Models

## 1. User Entity Schema (`users`)

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "User",
  "type": "object",
  "properties": {
    "id": { "type": "string", "example": "U-101" },
    "name": { "type": "string", "example": "Dr. Priya Sharma" },
    "email": { "type": "string", "format": "email", "example": "doctor@healthtech.com" },
    "role": { "type": "string", "enum": ["Doctor", "Nurse", "Admin"] },
    "status": { "type": "string", "enum": ["Active", "Disabled"] },
    "passwordHash": { "type": "string" },
    "createdAt": { "type": "string", "format": "date-time" }
  },
  "required": ["id", "name", "email", "role", "status"]
}
```

---

## 2. Patient Entity Schema (`patients`)

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Patient",
  "type": "object",
  "properties": {
    "id": { "type": "string", "example": "P-2587" },
    "ageGroup": { "type": "string", "enum": ["0-18", "19-30", "25-45", "46-60", "60+"] },
    "gender": { "type": "string", "enum": ["Female", "Male", "Other"] },
    "lastVisit": { "type": "string", "format": "date", "example": "2025-09-06" }
  },
  "required": ["id", "ageGroup", "gender", "lastVisit"]
}
```

---

## 3. Encounter Entity Schema (`encounters`)

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Encounter",
  "type": "object",
  "properties": {
    "id": { "type": "string", "example": "ENC-9001" },
    "patientId": { "type": "string", "example": "P-2587" },
    "ageGroup": { "type": "string" },
    "gender": { "type": "string" },
    "dateOfVisit": { "type": "string", "format": "date" },
    "symptoms": { "type": "string", "example": "Fever, cough, headache" },
    "diagnosis": { "type": "string", "example": "Viral Fever" },
    "treatment": { "type": "string", "example": "Paracetamol, rest, fluids" },
    "clinician": { "type": "string", "example": "Dr. Priya Sharma" }
  },
  "required": ["id", "patientId", "dateOfVisit", "symptoms", "diagnosis", "treatment", "clinician"]
}
```

---

## 4. Audit Log Entity Schema (`audit_logs`)

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "AuditLog",
  "type": "object",
  "properties": {
    "id": { "type": "string", "example": "LOG-501" },
    "timestamp": { "type": "string", "format": "date-time" },
    "user": { "type": "string", "example": "Dr. Priya Sharma (Doctor)" },
    "action": { "type": "string", "example": "ENCOUNTER_CREATED" },
    "details": { "type": "string" },
    "ip": { "type": "string" }
  },
  "required": ["id", "timestamp", "user", "action", "details"]
}
```
