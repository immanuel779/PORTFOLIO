import { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, Copy, UploadCloud } from 'lucide-react';

export default function AdminMedia() {
  const [media, setMedia] = useState([]);
  const [url, setUrl] = useState('');          // for manual URL entry (optional)
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/media`)
      .then(res => setMedia(res.data))
      .catch(console.error);
  }, []);

  // Cloudinary upload handler (same as in AdminProjects)
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'my_unsigned_preset');   // replace with your preset
    data.append('cloud_name', 'xlyyu0bc');                // replace with your cloud name

    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/xlyyu0bc/image/upload`,
        data
      );
      const imageUrl = res.data.secure_url;
      // Save the uploaded image URL to your backend
      await axios.post(`${import.meta.env.VITE_API_URL}/api/media`, { url: imageUrl });
      alert('Image uploaded successfully!');
      setMedia(prev => [{ id: Date.now(), url: imageUrl, createdAt: new Date().toISOString() }, ...prev]);
    } catch (error) {
      console.error('Upload error:', error);
      alert('Error uploading image.');
    } finally {
      setUploading(false);
    }
  };

  // Manual URL add (optional)
  const addMedia = async () => {
    if (!url) return;
    await axios.post(`${import.meta.env.VITE_API_URL}/api/media`, { url });
    setUrl('');
    window.location.reload(); // or update state manually as above
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

      {/* Upload Section */}
      <div className="mb-8">
        <div className="border-2 border-dashed border-dark-300 dark:border-dark-700 p-4 rounded-lg text-center">
          <label className="block text-sm font-medium mb-2">Upload from Gallery</label>
          <div className="flex flex-col items-center gap-2">
            <UploadCloud className="w-8 h-8 text-primary-500" />
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="text-sm"
            />
          </div>
          {uploading && <p className="text-primary-500 mt-2">Uploading...</p>}
        </div>

        {/* Manual URL (optional, keep if you want) */}
        <div className="flex gap-4 mt-4">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Or paste image URL here"
            className="flex-1 p-3 rounded-lg border bg-transparent"
          />
          <button onClick={addMedia} className="px-6 bg-primary-500 text-white rounded-lg">
            Add
          </button>
        </div>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {media.map(item => (
          <div key={item.id} className="relative group">
            <img src={item.url} alt="Media" className="h-32 w-full object-cover rounded-lg" />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 rounded-lg">
              <button onClick={() => handleCopy(item.url)} className="p-2 bg-white rounded">
                <Copy className="w-4 h-4" />
              </button>
              <button onClick={() => handleDelete(item.id)} className="p-2 bg-red-500 text-white rounded">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}