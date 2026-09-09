import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { User, Settings, Shield, Save, Mail, Briefcase, MapPin, Lock, Globe, Moon, Sun, Link as LinkIcon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState('profile');
  const [settings, setSettings] = useState({
    name: '', email: '', jobTitle: '', location: '',
    github: '', facebook: '', instagram: '', whatsapp: '', tiktok: '', cvUrl: '',
    seoTitle: '', seoDescription: '',
    highContrast: false,
  });
  const [passwords, setPasswords] = useState({ currentPassword: '', newPassword: '' });
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/settings`).then(res => {
      if (res.data) setSettings(prev => ({ ...prev, ...res.data }));
    }).catch(console.error);
  }, []);

  const handleChange = (e) => setSettings({ ...settings, [e.target.name]: e.target.value });
  const handlePasswordChange = (e) => setPasswords({ ...passwords, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    await axios.put(`${import.meta.env.VITE_API_URL}/api/settings`, settings);
    alert('Settings saved successfully!');
  };

  const handleChangePassword = async () => {
    if (passwords.newPassword.length < 8) return alert('Password must be at least 8 characters!');
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/change-password`, passwords);
      alert('Password changed successfully!');
      setPasswords({ currentPassword: '', newPassword: '' });
    } catch (err) {
      alert('Error changing password. Check current password.');
    }
  };

  return (
    <div className="p-6 lg:p-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Settings / Account</h1>
        <button onClick={toggleTheme} className="p-2 rounded-full bg-dark-100 dark:bg-dark-800 hover:scale-110 transition-all">
          {isDark ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-primary-500" />}
        </button>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-8">
        <motion.div className="lg:w-64 space-y-2">
          {['profile', 'socials', 'seo', 'security'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`w-full text-left p-3 rounded-lg capitalize ${activeTab === tab ? 'bg-primary-500/10 text-primary-500 font-medium' : 'hover:bg-dark-100 dark:hover:bg-dark-700'}`}>{tab}</button>
          ))}
        </motion.div>

        <div className="flex-1 space-y-6">
          {activeTab === 'profile' && (
            <div className="bg-white dark:bg-dark-800 p-8 rounded-2xl shadow-soft space-y-4">
              <h2 className="text-xl font-bold flex items-center gap-2"><User className="w-5 h-5" /> Personal Profile</h2>
              <input type="text" name="name" placeholder="Name" value={settings.name} onChange={handleChange} className="w-full p-3 rounded-lg bg-transparent border" />
              <input type="text" name="email" placeholder="Email" value={settings.email} onChange={handleChange} className="w-full p-3 rounded-lg bg-transparent border" />
              <input type="text" name="jobTitle" placeholder="Job Title" value={settings.jobTitle} onChange={handleChange} className="w-full p-3 rounded-lg bg-transparent border" />
              <input type="text" name="location" placeholder="Location" value={settings.location} onChange={handleChange} className="w-full p-3 rounded-lg bg-transparent border" />
            </div>
          )}

          {activeTab === 'socials' && (
            <div className="bg-white dark:bg-dark-800 p-8 rounded-2xl shadow-soft space-y-4">
              <h2 className="text-xl font-bold flex items-center gap-2"><LinkIcon className="w-5 h-5" /> Social Links & CV</h2>
              <input type="text" name="github" placeholder="GitHub URL" value={settings.github} onChange={handleChange} className="w-full p-3 rounded-lg bg-transparent border" />
              <input type="text" name="facebook" placeholder="Facebook URL" value={settings.facebook} onChange={handleChange} className="w-full p-3 rounded-lg bg-transparent border" />
              <input type="text" name="instagram" placeholder="Instagram URL" value={settings.instagram} onChange={handleChange} className="w-full p-3 rounded-lg bg-transparent border" />
              <input type="text" name="whatsapp" placeholder="WhatsApp Channel URL" value={settings.whatsapp} onChange={handleChange} className="w-full p-3 rounded-lg bg-transparent border" />
              <input type="text" name="tiktok" placeholder="TikTok URL" value={settings.tiktok} onChange={handleChange} className="w-full p-3 rounded-lg bg-transparent border" />
              <input type="text" name="cvUrl" placeholder="CV Link (e.g. /cv.pdf)" value={settings.cvUrl} onChange={handleChange} className="w-full p-3 rounded-lg bg-transparent border" />
            </div>
          )}

          {activeTab === 'seo' && (
            <div className="bg-white dark:bg-dark-800 p-8 rounded-2xl shadow-soft space-y-4">
              <h2 className="text-xl font-bold flex items-center gap-2"><Globe className="w-5 h-5" /> SEO Settings</h2>
              <input type="text" name="seoTitle" placeholder="Site Meta Title" value={settings.seoTitle} onChange={handleChange} className="w-full p-3 rounded-lg bg-transparent border" />
              <textarea name="seoDescription" placeholder="Site Meta Description" value={settings.seoDescription} onChange={handleChange} className="w-full p-3 rounded-lg bg-transparent border h-24"></textarea>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="bg-white dark:bg-dark-800 p-8 rounded-2xl shadow-soft space-y-4">
              <h2 className="text-xl font-bold flex items-center gap-2"><Shield className="w-5 h-5" /> Change Password</h2>
              <input type="password" name="currentPassword" placeholder="Current Password" value={passwords.currentPassword} onChange={handlePasswordChange} className="w-full p-3 rounded-lg bg-transparent border" />
              <input type="password" name="newPassword" placeholder="New Password (8+ chars)" value={passwords.newPassword} onChange={handlePasswordChange} className="w-full p-3 rounded-lg bg-transparent border" />
              <button onClick={handleChangePassword} className="w-full py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-semibold">Update Password</button>
            </div>
          )}

          <button onClick={handleSubmit} className="w-full py-4 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-xl font-semibold flex items-center justify-center gap-2">
            <Save className="w-5 h-5" /> Save All Settings
          </button>
        </div>
      </div>
    </div>
  );
}