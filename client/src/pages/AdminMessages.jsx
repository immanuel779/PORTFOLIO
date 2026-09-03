import { useState, useEffect } from 'react';
import axios from 'axios';
import { Mail, Trash2, CheckCircle } from 'lucide-react';

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/contact`)
      .then(res => setMessages(res.data))
      .catch(console.error);
  }, []);

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this message?')) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/api/contact/${id}`);
        setMessages(messages.filter(m => m.id !== id));
      } catch (error) {
        console.error(error);
        alert('Error deleting message');
      }
    }
  };

  const handleMarkRead = async (id) => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/api/contact/${id}`);
      setMessages(messages.map(m => m.id === id ? { ...m, status: 'read' } : m));
    } catch (error) {
      console.error(error);
      alert('Error updating message');
    }
  };

  return (
    <div className="p-6 lg:p-10">
      <h1 className="text-3xl font-bold mb-6">Messages ({messages.length})</h1>
      <div className="space-y-4">
        {messages.map(msg => (
          <div key={msg.id} className={`bg-white dark:bg-dark-800 p-6 rounded-2xl shadow-soft border-l-4 ${msg.status === 'read' ? 'border-gray-400 opacity-60' : 'border-green-500'}`}>
            <div className="flex justify-between mb-2">
              <h3 className="font-bold">{msg.name}</h3>
              <span className="text-sm text-dark-400">{new Date(msg.createdAt).toLocaleString()}</span>
            </div>
            <p className="text-sm text-dark-500 mb-2">{msg.email}</p>
            <p className="mb-2 font-medium">{msg.subject}</p>
            <p className="text-dark-600 dark:text-dark-300 mb-4">{msg.message}</p>
            <div className="flex gap-3 mt-4 border-t border-dark-100 dark:border-dark-700 pt-4">
              {msg.status !== 'read' && (
                <button onClick={() => handleMarkRead(msg.id)} className="flex items-center gap-2 text-sm bg-green-500/10 text-green-500 px-3 py-2 rounded-lg hover:bg-green-500 hover:text-white transition-colors">
                  <CheckCircle className="w-4 h-4" /> Mark as Read
                </button>
              )}
              <button onClick={() => handleDelete(msg.id)} className="flex items-center gap-2 text-sm bg-red-500/10 text-red-500 px-3 py-2 rounded-lg hover:bg-red-500 hover:text-white transition-colors">
                <Trash2 className="w-4 h-4" /> Delete
              </button>
            </div>
          </div>
        ))}
        {messages.length === 0 && <p className="text-dark-500">No messages yet.</p>}
      </div>
    </div>
  );
}