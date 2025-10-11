'use client';

import { motion } from 'framer-motion';
import { Database, Brain, Cloud, Palette, Coffee, Terminal as TerminalIcon, Code2, GitBranch } from 'lucide-react';
import Timeline from '@/components/Timeline';
import SystemLog from '@/components/SystemLog';

/**
 * AboutSection v3 - Ultra Clean Design
 * 
 * Simplified:
 * - Removed colored backgrounds on skill cards
 * - Uniform border design
 * - Minimal hover effects
 * - Focus on content readability
 */

interface SkillCategory {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    name: 'Data Engineering',
    icon: Database,
    skills: ['Python', 'Apache Spark', 'Airflow', 'dbt', 'BigQuery', 'Snowflake', 'Kafka', 'PostgreSQL'],
  },
  {
    name: 'Data Science & AI/ML',
    icon: Brain,
    skills: ['PyTorch', 'TensorFlow', 'scikit-learn', 'Transformers', 'LangChain', 'MLflow', 'Pandas', 'NumPy'],
  },
  {
    name: 'Infrastructure & DevOps',
    icon: Cloud,
    skills: ['Docker', 'Kubernetes', 'AWS', 'GCP', 'Terraform', 'CI/CD', 'Linux', 'Arch'],
  },
  {
    name: 'Creative & Web',
    icon: Palette,
    skills: ['React', 'Next.js', 'Three.js', 'Unity', 'Godot', 'Ableton Live', 'Creative Coding'],
  },
];

const metrics = [
  { label: 'Hours Coding', value: '12000+', icon: Code2 },
  { label: 'Projects', value: '50+', icon: GitBranch },
  { label: 'Coffee', value: '∞', icon: Coffee },
  { label: 'Terminal', value: '99%', icon: TerminalIcon },
];

export default function AboutSection() {
  return (
    <section 
      id="about" 
      className="relative py-32 px-6 overflow-hidden bg-black"
    >
      {/* Ultra minimal grid */}
      <div 
        className="absolute inset-0 opacity-[0.008]" 
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '80px 80px'
        }} 
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header - minimal */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <p className="text-cyan-400/30 font-mono text-xs mb-3">$ whoami</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            About Me
          </h2>
          <p className="text-gray-500 text-base md:text-lg max-w-2xl leading-relaxed">
            Data Engineer by profession, creative technologist by passion. I architect scalable data pipelines, deploy ML models in production, and occasionally build indie games.
          </p>
        </motion.div>

        {/* Metrics - clean cards */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-24"
        >
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="p-5 rounded-xl bg-white/[0.02] border border-white/10 hover:border-white/15 transition-colors"
            >
              <metric.icon className="w-6 h-6 mb-2 text-gray-600" />
              <p className="text-2xl font-bold text-white mb-0.5">{metric.value}</p>
              <p className="text-xs text-gray-600">{metric.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-2 gap-12 mb-24">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <SystemLog />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Timeline />
          </motion.div>
        </div>

        {/* Tech Stack - uniform design */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Tech Stack
          </h3>
          <p className="text-gray-600 mb-10 text-sm">Technologies I work with daily</p>

          <div className="grid md:grid-cols-2 gap-6">
            {skillCategories.map((category) => (
              <div
                key={category.name}
                className="p-5 rounded-xl bg-white/[0.02] border border-white/10 hover:border-white/15 transition-colors"
              >
                {/* Category header */}
                <div className="flex items-center gap-2.5 mb-4">
                  <category.icon className="w-4 h-4 text-gray-600" />
                  <h4 className="font-semibold text-sm text-gray-400">{category.name}</h4>
                </div>

                {/* Skills - minimal badges */}
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 text-xs rounded-md bg-white/[0.03] border border-white/10 
                        hover:border-white/20 transition-colors text-gray-500 hover:text-gray-400"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
