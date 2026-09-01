import SectionWrapper from '../components/ui/SectionWrapper';
import SectionHeading from '../components/ui/SectionHeading';
import { motion } from 'framer-motion';
import { Code2, Globe, Database, Layers, Wrench, Rocket } from 'lucide-react';

const services = [
  { icon: Globe, title: 'Web Development', desc: 'Modern responsive websites and web applications.' },
  { icon: Code2, title: 'Frontend Development', desc: 'Interactive interfaces using React.' },
  { icon: Database, title: 'Backend Development', desc: 'REST APIs and backend systems using Node.js and Express.' },
  { icon: Layers, title: 'Full-Stack Development', desc: 'Complete web applications from frontend to database.' },
  { icon: Wrench, title: 'Website Maintenance', desc: 'Updates, improvements and bug fixes.' },
  { icon: Rocket, title: 'Creative Solutions', desc: 'Creative strategies and social media management.' },
];

export default function Services() {
  return (
    <SectionWrapper id="services" className="pt-32">
      <SectionHeading title="My Services" subtitle="What I can do for you" />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }} className="bg-white dark:bg-dark-800 p-8 rounded-2xl shadow-soft hover:shadow-premium transition-all duration-300 hover:-translate-y-2 group">
            <div className="w-14 h-14 rounded-xl bg-primary-500/10 flex items-center justify-center mb-6 group-hover:bg-primary-500 group-hover:text-white transition-all duration-300">
              <service.icon className="w-7 h-7 text-primary-500 group-hover:text-white" />
            </div>
            <h3 className="text-xl font-bold mb-3">{service.title}</h3>
            <p className="text-dark-600 dark:text-dark-300">{service.desc}</p>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}