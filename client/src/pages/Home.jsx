import { motion } from 'framer-motion';
import SectionWrapper from '../components/ui/SectionWrapper';
import Button from '../components/ui/Button';
import { Mail } from 'lucide-react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      {/* Background Glow Effects */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500/20 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute top-40 right-10 w-96 h-96 bg-secondary-500/20 rounded-full blur-[100px] animate-pulse delay-1000" />
      <div className="absolute bottom-20 left-1/2 w-64 h-64 bg-primary-500/10 rounded-full blur-[80px]" />

      {/* Hero Section */}
      <SectionWrapper id="hero" className="pt-32 pb-20 min-h-screen flex items-center">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <p className="text-primary-500 dark:text-primary-400 font-medium mb-4">
              Hello, I'm
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-dark-900 dark:text-white mb-6 leading-tight">
              [Your Name]
              <span className="block gradient-text mt-2">
                Full-Stack Developer
              </span>
            </h1>
            <p className="text-lg text-dark-600 dark:text-dark-300 mb-8 max-w-lg mx-auto lg:mx-0">
              Building premium, performant web applications with React, Node.js, and MongoDB.
              Let's create something extraordinary together.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <Button to="/projects" className="relative group">
                View My Work
              </Button>
              <Button to="/contact" variant="outline">
                Let's Work Together
              </Button>
            </div>

            {/* Social Links */}
            <div className="flex justify-center lg:justify-start space-x-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" 
                 className="p-3 rounded-full bg-dark-100 dark:bg-dark-800 hover:bg-primary-500 hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-premium">
                <FaGithub className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                 className="p-3 rounded-full bg-dark-100 dark:bg-dark-800 hover:bg-primary-500 hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-premium">
                <FaLinkedin className="w-5 h-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                 className="p-3 rounded-full bg-dark-100 dark:bg-dark-800 hover:bg-primary-500 hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-premium">
                <FaTwitter className="w-5 h-5" />
              </a>
              <a href="mailto:your@email.com"
                 className="p-3 rounded-full bg-dark-100 dark:bg-dark-800 hover:bg-primary-500 hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-premium">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </motion.div>

          {/* Right Side - Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative flex justify-center items-center"
          >
            {/* Glowing rings */}
            <div className="absolute w-64 h-64 sm:w-80 sm:h-80 rounded-full border-2 border-primary-500/30 animate-spin-slow" />
            <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full border-2 border-secondary-500/20 animate-spin-slower" />
            
            {/* Profile Image - Note: Check if you have this file in public! If not, this will just show a broken icon */}
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden border-4 border-white dark:border-dark-800 shadow-premium">
              <img 
                src="/profile.jpg" 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Floating elements */}
            <div className="absolute -top-4 right-0 bg-white dark:bg-dark-800 rounded-xl p-3 shadow-premium animate-float">
              <span className="text-2xl">⚛️</span>
            </div>
            <div className="absolute bottom-0 left-0 bg-white dark:bg-dark-800 rounded-xl p-3 shadow-premium animate-float delay-500">
              <span className="text-2xl">🚀</span>
            </div>
          </motion.div>
        </div>
      </SectionWrapper>
    </div>
  );
}