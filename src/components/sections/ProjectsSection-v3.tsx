'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ExternalLink, Github, Lock } from 'lucide-react';
import { projects } from '@/lib/projects-data';
import type { Project, ProjectMetric } from '@/types';

/**
 * ProjectsSection v3 - Ultra Clean Design
 * 
 * Simplified:
 * - Minimal cards (no heavy backgrounds)
 * - Clean filters (no active state glow)
 * - Reduced animations
 * - Focus on project content
 */

type ProjectCategory = 'data-ai' | 'games' | 'music' | 'design' | 'security';

const categories: { id: ProjectCategory | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'data-ai', label: 'Data & AI' },
  { id: 'games', label: 'Games' },
  { id: 'music', label: 'Music' },
  { id: 'design', label: 'Design' },
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
      className="relative py-32 px-6 overflow-hidden bg-black"
    >
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <p className="text-cyan-400/30 font-mono text-xs mb-3">$ ls projects/</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Featured Projects
          </h2>
          <p className="text-gray-500 text-base md:text-lg max-w-2xl">
            From production data pipelines to indie games and creative experiments
          </p>
        </motion.div>

        {/* Category filters - minimal */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-2 mb-12"
        >
          {categories.map((cat) => {
            const catId = cat.id as ProjectCategory | 'all';
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(catId)}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200
                  ${activeCategory === catId 
                    ? 'bg-white/10 text-white border border-white/20' 
                    : 'bg-white/[0.02] text-gray-500 border border-white/10 hover:border-white/15 hover:text-gray-400'
                  }`}
              >
                {cat.label}
              </button>
            );
          })}
        </motion.div>

        {/* Featured Projects */}
        {featuredProjects.length > 0 && (
          <div className="mb-16">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid md:grid-cols-2 gap-6"
              >
                {featuredProjects.map((project, index) => (
                  <ProjectCard key={project.id} project={project} index={index} />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        )}

        {/* Other Projects */}
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

function ProjectCard({ project, index }: { 
  project: Project; 
  index: number; 
}) {
  return (
    <motion.article
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ delay: index * 0.03 }}
      className="group relative rounded-xl overflow-hidden bg-white/[0.02] border border-white/10 
        hover:border-white/15 transition-all duration-200"
    >
      {/* Image */}
      {project.image && (
        <div className="relative aspect-video overflow-hidden bg-gray-950">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
        </div>
      )}

      {/* Content */}
      <div className="p-5">
        {/* Badges */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {project.confidential && (
            <span className="px-1.5 py-0.5 text-xs rounded bg-red-500/10 text-red-400/80 border border-red-500/20 flex items-center gap-1">
              <Lock className="w-2.5 h-2.5" /> NDA
            </span>
          )}
        </div>

        {/* Title & Description */}
        <h3 className="text-base font-semibold text-white mb-2 group-hover:text-cyan-400 transition-colors">
          {project.title}
        </h3>
        <p className="text-gray-500 text-sm mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Metrics */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="grid grid-cols-2 gap-2 mb-4 pb-4 border-b border-white/10">
            {project.metrics.slice(0, 2).map((metric: ProjectMetric) => (
              <div key={metric.label}>
                <p className="text-xs text-gray-600 mb-0.5">{metric.label}</p>
                <p className="text-sm font-semibold text-cyan-400/70">{metric.value}</p>
              </div>
            ))}
          </div>
        )}

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tags?.slice(0, 4).map((tech: string) => (
            <span 
              key={tech} 
              className="px-2 py-0.5 text-xs rounded bg-white/[0.03] border border-white/10 text-gray-600"
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
              className="text-gray-600 hover:text-cyan-400 transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>
          )}
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-cyan-400 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
