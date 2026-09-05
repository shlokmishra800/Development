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
      const msg = err.response?.data?.message || 'Invalid credentials or login failure';
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
