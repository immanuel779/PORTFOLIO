import { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, UploadCloud } from 'lucide-react';

export default function AdminCertificates() {
  const [certificates, setCertificates] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    issuer: '',
    year: '',
    link: ''
  });
  const [imageUrl, setImageUrl] = useState('');
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:5000/api/certificates')
      .then(res => setCertificates(res.data))
      .catch(console.error);
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  // Cloudinary Upload Handler
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'my_unsigned_preset');
    data.append('cloud_name', 'xlyyu0bc'); // Your Cloudinary Cloud Name

    try {
      const res = await axios.post(`https://api.cloudinary.com/v1_1/xlyyu0bc/image/upload`, data);
      setImageUrl(res.data.secure_url);
      alert('Certificate image uploaded successfully!');
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
      await axios.post('http://localhost:5000/api/certificates', {
        ...formData,
        image: imageUrl // Includes the uploaded image URL
      });
      alert('Certificate added!');
      window.location.reload();
    } catch (error) {
      alert('Error adding certificate');
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Delete this certificate?')) {
      try {
        await axios.delete(`http://localhost:5000/api/certificates/${id}`);
        setCertificates(certificates.filter(cert => cert.id !== id));
      } catch (error) {
        alert('Error deleting certificate');
      }
    }
  };

  return (
    <div className="p-6 lg:p-10">
      <h1 className="text-3xl font-bold mb-6">Manage Certificates</h1>
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Form */}
        <div className="bg-white dark:bg-dark-800 p-6 rounded-2xl shadow-soft">
          <h2 className="text-xl font-bold mb-4">Add New Certificate</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" name="title" placeholder="Certificate Title" required onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-dark-200 dark:border-dark-700 bg-transparent" />
            <input type="text" name="issuer" placeholder="Issuer (e.g. Google)" required onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-dark-200 dark:border-dark-700 bg-transparent" />
            <input type="text" name="year" placeholder="Year (e.g. 2024)" required onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-dark-200 dark:border-dark-700 bg-transparent" />
            
            {/* Cloudinary Upload Section */}
            <div className="border-2 border-dashed border-dark-300 dark:border-dark-700 p-4 rounded-lg text-center">
              <label className="block text-sm font-medium mb-2">Upload Certificate Image</label>
              <div className="flex flex-col items-center gap-2">
                <UploadCloud className="w-8 h-8 text-primary-500" />
                <input type="file" accept="image/*" onChange={handleFileUpload} className="text-sm" />
              </div>
              {uploading && <p className="text-primary-500 mt-2">Uploading...</p>}
              {imageUrl && <p className="text-green-500 mt-2">Image Uploaded!</p>}
            </div>

            {imageUrl && (
              <img src={imageUrl} alt="Certificate Preview" className="w-full h-32 object-cover rounded-lg shadow-soft" />
            )}

            <input type="text" name="link" placeholder="Verification Link (optional)" onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-dark-200 dark:border-dark-700 bg-transparent" />
            <button type="submit" disabled={uploading || !imageUrl} className="w-full py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-semibold disabled:opacity-50">
              {uploading ? 'Uploading...' : 'Add Certificate'}
            </button>
          </form>
        </div>

        {/* List */}
        <div className="bg-white dark:bg-dark-800 p-6 rounded-2xl shadow-soft">
          <h2 className="text-xl font-bold mb-4">Existing Certificates ({certificates.length})</h2>
          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
            {certificates.map(cert => (
              <div key={cert.id} className="flex justify-between items-center border border-dark-100 dark:border-dark-700 p-4 rounded-lg">
                <div className="flex items-center gap-4">
                  {cert.image && (
                    <img src={cert.image} alt={cert.title} className="w-12 h-12 object-cover rounded-lg" />
                  )}
                  <div>
                    <h3 className="font-bold">{cert.title}</h3>
                    <p className="text-sm text-dark-500">{cert.issuer} • {cert.year}</p>
                  </div>
                </div>
                <button onClick={() => handleDelete(cert.id)} className="text-red-500 hover:bg-red-500/10 p-2 rounded-lg transition-colors">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
            {certificates.length === 0 && <p className="text-dark-500">No certificates yet.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}