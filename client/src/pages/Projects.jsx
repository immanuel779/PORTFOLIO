import { useState, useEffect } from 'react';
import axios from 'axios';
import SectionWrapper from '../components/ui/SectionWrapper';
import SectionHeading from '../components/ui/SectionHeading';
import Button from '../components/ui/Button';
import { motion } from 'framer-motion';
import { ExternalLink, Star } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch projects from your backend
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/projects');
        setProjects(res.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <SectionWrapper id="projects" className="pt-32">
      <SectionHeading 
        title="Featured Projects" 
        subtitle="A selection of my recent work and what I can build for you" 
      />
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading ? (
          <div className="col-span-full text-center py-20">
            <p className="text-2xl font-semibold text-dark-500">Loading projects...</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="col-span-full text-center py-20">
            <p className="text-2xl font-semibold text-dark-500">No projects added yet. Check back soon!</p>
          </div>
        ) : (
          projects.map((project, index) => (
            <motion.div
              key={project.id || index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-white dark:bg-dark-800 rounded-2xl overflow-hidden shadow-soft hover:shadow-premium transition-all duration-300"
            >
              {/* Featured Badge */}
              {project.featured && (
                <div className="absolute top-4 right-4 z-10 bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center">
                  <Star className="w-3 h-3 mr-1 fill-current" /> Featured
                </div>
              )}

              {/* Image */}
              <div className="h-48 bg-dark-100 dark:bg-dark-700 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/600x400?text=No+Image'; }}
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <span className="text-xs font-semibold text-primary-500 uppercase tracking-wider">{project.category}</span>
                <h3 className="text-xl font-bold mb-2 mt-1">{project.title}</h3>
                <p className="text-dark-600 dark:text-dark-300 mb-4 text-sm">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {(project.technologies || []).map((tech, i) => (
                    <span key={i} className="px-3 py-1 bg-primary-500/10 text-primary-500 rounded-full text-xs font-medium">{tech}</span>
                  ))}
                </div>

                <div className="flex justify-between border-t border-dark-100 dark:border-dark-700 pt-4">
                  <Button href={project.githubUrl} variant="outline"><FaGithub className="w-4 h-4 mr-2" /> Code</Button>
                  <Button href={project.liveUrl} variant="primary"><ExternalLink className="w-4 h-4 mr-2" /> Live Demo</Button>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </SectionWrapper>
  );
}