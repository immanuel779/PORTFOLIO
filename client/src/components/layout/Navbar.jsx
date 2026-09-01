import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, Moon, Sun, Download } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Projects', path: '/projects' },
  { name: 'Blog', path: '/blog' },
  { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = () => setIsOpen(false);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-white/80 dark:bg-dark-950/80 backdrop-blur-lg shadow-lg border-b border-dark-100 dark:border-dark-800'
        : 'bg-transparent'
    }`}>
      <div className="container-premium">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <Link to="/" className="relative group flex items-center">
            <span className="text-2xl font-bold text-dark-900 dark:text-white">
              Oluwa<span className="gradient-text">damilare</span>
            </span>
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary-500 rounded-full animate-ping" />
          </Link>

          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={handleLinkClick}
                className={({ isActive }) => `
                  relative text-sm font-medium transition-all duration-300 group
                  ${isActive 
                    ? 'text-primary-500' 
                    : 'text-dark-600 hover:text-primary-500 dark:text-dark-300 dark:hover:text-primary-400'}
                `}
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 transition-all duration-300 group-hover:w-full" />
              </NavLink>
            ))}
          </div>

          <div className="hidden lg:flex items-center space-x-4">
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full bg-dark-100 dark:bg-dark-800 hover:bg-dark-200 dark:hover:bg-dark-700 transition-all duration-300 hover:scale-110"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-primary-500" />}
            </button>

            {/* FIXED: Downloads actual CV */}
            <a 
              href="/cv.pdf" 
              download="Oluwadamilare_CV.pdf"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-primary-500 text-white hover:bg-primary-600 focus:ring-primary-500 shadow-premium"
            >
              <Download className="w-4 h-4 mr-2" />
              Download CV
              <span className="absolute inset-0 rounded-full bg-primary-500 opacity-0 hover:opacity-20 transition-opacity duration-300 blur-md" />
            </a>
          </div>

          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg text-dark-700 dark:text-light-100 hover:bg-dark-100 dark:hover:bg-dark-800 transition-all duration-300"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        <div className={`lg:hidden transition-all duration-500 overflow-hidden ${
          isOpen ? 'max-h-96' : 'max-h-0'
        }`}>
          <div className="pb-4 space-y-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={handleLinkClick}
                className={({ isActive }) => `
                  block px-4 py-3 rounded-lg text-base font-medium transition-all duration-300
                  ${isActive 
                    ? 'bg-primary-500/10 text-primary-500' 
                    : 'text-dark-600 hover:bg-dark-100 dark:text-dark-300 dark:hover:bg-dark-800'}
                `}
              >
                {link.name}
              </NavLink>
            ))}
            
            <button 
              onClick={toggleTheme}
              className="flex items-center justify-center w-full px-4 py-3 rounded-lg bg-dark-100 dark:bg-dark-800 text-dark-700 dark:text-light-100 hover:bg-dark-200 dark:hover:bg-dark-700 transition-all duration-300"
            >
              {isDark ? <Sun className="w-5 h-5 mr-2" /> : <Moon className="w-5 h-5 mr-2" />}
              {isDark ? 'Light Mode' : 'Dark Mode'}
            </button>

            {/* FIXED: Downloads actual CV */}
            <a 
              href="/cv.pdf" 
              download="Oluwadamilare_CV.pdf"
              className="w-full flex items-center justify-center px-4 py-3 rounded-lg bg-primary-500 text-white hover:bg-primary-600 transition-all duration-300"
            >
              <Download className="w-4 h-4 mr-2" />
              Download CV
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}