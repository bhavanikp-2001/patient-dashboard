import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const DEMO_USERS = [
  {
    id: 'U-101',
    name: 'Dr. Priya Sharma',
    email: 'doctor@healthtech.com',
    role: 'doctor',
    avatar: 'PS',
    status: 'Active'
  },
  {
    id: 'U-102',
    name: 'Ravi Kumar',
    email: 'nurse@healthtech.com',
    role: 'nurse',
    avatar: 'RK',
    status: 'Active'
  },
  {
    id: 'U-103',
    name: 'Sneha Patel',
    email: 'admin@healthtech.com',
    role: 'admin',
    avatar: 'SP',
    status: 'Active'
  }
];

export const AuthProvider = ({ children }) => {
  // Initialize session from storage or require explicit login
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('healthtech_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [sessionExpired, setSessionExpired] = useState(false);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('healthtech_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('healthtech_user');
    }
  }, [currentUser]);

  const login = (email, password, role) => {
    // Find matching user or build custom role user
    const matched = DEMO_USERS.find(u => u.role === role || u.email === email);
    const userObj = matched || {
      id: `U-${Math.floor(100 + Math.random() * 900)}`,
      name: email.split('@')[0].toUpperCase(),
      email,
      role: role || 'doctor',
      avatar: email.substring(0, 2).toUpperCase(),
      status: 'Active'
    };
    
    // Simulate JWT token storage
    const fakeJwt = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${btoa(JSON.stringify(userObj))}.mockSignature`;
    localStorage.setItem('healthtech_jwt', fakeJwt);

    setCurrentUser(userObj);
    setSessionExpired(false);
    return userObj;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('healthtech_user');
    localStorage.removeItem('healthtech_jwt');
  };

  const triggerSessionExpired = () => {
    setSessionExpired(true);
  };

  const resetSessionExpired = () => {
    setSessionExpired(false);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        login,
        logout,
        sessionExpired,
        triggerSessionExpired,
        resetSessionExpired,
        DEMO_USERS
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
