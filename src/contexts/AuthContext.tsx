import React, { createContext, useContext, useState } from 'react';
import type { User, AuthContextType } from '../types/auth';

const AuthContext = createContext<AuthContextType | null>(null);

// Simulated user database - in a real app, this would be on the server
const USERS = [
  { username: 'admin', password: 'admin123' }
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (username: string, password: string) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const matchedUser = USERS.find(u => 
      u.username === username && u.password === password
    );

    if (!matchedUser) {
      throw new Error('Credenziali non valide');
    }

    setUser({ username: matchedUser.username });
  };

  const logout = () => {
    setUser(null);
  };

  const changePassword = async (currentPassword: string, newPassword: string) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // In a real app, this would make an API call to change the password
    const userIndex = USERS.findIndex(u => 
      u.username === user?.username && u.password === currentPassword
    );

    if (userIndex === -1) {
      throw new Error('Password attuale non corretta');
    }

    // Update password in our mock database
    USERS[userIndex].password = newPassword;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, changePassword }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}