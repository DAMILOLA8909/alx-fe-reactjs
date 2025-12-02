import React, { useState } from 'react';
import { Search, Bell, User, Menu, X, Moon, Sun } from 'lucide-react';
import { NAV_LINKS } from '../../constants/navigation';

interface HeaderProps {
  darkMode: boolean;
  onToggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ darkMode, onToggleTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className={`sticky top-0 z-50 backdrop-blur-xl transition-colors duration-500 ${
      darkMode 
        ? 'bg-slate-900/80 border-b border-blue-800/30' 
        : 'bg-white/90 border-b border-sky-100 shadow-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className={`p-2 rounded-xl transition-all duration-500 ${
              darkMode 
                ? 'bg-gradient-to-br from-blue-500 to-cyan-400' 
                : 'bg-gradient-to-br from-sky-400 to-blue-400'
            }`}>
              <span className="text-white text-lg font-bold">🍳</span>
            </div>
            <h1 className={`ml-3 text-xl font-bold transition-all duration-500 ${
              darkMode 
                ? 'bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent' 
                : 'bg-gradient-to-r from-sky-600 to-blue-500 bg-clip-text text-transparent'
            }`}>
              RecipeHub
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.path}
                className={`transition-colors duration-300 ${
                  darkMode 
                    ? 'text-slate-300 hover:text-cyan-300' 
                    : 'text-slate-700 hover:text-blue-600'
                }`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="hidden md:block relative">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                darkMode ? 'text-slate-400' : 'text-slate-500'
              }`} />
              <input
                type="text"
                placeholder="Search recipes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 w-64 ${
                  darkMode 
                    ? 'bg-slate-800/50 border border-blue-800/30 focus:ring-cyan-500/50' 
                    : 'bg-white/80 border border-sky-200 focus:ring-blue-300'
                }`}
              />
            </div>

            {/* Theme Toggle */}
            <button
              onClick={onToggleTheme}
              className={`p-2 rounded-lg transition-all duration-300 ${
                darkMode 
                  ? 'bg-slate-800/50 hover:bg-slate-700/50' 
                  : 'bg-sky-100 hover:bg-sky-200'
              }`}
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-amber-300" />
              ) : (
                <Moon className="w-5 h-5 text-slate-700" />
              )}
            </button>

            {/* Notifications */}
            <button className={`p-2 rounded-lg relative ${
              darkMode 
                ? 'bg-slate-800/50 hover:bg-slate-700/50' 
                : 'bg-sky-100 hover:bg-sky-200'
            }`}>
              <Bell className={`w-5 h-5 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`} />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* User Profile */}
            <button className={`p-2 rounded-lg ${
              darkMode 
                ? 'bg-slate-800/50 hover:bg-slate-700/50' 
                : 'bg-sky-100 hover:bg-sky-200'
            }`}>
              <User className={`w-5 h-5 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`} />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className={`md:hidden mt-2 pb-4 ${
            darkMode ? 'border-t border-blue-800/30' : 'border-t border-sky-100'
          }`}>
            <div className="mt-4">
              <input
                type="text"
                placeholder="Search recipes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 ${
                  darkMode 
                    ? 'bg-slate-800/50 border border-blue-800/30 focus:ring-cyan-500/50' 
                    : 'bg-white/80 border border-sky-200 focus:ring-blue-300'
                }`}
              />
            </div>
            <div className="mt-4 space-y-2">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.path}
                  className={`block px-3 py-2 rounded-lg transition-colors ${
                    darkMode 
                      ? 'text-slate-300 hover:bg-slate-800/50' 
                      : 'text-slate-700 hover:bg-sky-100'
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;