# Engineering Self-Assessment & Technical Write-Up

## Executive Summary
The **HealthTech Patient Data Dashboard** was engineered to address critical data entry and epidemiological monitoring challenges faced by rural government health centers and telemedicine NGOs. The system provides real-time encounter tracking, anonymized patient management, granular Role-Based Access Control (RBAC), and interactive disease trend visualizations.

---

## Architecture Choices & Trade-Offs

### 1. Single Page Application (SPA) vs Multi-Page SSR
* **Choice**: Vite + React SPA architecture with client-side state caching.
* **Trade-off**: While Server-Side Rendering (SSR) offers SEO benefits, rural outreach nodes prioritize offline resilience, instant client-side transitions without round-trip HTML reloads, and responsive desktop/mobile layouts.

### 2. Anonymization Strategy
* **Choice**: Complete removal of PII fields from the database entity schema. Patients are referenced solely via synthetic IDs (`P-2587`) paired with demographic buckets (`Age Group`, `Gender`).
* **Trade-off**: Prevents identity exposure in remote clinic environments, satisfying healthcare data protection standards without compromising epidemiological analysis capabilities.

---

## UX & Interface Decisions

1. **Role-Tailored Dashboards**:
   - **Doctors & Admins** are presented with high-level analytical charts and comprehensive patient record controls.
   - **Nurses** receive a simplified interface (`NurseHome`) focused on rapid encounter entry ("Now Encounter") and quick reference lookups, minimizing cognitive load during busy clinical sessions.

2. **Pixel-Perfect Aesthetic Integrity**:
   - Modern HSL color palette featuring deep navy navigation (`#0f1c30`), primary blue (`#0066ff`), emerald success indicators (`#10b981`), and subtle glassmorphic card shadows.

3. **Explicit Edge-Case User Feedback**:
   - **Session Expired Alert Modal**: Triggers when token validity lapses, instructing the user to log in again with clear red warning indicators.
   - **Invalid Data Modal**: Displays interactive validation feedback when mandatory encounter fields are missing.

---

## Edge Cases Handled

1. **Session Expiry During Active Form Entry**:
   - Handled via `AuthContext` state simulation button and timer hooks. Upon expiry, user inputs are cached locally while forcing a safe re-login modal overlay.
2. **Role Permission Violations**:
   - Nurses attempting to edit diagnostic histories receive role restriction alerts, enforcing RBAC boundary rules.
3. **Invalid or Incomplete Data Submission**:
   - Form inputs validate field presence before state commit, preventing broken analytics totals.

---

## Future Improvements Roadmap

1. **Offline Sync Service Worker**: Integrate IndexedDB and Background Sync API to support multi-day offline clinical visits in zero-connectivity regions.
2. **FHIR / HL7 Interoperability**: Implement export formatting conforming to Fast Healthcare Interoperability Resources (FHIR) standards.
