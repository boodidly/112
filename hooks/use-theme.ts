import { useState, useEffect } from 'react';

interface Theme {
  backgroundColor: string;
  glowColor: string;
  glowIntensity: number;
}

const defaultTheme: Theme = {
  backgroundColor: '#1E1E1E',
  glowColor: '#40E0D0',
  glowIntensity: 0.5,
};

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(defaultTheme);

  useEffect(() => {
    const root = document.documentElement;
    Object.entries(theme).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value);
    });
    document.body.style.backgroundColor = theme.backgroundColor;
  }, [theme]);

  const updateTheme = (updates: Partial<Theme>) => {
    setTheme(prev => ({ ...prev, ...updates }));
  };

  const resetTheme = () => {
    setTheme(defaultTheme);
  };

  return { theme, updateTheme, resetTheme };
}