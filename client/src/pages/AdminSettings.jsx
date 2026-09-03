import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { User, Settings, Shield, Laptop, Smartphone, ChevronDown, Globe, Clock, Moon, Sun, Save, Mail, Briefcase, MapPin, UploadCloud } from 'lucide-react';

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState('profile');
  const [uploading, setUploading] = useState(false);
  const [settings, setSettings] = useState({
    profileImage: '',
    name: 'Oluwadamilare',
    email: 'opeyemioluwadamilare415@gmail.com',
    jobTitle: 'Full-Stack Developer',
    location: 'Lagos, Nigeria',
    language: 'English (US)',
    timezone: 'UTC+01:00 West Africa',
    theme: 'Dark',
    highContrast: false,
    twoFactor: false,
  });

  useEffect(() => {
    // ✅ FIXED: Use live backend
    axios.get(`${import.meta.env.VITE_API_URL}/api/settings`)
      .then(res => {
        if (res.data && Object.keys(res.data).length > 0) {
          setSettings(prev => ({ ...prev, ...res.data }));
        }
      })
      .catch(console.error);
  }, []);

  const handleChange = (e) => setSettings({ ...settings, [e.target.name]: e.target.value });
  const handleToggle = (key) => setSettings(prev => ({ ...prev, [key]: !prev[key] }));

  const handleProfileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'my_unsigned_preset');
    data.append('cloud_name', 'xlyyu0bc');

    try {
      const res = await axios.post(`https://api.cloudinary.com/v1_1/xlyyu0bc/image/upload`, data);
      setSettings(prev => ({ ...prev, profileImage: res.data.secure_url }));
      alert('Profile image uploaded successfully!');
    } catch (error) {
      console.error('Upload error:', error);
      alert('Error uploading image.');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // ✅ FIXED: Use live backend
      await axios.put(`${import.meta.env.VITE_API_URL}/api/settings`, settings);
      alert('Settings saved successfully!');
    } catch (error) {
      alert('Error saving settings');
    }
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'preferences', label: 'Preferences', icon: Settings },
    { id: 'security', label: 'Security', icon: Shield },
  ];

  return (
    <div className="p-6 lg:p-10">
      <h1 className="text-3xl font-bold mb-6">Settings / Account</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="lg:w-64 space-y-2">
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ${activeTab === tab.id ? 'bg-primary-500/10 text-primary-500 font-medium' : 'hover:bg-dark-100 dark:hover:bg-dark-700 text-dark-600 dark:text-dark-300'}`}>
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </button>
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex-1 space-y-6">
          {activeTab === 'profile' && (
            <div className="bg-white dark:bg-dark-800 p-8 rounded-2xl shadow-soft border border-dark-100 dark:border-dark-700 space-y-6">
              <h2 className="text-2xl font-bold flex items-center gap-2"><User className="w-6 h-6 text-primary-500" /> Personal Profile</h2>
              <div className="flex flex-col sm:flex-row gap-6 items-start">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-24 h-24 rounded-full border-4 border-primary-500/20 overflow-hidden bg-dark-100 dark:bg-dark-700">
                    {settings.profileImage ? <img src={settings.profileImage} alt="Profile" className="w-full h-full object-cover" /> : <img src="/profile.jpeg" alt="Profile" className="w-full h-full object-cover" />}
                  </div>
                  <label className="text-sm text-primary-500 hover:underline cursor-pointer flex items-center gap-1">
                    <UploadCloud className="w-4 h-4" />
                    {uploading ? 'Uploading...' : 'Change Picture'}
                    <input type="file" accept="image/*" onChange={handleProfileUpload} className="hidden" />
                  </label>
                </div>
                <div className="flex-1 space-y-4">
                  <div><label className="block text-sm font-medium mb-2">Name</label><div className="relative"><User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-400" /><input type="text" name="name" value={settings.name} onChange={handleChange} className="w-full pl-10 pr-4 py-3 rounded-lg border border-dark-200 dark:border-dark-700 bg-transparent" /></div></div>
                  <div><label className="block text-sm font-medium mb-2">Email</label><div className="relative"><Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-400" /><input type="email" name="email" value={settings.email} onChange={handleChange} className="w-full pl-10 pr-4 py-3 rounded-lg border border-dark-200 dark:border-dark-700 bg-transparent" /></div></div>
                  <div><label className="block text-sm font-medium mb-2">Job Title</label><div className="relative"><Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-400" /><input type="text" name="jobTitle" value={settings.jobTitle} onChange={handleChange} className="w-full pl-10 pr-4 py-3 rounded-lg border border-dark-200 dark:border-dark-700 bg-transparent" /></div></div>
                  <div><label className="block text-sm font-medium mb-2">Location</label><div className="relative"><MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-400" /><input type="text" name="location" value={settings.location} onChange={handleChange} className="w-full pl-10 pr-4 py-3 rounded-lg border border-dark-200 dark:border-dark-700 bg-transparent" /></div></div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'preferences' && (
            <div className="bg-white dark:bg-dark-800 p-8 rounded-2xl shadow-soft border border-dark-100 dark:border-dark-700 space-y-6">
              <h2 className="text-2xl font-bold flex items-center gap-2"><Settings className="w-6 h-6 text-primary-500" /> System Preferences</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div><label className="block text-sm font-medium mb-2">Language</label><div className="relative"><Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-400" /><select name="language" value={settings.language} onChange={handleChange} className="w-full pl-10 pr-4 py-3 rounded-lg border border-dark-200 dark:border-dark-700 bg-transparent appearance-none"><option>English (US)</option><option>English (UK)</option><option>Yoruba</option></select><ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-400" /></div></div>
                <div><label className="block text-sm font-medium mb-2">Time Zone</label><div className="relative"><Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-400" /><select name="timezone" value={settings.timezone} onChange={handleChange} className="w-full pl-10 pr-4 py-3 rounded-lg border border-dark-200 dark:border-dark-700 bg-transparent appearance-none"><option>UTC+01:00 West Africa</option><option>UTC+00:00 London</option><option>UTC-05:00 Eastern</option></select><ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-400" /></div></div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg border border-dark-200 dark:border-dark-700"><span className="flex items-center gap-2"><Moon className="w-5 h-5 text-primary-500" /> Interface Theme</span><button onClick={() => handleToggle('theme')} className={`w-14 h-7 rounded-full p-1 transition-colors ${settings.theme === 'Dark' ? 'bg-primary-500' : 'bg-dark-300'}`}><div className={`w-5 h-5 bg-white rounded-full transition-transform ${settings.theme === 'Dark' ? 'translate-x-7' : ''}`} /></button></div>
                <div className="flex items-center justify-between p-4 rounded-lg border border-dark-200 dark:border-dark-700"><span className="flex items-center gap-2"><Sun className="w-5 h-5 text-yellow-500" /> High Contrast</span><button onClick={() => handleToggle('highContrast')} className={`w-14 h-7 rounded-full p-1 transition-colors ${settings.highContrast ? 'bg-primary-500' : 'bg-dark-300'}`}><div className={`w-5 h-5 bg-white rounded-full transition-transform ${settings.highContrast ? 'translate-x-7' : ''}`} /></button></div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="bg-white dark:bg-dark-800 p-8 rounded-2xl shadow-soft border border-dark-100 dark:border-dark-700 space-y-6">
              <h2 className="text-2xl font-bold flex items-center gap-2"><Shield className="w-6 h-6 text-primary-500" /> Security & Access</h2>
              <div className="flex items-center justify-between p-4 rounded-lg border border-dark-200 dark:border-dark-700"><div><p className="font-medium">Two-Factor Authentication (2FA)</p><p className="text-sm text-dark-500">Enable this for extra security.</p></div><button onClick={() => handleToggle('twoFactor')} className={`w-14 h-7 rounded-full p-1 transition-colors ${settings.twoFactor ? 'bg-primary-500' : 'bg-dark-300'}`}><div className={`w-5 h-5 bg-white rounded-full transition-transform ${settings.twoFactor ? 'translate-x-7' : ''}`} /></button></div>
              <div><p className="font-medium mb-3">Active Sessions</p><div className="space-y-3"><div className="flex items-center gap-3 p-4 rounded-lg border border-dark-200 dark:border-dark-700"><Laptop className="w-5 h-5 text-dark-400" /><div><p className="text-sm font-medium">MacBook Pro</p><p className="text-xs text-dark-500">Lagos, Nigeria</p></div></div><div className="flex items-center gap-3 p-4 rounded-lg border border-dark-200 dark:border-dark-700"><Smartphone className="w-5 h-5 text-dark-400" /><div><p className="text-sm font-medium">iPhone</p><p className="text-xs text-dark-500">Lagos, Nigeria</p></div></div></div></div>
            </div>
          )}

          <button onClick={handleSubmit} className="w-full py-4 bg-gradient-to-r from-primary-500 to-secondary-500 hover:opacity-90 text-white rounded-xl font-semibold transition-all shadow-premium flex items-center justify-center gap-2">
            <Save className="w-5 h-5" /> Save Changes
          </button>
        </motion.div>
      </div>
    </div>
  );
}