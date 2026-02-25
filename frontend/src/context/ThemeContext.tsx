import React, { createContext, useState, useContext, useEffect } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

const lightTheme = {
  background: '#F5F5F5',
  card: '#FFFFFF',
  text: '#000000',
  secondaryText: '#757575',
  accent: '#FF8C00',
  sidebar: '#FFFFFF',
  border: '#E0E0E0',
  inputBg: '#FFFFFF', // Changed from #333333 to #FFFFFF for Light Theme
};

const darkTheme = {
  background: '#1a1a1a', // Custom dark
  card: '#2d2d2d', // Custom card
  text: '#ffffff',
  secondaryText: '#e0e0e0',
  accent: '#FF8C00',
  sidebar: '#252525',
  border: '#444444',
  inputBg: '#333333',
};

type ThemeContextType = {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType>({ theme: 'dark', toggleTheme: () => {} });

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <StyledThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};
