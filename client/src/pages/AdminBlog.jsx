import { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, UploadCloud } from 'lucide-react';

export default function AdminBlog() {
  const [posts, setPosts] = useState([]);
  const [formData, setFormData] = useState({ title: '', excerpt: '', content: '', category: '' });
  const [imageUrl, setImageUrl] = useState(''); // Optional Image
  const [uploading, setUploading] = useState(false);

  const authToken = localStorage.getItem('adminToken');
  const config = { headers: { Authorization: `Bearer ${authToken}` } };

  useEffect(() => {
    axios.get('http://localhost:5000/api/blog').then(res => setPosts(res.data)).catch(console.error);
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  // The EXPERT Cloudinary Upload (Optional)
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'my_unsigned_preset'); 
    data.append('cloud_name', 'xlyyuObc'); // Your Cloud Name

    try {
      const res = await axios.post(`https://api.cloudinary.com/v1_1/xlyyuObc/image/upload`, data);
      setImageUrl(res.data.secure_url);
      alert('Image uploaded successfully!');
    } catch (error) {
      console.error('Upload error:', error);
      alert('Error uploading image. Check preset name.');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Image is optional. If empty, send empty string.
      await axios.post('http://localhost:5000/api/blog', {
        ...formData,
        image: imageUrl 
      }, config);
      alert('Blog added successfully!');
      window.location.reload();
    } catch (error) {
      alert('Error adding blog');
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Delete this blog?')) {
      try {
        await axios.delete(`http://localhost:5000/api/blog/${id}`, config);
        setPosts(posts.filter(p => p.id !== id));
      } catch (error) { alert('Error deleting blog'); }
    }
  };

  return (
    <div className="p-6 lg:p-10">
      <h1 className="text-3xl font-bold mb-6">Manage Blog</h1>
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-dark-800 p-6 rounded-2xl shadow-soft">
          <h2 className="text-xl font-bold mb-4">Add New Post</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" name="title" placeholder="Post Title" required onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-dark-200 dark:border-dark-700 bg-transparent" />
            <textarea name="excerpt" placeholder="Short Summary" required onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-dark-200 dark:border-dark-700 bg-transparent"></textarea>
            <textarea name="content" placeholder="Full Content (write your article here)" required onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-dark-200 dark:border-dark-700 bg-transparent h-40"></textarea>
            <input type="text" name="category" placeholder="Category (e.g. React)" required onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-dark-200 dark:border-dark-700 bg-transparent" />
            
            {/* OPTIONAL Cloudinary Upload Section */}
            <div className="border-2 border-dashed border-dark-300 dark:border-dark-700 p-4 rounded-lg text-center">
              <label className="block text-sm font-medium mb-2">Upload Blog Image <span className="text-dark-500">(Optional)</span></label>
              <div className="flex flex-col items-center gap-2">
                <UploadCloud className="w-8 h-8 text-purple-500" />
                <input type="file" accept="image/*" onChange={handleFileUpload} className="text-sm" />
              </div>
              {uploading && <p className="text-primary-500 mt-2">Uploading...</p>}
              {imageUrl && <p className="text-green-500 mt-2">Image Uploaded!</p>}
            </div>

            {imageUrl && (
              <img src={imageUrl} alt="Preview" className="w-full h-32 object-cover rounded-lg shadow-soft" />
            )}

            <button type="submit" disabled={uploading} className="w-full py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-semibold disabled:opacity-50">
              {uploading ? 'Uploading Image...' : 'Add Blog'}
            </button>
          </form>
        </div>

        {/* List of Posts */}
        <div className="bg-white dark:bg-dark-800 p-6 rounded-2xl shadow-soft">
          <h2 className="text-xl font-bold mb-4">Existing Posts ({posts.length})</h2>
          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
            {posts.map(post => (
              <div key={post.id} className="flex justify-between items-center border border-dark-100 dark:border-dark-700 p-4 rounded-lg">
                <div className="flex items-center gap-4">
                  {/* If no image, show a default icon or text */}
                  {post.image ? (
                    <img src={post.image} alt={post.title} className="w-12 h-12 object-cover rounded-lg" />
                  ) : (
                    <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center text-purple-500 font-bold">B</div>
                  )}
                  <div>
                    <h3 className="font-bold">{post.title}</h3>
                    <p className="text-sm text-dark-500">{post.category}</p>
                  </div>
                </div>
                <button onClick={() => handleDelete(post.id)} className="text-red-500 hover:bg-red-500/10 p-2 rounded-lg transition-colors"><Trash2 className="w-5 h-5" /></button>
              </div>
            ))}
            {posts.length === 0 && <p className="text-dark-500">No blogs yet.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}