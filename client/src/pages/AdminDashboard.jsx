import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LayoutDashboard, FolderKanban, MessageSquare, LogOut, Menu, X, FileText } from 'lucide-react';
import axios from 'axios';

export default function AdminDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [stats, setStats] = useState({ projects: 0, messages: 0, blogs: 0 });

  // Fetch real data from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectsRes, messagesRes, blogsRes] = await Promise.all([
          axios.get('http://localhost:5000/api/projects'),
          axios.get('http://localhost:5000/api/contact'),
          axios.get('http://localhost:5000/api/blog') // <--- FETCH BLOGS
        ]);
        setStats({
          projects: projectsRes.data.length,
          messages: messagesRes.data.length,
          blogs: blogsRes.data.length // <--- SET BLOGS
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-light-100 dark:bg-dark-950 flex">
      {/* Sidebar */}
      <aside className={`fixed lg:static z-50 h-screen w-64 bg-white dark:bg-dark-800 border-r border-dark-100 dark:border-dark-700 transform transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-6 flex flex-col h-full">
          <div className="mb-8 flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold">Admin<span className="gradient-text">Panel</span></Link>
            <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-dark-500"><X className="w-6 h-6" /></button>
          </div>

          <nav className="space-y-4 flex-1">
            <Link to="/admin/dashboard" className="flex items-center gap-3 p-3 rounded-lg bg-primary-500/10 text-primary-500 font-medium">
              <LayoutDashboard className="w-5 h-5" /> Dashboard
            </Link>
            <Link to="/admin/projects" className="flex items-center gap-3 p-3 rounded-lg hover:bg-dark-100 dark:hover:bg-dark-700 transition-colors">
              <FolderKanban className="w-5 h-5" /> Manage Projects
            </Link>
            {/* ADDED BLOG LINK */}
            <Link to="/admin/blog" className="flex items-center gap-3 p-3 rounded-lg hover:bg-dark-100 dark:hover:bg-dark-700 transition-colors">
              <FileText className="w-5 h-5" /> Blog
            </Link>
            <Link to="/admin/messages" className="flex items-center gap-3 p-3 rounded-lg hover:bg-dark-100 dark:hover:bg-dark-700 transition-colors">
              <MessageSquare className="w-5 h-5" /> Messages
            </Link>
          </nav>

          <Link to="/" className="flex items-center gap-3 p-3 rounded-lg text-red-500 hover:bg-red-500/10 transition-colors">
            <LogOut className="w-5 h-5" /> Logout
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-10">
        <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden mb-6 p-2 bg-white dark:bg-dark-800 rounded-lg text-dark-500">
          <Menu className="w-6 h-6" />
        </button>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>
          
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            <motion.div className="bg-white dark:bg-dark-800 p-6 rounded-2xl shadow-soft">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4 text-blue-500">
                <FolderKanban className="w-6 h-6" />
              </div>
              <p className="text-3xl font-bold">{stats.projects}</p>
              <p className="text-dark-600 dark:text-dark-300">Total Projects</p>
            </motion.div>
            
            <motion.div className="bg-white dark:bg-dark-800 p-6 rounded-2xl shadow-soft">
              <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center mb-4 text-green-500">
                <MessageSquare className="w-6 h-6" />
              </div>
              <p className="text-3xl font-bold">{stats.messages}</p>
              <p className="text-dark-600 dark:text-dark-300">Total Messages</p>
            </motion.div>

            <motion.div className="bg-white dark:bg-dark-800 p-6 rounded-2xl shadow-soft">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-4 text-purple-500">
                <FileText className="w-6 h-6" />
              </div>
              <p className="text-3xl font-bold">{stats.blogs}</p>
              <p className="text-dark-600 dark:text-dark-300">Total Blog Posts</p>
            </motion.div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}