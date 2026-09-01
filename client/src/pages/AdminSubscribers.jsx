import { useState, useEffect } from 'react';
import axios from 'axios';
import { Mail, Trash2 } from 'lucide-react';

export default function AdminSubscribers() {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/newsletter');
        setSubscribers(res.data);
      } catch (error) {
        console.error('Error fetching subscribers:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSubscribers();
  }, []);

  const handleDelete = async (id) => {
    if (confirm('Remove this subscriber?')) {
      try {
        await axios.delete(`http://localhost:5000/api/newsletter/${id}`);
        setSubscribers(subscribers.filter(s => s.id !== id));
      } catch (error) {
        alert('Error deleting subscriber');
      }
    }
  };

  if (loading) return <div className="pt-40 text-center text-2xl">Loading subscribers...</div>;

  return (
    <div className="p-6 lg:p-10">
      <h1 className="text-3xl font-bold mb-6">Newsletter Subscribers ({subscribers.length})</h1>
      <div className="space-y-4">
        {subscribers.map(sub => (
          <div key={sub.id} className="flex items-center justify-between bg-white dark:bg-dark-800 p-4 rounded-2xl shadow-soft border-l-4 border-primary-500">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-500/10 flex items-center justify-center text-primary-500">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold">{sub.email}</p>
                <p className="text-sm text-dark-500">{new Date(sub.createdAt).toLocaleString()}</p>
              </div>
            </div>
            <button onClick={() => handleDelete(sub.id)} className="text-red-500 hover:bg-red-500/10 p-2 rounded-lg transition-colors">
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        ))}
        {subscribers.length === 0 && <p className="text-dark-500">No subscribers yet. Test the footer form!</p>}
      </div>
    </div>
  );
}