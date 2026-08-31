import FadeIn from '../ui/FadeIn';
import SectionHeading from '../ui/SectionHeading';
import { Briefcase, MapPin, Calendar } from 'lucide-react';

const experiences = [
  {
    position: 'Full-Stack Developer',
    company: 'Freelance',
    location: 'Remote',
    startDate: '2024',
    endDate: 'Present',
    description: 'Building premium web applications for clients. Specializing in the MERN stack with a focus on performance and user experience.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Tailwind'],
  },
  {
    position: 'Frontend Developer',
    company: 'Tech Company',
    location: 'Lagos, Nigeria',
    startDate: '2023',
    endDate: '2024',
    description: 'Developed responsive interfaces and improved site performance. Collaborated with designers to implement pixel-perfect designs.',
    technologies: ['React', 'CSS', 'JavaScript'],
  },
  {
    position: 'Web Developer (Intern)',
    company: 'Digital Agency',
    location: 'Remote',
    startDate: '2022',
    endDate: '2023',
    description: 'Assisted in building websites and learning modern web development practices. Gained hands-on experience with HTML, CSS, and JavaScript.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-20 bg-light-50 dark:bg-dark-900">
      <div className="container-premium">
        <SectionHeading 
          title="Work Experience" 
          subtitle="My professional journey and the roles that shaped my career."
        />

        <div className="relative max-w-3xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-4 sm:left-1/2 sm:transform sm:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 to-secondary-500" />

          {experiences.map((exp, index) => (
            <FadeIn key={index} delay={index * 0.15} direction={index % 2 === 0 ? 'left' : 'right'}>
              <div className={`relative mb-12 pl-12 sm:pl-0 sm:w-1/2 ${index % 2 === 0 ? 'sm:pr-8 sm:text-right' : 'sm:ml-auto sm:pl-8'}`}>
                {/* Timeline dot */}
                <div className={`absolute top-0 ${index % 2 === 0 ? 'left-4 sm:left-auto sm:-right-2' : 'left-4 sm:-left-2'} w-4 h-4 bg-primary-500 rounded-full border-4 border-white dark:border-dark-900 shadow-premium`} />

                <div className="bg-white dark:bg-dark-800 rounded-2xl p-6 shadow-soft hover:shadow-premium transition-all duration-500 border border-dark-100 dark:border-dark-700">
                  <div className={`flex items-center gap-2 mb-3 ${index % 2 === 0 ? 'sm:justify-end' : ''}`}>
                    <Briefcase className="w-5 h-5 text-primary-500" />
                    <h3 className="text-lg font-bold text-dark-900 dark:text-white">{exp.position}</h3>
                  </div>
                  
                  <p className="text-primary-500 font-medium mb-2">{exp.company}</p>
                  
                  <div className={`flex flex-wrap gap-3 mb-3 text-sm text-dark-500 dark:text-dark-400 ${index % 2 === 0 ? 'sm:justify-end' : ''}`}>
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {exp.location}</span>
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {exp.startDate} - {exp.endDate}</span>
                  </div>
                  
                  <p className="text-dark-600 dark:text-dark-300 mb-4 leading-relaxed">{exp.description}</p>
                  
                  <div className={`flex flex-wrap gap-2 ${index % 2 === 0 ? 'sm:justify-end' : ''}`}>
                    {exp.technologies.map((tech) => (
                      <span key={tech} className="px-2 py-1 bg-primary-500/10 text-primary-500 dark:text-primary-400 rounded text-xs font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}