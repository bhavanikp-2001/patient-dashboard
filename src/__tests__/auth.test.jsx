import { describe, it, expect } from 'vitest';
import { DEMO_USERS } from '../context/AuthContext';

describe('Authentication & Role-Based Access Unit Tests', () => {
  it('should contain Doctor, Nurse, and Admin demo user profiles', () => {
    const roles = DEMO_USERS.map((u) => u.role);
    expect(roles).toContain('doctor');
    expect(roles).toContain('nurse');
    expect(roles).toContain('admin');
  });

  it('should verify Doctor profile permissions metadata', () => {
    const doctor = DEMO_USERS.find((u) => u.role === 'doctor');
    expect(doctor).toBeDefined();
    expect(doctor.name).toBe('Dr. Priya Sharma');
    expect(doctor.status).toBe('Active');
  });
});
