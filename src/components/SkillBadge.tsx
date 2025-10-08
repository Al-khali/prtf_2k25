'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import TechIcon from './TechIcon';

interface SkillCategory {
  name: string;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    name: 'Data Engineering',
    skills: ['Python', 'Spark', 'Airflow', 'dbt', 'BigQuery', 'Snowflake', 'Kafka'],
  },
  {
    name: 'Backend',
    skills: ['Node.js', 'FastAPI', 'PostgreSQL', 'Redis', 'Docker', 'Kubernetes'],
  },
  {
    name: 'Frontend',
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind', 'Three.js', 'Framer'],
  },
  {
    name: 'AI/ML',
    skills: ['PyTorch', 'TensorFlow', 'scikit-learn', 'Pandas', 'NumPy'],
  },
  {
    name: 'Tools',
    skills: ['Git', 'GitHub', 'VS Code', 'Neovim', 'Linux', 'Terminal'],
  },
];

const metrics = [
  { label: '500K+', description: 'Lines of Code' },
  { label: '50+', description: 'Projects Shipped' },
  { label: '∞', description: 'Coffee Consumed' },
  { label: '9999+', description: 'Bugs Fixed' },
];

/**
 * SkillBadge - Technology stack display with real icons
 * Uses react-icons for professional tech logos
 */
export default function SkillBadge() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <div ref={ref} className="space-y-12">
      {/* Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {metrics.map((metric, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            className="bg-white/5 backdrop-blur-sm p-6 text-center rounded-xl border border-white/10 hover:border-cyan-500/30 hover:bg-white/10 transition-all duration-300"
          >
            <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-2">
              {metric.label}
            </div>
            <div className="text-sm text-gray-400">
              {metric.description}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Skill categories */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="space-y-8"
      >
        {skillCategories.map((category, categoryIndex) => (
          <motion.div
            key={categoryIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
          >
            <h4 className="text-lg font-semibold text-white mb-4">
              <span className="text-cyan-400">{"// "}</span>
              {category.name}
            </h4>
            <div className="flex flex-wrap gap-3">
              {category.skills.map((skill, skillIndex) => (
                <motion.div
                  key={skillIndex}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ delay: (categoryIndex * 0.1) + (skillIndex * 0.05) }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-gray-300 hover:bg-white/10 hover:border-cyan-500/30 hover:text-white transition-all duration-200 cursor-default"
                >
                  <TechIcon name={skill} size={18} className="text-cyan-400" />
                  <span>{skill}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
