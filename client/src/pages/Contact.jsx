import { useState } from 'react';
import axios from 'axios';
import SectionWrapper from '../components/ui/SectionWrapper';
import SectionHeading from '../components/ui/SectionHeading';
import Button from '../components/ui/Button';
import { Mail, Phone, MapPin, MessageSquare } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

const EMAIL = 'opeyemioluwadamilare415@gmail.com';
const PHONE = '+2347089584607';
const PHONE_2 = '+2347056922460';
const WHATSAPP_NUMBER = '2347089584607';
const LOCATION = 'Lagos, Nigeria';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!e.currentTarget.checkValidity()) {
      e.currentTarget.reportValidity();
      return;
    }

    setLoading(true);
    const submitter = e.nativeEvent.submitter;

    try {
      // ✅ FIXED: Sends to live backend
      await axios.post(`${import.meta.env.VITE_API_URL}/api/contact`, formData);
      
      if (submitter.name === 'whatsapp') {
        const text = `Hello! My name is ${formData.name}. ${formData.message} (Email: ${formData.email})`;
        const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
        window.open(waLink, '_blank');
      } else {
        const mailtoLink = `mailto:${EMAIL}?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\n\n${formData.message}`)}`;
        window.location.href = mailtoLink;
      }
      
      alert('Message sent successfully!');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (error) {
      alert('Error saving message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SectionWrapper id="contact" className="pt-32">
      <SectionHeading title="Contact Me" subtitle="Let's build something amazing together. Reach me instantly via WhatsApp or Email." />
      <div className="grid lg:grid-cols-2 gap-12">
        <div>
          <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>
          <div className="space-y-6 mb-8">
            <div className="flex items-center gap-4 bg-white dark:bg-dark-800 p-4 rounded-xl shadow-soft"><div className="w-12 h-12 rounded-full bg-primary-500/10 flex items-center justify-center text-primary-500"><Mail className="w-6 h-6" /></div><div><p className="font-medium">Gmail</p><a href={`mailto:${EMAIL}`} className="text-dark-600 dark:text-dark-300 hover:text-primary-500">{EMAIL}</a></div></div>
            <div className="flex items-center gap-4 bg-white dark:bg-dark-800 p-4 rounded-xl shadow-soft"><div className="w-12 h-12 rounded-full bg-primary-500/10 flex items-center justify-center text-primary-500"><Phone className="w-6 h-6" /></div><div><p className="font-medium">Phone</p><a href={`tel:${PHONE}`} className="block">{PHONE}</a><a href={`tel:${PHONE_2}`} className="block">{PHONE_2}</a></div></div>
            <div className="flex items-center gap-4 bg-white dark:bg-dark-800 p-4 rounded-xl shadow-soft"><div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center text-green-500"><FaWhatsapp className="w-6 h-6" /></div><div><p className="font-medium">WhatsApp</p><a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="text-dark-600 dark:text-dark-300 hover:text-green-500">Chat with me instantly</a></div></div>
            <div className="flex items-center gap-4 bg-white dark:bg-dark-800 p-4 rounded-xl shadow-soft"><div className="w-12 h-12 rounded-full bg-primary-500/10 flex items-center justify-center text-primary-500"><MapPin className="w-6 h-6" /></div><div><p className="font-medium">Location</p><p className="text-dark-600 dark:text-dark-300">{LOCATION}</p></div></div>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-premium border-2 border-dark-100 dark:border-dark-700">
            <iframe title="Location Map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.838820730862!2d3.379667314816917!3d6.524406395280242!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8f4fdcbf5b1d%3A0x1f1a6c2d5b7c1b4!2sLagos%2C%20Nigeria!5e0!3m2!1sen!2sng!4v1699999999999!5m2!1sen!2sng" width="100%" height="300" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-bold mb-6">Send us a message</h3>
          <form onSubmit={handleSubmit} className="bg-white dark:bg-dark-800 p-8 rounded-2xl shadow-premium space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div><label className="block text-sm font-medium mb-2">Name *</label><input type="text" name="name" required onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-dark-200 dark:border-dark-700 bg-transparent focus:border-primary-500 focus:outline-none transition-colors" /></div>
              <div><label className="block text-sm font-medium mb-2">Email *</label><input type="email" name="email" required onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-dark-200 dark:border-dark-700 bg-transparent focus:border-primary-500 focus:outline-none transition-colors" /></div>
            </div>
            <div><label className="block text-sm font-medium mb-2">Phone (Optional)</label><input type="tel" name="phone" onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-dark-200 dark:border-dark-700 bg-transparent focus:border-primary-500 focus:outline-none transition-colors" /></div>
            <div><label className="block text-sm font-medium mb-2">Subject *</label><input type="text" name="subject" required onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-dark-200 dark:border-dark-700 bg-transparent focus:border-primary-500 focus:outline-none transition-colors" /></div>
            <div><label className="block text-sm font-medium mb-2">Message *</label><textarea rows="4" name="message" required onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-dark-200 dark:border-dark-700 bg-transparent focus:border-primary-500 focus:outline-none transition-colors resize-none"></textarea></div>
            <div className="flex flex-col sm:flex-row gap-4">
              <button type="submit" name="email" disabled={loading} className="flex-1 justify-center inline-flex items-center px-6 py-3 rounded-full font-semibold bg-primary-500 text-white hover:bg-primary-600 transition-all duration-300 shadow-premium hover:scale-105"><Mail className="w-4 h-4 mr-2" /> {loading ? 'Sending...' : 'Send via Email'}</button>
              <button type="submit" name="whatsapp" disabled={loading} className="flex-1 justify-center inline-flex items-center px-6 py-3 rounded-full font-semibold bg-transparent border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-white transition-all duration-300 hover:scale-105"><FaWhatsapp className="w-4 h-4 mr-2" /> {loading ? 'Sending...' : 'Send via WhatsApp'}</button>
            </div>
          </form>
        </div>
      </div>
    </SectionWrapper>
  );
}