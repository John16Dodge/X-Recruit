
import React, { createContext, useContext, useState, useEffect } from 'react';
import { IUser, UserRole } from '../models/User';

interface AuthContextType {
  user: Partial<IUser> | null;
  token: string | null;
  login: (userData: Partial<IUser>, token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
  userRole: UserRole | null;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  login: () => {},
  logout: () => {},
  isAuthenticated: false,
  userRole: null,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<Partial<IUser> | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load user data from localStorage on initial load
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
    
    setLoading(false);
  }, []);

  const login = (userData: Partial<IUser>, newToken: string) => {
    setUser(userData);
    setToken(newToken);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', newToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const value = {
    user,
    token,
    login,
    logout,
    isAuthenticated: !!user && !!token,
    userRole: user?.role || null,
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
