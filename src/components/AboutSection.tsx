'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

/**
 * AboutSection - Modern, nerdy, weeb-inspired about section
 * 
 * Features:
 * - Clean, modern card-based layout
 * - Anime/gaming aesthetic
 * - Interactive stat cards
 * - Smooth animations
 */
export default function AboutSection() {
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);

  const stats = [
    { label: 'Lines of Code', value: '500K+', icon: '⚡', color: 'from-blue-500 to-cyan-500' },
    { label: 'Coffee Consumed', value: '∞', icon: '☕', color: 'from-amber-500 to-orange-500' },
    { label: 'Projects Shipped', value: '50+', icon: '🚀', color: 'from-purple-500 to-pink-500' },
    { label: 'Bugs Fixed', value: '9999+', icon: '🐛', color: 'from-green-500 to-emerald-500' },
  ];

  const skills = {
    'Data Engineering': ['Python', 'Spark', 'Airflow', 'dbt', 'BigQuery'],
    'Backend': ['Node.js', 'FastAPI', 'PostgreSQL', 'Redis', 'Docker'],
    'Frontend': ['React', 'Next.js', 'TypeScript', 'Tailwind', 'Three.js'],
    'AI/ML': ['PyTorch', 'TensorFlow', 'scikit-learn', 'Transformers'],
  };

  return (
    <section className="relative min-h-screen py-20 px-4 overflow-hidden bg-gradient-to-b from-[#0a0a0f] via-[#0f0f1a] to-[#0a0a0f]" id="about">
      {/* Subtle grid background */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
        backgroundSize: '50px 50px'
      }} />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="inline-block mb-4">
            <span className="text-sm font-mono text-cyan-400 bg-cyan-400/10 px-3 py-1 rounded-full border border-cyan-400/20">
              {"// About Me"}
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Data Engineer <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">&</span> Creative Technologist
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl">
            Building scalable data pipelines by day, crafting indie games and music by night. 
            I turn coffee into code and data into insights. 🎮☕
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              onHoverStart={() => setHoveredStat(index)}
              onHoverEnd={() => setHoveredStat(null)}
              whileHover={{ y: -5 }}
              className="relative group"
            >
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 transition-all duration-300 hover:border-white/20 hover:bg-white/10">
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className={`text-2xl font-bold mb-1 bg-gradient-to-r ${stat.color} text-transparent bg-clip-text`}>
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400">{stat.label}</div>
                
                {/* Hover glow effect */}
                {hoveredStat === index && (
                  <motion.div
                    layoutId="stat-glow"
                    className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-10 rounded-xl blur-xl -z-10`}
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
            <span className="text-cyan-400">{'<'}</span>
            Tech Stack
            <span className="text-cyan-400">{'/>'}</span>
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            {Object.entries(skills).map(([category, techs], categoryIndex) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, x: categoryIndex % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * categoryIndex }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-white/20 transition-all duration-300"
              >
                <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                  {category}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {techs.map((tech, techIndex) => (
                    <motion.span
                      key={tech}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.05 * techIndex }}
                      whileHover={{ scale: 1.05 }}
                      className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-sm text-gray-300 hover:bg-white/10 hover:border-cyan-400/30 hover:text-cyan-400 transition-all duration-200 cursor-default"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Fun Facts / Weeb Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl p-8"
        >
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span>🎮</span>
            When I&apos;m Not Coding
          </h3>
          <div className="grid md:grid-cols-3 gap-6 text-gray-300">
            <div>
              <div className="text-2xl mb-2">🎵</div>
              <div className="font-semibold text-white mb-1">Music Production</div>
              <div className="text-sm text-gray-400">Lo-fi beats & synthwave</div>
            </div>
            <div>
              <div className="text-2xl mb-2">🎮</div>
              <div className="font-semibold text-white mb-1">Indie Game Dev</div>
              <div className="text-sm text-gray-400">Pixel art & retro vibes</div>
            </div>
            <div>
              <div className="text-2xl mb-2">🌸</div>
              <div className="font-semibold text-white mb-1">Anime & Manga</div>
              <div className="text-sm text-gray-400">Slice of life enthusiast</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}