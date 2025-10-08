'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Project } from '@/types';
import { projects } from '@/lib/projects-data';
import ProjectCard from './ProjectCard';

/**
 * Modern ProjectsSection with professional design
 * Features category filtering, responsive grid, and NDA project support
 */
export function ProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState<Project['category'] | 'all'>('all');

  // Filter projects based on selected category
  const filteredProjects = selectedCategory === 'all'
    ? projects
    : projects.filter((project) => project.category === selectedCategory);

  // Category labels
  const categories = [
    { id: 'all' as const, label: 'All Projects', emoji: '🚀' },
    { id: 'data-ai' as const, label: 'Data & AI', emoji: '📊' },
    { id: 'games' as const, label: 'Games', emoji: '🎮' },
    { id: 'music' as const, label: 'Music', emoji: '🎵' },
    { id: 'design' as const, label: 'Design', emoji: '🎨' },
    { id: 'security' as const, label: 'Security', emoji: '🔒' },
  ];

  return (
    <section id="projects" className="relative min-h-screen py-20 px-6 md:px-12">
      {/* Background grid */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Gradient blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-sm font-mono text-cyan-400">// Projects</span>
          </motion.div>
          
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
              Featured Work
            </span>
          </h2>
          
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
            A collection of data engineering, AI, games, music, and creative projects.
            <br />
            Some projects are confidential due to NDAs.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`
                px-6 py-3 rounded-full font-medium text-sm transition-all duration-300
                ${selectedCategory === category.id
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/30'
                  : 'bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10 hover:border-white/20 hover:text-white'
                }
              `}
            >
              <span className="mr-2">{category.emoji}</span>
              {category.label}
            </button>
          ))}
        </motion.div>

        {/* Project Count */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sm text-gray-500 font-mono">
            {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'}
            {selectedCategory !== 'all' && (
              <span className="text-cyan-400"> in {categories.find(c => c.id === selectedCategory)?.label}</span>
            )}
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-gray-500 text-lg">No projects found in this category.</p>
          </motion.div>
        )}

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-full">
            <span className="text-gray-400 text-sm">More projects coming soon</span>
            <span className="text-xl">🚀</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
