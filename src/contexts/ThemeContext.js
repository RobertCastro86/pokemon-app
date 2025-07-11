import React, { createContext, useState, useContext } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const theme = {
    isDark,
    toggleTheme,
    colors: {
      primary: isDark ? '#4a9eff' : '#007bff',
      secondary: isDark ? '#6c757d' : '#6c757d',
      background: isDark ? '#1a1a1a' : '#ffffff',
      cardBackground: isDark ? '#2d2d2d' : '#f8f9fa',
      text: isDark ? '#ffffff' : '#333333',
      textSecondary: isDark ? '#cccccc' : '#666666',
      border: isDark ? '#444444' : '#e0e0e0',
    }
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};