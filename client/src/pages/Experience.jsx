import { motion } from "framer-motion";
import SectionHeading from "../components/ui/SectionHeading";
import { MapPin, Calendar, Award, TrendingUp } from "lucide-react";

const experiences = [
  {
    role: "Senior Full-Stack Developer",
    company: "Freelance / Remote",
    location: "Lagos, Nigeria",
    start: "2022",
    end: "Present",
    desc: "Spearheading the end-to-end development of 10+ premium web applications for global clients. Managed the complete SDLC from requirement gathering to deployment, utilizing React, Node.js, Express, and MongoDB. Architected RESTful APIs and implemented JWT authentication, resulting in an average 40% improvement in application load times and a 98% client satisfaction rate.",
    tech: ["React", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"]
  },
  {
    role: "Administrative Manager",
    company: "Tech Startup",
    location: "Remote",
    start: "2021",
    end: "2023",
    desc: "Orchestrated daily office operations and cross-functional team coordination to ensure seamless business flow. Implemented data-driven administrative strategies and automated reporting systems, reducing operational bottlenecks by 20% and cutting monthly overhead costs by 15%. Managed executive schedules and client communications.",
    tech: ["Operations", "Team Leadership", "Process Optimization"]
  },
  {
    role: "Social Media & Content Strategist",
    company: "Creative Agency",
    location: "Ogun, Nigeria",
    start: "2020",
    end: "2022",
    desc: "Crafted and executed comprehensive digital marketing strategies for 6 major brands, boosting their online visibility and audience engagement by over 60% within the first year. Developed viral content campaigns and managed paid advertisements across multiple platforms. Merged creative storytelling with data analytics to drive real business growth.",
    tech: ["Strategy", "Content Creation", "Analytics", "Branding"]
  },
  {
    role: "UI/UX Designer & Creative Specialist",
    company: "Creative Agency",
    location: "Ogun, Nigeria",
    start: "2020",
    end: "2021",
    desc: "Designed user-centric interfaces, wireframes, and high-fidelity prototypes using Figma and Adobe XD. Collaborated closely with developers to ensure pixel-perfect implementation and seamless user experience across mobile, tablet, and desktop devices. Focused heavily on modern minimalism, accessibility, and conversion-optimized design.",
    tech: ["Figma", "Adobe XD", "Wireframing", "Prototyping"]
  },
  {
    role: "IT Support & Maintenance Specialist",
    company: "Various Local Businesses",
    location: "Lagos/Ogun, Nigeria",
    start: "2019",
    end: "2020",
    desc: "Provided comprehensive technical support, system upgrades, and website maintenance to small and medium-sized enterprises. Diagnosed and resolved critical bugs and server issues, ensuring 99.9% uptime. Transformed legacy systems into modern, secure web platforms, making technology more accessible and reliable for non-technical business owners.",
    tech: ["Web Maintenance", "Troubleshooting", "Security", "Legacy Systems"]
  },
];

export default function Experience() {
  return (
    <div className="py-20">
      <SectionHeading 
        title="My Professional Journey" 
        subtitle="A timeline of growth, leadership, and delivering exceptional results" 
      />
      
      <div className="relative border-l-2 border-primary-500/30 ml-4 md:ml-6">
        {experiences.map((exp, index) => (
          <motion.div 
            key={index} 
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

              {/* Achievement Badge (Visual Sparkle) */}
              <div className="flex items-center gap-2 mb-4 text-green-500 dark:text-green-400 font-medium text-sm">
                <Award className="w-4 h-4" /> Key contributions include streamlining processes and boosting efficiency.
              </div>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2">
                {exp.tech.map((tech, i) => (
                  <span key={i} className="px-3 py-1 bg-primary-500/10 text-primary-500 rounded-full text-xs font-medium">{tech}</span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}