import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChange } from '../services/authService';

// Provides authentication state (user, loading) to the app via React Context.
const AuthContext = createContext();

// Custom hook to access authentication state anywhere in the app
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// AuthProvider wraps the app and provides user and loading state
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Current user object
  const [loading, setLoading] = useState(true); // Loading state for auth

  useEffect(() => {
    // Subscribe to Firebase Auth state changes
    const unsubscribe = onAuthStateChange((user) => {
      setUser(user); // Set user when logged in/out
      setLoading(false); // Set loading to false after initial check
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Value provided to context consumers
  const value = {
    user,
    loading
  };

  // Only render children when not loading (prevents flicker)
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};