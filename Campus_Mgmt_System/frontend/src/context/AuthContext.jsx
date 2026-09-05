import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('campus_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post('/auth/login', { email, password });
      const data = response.data;
      
      localStorage.setItem('campus_jwt_token', data.token);
      const userData = {
        id: data.id,
        email: data.email,
        fullName: data.fullName,
        role: data.role,
        profileDetails: data.profileDetails,
      };
      localStorage.setItem('campus_user', JSON.stringify(userData));
      setUser(userData);
      return userData;
    } catch (err) {
      console.warn('Backend login request failed, checking demo fallback accounts...', err);
      
      // Fallback demo accounts if backend is currently offline / not connected yet
      const demoUsers = {
        'student@campus.edu': {
          id: 'demo-student-id',
          email: 'student@campus.edu',
          fullName: 'Shlok Mishra',
          role: 'ROLE_STUDENT',
          profileDetails: { id: 'demo-student-id', rollNumber: '2026CSE001', department: 'Computer Science' }
        },
        'teacher@campus.edu': {
          id: 'demo-teacher-id',
          email: 'teacher@campus.edu',
          fullName: 'Prof. Alok Sharma',
          role: 'ROLE_TEACHER',
          profileDetails: { id: 'demo-teacher-id', employeeId: 'EMP-1001', department: 'Computer Science' }
        },
        'admin@campus.edu': {
          id: 'demo-admin-id',
          email: 'admin@campus.edu',
          fullName: 'System Administrator',
          role: 'ROLE_ADMIN',
          profileDetails: { id: 'demo-admin-id', phone: '+91 9876543210' }
        }
      };

      const demoPasswords = {
        'student@campus.edu': 'student123',
        'teacher@campus.edu': 'teacher123',
        'admin@campus.edu': 'admin123'
      };

      const cleanEmail = email?.trim().toLowerCase();
      if (demoUsers[cleanEmail] && password === demoPasswords[cleanEmail]) {
        const userData = demoUsers[cleanEmail];
        localStorage.setItem('campus_jwt_token', 'demo-token-' + userData.role);
        localStorage.setItem('campus_user', JSON.stringify(userData));
        setUser(userData);
        return userData;
      }

      const msg = err.response?.data?.message || 'Invalid email or password credentials.';
      setError(msg);
      throw new Error(msg);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('campus_jwt_token');
    localStorage.removeItem('campus_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
