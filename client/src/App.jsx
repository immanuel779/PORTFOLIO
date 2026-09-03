import { Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ProtectedRoute from './components/ProtectedRoute'; // <--- ADD THIS
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
            {/* Public Routes */}
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
            
            {/* Admin Routes (Protected!) */}
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/projects" element={<ProtectedRoute><AdminProjects /></ProtectedRoute>} />
            <Route path="/admin/messages" element={<ProtectedRoute><AdminMessages /></ProtectedRoute>} />
            <Route path="/admin/blog" element={<ProtectedRoute><AdminBlog /></ProtectedRoute>} />
            <Route path="/admin/subscribers" element={<ProtectedRoute><AdminSubscribers /></ProtectedRoute>} />
            <Route path="/admin/experience" element={<ProtectedRoute><AdminExperience /></ProtectedRoute>} />
            <Route path="/admin/certificates" element={<ProtectedRoute><AdminCertificates /></ProtectedRoute>} />
            <Route path="/admin/skills" element={<ProtectedRoute><AdminSkills /></ProtectedRoute>} />
            <Route path="/admin/settings" element={<ProtectedRoute><AdminSettings /></ProtectedRoute>} />
          </Routes>
        </main>

        {!isAdminRoute && <Footer />}
      </div>
    </ThemeProvider>
  );
}

export default App;