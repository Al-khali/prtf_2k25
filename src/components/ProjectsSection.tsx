'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Project } from '@/types';
import { projects } from '@/lib/projects-data';
import { CategoryFilter } from '@/components/CategoryFilter';
import { ProjectGrid } from '@/components/ProjectGrid';

/**
 * ProjectsSection - Main projects section component
 * 
 * Features:
 * - Category filtering
 * - Responsive grid layout
 * - Smooth animations
 * - Integration of all project components
 */
export const ProjectsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Project['category'] | 'all'>('all');

  // Filter projects based on selected category
  const filteredProjects = selectedCategory === 'all'
    ? projects
    : projects.filter((project) => project.category === selectedCategory);

  return (
    <section id="projects" className="relative min-h-screen py-20 px-6 md:px-12 bg-[#0c0d10]">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00f5ff]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#ff00ff]/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-block mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-sm font-mono text-[#00ff9f]">$ ls ~/projects</span>
          </motion.div>
          
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00f5ff] via-[#ff00ff] to-[#8b00ff]">
              Projects Workbench
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A collection of data engineering, AI, games, music, and creative projects.
            Built with passion, powered by caffeine.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <CategoryFilter
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </motion.div>

        {/* Project Count */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sm text-gray-400 font-mono">
            Showing {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'}
            {selectedCategory !== 'all' && (
              <span className="text-[#00f5ff]"> in {selectedCategory}</span>
            )}
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <ProjectGrid projects={filteredProjects} />
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-gray-400 font-mono text-sm">
            More projects coming soon... 🚀
          </p>
        </motion.div>
      </div>
    </section>
  );
};
