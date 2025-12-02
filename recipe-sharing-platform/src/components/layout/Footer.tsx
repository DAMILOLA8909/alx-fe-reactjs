import React from 'react';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { FOOTER_LINKS } from '../../constants/navigation';

interface FooterProps {
  darkMode: boolean;
}

const Footer: React.FC<FooterProps> = ({ darkMode }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`border-t transition-colors duration-500 ${
      darkMode ? 'border-blue-900/30' : 'border-sky-200 bg-white/50'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className={`p-2 rounded-xl ${
                darkMode 
                  ? 'bg-gradient-to-br from-blue-500 to-cyan-400' 
                  : 'bg-gradient-to-br from-sky-400 to-blue-400'
              }`}>
                <span className="text-white text-lg font-bold">🍳</span>
              </div>
              <h2 className={`text-2xl font-bold ${
                darkMode 
                  ? 'bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent' 
                  : 'bg-gradient-to-r from-sky-600 to-blue-500 bg-clip-text text-transparent'
              }`}>
                RecipeHub
              </h2>
            </div>
            <p className={`mb-6 leading-relaxed ${
              darkMode ? 'text-slate-400' : 'text-slate-600'
            }`}>
              A vibrant community where culinary passion meets creativity. 
              Discover, share, and elevate your cooking skills with thousands 
              of food enthusiasts worldwide.
            </p>
            <div className="flex space-x-4">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className={`p-2 rounded-lg transition-colors ${
                    darkMode 
                      ? 'bg-slate-800/50 hover:bg-slate-700/50 text-slate-400 hover:text-white' 
                      : 'bg-sky-100 hover:bg-sky-200 text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h3 className={`font-semibold text-lg mb-6 ${
                darkMode ? 'text-white' : 'text-slate-900'
              }`}>
                {title}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className={`transition-colors duration-300 ${
                        darkMode 
                          ? 'text-slate-400 hover:text-cyan-300' 
                          : 'text-slate-600 hover:text-blue-600'
                      }`}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className={`mt-12 pt-8 border-t text-center ${
          darkMode ? 'border-blue-900/30 text-slate-500' : 'border-sky-200 text-slate-600'
        }`}>
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p>© {currentYear} RecipeHub. Made with ❤️ for food lovers everywhere.</p>
            <div className="flex items-center space-x-6">
              <a href="#" className={`hover:underline ${
                darkMode ? 'hover:text-cyan-300' : 'hover:text-blue-600'
              }`}>
                Privacy Policy
              </a>
              <a href="#" className={`hover:underline ${
                darkMode ? 'hover:text-cyan-300' : 'hover:text-blue-600'
              }`}>
                Terms of Service
              </a>
              <a href="#" className={`hover:underline ${
                darkMode ? 'hover:text-cyan-300' : 'hover:text-blue-600'
              }`}>
                Cookie Policy
            </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;