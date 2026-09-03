import { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2 } from 'lucide-react';

export default function AdminSkills() {
  const [skills, setSkills] = useState([]);
  const [name, setName] = useState('');
  const [level, setLevel] = useState('');

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/skills`)
      .then(res => setSkills(res.data))
      .catch(console.error);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/skills`, { name, level: Number(level) });
      alert('Skill added!');
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert('Error adding skill');
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Delete this skill?')) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/api/skills/${id}`);
        setSkills(skills.filter(s => s.id !== id));
      } catch (error) {
        console.error(error);
        alert('Error deleting skill');
      }
    }
  };

  return (
    <div className="p-6 lg:p-10">
      <h1 className="text-3xl font-bold mb-6">Manage Skills</h1>
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-dark-800 p-6 rounded-2xl shadow-soft">
          <h2 className="text-xl font-bold mb-4">Add Skill</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" name="name" placeholder="Skill (e.g. React)" required onChange={(e) => setName(e.target.value)} className="w-full px-4 py-2 rounded-lg border border-dark-200 dark:border-dark-700 bg-transparent" />
            <input type="number" name="level" placeholder="Level (1-100)" required onChange={(e) => setLevel(e.target.value)} className="w-full px-4 py-2 rounded-lg border border-dark-200 dark:border-dark-700 bg-transparent" />
            <button type="submit" className="w-full py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-semibold">Add Skill</button>
          </form>
        </div>
        <div className="bg-white dark:bg-dark-800 p-6 rounded-2xl shadow-soft">
          <h2 className="text-xl font-bold mb-4">Existing Skills</h2>
          {skills.map(skill => (
            <div key={skill.id} className="flex justify-between items-center border border-dark-100 dark:border-dark-700 p-3 rounded-lg mb-2">
              <span>{skill.name} - {skill.level}%</span>
              <button onClick={() => handleDelete(skill.id)} className="text-red-500"><Trash2 className="w-5 h-5" /></button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}