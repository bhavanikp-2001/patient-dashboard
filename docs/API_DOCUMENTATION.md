# HealthTech RESTful API Specification

## Authentication Endpoints

### `POST /api/auth/login`
Authenticates a user and returns a JWT bearer token.

**Request Body:**
```json
{
  "email": "doctor@healthtech.com",
  "password": "password123",
  "role": "doctor"
}
```

**Response (`200 OK`):**
```json
{
  "status": "success",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "U-101",
    "name": "Dr. Priya Sharma",
    "email": "doctor@healthtech.com",
    "role": "doctor"
  }
}
```

---

## Patient & Encounter Endpoints

### `GET /api/patients`
Retrieves a paginated list of anonymized patient records with optional date range filters.

**Query Parameters:**
- `startDate` (optional): `YYYY-MM-DD`
- `endDate` (optional): `YYYY-MM-DD`
- `page` (default: 1)
- `limit` (default: 5)

**Response (`200 OK`):**
```json
{
  "data": [
    {
      "patientId": "P-2587",
      "ageGroup": "25-45",
      "gender": "Female",
      "lastVisit": "2025-09-06"
    }
  ],
  "meta": { "total": 1248, "page": 1, "limit": 5 }
}
```

### `POST /api/encounters`
Creates a new patient encounter record.

**Request Body:**
```json
{
  "patientId": "P-2587",
  "ageGroup": "25-45",
  "gender": "Female",
  "dateOfVisit": "2025-09-06",
  "symptoms": "Fever, cough, headache",
  "diagnosis": "Viral Fever",
  "treatment": "Paracetamol, rest, fluids"
}
```

**Response (`201 Created`):**
```json
{
  "status": "success",
  "data": {
    "id": "ENC-9004",
    "patientId": "P-2587",
    "diagnosis": "Viral Fever",
    "createdAt": "2025-09-06T12:00:00Z"
  }
}
```

---

## Analytics Endpoints

### `GET /api/analytics/dashboard`
Returns metric totals and trend aggregations.

**Response (`200 OK`):**
```json
{
  "metrics": {
    "totalPatients": 1248,
    "totalEncounters": 2356,
    "activeCases": 342,
    "todayEncounters": 48
  },
  "diagnosisDistribution": [
    { "name": "Viral Fever", "percentage": 34 },
    { "name": "Diabetes", "percentage": 23 },
    { "name": "Hypertension", "percentage": 18 }
  ]
}
```
