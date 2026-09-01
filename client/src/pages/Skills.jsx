import { motion } from "framer-motion";
import SectionHeading from "../components/ui/SectionHeading";

const skills = [
  { name: 'HTML', level: 90 }, { name: 'CSS', level: 85 }, { name: 'JavaScript', level: 88 },
  { name: 'React', level: 90 }, { name: 'Tailwind CSS', level: 92 }, { name: 'Node.js', level: 80 },
  { name: 'Express.js', level: 78 }, { name: 'MongoDB', level: 75 }, { name: 'Git & GitHub', level: 85 },
];

export default function Skills() {
  return (
    <div className="py-20">
      <SectionHeading title="My Skills" subtitle="Technologies I work with" />
      <div className="grid md:grid-cols-2 gap-8">
        {skills.map((skill, index) => (
          <motion.div key={index} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: index * 0.05 }} className="bg-white dark:bg-dark-800 p-6 rounded-xl shadow-soft">
            <div className="flex justify-between mb-2"><span className="font-semibold">{skill.name}</span><span className="text-primary-500">{skill.level}%</span></div>
            <div className="h-2 bg-dark-100 dark:bg-dark-700 rounded-full overflow-hidden">
              <motion.div initial={{ width: 0 }} whileInView={{ width: `${skill.level}%` }} transition={{ duration: 1, delay: 0.2 }} className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}