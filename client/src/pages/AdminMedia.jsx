import { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, Copy } from 'lucide-react';

export default function AdminMedia() {
  const [media, setMedia] = useState([]);
  const [url, setUrl] = useState('');

  useEffect(() => { axios.get(`${import.meta.env.VITE_API_URL}/api/media`).then(res => setMedia(res.data)).catch(console.error); }, []);

  const addMedia = async () => {
    if (!url) return;
    await axios.post(`${import.meta.env.VITE_API_URL}/api/media`, { url });
    setUrl('');
    window.location.reload();
  };

  const handleDelete = async (id) => {
    await axios.delete(`${import.meta.env.VITE_API_URL}/api/media/${id}`);
    setMedia(media.filter(m => m.id !== id));
  };

  const handleCopy = (url) => {
    navigator.clipboard.writeText(url);
    alert('Image URL copied!');
  };

  return (
    <div className="p-6 lg:p-10">
      <h1 className="text-3xl font-bold mb-6">Media Library</h1>
      <div className="flex gap-4 mb-8">
        <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="Paste Cloudinary image URL here" className="flex-1 p-3 rounded-lg border bg-transparent" />
        <button onClick={addMedia} className="px-6 bg-primary-500 text-white rounded-lg">Add</button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {media.map(item => (
          <div key={item.id} className="relative group">
            <img src={item.url} alt="Media" className="h-32 w-full object-cover rounded-lg" />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 rounded-lg">
              <button onClick={() => handleCopy(item.url)} className="p-2 bg-white rounded"><Copy className="w-4 h-4" /></button>
              <button onClick={() => handleDelete(item.id)} className="p-2 bg-red-500 text-white rounded"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}