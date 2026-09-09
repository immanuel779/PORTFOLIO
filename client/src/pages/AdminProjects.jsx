import { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, UploadCloud, Pencil, X, CheckCircle } from 'lucide-react';

export default function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({
    title: '', description: '', category: '', technologies: '', githubUrl: '', liveUrl: '', id: ''
  });
  const [imageUrl, setImageUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const authToken = localStorage.getItem('adminToken');
  const config = { headers: { Authorization: `Bearer ${authToken}` } };

  // Fetch existing projects
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/projects`)
      .then(res => setProjects(res.data))
      .catch(console.error);
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  // Cloudinary Upload
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'my_unsigned_preset');
    data.append('cloud_name', 'xlyyu0bc');

    try {
      const res = await axios.post(`https://api.cloudinary.com/v1_1/xlyyu0bc/image/upload`, data);
      setImageUrl(res.data.secure_url);
      alert('Image uploaded successfully!');
    } catch (error) {
      console.error('Upload error:', error);
      alert('Error uploading image.');
    } finally {
      setUploading(false);
    }
  };

  // Function to trigger EDIT mode
  const handleEdit = (project) => {
    setIsEditing(true);
    setFormData({
      id: project.id,
      title: project.title || '',
      description: project.description || '',
      category: project.category || '',
      technologies: (project.technologies || []).join(', '),
      githubUrl: project.githubUrl || '',
      liveUrl: project.liveUrl || ''
    });
    setImageUrl(project.image || '');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cancel edit
  const handleCancelEdit = () => {
    setIsEditing(false);
    setFormData({ title: '', description: '', category: '', technologies: '', githubUrl: '', liveUrl: '', id: '' });
    setImageUrl('');
  };

  // Handle Add or Update
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        image: imageUrl,
        technologies: formData.technologies.split(',').map(t => t.trim())
      };

      if (isEditing) {
        // Update existing project
        await axios.put(`${import.meta.env.VITE_API_URL}/api/projects/${formData.id}`, payload, config);
        alert('Project updated successfully!');
      } else {
        // Add new project
        await axios.post(`${import.meta.env.VITE_API_URL}/api/projects`, payload, config);
        alert('Project added successfully!');
      }
      window.location.reload();
    } catch (error) {
      console.error('Error saving project:', error);
      alert('Error saving project. Are you logged in?');
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this project?')) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/api/projects/${id}`, config);
        setProjects(projects.filter(p => p.id !== id));
      } catch (error) {
        console.error('Error deleting project:', error);
        alert('Error deleting project');
      }
    }
  };

  return (
    <div className="p-6 lg:p-10">
      <h1 className="text-3xl font-bold mb-6">Manage Projects</h1>

      {/* EDIT/ADD FORM */}
      <div className="bg-white dark:bg-dark-800 p-6 rounded-2xl shadow-soft mb-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            {isEditing ? 'Edit Project' : 'Add New Project'}
          </h2>
          {isEditing && (
            <button onClick={handleCancelEdit} className="text-red-500 flex items-center gap-2 hover:underline">
              <X className="w-4 h-4" /> Cancel Edit
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <input type="text" name="title" placeholder="Project Title" required value={formData.title} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-dark-200 dark:border-dark-700 bg-transparent" />
            <input type="text" name="category" placeholder="Category (e.g. Full Stack)" required value={formData.category} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-dark-200 dark:border-dark-700 bg-transparent" />
          </div>
          <textarea name="description" placeholder="Project Description" required value={formData.description} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-dark-200 dark:border-dark-700 bg-transparent h-24"></textarea>
          <input type="text" name="technologies" placeholder="Technologies (comma separated)" required value={formData.technologies} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-dark-200 dark:border-dark-700 bg-transparent" />

          {/* Image Upload */}
          <div className="border-2 border-dashed border-dark-300 dark:border-dark-700 p-4 rounded-lg text-center">
            <label className="block text-sm font-medium mb-2">Project Image</label>
            <div className="flex flex-col items-center gap-2">
              <UploadCloud className="w-8 h-8 text-primary-500" />
              <input type="file" accept="image/*" onChange={handleFileUpload} className="text-sm" />
            </div>
            {uploading && <p className="text-primary-500 mt-2">Uploading...</p>}
          </div>

          {imageUrl && (
            <img src={imageUrl} alt="Preview" className="w-full h-32 object-cover rounded-lg shadow-soft" />
          )}

          {/* Links (The important part!) */}
          <div className="grid md:grid-cols-2 gap-4">
            <input type="text" name="githubUrl" placeholder="GitHub Link (e.g. https://github.com/...)" value={formData.githubUrl} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-dark-200 dark:border-dark-700 bg-transparent" />
            <input type="text" name="liveUrl" placeholder="Live Demo Link (e.g. https://...)" value={formData.liveUrl} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-dark-200 dark:border-dark-700 bg-transparent" />
          </div>

          <button type="submit" disabled={uploading} className="w-full py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-semibold disabled:opacity-50">
            {isEditing ? 'Update Project' : 'Add Project'}
          </button>
        </form>
      </div>

      {/* PROJECTS LIST */}
      <div className="bg-white dark:bg-dark-800 p-6 rounded-2xl shadow-soft">
        <h2 className="text-xl font-bold mb-4">Existing Projects ({projects.length})</h2>
        <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
          {projects.map(project => (
            <div key={project.id} className="flex justify-between items-center border border-dark-100 dark:border-dark-700 p-4 rounded-lg">
              <div className="flex items-center gap-4">
                {project.image && <img src={project.image} alt={project.title} className="w-12 h-12 object-cover rounded-lg" />}
                <div>
                  <h3 className="font-bold">{project.title}</h3>
                  <p className="text-sm text-dark-500">{project.category}</p>
                  {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-500 hover:underline">GitHub</a>}
                  {project.liveUrl && <span> | </span>}
                  {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-500 hover:underline">Live</a>}
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(project)} className="text-blue-500 hover:bg-blue-500/10 p-2 rounded-lg transition-colors">
                  <Pencil className="w-5 h-5" />
                </button>
                <button onClick={() => handleDelete(project.id)} className="text-red-500 hover:bg-red-500/10 p-2 rounded-lg transition-colors">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
          {projects.length === 0 && <p className="text-dark-500">No projects yet.</p>}
        </div>
      </div>
    </div>
  );
}