import { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, UploadCloud } from 'lucide-react';

export default function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({
    title: '', description: '', category: '', technologies: '', githubUrl: '', liveUrl: ''
  });
  const [imageUrl, setImageUrl] = useState('');
  const [uploading, setUploading] = useState(false);

  const authToken = localStorage.getItem('adminToken');
  const config = { headers: { Authorization: `Bearer ${authToken}` } };

  // Fetch existing projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/projects');
        setProjects(res.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };
    fetchProjects();
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'my_unsigned_preset');
    data.append('cloud_name', 'xlyyu0bc'); // Correct Cloud Name!

    try {
      const res = await axios.post(`https://api.cloudinary.com/v1_1/xlyyu0bc/image/upload`, data);
      setImageUrl(res.data.secure_url);
      alert('Image uploaded successfully!');
    } catch (error) {
      console.error('Upload error:', error);
      alert('Error uploading image. Check Cloudinary settings.');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/projects', {
        ...formData,
        image: imageUrl,
        technologies: formData.technologies.split(',').map(t => t.trim())
      }, config);
      alert('Project added successfully!');
      window.location.reload();
    } catch (error) {
      alert('Error adding project. Are you logged in?');
    }
  };

  // ★ UPDATED AND FIXED DELETE FUNCTION ★
  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this project?')) {
      try {
        const response = await axios.delete(`http://localhost:5000/api/projects/${id}`, config);
        console.log("Delete successful", response.data);
        setProjects(projects.filter(p => p.id !== id));
      } catch (error) {
        // This will show the EXACT error in your browser console
        console.error("Delete failed:", error.response ? error.response.data : error.message);
        alert('Error deleting project. Check console for details.');
      }
    }
  };

  return (
    <div className="p-6 lg:p-10">
      <h1 className="text-3xl font-bold mb-6">Manage Projects</h1>
      <div className="grid lg:grid-cols-2 gap-8">
        
        {/* Add/Edit Form */}
        <div className="bg-white dark:bg-dark-800 p-6 rounded-2xl shadow-soft">
          <h2 className="text-xl font-bold mb-4">Add New Project</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" name="title" placeholder="Project Title" required onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-dark-200 dark:border-dark-700 bg-transparent" />
            <textarea name="description" placeholder="Description" required onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-dark-200 dark:border-dark-700 bg-transparent"></textarea>
            <input type="text" name="category" placeholder="Category (e.g. Full Stack)" required onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-dark-200 dark:border-dark-700 bg-transparent" />
            <input type="text" name="technologies" placeholder="Technologies (comma separated)" required onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-dark-200 dark:border-dark-700 bg-transparent" />
            
            <div className="border-2 border-dashed border-dark-300 dark:border-dark-700 p-4 rounded-lg text-center">
              <label className="block text-sm font-medium mb-2">Upload Project Image</label>
              <div className="flex flex-col items-center gap-2">
                <UploadCloud className="w-8 h-8 text-primary-500" />
                <input type="file" accept="image/*" onChange={handleFileUpload} className="text-sm" />
              </div>
              {uploading && <p className="text-primary-500 mt-2">Uploading...</p>}
              {imageUrl && <p className="text-green-500 mt-2">Image Uploaded!</p>}
            </div>

            {imageUrl && (
              <img src={imageUrl} alt="Preview" className="w-full h-32 object-cover rounded-lg shadow-soft" />
            )}

            <input type="text" name="githubUrl" placeholder="GitHub Link" onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-dark-200 dark:border-dark-700 bg-transparent" />
            <input type="text" name="liveUrl" placeholder="Live Demo Link" onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-dark-200 dark:border-dark-700 bg-transparent" />
            
            <button type="submit" disabled={uploading || !imageUrl} className="w-full py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-semibold disabled:opacity-50">
              {uploading ? 'Uploading...' : 'Add Project'}
            </button>
          </form>
        </div>

        {/* Existing Projects List */}
        <div className="bg-white dark:bg-dark-800 p-6 rounded-2xl shadow-soft">
          <h2 className="text-xl font-bold mb-4">Existing Projects ({projects.length})</h2>
          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
            {projects.map(project => (
              <div key={project.id} className="flex justify-between items-center border border-dark-100 dark:border-dark-700 p-4 rounded-lg">
                <div className="flex items-center gap-4">
                  <img src={project.image} alt={project.title} className="w-12 h-12 object-cover rounded-lg" />
                  <div>
                    <h3 className="font-bold">{project.title}</h3>
                    <p className="text-sm text-dark-500">{project.category}</p>
                  </div>
                </div>
                <button onClick={() => handleDelete(project.id)} className="text-red-500 hover:bg-red-500/10 p-2 rounded-lg transition-colors">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
            {projects.length === 0 && <p className="text-dark-500">No projects yet.</p>}
          </div>
        </div>

      </div>
    </div>
  );
}