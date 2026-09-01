import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import SectionWrapper from '../components/ui/SectionWrapper';
import SectionHeading from '../components/ui/SectionHeading';
import { MapPin, Calendar } from 'lucide-react';

export default function Experience() {
  const [experiences, setExperiences] = useState([]);

  // Fetch experiences from your backend
  useEffect(() => {
    axios.get('http://localhost:5000/api/experiences')
      .then(res => setExperiences(res.data))
      .catch(err => console.error('Error fetching experiences:', err));
  }, []);

  return (
    <SectionWrapper id="experience" className="pt-32">
      <SectionHeading 
        title="My Professional Journey" 
        subtitle="A timeline of growth, leadership, and delivering exceptional results" 
      />
      
      <div className="relative border-l-2 border-primary-500/30 ml-4 md:ml-6">
        {experiences.length === 0 ? (
          <p className="text-center text-dark-500 py-10">No experiences added yet. Add some from the admin panel!</p>
        ) : (
          experiences.map((exp, index) => (
            <motion.div 
              key={exp.id} 
              initial={{ opacity: 0, x: -30 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              transition={{ duration: 0.5, delay: index * 0.1 }} 
              className="mb-12 ml-8 relative"
            >
              {/* Timeline Dot */}
              <div className="absolute -left-[38px] top-0 w-4 h-4 bg-primary-500 rounded-full border-4 border-white dark:border-dark-950" />
              
              <div className="bg-white dark:bg-dark-800 p-8 rounded-xl shadow-soft hover:shadow-premium transition-all">
                {/* Header: Role & Date */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <h3 className="text-2xl font-bold">{exp.role}</h3>
                  <span className="flex items-center text-sm text-dark-500 dark:text-dark-400 font-medium bg-primary-500/10 px-3 py-1 rounded-full">
                    <Calendar className="w-4 h-4 mr-1" /> {exp.start} - {exp.end}
                  </span>
                </div>

                {/* Company & Location */}
                <div className="flex items-center gap-4 mb-4 text-dark-600 dark:text-dark-300">
                  <span className="font-bold text-primary-500 text-lg">{exp.company}</span>
                  <span className="flex items-center"><MapPin className="w-4 h-4 mr-1" /> {exp.location}</span>
                </div>

                {/* Description */}
                <p className="mb-6 leading-relaxed text-dark-600 dark:text-dark-300">{exp.desc}</p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {exp.tech && exp.tech.map((tech, i) => (
                    <span key={i} className="px-3 py-1 bg-primary-500/10 text-primary-500 rounded-full text-xs font-medium">{tech}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </SectionWrapper>
  );
}