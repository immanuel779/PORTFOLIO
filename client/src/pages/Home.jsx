import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import SectionWrapper from '../components/ui/SectionWrapper';
import Button from '../components/ui/Button';
import { Mail, ArrowRight, Download } from 'lucide-react'; 
// Updated Imports to match your real socials
import { FaGithub, FaFacebook, FaInstagram, FaTiktok, FaWhatsapp } from 'react-icons/fa';

// Import from the SAME folder (pages)
import About from './About';
import Skills from './Skills';
import Services from './Services';
import Experience from './Experience';

const roles = ["Full-Stack Developer", "Admin Manager", "Social Media Manager", "Creative Specialist"];

function useTypewriter() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    const speed = isDeleting ? 50 : 100;
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setText(currentRole.substring(0, text.length + 1));
        if (text.length === currentRole.length) setTimeout(() => setIsDeleting(true), 2000);
      } else {
        setText(currentRole.substring(0, text.length - 1));
        if (text.length === 0) {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, speed);
    return () => clearTimeout(timeout);
  }, [text, isDeleting, roleIndex]);

  return text;
}

export default function Home() {
  const typewriterText = useTypewriter();

  return (
    <div className="relative overflow-hidden">
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500/20 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute top-40 right-10 w-96 h-96 bg-secondary-500/20 rounded-full blur-[100px] animate-pulse delay-1000" />
      
      <SectionWrapper id="hero" className="pt-32 pb-20 min-h-screen flex items-center">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="text-center lg:text-left">
            <p className="text-primary-500 dark:text-primary-400 font-medium mb-4">Hello, I'm</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-dark-900 dark:text-white mb-6 leading-tight">
              <span className="gradient-text">Oluwadamilare</span>
              <span className="block gradient-text mt-2 min-h-[1.2em]">{typewriterText}<span className="animate-pulse">|</span></span>
            </h1>
            <p className="text-lg text-dark-600 dark:text-dark-300 mb-8 max-w-lg mx-auto lg:mx-0">Building premium, performant web applications with React, Node.js, and MongoDB.</p>
            
            {/* Buttons Row */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <Button to="/projects" className="relative group">View My Work <ArrowRight className="w-4 h-4 ml-2" /></Button>
              <Button to="/contact" variant="outline">Let's Work Together</Button>
              
              <a 
                href="/cv.pdf" 
                download="Oluwadamilare_CV.pdf"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-primary-500 text-white hover:bg-primary-600 focus:ring-primary-500 shadow-premium"
              >
                <Download className="w-4 h-4 mr-2" />
                Download CV
              </a>
            </div>

            {/* Social Links - Updated with Real Handles */}
            <div className="flex justify-center lg:justify-start space-x-4">
              <a href="https://github.com/immanuel779" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-dark-100 dark:bg-dark-800 hover:bg-primary-500 hover:text-white transition-all duration-300 hover:scale-110"><FaGithub className="w-5 h-5" /></a>
              <a href="https://www.facebook.com/profile.php?id=100084730695859" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-dark-100 dark:bg-dark-800 hover:bg-primary-500 hover:text-white transition-all duration-300 hover:scale-110"><FaFacebook className="w-5 h-5" /></a>
              <a href="https://www.instagram.com/codecraft331?igsi=MWNiejVqdW81MHQxZg==" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-dark-100 dark:bg-dark-800 hover:bg-primary-500 hover:text-white transition-all duration-300 hover:scale-110"><FaInstagram className="w-5 h-5" /></a>
              <a href="https://whatsapp.com/channel/0029VbAYte94o7qG2Dfrlt3D" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-dark-100 dark:bg-dark-800 hover:bg-green-500 hover:text-white transition-all duration-300 hover:scale-110"><FaWhatsapp className="w-5 h-5" /></a>
              <a href="https://www.tiktok.com/@codecraft995?_r=1&_t=ZS-99LlKyEgS4F" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-dark-100 dark:bg-dark-800 hover:bg-primary-500 hover:text-white transition-all duration-300 hover:scale-110"><FaTiktok className="w-5 h-5" /></a>
              <a href="mailto:opeyemioluwadamilare415@gmail.com" className="p-3 rounded-full bg-dark-100 dark:bg-dark-800 hover:bg-primary-500 hover:text-white transition-all duration-300 hover:scale-110"><Mail className="w-5 h-5" /></a>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.3 }} className="relative flex justify-center items-center">
            <div className="absolute w-64 h-64 sm:w-80 sm:h-80 rounded-full border-2 border-primary-500/30 animate-spin-slow" />
            <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full border-2 border-secondary-500/20 animate-spin-slower" />
            
            {/* Updated to profile.jpeg */}
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden border-4 border-white dark:border-dark-800 shadow-premium bg-dark-100 dark:bg-dark-800">
              <img 
                src="/profile.jpg" 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="absolute -top-4 right-0 bg-white dark:bg-dark-800 rounded-xl p-3 shadow-premium animate-float"><span className="text-2xl">⚛️</span></div>
            <div className="absolute bottom-0 left-0 bg-white dark:bg-dark-800 rounded-xl p-3 shadow-premium animate-float delay-500"><span className="text-2xl">🚀</span></div>
          </motion.div>
        </div>
      </SectionWrapper>

      <About />
      <Skills />
      <Services />
      <Experience />
    </div>
  );
}