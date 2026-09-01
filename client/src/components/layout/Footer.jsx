import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // <--- ADDED FOR NEWSLETTER
import { MapPin, Mail, Phone, Send, CheckCircle, ArrowUp } from 'lucide-react';
import { FaFacebook, FaInstagram, FaWhatsapp, FaTiktok, FaGithub } from 'react-icons/fa';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // 'idle', 'loading', 'success', 'error'

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');

    try {
      // Send to your backend / Firebase
      await axios.post('http://localhost:5000/api/newsletter', { email });
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 4000);
    } catch (error) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  return (
    <footer className="relative bg-[#0B1220] text-white pt-20 pb-8 border-t border-dark-800 overflow-hidden">
      {/* Premium Glowing Background Effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container-premium relative z-10">
        
        {/* Top Section: Logo and Socials */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 border-b border-dark-700/50 pb-8">
          <Link to="/" className="text-3xl font-bold group">
            <span className="gradient-text group-hover:opacity-80 transition-opacity">Oluwadamilare</span>
          </Link>
          
          <div className="flex gap-3 mt-6 md:mt-0">
            {[
              { icon: FaFacebook, link: 'https://www.facebook.com/profile.php?id=100084730695859' },
              { icon: FaInstagram, link: 'https://www.instagram.com/codecraft331?igsi=MWNiejVqdW81MHQxZg==' },
              { icon: FaWhatsapp, link: 'https://whatsapp.com/channel/0029VbAYte94o7qG2Dfrlt3D' },
              { icon: FaTiktok, link: 'https://www.tiktok.com/@codecraft995?_r=1&_t=ZS-99LlKyEgS4F' },
              { icon: FaGithub, link: 'https://github.com/immanuel779' }
            ].map((social, index) => (
              <a 
                key={index} 
                href={social.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-11 h-11 rounded-full bg-dark-800/80 border border-dark-700 flex items-center justify-center hover:bg-primary-500 hover:border-primary-500 hover:scale-110 hover:shadow-premium transition-all duration-300"
              >
                <social.icon className="w-5 h-5 text-dark-300 hover:text-white" />
              </a>
            ))}
          </div>
        </div>

        {/* Main Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Column 1: Contact / Head Office */}
          <div>
            <h3 className="text-xl font-bold mb-6 relative inline-block">
              Get in Touch
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full" />
            </h3>
            <div className="space-y-5 text-dark-300 mt-6">
              <a href="https://wa.me/2347089584607" target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 hover:text-green-400 transition-colors">
                <FaWhatsapp className="w-5 h-5 text-green-500 mt-1" />
                <p>WhatsApp: Instant Chat</p>
              </a>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary-500 mt-1" />
                <p>Lagos, Nigeria</p>
              </div>
              <a href="mailto:opeyemioluwadamilare415@gmail.com" className="flex items-start gap-3 hover:text-primary-400 transition-colors">
                <Mail className="w-5 h-5 text-primary-500 mt-1" />
                <p>opeyemioluwadamilare415@gmail.com</p>
              </a>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-primary-500 mt-1" />
                <p>+234 705 692 2460</p>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6 relative inline-block">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full" />
            </h3>
            <ul className="space-y-4 mt-6">
              <li><Link to="/" className="text-dark-300 hover:text-primary-400 hover:translate-x-2 inline-block transition-all duration-300">Home</Link></li>
              <li><Link to="/about" className="text-dark-300 hover:text-primary-400 hover:translate-x-2 inline-block transition-all duration-300">About</Link></li>
              <li><Link to="/projects" className="text-dark-300 hover:text-primary-400 hover:translate-x-2 inline-block transition-all duration-300">Projects</Link></li>
              <li><Link to="/blog" className="text-dark-300 hover:text-primary-400 hover:translate-x-2 inline-block transition-all duration-300">Blog</Link></li>
            </ul>
          </div>

          {/* Column 3: Support */}
          <div>
            <h3 className="text-xl font-bold mb-6 relative inline-block">
              Support
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full" />
            </h3>
            <ul className="space-y-4 mt-6">
              <li><Link to="/contact" className="text-dark-300 hover:text-primary-400 hover:translate-x-2 inline-block transition-all duration-300">Contact Me</Link></li>
              <li><Link to="/services" className="text-dark-300 hover:text-primary-400 hover:translate-x-2 inline-block transition-all duration-300">Services</Link></li>
              <li><a href="/cv.pdf" className="text-dark-300 hover:text-primary-400 hover:translate-x-2 inline-block transition-all duration-300">Download CV</a></li>
              <li><Link to="/" className="text-dark-300 hover:text-primary-400 hover:translate-x-2 inline-block transition-all duration-300">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Column 4: Newsletter (NOW WORKING) */}
          <div>
            <h3 className="text-xl font-bold mb-6 relative inline-block">
              Newsletter
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full" />
            </h3>
            <p className="text-dark-300 mb-6 mt-6">Subscribe to get the latest updates and exclusive deals.</p>
            
            <form onSubmit={handleSubscribe} className="flex flex-col gap-4">
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-500" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email" 
                  required
                  disabled={status === 'loading'}
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-dark-800/80 border border-dark-700 text-white placeholder-dark-500 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all"
                />
              </div>

              <button 
                type="submit" 
                disabled={status === 'loading'}
                className={`w-full px-4 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                  status === 'success' 
                    ? 'bg-green-500 hover:bg-green-600' 
                    : status === 'error'
                    ? 'bg-red-500 hover:bg-red-600'
                    : 'bg-gradient-to-r from-primary-500 to-secondary-500 hover:opacity-90 hover:scale-[1.02] shadow-premium'
                }`}
              >
                {status === 'idle' && (<><Send className="w-4 h-4" /> Subscribe</>)}
                {status === 'loading' && (<span className="animate-pulse">Subscribing...</span>)}
                {status === 'success' && (<><CheckCircle className="w-4 h-4" /> Subscribed!</>)}
                {status === 'error' && (<span>Try again!</span>)}
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Copyright Section */}
        <div className="pt-8 border-t border-dark-700/50 flex flex-col md:flex-row justify-between items-center text-sm text-dark-400">
          <p>&copy; {new Date().getFullYear()} Oluwadamilare Opeyemi. All rights reserved.</p>
          
          <div className="flex items-center gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-primary-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-primary-400 transition-colors">Privacy Policy</a>
            
            {/* Back to top button */}
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="w-10 h-10 rounded-full bg-dark-800 border border-dark-700 flex items-center justify-center hover:bg-primary-500 hover:border-primary-500 transition-all duration-300 cursor-pointer"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}