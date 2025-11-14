import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fungsi yang lebih sederhana - langsung gunakan data dari login
  const login = (userData, userToken) => {
    console.log('🔐 Login process:', { userData, userToken });
    
    setUser(userData);
    setToken(userToken);
    localStorage.setItem('kawanUmkmUser', JSON.stringify(userData));
    localStorage.setItem('kawanUmkmToken', userToken);
  };

  const logout = () => {
    console.log('🚪 Logging out...');
    setUser(null);
    setToken(null);
    localStorage.removeItem('kawanUmkmUser');
    localStorage.removeItem('kawanUmkmToken');
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('kawanUmkmUser', JSON.stringify(updatedUser));
  };

  useEffect(() => {
    const initializeAuth = () => {
      const savedUser = localStorage.getItem('kawanUmkmUser');
      const savedToken = localStorage.getItem('kawanUmkmToken');

      console.log('🔄 Initializing auth:', { savedUser: !!savedUser, savedToken: !!savedToken });

      if (savedUser && savedToken) {
        try {
          const userData = JSON.parse(savedUser);
          setUser(userData);
          setToken(savedToken);
          console.log('✅ Auth initialized with user:', userData);
        } catch (error) {
          console.error('❌ Error parsing saved user:', error);
          localStorage.removeItem('kawanUmkmUser');
          localStorage.removeItem('kawanUmkmToken');
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const value = {
    user,
    token,
    login,
    logout,
    loading,
    updateUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};