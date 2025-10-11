'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { projects } from '@/lib/projects-data';
import { Database, TrendingUp, Lock, ExternalLink, Github, Zap } from 'lucide-react';
import Image from 'next/image';

/**
 * 📊 PROJECTS SECTION - Data Engineering Focus
 * Design: Terminal/Cyberpunk avec cards holographiques
 * Focus: Projets Data/AI/ML avec métriques et NDA
 */

type CategoryFilter = 'all' | 'data-ai' | 'web' | 'games' | 'music';

const categories = [
  { id: 'all', label: 'All Projects', icon: Database },
  { id: 'data-ai', label: 'Data & AI', icon: TrendingUp },
  { id: 'web', label: 'Web Apps', icon: Zap },
  { id: 'games', label: 'Games', icon: Zap },
  { id: 'music', label: 'Music', icon: Zap },
];

export default function ProjectsRevamped() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  const featuredProjects = filteredProjects.filter(p => p.featured);
  const otherProjects = filteredProjects.filter(p => !p.featured);

  return (
    <section id="projects" className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent pointer-events-none" />
      
      {/* Content */}
      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-cyan-500/30 rounded-full mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Database className="w-4 h-4 text-cyan-400" />
            <span className="font-terminal text-sm text-cyan-400">{'// Projects'}</span>
          </motion.div>

          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-magenta-500">
              Featured Work
            </span>
          </h2>

          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
            A collection of{' '}
            <span className="text-cyan-400 font-semibold">data engineering</span>,{' '}
            <span className="text-blue-400 font-semibold">AI</span>,{' '}
            <span className="text-magenta-400 font-semibold">games</span>,{' '}
            <span className="text-purple-400 font-semibold">music</span>, and creative projects.
            <br />
            <span className="text-sm text-gray-500">Some projects are confidential due to NDAs.</span>
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-16"
        >
          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = activeCategory === category.id;
            
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id as CategoryFilter)}
                className={`
                  group relative px-6 py-3 rounded-lg font-terminal text-sm
                  transition-all duration-300 hover:scale-105
                  ${isActive 
                    ? 'bg-cyan-500/20 border-2 border-cyan-500 text-cyan-400' 
                    : 'bg-white/5 border-2 border-white/10 text-gray-400 hover:border-cyan-500/50'
                  }
                `}
              >
                <span className="flex items-center gap-2">
                  <Icon className="w-4 h-4" />
                  {category.label}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="activeCategory"
                    className="absolute inset-0 bg-cyan-500/10 rounded-lg -z-10"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>
            );
          })}
        </motion.div>

        {/* Projects Count */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <p className="font-terminal text-sm text-cyan-400">
            <span className="text-magenta-400">&gt;</span> {filteredProjects.length} projects
          </p>
        </motion.div>

        {/* Featured Projects Grid */}
        {featuredProjects.length > 0 && (
          <div className="mb-16">
            <h3 className="font-terminal text-2xl text-cyan-400 mb-6">
              <span className="text-magenta-400">$</span> featured_projects
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  isHovered={hoveredProject === project.id}
                  onHover={setHoveredProject}
                />
              ))}
            </div>
          </div>
        )}

        {/* Other Projects Grid */}
        {otherProjects.length > 0 && (
          <div>
            <h3 className="font-terminal text-2xl text-cyan-400 mb-6">
              <span className="text-magenta-400">$</span> other_projects
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index + featuredProjects.length}
                  isHovered={hoveredProject === project.id}
                  onHover={setHoveredProject}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/**
 * 🎴 Project Card Component
 */
interface ProjectCardProps {
  project: typeof projects[0];
  index: number;
  isHovered: boolean;
  onHover: (id: string | null) => void;
}

function ProjectCard({ project, index, isHovered, onHover }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => onHover(project.id)}
      onMouseLeave={() => onHover(null)}
      className={`
        group relative rounded-xl overflow-hidden
        bg-white/5 backdrop-blur-sm
        border transition-all duration-300
        ${isHovered 
          ? 'border-cyan-500 shadow-lg shadow-cyan-500/50 scale-[1.02]' 
          : 'border-white/10 hover:border-cyan-500/50'
        }
      `}
    >
      {/* NDA Badge */}
      {project.confidential && (
        <div className="absolute top-4 right-4 z-20 flex items-center gap-1 px-3 py-1 bg-red-500/90 rounded-full">
          <Lock className="w-3 h-3 text-white" />
          <span className="text-xs font-terminal text-white">NDA</span>
        </div>
      )}

      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-cyan-500/10 to-magenta-500/10">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Title */}
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-400 mb-4 line-clamp-3">
          {project.description}
        </p>

        {/* Metrics */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="grid grid-cols-3 gap-2 mb-4">
            {project.metrics.map((metric, i) => (
              <div key={i} className="text-center">
                <div className="text-lg font-bold text-cyan-400 font-terminal">
                  {metric.value}
                </div>
                <div className="text-xs text-gray-500">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs font-terminal bg-cyan-500/10 text-cyan-400 rounded border border-cyan-500/30"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 4 && (
            <span className="px-2 py-1 text-xs font-terminal text-gray-500">
              +{project.tags.length - 4} more
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-cyan-500/20 text-cyan-400 rounded-lg border border-cyan-500/50 hover:bg-cyan-500/30 transition-colors text-sm font-terminal"
            >
              <ExternalLink className="w-4 h-4" />
              View Project
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-white/5 text-gray-400 rounded-lg border border-white/10 hover:border-white/30 transition-colors text-sm"
            >
              <Github className="w-4 h-4" />
              Code
            </a>
          )}
          {project.confidential && !project.demoUrl && (
            <button
              disabled
              className="flex items-center gap-2 px-4 py-2 bg-white/5 text-gray-500 rounded-lg border border-white/10 cursor-not-allowed text-sm font-terminal"
            >
              <Lock className="w-4 h-4" />
              Contact
            </button>
          )}
        </div>
      </div>

      {/* Holographic border effect */}
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/20 via-magenta-500/20 to-cyan-500/20 blur-xl" />
      </div>
    </motion.div>
  );
}
