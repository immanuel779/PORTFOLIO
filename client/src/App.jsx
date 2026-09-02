import { Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Projects from './pages/Projects';
import Skills from './pages/Skills';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Contact from './pages/Contact';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminProjects from './pages/AdminProjects';
import AdminMessages from './pages/AdminMessages';
import AdminBlog from './pages/AdminBlog';
import AdminSubscribers from './pages/AdminSubscribers';
import AdminExperience from './pages/AdminExperience';
import AdminCertificates from './pages/AdminCertificates';
import AdminSkills from './pages/AdminSkills';
import AdminSettings from './pages/AdminSettings';
import Certificates from './pages/Certificates';
import Experience from './pages/Experience';

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col">
        {!isAdminRoute && <Navbar />}
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/certificates" element={<Certificates />} />
            <Route path="/experience" element={<Experience />} />
            
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/projects" element={<AdminProjects />} />
            <Route path="/admin/messages" element={<AdminMessages />} />
            <Route path="/admin/blog" element={<AdminBlog />} />
            <Route path="/admin/subscribers" element={<AdminSubscribers />} />
            <Route path="/admin/experience" element={<AdminExperience />} />
            <Route path="/admin/certificates" element={<AdminCertificates />} />
            <Route path="/admin/skills" element={<AdminSkills />} />
            <Route path="/admin/settings" element={<AdminSettings />} />
          </Routes>
        </main>

        {!isAdminRoute && <Footer />}
      </div>
    </ThemeProvider>
  );
}

export default App;