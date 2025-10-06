'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Badge } from './ui/Badge';

interface SkillCategory {
  name: string;
  skills: Array<{
    name: string;
    icon?: string;
    category: 'data' | 'ai' | 'ml' | 'frontend' | 'backend' | 'devops' | 'design' | 'security';
  }>;
}

const skillCategories: SkillCategory[] = [
  {
    name: 'Data Engineering',
    skills: [
      { name: 'Python', icon: '🐍', category: 'data' },
      { name: 'SQL', icon: '🗄️', category: 'data' },
      { name: 'BigQuery', icon: '☁️', category: 'data' },
      { name: 'dbt', icon: '🔧', category: 'data' },
      { name: 'Airflow', icon: '🌊', category: 'data' },
      { name: 'Apache Beam', icon: '⚡', category: 'data' },
      { name: 'Spark', icon: '✨', category: 'data' },
    ],
  },
  {
    name: 'Data Science & AI/ML',
    skills: [
      { name: 'TensorFlow', icon: '🧠', category: 'ml' },
      { name: 'PyTorch', icon: '🔥', category: 'ml' },
      { name: 'scikit-learn', icon: '📊', category: 'ai' },
      { name: 'Pandas', icon: '🐼', category: 'data' },
      { name: 'NumPy', icon: '🔢', category: 'data' },
      { name: 'OpenAI API', icon: '🤖', category: 'ai' },
      { name: 'LangChain', icon: '🔗', category: 'ai' },
    ],
  },
  {
    name: 'Infrastructure & DevOps',
    skills: [
      { name: 'Docker', icon: '🐳', category: 'devops' },
      { name: 'Kubernetes', icon: '☸️', category: 'devops' },
      { name: 'GCP', icon: '☁️', category: 'devops' },
      { name: 'Terraform', icon: '🏗️', category: 'devops' },
      { name: 'GitHub Actions', icon: '⚙️', category: 'devops' },
    ],
  },
  {
    name: 'Creative Tech',
    skills: [
      { name: 'TypeScript', icon: '📘', category: 'frontend' },
      { name: 'React', icon: '⚛️', category: 'frontend' },
      { name: 'Next.js', icon: '▲', category: 'frontend' },
      { name: 'Three.js', icon: '🎮', category: 'frontend' },
      { name: 'Framer Motion', icon: '🎬', category: 'frontend' },
    ],
  },
  {
    name: 'Terminal & Tools',
    skills: [
      { name: 'Neovim', icon: '📝', category: 'devops' },
      { name: 'tmux', icon: '🖥️', category: 'devops' },
      { name: 'Arch Linux', icon: '🐧', category: 'devops' },
      { name: 'zsh', icon: '🐚', category: 'devops' },
    ],
  },
];

const metrics = [
  { label: '12000+ hours', description: 'of coding experience' },
  { label: '50+ projects', description: 'delivered successfully' },
  { label: '10+ years', description: 'in tech industry' },
  { label: '∞ cups', description: 'of coffee consumed' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const categoryVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

/**
 * SkillBadge - Technology stack display with grouped skills
 * 
 * Features:
 * - Grouped skills by category (Data Engineering, Data Science, AI/ML, etc.)
 * - Icons for each technology
 * - Hover animations with glow effect
 * - Metrics display (12000+ hours, 50+ projects)
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
            className="glass p-4 text-center rounded-lg border border-white/10 hover:border-mint-green/30 transition-all duration-300"
          >
            <div className="text-2xl font-space font-bold text-mint-green mb-1">
              {metric.label}
            </div>
            <div className="text-xs text-gray-400 font-mono">
              {metric.description}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Skill categories */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="space-y-8"
      >
        {skillCategories.map((category, categoryIndex) => (
          <motion.div key={categoryIndex} variants={categoryVariants}>
            <h4 className="text-lg font-space font-semibold text-white mb-4">
              <span className="text-glacier-blue"># </span>
              {category.name}
            </h4>
            <div className="flex flex-wrap gap-3">
              {category.skills.map((skill, skillIndex) => (
                <Badge
                  key={skillIndex}
                  category={skill.category}
                  icon={skill.icon}
                  size="md"
                  hoverGlow={true}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: skillIndex * 0.05 }}
                >
                  {skill.name}
                </Badge>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
