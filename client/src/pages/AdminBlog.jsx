import { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2 } from 'lucide-react';

export default function AdminBlog() {
  const [posts, setPosts] = useState([]);
  const [formData, setFormData] = useState({ title: '', excerpt: '', content: '', category: '', image: '' });
  const authToken = localStorage.getItem('adminToken');
  const config = { headers: { Authorization: `Bearer ${authToken}` } };

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/blog`).then(res => setPosts(res.data)).catch(console.error);
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/blog`, formData, config);
      alert('Blog added successfully!');
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert('Error adding blog');
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Delete this blog?')) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/api/blog/${id}`, config);
        setPosts(posts.filter(p => p.id !== id));
      } catch (error) {
        console.error(error);
        alert('Error deleting blog');
      }
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
            <input type="text" name="image" placeholder="Image URL" onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-dark-200 dark:border-dark-700 bg-transparent" />
            <button type="submit" className="w-full py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-semibold">Add Blog</button>
          </form>
        </div>
        <div className="bg-white dark:bg-dark-800 p-6 rounded-2xl shadow-soft">
          <h2 className="text-xl font-bold mb-4">Existing Posts ({posts.length})</h2>
          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
            {posts.map(post => (
              <div key={post.id} className="flex justify-between items-center border border-dark-100 dark:border-dark-700 p-4 rounded-lg">
                <div><h3 className="font-bold">{post.title}</h3><p className="text-sm text-dark-500">{post.category}</p></div>
                <button onClick={() => handleDelete(post.id)} className="text-red-500 hover:bg-red-500/10 p-2 rounded-lg transition-colors">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
            {posts.length === 0 && <p className="text-dark-500">No blogs yet.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}