import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { Moon, Sun, Menu, X, Download } from 'lucide-react';
import { useState } from 'react';

export default function MainLayout({ children }) {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-dark-950/80 backdrop-blur-md border-b border-slate-200 dark:border-dark-800">
        <div className="container-premium flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-bold text-primary-600">
            Dev<span className="text-accent-500">Folio</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary-600 transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <a href="/cv.pdf" className="btn-secondary text-sm py-2 px-4">
              <Download className="w-4 h-4" />
              Resume
            </a>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-dark-800 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-dark-800 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-dark-800 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white dark:bg-dark-950 border-b border-slate-200 dark:border-dark-800">
            <div className="container-premium py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-base font-medium text-slate-600 dark:text-slate-300 hover:text-primary-600 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <a href="/cv.pdf" className="btn-secondary text-sm py-2 px-4">
                <Download className="w-4 h-4" />
                Resume
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow pt-16">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-50 dark:bg-dark-900 border-t border-slate-200 dark:border-dark-800">
        <div className="container-premium py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            © {new Date().getFullYear()} Your Name. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary-600 transition-colors">GitHub</a>
            <a href="#" className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary-600 transition-colors">LinkedIn</a>
            <a href="#" className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary-600 transition-colors">Twitter</a>
          </div>
        </div>
      </footer>
    </div>
  );
}