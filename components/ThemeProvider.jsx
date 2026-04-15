'use client';

import { createContext, useContext, useEffect, useState } from 'react';

export const THEMES = [
  {
    id: 'light',    
    label: 'Light',           
    icon: '☀️' 
  },
  {
    id: 'dark',     
    label: 'Dark',            
    icon: '🌙' 
  },
  {
    id: 'blue',     
    label: 'Ocean Blue',      
    icon: '🌊' 
  },
  {
    id: 'midnight', 
    label: 'Midnight Forest', 
    icon: '🌲' 
  },
  {
    id: 'system',
    label: 'System',
    icon: '💻'
  },
];

const ThemeContext = createContext({
  theme: 'system',
  setTheme: () => {},
  themes: THEMES,
});

export function ThemeProvider({ children, defaultTheme = 'system' }) {
  const [mounted, setMounted] = useState(false);
  const [theme, setThemeState] = useState(defaultTheme);

  useEffect(() => {
    const saved = localStorage.getItem('nh-theme');
    const resolved = (saved && THEMES.find(t => t.id === saved)) ? saved : defaultTheme;
    setThemeState(resolved);
    setMounted(true);
  }, [defaultTheme]);

  useEffect(() => {
    let actualTheme = theme;
    if (theme === 'system') {
      actualTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    document.documentElement.setAttribute('data-theme', actualTheme);
    localStorage.setItem('nh-theme', theme);
  }, [theme]);

  useEffect(() => {
    if (theme !== 'system') return;
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e) => {
      const actualTheme = e.matches ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', actualTheme);
    };
    media.addEventListener('change', handler);
    return () => media.removeEventListener('change', handler);
  }, [theme]);

  const setTheme = (newTheme) => {
    if (THEMES.find(t => t.id === newTheme)) {
      setThemeState(newTheme);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes: THEMES }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}