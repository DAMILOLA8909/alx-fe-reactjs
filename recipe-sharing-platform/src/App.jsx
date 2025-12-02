import React, { useState, useEffect } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('recipe-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(savedTheme ? savedTheme === 'dark' : prefersDark);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('recipe-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('recipe-theme', 'light');
    }
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ${
      darkMode 
        ? 'dark bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-900 text-white' 
        : 'bg-gradient-to-br from-sky-50 via-blue-50 to-cyan-50 text-slate-900'
    }`}>
      <Header darkMode={darkMode} onToggleTheme={toggleTheme} />
      <main>
        <HomePage darkMode={darkMode} />
        {/* Future pages will be added here with React Router */}
      </main>
      <Footer darkMode={darkMode} />
    </div>
  );
}

export default App;