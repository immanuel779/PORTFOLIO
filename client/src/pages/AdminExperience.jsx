import { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2 } from 'lucide-react';

export default function AdminExperience() {
  const [experiences, setExperiences] = useState([]);
  const [formData, setFormData] = useState({
    role: '',
    company: '',
    location: '',
    start: '',
    end: '',
    desc: '',
    tech: ''
  });

  useEffect(() => {
    axios.get('http://localhost:5000/api/experiences')
      .then(res => setExperiences(res.data))
      .catch(console.error);
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/experiences', {
        ...formData,
        tech: formData.tech.split(',').map(t => t.trim())
      });
      alert('Experience added!');
      window.location.reload();
    } catch (error) {
      alert('Error adding experience');
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Delete this experience?')) {
      try {
        await axios.delete(`http://localhost:5000/api/experiences/${id}`);
        setExperiences(experiences.filter(exp => exp.id !== id));
      } catch (error) {
        alert('Error deleting experience');
      }
    }
  };

  return (
    <div className="p-6 lg:p-10">
      <h1 className="text-3xl font-bold mb-6">Manage Experience</h1>
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Form */}
        <div className="bg-white dark:bg-dark-800 p-6 rounded-2xl shadow-soft">
          <h2 className="text-xl font-bold mb-4">Add New Experience</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" name="role" placeholder="Job Title" required onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-dark-200 dark:border-dark-700 bg-transparent" />
            <input type="text" name="company" placeholder="Company" required onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-dark-200 dark:border-dark-700 bg-transparent" />
            <input type="text" name="location" placeholder="Location" required onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-dark-200 dark:border-dark-700 bg-transparent" />
            <div className="grid grid-cols-2 gap-4">
              <input type="text" name="start" placeholder="Start (e.g. 2020)" required onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-dark-200 dark:border-dark-700 bg-transparent" />
              <input type="text" name="end" placeholder="End (e.g. Present)" required onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-dark-200 dark:border-dark-700 bg-transparent" />
            </div>
            <textarea name="desc" placeholder="Description" required onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-dark-200 dark:border-dark-700 bg-transparent h-24"></textarea>
            <input type="text" name="tech" placeholder="Technologies (comma separated)" onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-dark-200 dark:border-dark-700 bg-transparent" />
            <button type="submit" className="w-full py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-semibold">Add Experience</button>
          </form>
        </div>

        {/* List */}
        <div className="bg-white dark:bg-dark-800 p-6 rounded-2xl shadow-soft">
          <h2 className="text-xl font-bold mb-4">Existing Experiences ({experiences.length})</h2>
          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
            {experiences.map(exp => (
              <div key={exp.id} className="flex justify-between items-center border border-dark-100 dark:border-dark-700 p-4 rounded-lg">
                <div>
                  <h3 className="font-bold">{exp.role}</h3>
                  <p className="text-sm text-dark-500">{exp.company} • {exp.start} - {exp.end}</p>
                </div>
                <button onClick={() => handleDelete(exp.id)} className="text-red-500 hover:bg-red-500/10 p-2 rounded-lg transition-colors">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
            {experiences.length === 0 && <p className="text-dark-500">No experiences yet.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}