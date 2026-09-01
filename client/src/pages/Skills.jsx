import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import SectionWrapper from '../components/ui/SectionWrapper';
import SectionHeading from '../components/ui/SectionHeading';

export default function Skills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/skills')
      .then(res => {
        setSkills(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching skills:', err);
        setLoading(false);
      });
  }, []);

  return (
    <SectionWrapper id="skills" className="pt-32">
      <SectionHeading 
        title="My Skills" 
        subtitle="Technologies I work with every day" 
      />

      {loading ? (
        <p className="text-center text-2xl text-dark-500">Loading skills...</p>
      ) : skills.length === 0 ? (
        <p className="text-center text-2xl text-dark-500">No skills added yet. Add some from the admin panel!</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-8">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="bg-white dark:bg-dark-800 p-6 rounded-xl shadow-soft"
            >
              <div className="flex justify-between mb-2">
                <span className="font-semibold">{skill.name}</span>
                <span className="text-primary-500">{skill.level}%</span>
              </div>
              <div className="h-2 bg-dark-100 dark:bg-dark-700 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"
                />
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </SectionWrapper>
  );
}