import FadeIn from '../ui/FadeIn';
import SectionHeading from '../ui/SectionHeading';
import { Code2, Users, Briefcase, Award } from 'lucide-react';

const stats = [
  { icon: Code2, value: '50+', label: 'Projects Completed' },
  { icon: Users, value: '30+', label: 'Happy Clients' },
  { icon: Briefcase, value: '3+', label: 'Years Experience' },
  { icon: Award, value: '15+', label: 'Technologies' },
];

export default function About() {
  return (
    <section id="about" className="py-20 relative overflow-hidden">
      {/* Background glows */}
      <div className="absolute top-1/3 left-0 w-72 h-72 bg-secondary-500/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-500/10 rounded-full blur-[100px]" />

      <div className="container-premium relative z-10">
        <SectionHeading 
          title="About Me" 
          subtitle="Passionate about building elegant, performant web applications that solve real problems."
        />

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Text */}
          <FadeIn direction="right">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-dark-900 dark:text-white">
                A Developer Who Cares About <span className="gradient-text">Details</span>
              </h3>
              <p className="text-dark-600 dark:text-dark-300 leading-relaxed">
                I'm a Full-Stack Developer with a passion for creating seamless digital experiences. 
                My journey started with HTML and CSS, and quickly evolved into building complex 
                applications with React, Node.js, and MongoDB. I focus on writing clean, maintainable 
                code and delivering products that exceed expectations.
              </p>
              <p className="text-dark-600 dark:text-dark-300 leading-relaxed">
                Whether it's a sleek landing page or a full-scale SaaS application, I bring precision, 
                creativity, and technical excellence to every project. Let's build something amazing together!
              </p>
              <div className="flex flex-wrap gap-2">
                {['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind', 'REST APIs'].map((tech) => (
                  <span key={tech} className="px-3 py-1 bg-primary-500/10 text-primary-500 dark:text-primary-400 rounded-full text-sm font-medium">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Right - Stats Grid */}
          <FadeIn direction="left" delay={0.2}>
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="relative group">
                  <div className="bg-white dark:bg-dark-800 rounded-2xl p-6 text-center shadow-soft hover:shadow-premium transition-all duration-500 hover:-translate-y-2 border border-dark-100 dark:border-dark-700">
                    <div className="inline-flex p-3 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300">
                      <stat.icon className="w-6 h-6 text-primary-500" />
                    </div>
                    <p className="text-3xl font-extrabold text-dark-900 dark:text-white">{stat.value}</p>
                    <p className="text-sm text-dark-500 dark:text-dark-400 mt-1">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}