import SectionWrapper from '../components/ui/SectionWrapper';
import SectionHeading from '../components/ui/SectionHeading';
import Button from '../components/ui/Button';
import { motion } from 'framer-motion';
import { Code2, Briefcase, Megaphone, Palette, CheckCircle, Rocket, Lightbulb, ShieldCheck } from 'lucide-react';

const roles = [
  {
    icon: Code2,
    title: "Full-Stack Developer",
    desc: "I architect and build scalable, high-performance web applications using React, Node.js, Express, and MongoDB. From clean, responsive frontends to robust backend APIs, I handle the entire stack."
  },
  {
    icon: Briefcase,
    title: "Admin Manager",
    desc: "I bring organizational excellence to every project. My background in administration ensures that timelines are met, communication is clear, and operations run seamlessly behind the scenes."
  },
  {
    icon: Megaphone,
    title: "Social Media Manager",
    desc: "I understand how to build digital presence. I develop targeted strategies, create engaging content, and analyze metrics to help brands grow their audience and boost engagement."
  },
  {
    icon: Palette,
    title: "Creative Specialist",
    desc: "I have a sharp eye for aesthetics, UX/UI principles, and brand identity. I ensure every product I build not only works perfectly but feels visually premium and captivates users."
  }
];

const values = [
  { icon: Rocket, title: "Innovation", desc: "I stay ahead of modern tech trends to bring cutting-edge solutions to my clients." },
  { icon: ShieldCheck, title: "Reliability", desc: "I deliver clean, secure, and maintainable code that you can trust to scale with your business." },
  { icon: Lightbulb, title: "Strategic Thinking", desc: "I don't just code. I think about your business goals, user experience, and how to drive real ROI." }
];

export default function About() {
  return (
    <SectionWrapper id="about" className="pt-32">
      <SectionHeading 
        title="About Me" 
        subtitle="Turning complex problems into elegant digital solutions" 
      />
      
      {/* Section 1: Main Story */}
      <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
        <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
          <h3 className="text-3xl font-bold mb-6">
            Full-Stack Developer, Creative Specialist & Business Problem Solver
          </h3>
          <p className="text-lg text-dark-600 dark:text-dark-300 mb-6 leading-relaxed">
            Hello! I'm <span className="gradient-text font-semibold">Oluwadamilare Opeyemi</span>—a passionate and versatile professional based in Lagos/Ogun, Nigeria. I am not just a developer; I am a hybrid talent with a proven background in Administration and Social Media Management.
          </p>
          <p className="text-lg text-dark-600 dark:text-dark-300 mb-6 leading-relaxed">
            My journey began with a deep curiosity for how technology shapes business. Over the last 3+ years, I have mastered the art of building premium, high-performance web applications. But more importantly, I have learned how to bridge the gap between technical execution and business strategy.
          </p>
          <p className="text-lg text-dark-600 dark:text-dark-300 mb-8 leading-relaxed">
            Because I understand the backend of operations and the frontend of marketing, I build websites and apps that don't just look good—they actively drive sales, streamline workflows, and enhance brand authority. When you hire me, you're not just hiring a coder; you're hiring a partner dedicated to your growth.
          </p>
          <Button to="/projects" variant="primary">View My Work</Button>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="grid grid-cols-2 gap-6">
          <div className="bg-white dark:bg-dark-800 p-8 rounded-xl shadow-premium text-center">
            <p className="text-5xl font-bold gradient-text">10+</p>
            <p className="text-sm mt-3 font-medium">Projects Completed</p>
          </div>
          <div className="bg-white dark:bg-dark-800 p-8 rounded-xl shadow-premium text-center">
            <p className="text-5xl font-bold gradient-text">15+</p>
            <p className="text-sm mt-3 font-medium">Technologies Mastered</p>
          </div>
          <div className="bg-white dark:bg-dark-800 p-8 rounded-xl shadow-premium text-center">
            <p className="text-5xl font-bold gradient-text">3+</p>
            <p className="text-sm mt-3 font-medium">Years of Experience</p>
          </div>
          <div className="bg-white dark:bg-dark-800 p-8 rounded-xl shadow-premium text-center">
            <p className="text-5xl font-bold gradient-text">8+</p>
            <p className="text-sm mt-3 font-medium">Happy Clients</p>
          </div>
        </motion.div>
      </div>

      {/* Section 2: What I Do (The Hybrid Advantage) */}
      <div className="mb-20">
        <h3 className="text-3xl font-bold text-center mb-12">The Hybrid Advantage: What I Bring to the Table</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {roles.map((role, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-dark-800 p-6 rounded-2xl shadow-soft hover:shadow-premium transition-all duration-300 hover:-translate-y-2"
            >
              <div className="w-14 h-14 rounded-xl bg-primary-500/10 flex items-center justify-center mb-6 text-primary-500">
                <role.icon className="w-7 h-7" />
              </div>
              <h4 className="text-lg font-bold mb-3">{role.title}</h4>
              <p className="text-dark-600 dark:text-dark-300 text-sm leading-relaxed">{role.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Section 3: My Mission & Values */}
      <div className="mb-20">
        <h3 className="text-3xl font-bold text-center mb-12">My Mission & Core Values</h3>
        <div className="bg-white dark:bg-dark-800 p-10 rounded-3xl shadow-premium mb-12">
          <p className="text-xl text-dark-600 dark:text-dark-300 text-center leading-relaxed font-medium">
            "My mission is to use technology as a bridge between complex business problems and seamless user experiences. I strive to deliver premium, accessible, and performance-driven digital products that exceed expectations and bring measurable value to the brands I work with."
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 rounded-2xl bg-dark-50 dark:bg-dark-800 border border-dark-100 dark:border-dark-700 text-center"
            >
              <value.icon className="w-10 h-10 text-primary-500 mx-auto mb-4" />
              <h4 className="text-xl font-bold mb-2">{value.title}</h4>
              <p className="text-dark-600 dark:text-dark-300">{value.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Section 4: My Tech Stack */}
      <div className="mb-20">
        <h3 className="text-3xl font-bold text-center mb-12">My Professional Tech Stack</h3>
        <div className="flex flex-wrap justify-center gap-3">
          {['React', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS', 'JavaScript (ES6+)', 'Git & GitHub', 'REST APIs', 'Figma', 'Postman', 'HTML5', 'CSS3'].map((tech, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="px-5 py-2 bg-primary-500/10 text-primary-500 dark:text-primary-400 border border-primary-500/20 rounded-full font-medium hover:bg-primary-500 hover:text-white transition-all duration-300 cursor-default"
            >
              {tech}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Final Call to Action */}
      <div className="text-center">
        <h3 className="text-3xl font-bold mb-6">Ready to Build Something Great?</h3>
        <p className="text-lg text-dark-600 dark:text-dark-300 mb-8 max-w-2xl mx-auto">
          Let's discuss how I can help your business thrive in the digital space.
        </p>
        <Button to="/contact" variant="primary">Let's Work Together</Button>
      </div>
    </SectionWrapper>
  );
}