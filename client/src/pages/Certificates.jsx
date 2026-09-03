import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import SectionWrapper from '../components/ui/SectionWrapper';
import SectionHeading from '../components/ui/SectionHeading';
import { Award, ExternalLink, Calendar } from 'lucide-react';

export default function Certificates() {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ✅ FIXED: Uses live backend
    axios.get(`${import.meta.env.VITE_API_URL}/api/certificates`)
      .then(res => {
        setCertificates(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching certificates:', err);
        setLoading(false);
      });
  }, []);

  return (
    <SectionWrapper id="certificates" className="pt-32">
      <SectionHeading title="My Certifications" subtitle="Professional certifications and courses I have completed" />
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading ? (
          <p className="col-span-full text-center text-2xl text-dark-500">Loading certificates...</p>
        ) : certificates.length === 0 ? (
          <p className="col-span-full text-center text-2xl text-dark-500">No certificates added yet. Check back soon!</p>
        ) : (
          certificates.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-white dark:bg-dark-800 rounded-2xl overflow-hidden shadow-soft hover:shadow-premium transition-all duration-300 hover:-translate-y-2 flex flex-col"
            >
              <div className="h-48 bg-dark-100 dark:bg-dark-700 overflow-hidden flex items-center justify-center">
                {cert.image ? (
                  <img src={cert.image} alt={cert.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                ) : (
                  <Award className="w-20 h-20 text-primary-500/30" />
                )}
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-2">
                  <span className="px-3 py-1 bg-primary-500/10 text-primary-500 rounded-full text-xs font-medium">{cert.year || 'Recent'}</span>
                  <span className="flex items-center text-sm text-dark-500 dark:text-dark-400"><Calendar className="w-4 h-4 mr-1" /> {cert.year}</span>
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary-500 transition-colors">{cert.title}</h3>
                <p className="text-dark-600 dark:text-dark-300 mb-4">Issued by <span className="font-semibold text-primary-500">{cert.issuer}</span></p>
                {cert.link && (
                  <a href={cert.link} target="_blank" rel="noopener noreferrer" className="mt-auto inline-flex items-center text-sm font-medium text-primary-500 hover:underline">
                    <ExternalLink className="w-4 h-4 mr-2" /> Verify Credential
                  </a>
                )}
              </div>
            </motion.div>
          ))
        )}
      </div>
    </SectionWrapper>
  );
}