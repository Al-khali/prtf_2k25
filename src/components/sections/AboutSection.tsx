'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Database, Brain, Cloud, Palette, Coffee, Terminal as TerminalIcon, Code2, GitBranch } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import Timeline from '@/components/Timeline';
import SystemLog from '@/components/SystemLog';

/**
 * AboutSection - Professional data engineer profile with creative edge
 * 
 * Features from design.md:
 * - Timeline: Animated vertical timeline with glass cards
 * - SystemLog: Terminal-style info display with typing animation
 * - SkillBadges: Technology badges color-coded by category
 * - Responsive layout with scroll-triggered animations
 * - Focus on Data Engineering + Creative Technologist identity
 */

interface SkillCategory {
  name: string;
  color: 'blue' | 'purple' | 'green' | 'pink';
  icon: React.ComponentType<{ className?: string }>;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    name: 'Data Engineering',
    color: 'blue',
    icon: Database,
    skills: ['Python', 'Apache Spark', 'Airflow', 'dbt', 'BigQuery', 'Snowflake', 'Kafka', 'PostgreSQL'],
  },
  {
    name: 'Data Science & AI/ML',
    color: 'purple',
    icon: Brain,
    skills: ['PyTorch', 'TensorFlow', 'scikit-learn', 'Transformers', 'LangChain', 'MLflow', 'Pandas', 'NumPy'],
  },
  {
    name: 'Infrastructure & DevOps',
    color: 'green',
    icon: Cloud,
    skills: ['Docker', 'Kubernetes', 'AWS', 'GCP', 'Terraform', 'CI/CD', 'Linux', 'Arch btw'],
  },
  {
    name: 'Creative & Web',
    color: 'pink',
    icon: Palette,
    skills: ['React', 'Next.js', 'Three.js', 'Unity', 'Godot', 'Ableton Live', 'Creative Coding'],
  },
];

const metrics = [
  { label: 'Hours Coding', value: '12000+', icon: Code2, gradient: 'from-cyan-500 to-blue-500' },
  { label: 'Projects Shipped', value: '50+', icon: GitBranch, gradient: 'from-purple-500 to-pink-500' },
  { label: 'Coffee Consumed', value: '∞', icon: Coffee, gradient: 'from-amber-500 to-orange-500' },
  { label: 'Terminal Time', value: '99%', icon: TerminalIcon, gradient: 'from-green-500 to-emerald-500' },
];

export default function AboutSection() {
  const [hoveredMetric, setHoveredMetric] = useState<number | null>(null);

  return (
    <section 
      id="about" 
      className="relative min-h-screen py-20 px-4 overflow-hidden bg-gradient-to-b from-black via-gray-900 to-black"
    >
      {/* Grid pattern background */}
      <div 
        className="absolute inset-0 opacity-[0.02]" 
        style={{
          backgroundImage: 'linear-gradient(rgba(0,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} 
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <div className="inline-block mb-4">
            <span className="text-sm font-mono text-terminal-green bg-terminal-green/10 px-4 py-2 rounded-full border border-terminal-green/30">
              $ whoami
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">Me</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Data Engineer by profession, creative technologist by passion. 
            I architect scalable data pipelines, deploy ML models in production, 
            and occasionally build indie games while listening to city pop.
          </p>
        </motion.div>

        {/* Metrics Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20"
        >
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              onHoverStart={() => setHoveredMetric(index)}
              onHoverEnd={() => setHoveredMetric(null)}
              whileHover={{ y: -5, scale: 1.02 }}
              className="relative group"
            >
              <GlassCard className="p-6 h-full">
                <metric.icon className={`w-8 h-8 mb-3 text-transparent bg-clip-text bg-gradient-to-r ${metric.gradient}`} 
                  style={{ stroke: 'url(#gradient)' }} />
                <div className={`text-3xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r ${metric.gradient}`}>
                  {metric.value}
                </div>
                <div className="text-sm text-gray-400 font-medium">
                  {metric.label}
                </div>
                
                {/* Hover glow */}
                {hoveredMetric === index && (
                  <motion.div
                    layoutId="metric-glow"
                    className={`absolute inset-0 bg-gradient-to-r ${metric.gradient} opacity-10 rounded-xl blur-xl -z-10`}
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          {/* Left: System Log */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <TerminalIcon className="w-6 h-6 text-terminal-green" />
              System Info
            </h3>
            <SystemLog />
          </motion.div>

          {/* Right: Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <GitBranch className="w-6 h-6 text-cyan-400" />
              Timeline
            </h3>
            <Timeline />
          </motion.div>
        </div>

        {/* Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-3xl font-bold text-white mb-8 text-center">
            Tech <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Stack</span>
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 + categoryIndex * 0.1 }}
              >
                <GlassCard className="p-6 h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <category.icon className={`w-6 h-6 ${getCategoryColor(category.color)}`} />
                    <h4 className="font-semibold text-white">{category.name}</h4>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <SkillBadge 
                        key={skill} 
                        skill={skill} 
                        color={category.color}
                      />
                    ))}
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Fun fact */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="inline-block px-6 py-3 glass-panel rounded-lg border border-cyan-500/30">
            <p className="text-gray-300 font-mono text-sm">
              <span className="text-cyan-400">$</span> echo &quot;I use Arch btw&quot; 🐧
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/**
 * SkillBadge - Individual skill badge component
 */
interface SkillBadgeProps {
  skill: string;
  color: 'blue' | 'purple' | 'green' | 'pink';
}

function SkillBadge({ skill, color }: SkillBadgeProps) {
  const colorClasses = {
    blue: 'bg-blue-500/10 text-blue-300 border-blue-500/30 hover:bg-blue-500/20 hover:border-blue-400/50',
    purple: 'bg-purple-500/10 text-purple-300 border-purple-500/30 hover:bg-purple-500/20 hover:border-purple-400/50',
    green: 'bg-green-500/10 text-green-300 border-green-500/30 hover:bg-green-500/20 hover:border-green-400/50',
    pink: 'bg-pink-500/10 text-pink-300 border-pink-500/30 hover:bg-pink-500/20 hover:border-pink-400/50',
  };

  return (
    <motion.span
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`
        inline-block px-3 py-1.5 text-xs font-medium rounded-lg border
        transition-all duration-200 cursor-default
        ${colorClasses[color]}
      `}
    >
      {skill}
    </motion.span>
  );
}

function getCategoryColor(color: 'blue' | 'purple' | 'green' | 'pink'): string {
  const colors = {
    blue: 'text-blue-400',
    purple: 'text-purple-400',
    green: 'text-green-400',
    pink: 'text-pink-400',
  };
  return colors[color];
}
