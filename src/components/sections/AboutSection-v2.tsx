'use client';

import { motion } from 'framer-motion';
import { Database, Brain, Cloud, Palette, Coffee, Terminal as TerminalIcon, Code2, GitBranch } from 'lucide-react';
import Timeline from '@/components/Timeline';
import SystemLog from '@/components/SystemLog';

/**
 * AboutSection v2 - Refined, less flashy design
 * 
 * Changes:
 * - Reduced color saturation
 * - Better spacing (py-32 instead of py-20)
 * - Softer gradients
 * - More professional appearance
 * - Better visual hierarchy
 */

interface SkillCategory {
  name: string;
  color: string;
  icon: React.ComponentType<{ className?: string }>;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    name: 'Data Engineering',
    color: 'text-cyan-400/80 border-cyan-500/20 bg-cyan-500/5',
    icon: Database,
    skills: ['Python', 'Apache Spark', 'Airflow', 'dbt', 'BigQuery', 'Snowflake', 'Kafka', 'PostgreSQL'],
  },
  {
    name: 'Data Science & AI/ML',
    color: 'text-purple-400/80 border-purple-500/20 bg-purple-500/5',
    icon: Brain,
    skills: ['PyTorch', 'TensorFlow', 'scikit-learn', 'Transformers', 'LangChain', 'MLflow', 'Pandas', 'NumPy'],
  },
  {
    name: 'Infrastructure & DevOps',
    color: 'text-green-400/80 border-green-500/20 bg-green-500/5',
    icon: Cloud,
    skills: ['Docker', 'Kubernetes', 'AWS', 'GCP', 'Terraform', 'CI/CD', 'Linux', 'Arch btw'],
  },
  {
    name: 'Creative & Web',
    color: 'text-pink-400/80 border-pink-500/20 bg-pink-500/5',
    icon: Palette,
    skills: ['React', 'Next.js', 'Three.js', 'Unity', 'Godot', 'Ableton Live', 'Creative Coding'],
  },
];

const metrics = [
  { label: 'Hours Coding', value: '12000+', icon: Code2, color: 'text-cyan-400/80' },
  { label: 'Projects Shipped', value: '50+', icon: GitBranch, color: 'text-purple-400/80' },
  { label: 'Coffee Consumed', value: '∞', icon: Coffee, color: 'text-amber-400/80' },
  { label: 'Terminal Time', value: '99%', icon: TerminalIcon, color: 'text-green-400/80' },
];

export default function AboutSection() {
  return (
    <section 
      id="about" 
      className="relative py-32 px-6 overflow-hidden bg-black"
    >
      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.015]" 
        style={{
          backgroundImage: 'linear-gradient(rgba(0,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} 
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header - BETTER HIERARCHY */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <p className="text-cyan-400/50 font-mono text-sm mb-4">$ whoami</p>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
            About <span className="text-cyan-400/80">Me</span>
          </h2>
          <p className="text-gray-500 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Data Engineer by profession, creative technologist by passion. I architect scalable data pipelines, deploy ML models in production, and occasionally build indie games while listening to city pop.
          </p>
        </motion.div>

        {/* Metrics - MORE SUBTLE */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-24"
        >
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.02, y: -2 }}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 
                transition-all duration-300 backdrop-blur-sm"
            >
              <metric.icon className={`w-8 h-8 mb-3 ${metric.color}`} />
              <p className="text-3xl font-bold text-white mb-1">{metric.value}</p>
              <p className="text-sm text-gray-500">{metric.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Two-column layout - MORE SPACING */}
        <div className="grid lg:grid-cols-2 gap-12 mb-24">
          {/* SystemLog */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <SystemLog />
          </motion.div>

          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Timeline />
          </motion.div>
        </div>

        {/* Tech Stack - REFINED */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 text-center">
            Tech <span className="text-cyan-400/80">Stack</span>
          </h3>
          <p className="text-gray-500 text-center mb-12">Technologies I work with daily</p>

          <div className="grid md:grid-cols-2 gap-8">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: categoryIndex * 0.1 }}
                className={`p-6 rounded-2xl border backdrop-blur-sm ${category.color}`}
              >
                {/* Category header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-white/5">
                    <category.icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-semibold text-lg">{category.name}</h4>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: categoryIndex * 0.1 + skillIndex * 0.02 }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="px-3 py-1.5 text-sm rounded-lg bg-white/5 border border-white/10 
                        hover:border-white/20 transition-all cursor-default text-gray-300"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Easter egg hint - SUBTLE */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-gray-700 text-sm mt-16 font-mono"
        >
          <span className="opacity-50">{'//'} I use Arch btw 🐧</span>
        </motion.p>
      </div>
    </section>
  );
}
