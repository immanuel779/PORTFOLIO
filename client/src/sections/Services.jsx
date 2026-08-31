import { motion } from 'framer-motion';
import FadeIn from '../ui/FadeIn';
import SectionHeading from '../ui/SectionHeading';

const skillCategories = [
  {
    title: 'Frontend',
    skills: [
      { name: 'React.js', level: 90 },
      { name: 'JavaScript', level: 85 },
      { name: 'Tailwind CSS', level: 95 },
      { name: 'HTML & CSS', level: 95 },
    ],
  },
  {
    title: 'Backend',
    skills: [
      { name: 'Node.js', level: 80 },
      { name: 'Express.js', level: 85 },
      { name: 'REST APIs', level: 90 },
    ],
  },
  {
    title: 'Database & Tools',
    skills: [
      { name: 'MongoDB', level: 85 },
      { name: 'Mongoose', level: 80 },
      { name: 'Git & GitHub', level: 90 },
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-20 bg-light-50 dark:bg-dark-900">
      <div className="container-premium">
        <SectionHeading 
          title="My Skills" 
          subtitle="Technologies and tools I work with to bring ideas to life."
        />

        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category, catIndex) => (
            <FadeIn key={catIndex} delay={catIndex * 0.15}>
              <div className="bg-white dark:bg-dark-800 rounded-2xl p-6 shadow-soft hover:shadow-premium transition-all duration-500 border border-dark-100 dark:border-dark-700 h-full">
                <h3 className="text-xl font-bold text-dark-900 dark:text-white mb-6 flex items-center">
                  <span className="w-2 h-6 bg-gradient-to-b from-primary-500 to-secondary-500 rounded-full mr-3" />
                  {category.title}
                </h3>

                <div className="space-y-6">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex}>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium text-dark-700 dark:text-dark-200">{skill.name}</span>
                        <span className="text-sm text-primary-500 font-semibold">{skill.level}%</span>
                      </div>
                      <div className="h-2 bg-dark-100 dark:bg-dark-700 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.3 + (skillIndex * 0.1) }}
                          className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full shadow-premium"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}