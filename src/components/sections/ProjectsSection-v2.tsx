'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ExternalLink, Github, Lock } from 'lucide-react';
import { projects } from '@/lib/projects-data';
import type { Project, ProjectMetric } from '@/types';

/**
 * ProjectsSection v2 - Refined, cleaner design
 * 
 * Changes:
 * - Removed flashy gradients
 * - Better card design with subtle borders
 * - More spacing between elements
 * - Professional color scheme
 * - Improved readability
 */

type ProjectCategory = 'data-ai' | 'games' | 'music' | 'design' | 'security';

const categories: { id: ProjectCategory | 'all'; label: string }[] = [
  { id: 'all', label: 'All Projects' },
  { id: 'data-ai', label: 'Data & AI' },
  { id: 'games', label: 'Games' },
  { id: 'music', label: 'Music' },
  { id: 'design', label: 'Design' },
  { id: 'security', label: 'Security' },
];

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory | 'all'>('all');

  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  const featuredProjects = filteredProjects.filter(p => p.featured);
  const otherProjects = filteredProjects.filter(p => !p.featured);

  return (
    <section 
      id="projects" 
      className="relative py-32 px-6 overflow-hidden bg-gradient-to-b from-black to-gray-950"
    >
      {/* Subtle grid */}
      <div 
        className="absolute inset-0 opacity-[0.01]" 
        style={{
          backgroundImage: 'linear-gradient(rgba(0,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} 
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-cyan-400/50 font-mono text-sm mb-4">$ ls -la ~/projects/</p>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
            Featured <span className="text-cyan-400/80">Projects</span>
          </h2>
          <p className="text-gray-500 text-lg md:text-xl max-w-3xl mx-auto">
            From production data pipelines processing 50M+ events daily to indie games and creative experiments
          </p>
        </motion.div>

        {/* Category filters - MORE SUBTLE */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          {categories.map((cat) => {
            const catId = cat.id as ProjectCategory | 'all';
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(catId)}
                className={`px-5 py-2.5 rounded-lg font-medium transition-all duration-300 
                  ${activeCategory === catId 
                    ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30' 
                    : 'bg-white/5 text-gray-400 border border-white/10 hover:border-white/20 hover:text-gray-300'
                  }`}
              >
                {cat.label}
              </button>
            );
          })}
        </motion.div>

        {/* Featured Projects */}
        {featuredProjects.length > 0 && (
          <div className="mb-20">
            <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
              <span className="text-cyan-400/80">★</span> Featured
            </h3>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid md:grid-cols-2 gap-6"
              >
                {featuredProjects.map((project, index) => (
                  <ProjectCard key={project.id} project={project} index={index} featured />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        )}

        {/* Other Projects - MASONRY GRID */}
        {otherProjects.length > 0 && (
          <AnimatePresence mode="wait">
            <motion.div
              key={`other-${activeCategory}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {otherProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </section>
  );
}

function ProjectCard({ project, index, featured = false }: { 
  project: Project; 
  index: number; 
  featured?: boolean;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      className={`group relative rounded-2xl overflow-hidden bg-white/5 border border-white/10 
        hover:border-white/20 transition-all duration-300 backdrop-blur-sm 
        ${featured ? 'md:col-span-1' : ''}`}
    >
      {/* Image */}
      {project.image && (
        <div className="relative aspect-video overflow-hidden bg-gray-900">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 
              group-hover:scale-105 transition-all duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        </div>
      )}

      {/* Content */}
      <div className="p-6">
        {/* Badges */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.confidential && (
            <span className="px-2 py-1 text-xs rounded-md bg-red-500/10 text-red-400 border border-red-500/20 flex items-center gap-1">
              <Lock className="w-3 h-3" /> NDA
            </span>
          )}
          {project.confidential && (
            <span className="px-2 py-1 text-xs rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20">
              Confidential
            </span>
          )}
          {featured && (
            <span className="px-2 py-1 text-xs rounded-md bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              Featured
            </span>
          )}
        </div>

        {/* Title & Description */}
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
          {project.title}
        </h3>
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Metrics */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="grid grid-cols-2 gap-3 mb-4 pb-4 border-b border-white/10">
            {project.metrics.slice(0, 2).map((metric: ProjectMetric) => (
              <div key={metric.label}>
                <p className="text-xs text-gray-500 mb-0.5">{metric.label}</p>
                <p className="text-lg font-bold text-cyan-400/80">{metric.value}</p>
              </div>
            ))}
          </div>
        )}

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags?.slice(0, 4).map((tech: string) => (
            <span 
              key={tech} 
              className="px-2 py-1 text-xs rounded-md bg-white/5 border border-white/10 text-gray-400"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-3">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-cyan-400 transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
          )}
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-cyan-400 transition-colors"
            >
              <ExternalLink className="w-5 h-5" />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
