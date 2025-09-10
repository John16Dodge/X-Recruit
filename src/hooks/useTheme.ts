
import { useState, useEffect } from 'react';

const useTheme = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
<<<<<<< HEAD
    // Check if we're in browser environment
    if (typeof window === 'undefined') return 'light';
    
=======
>>>>>>> e537ea31e6b108399fb8f79ea1c7cdebfca58d37
    // Check localStorage first
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || savedTheme === 'light') {
      return savedTheme;
    }
    
    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    
    return 'light';
  });

  useEffect(() => {
<<<<<<< HEAD
    // Check if we're in browser environment
    if (typeof window === 'undefined') return;
    
=======
>>>>>>> e537ea31e6b108399fb8f79ea1c7cdebfca58d37
    // Save theme to localStorage
    localStorage.setItem('theme', theme);
    
    // Apply theme to document
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
    
    // Update data-theme attribute for better CSS variable support
    document.documentElement.setAttribute('data-theme', theme);
<<<<<<< HEAD
    
    // Force a re-render by updating the body class
    document.body.className = document.body.className.replace(/theme-\w+/g, '');
    document.body.classList.add(`theme-${theme}`);
=======
>>>>>>> e537ea31e6b108399fb8f79ea1c7cdebfca58d37
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return { theme, toggleTheme };
};

export default useTheme;
