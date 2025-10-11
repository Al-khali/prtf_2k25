'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Lock, ExternalLink, Github, TrendingUp, Zap, Sparkles } from 'lucide-react';
import Image from 'next/image';
import { projects } from '@/lib/projects-data';
import { GlassCard } from '@/components/ui/GlassCard';
import type { Project, ProjectMetric } from '@/types';

/**
 * ProjectsSection - Optimized projects showcase with masonry grid
 * 
 * Features from design.md:
 * - CategoryFilter with glow effects on active state
 * - Masonry-style grid using CSS Grid with auto-fit
 * - AnimatePresence for smooth filter transitions
 * - Layout animations with layoutId for shared element transitions
 * - Detailed metrics display (performance, accuracy, cost savings)
 * - NDA/Confidential badges for professional projects
 * - Stagger effect on filter change
 */

type Category = 'all' | 'data-ai' | 'web' | 'games' | 'music' | 'design';

const categories: { id: Category; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'all', label: 'All Projects', icon: Sparkles },
  { id: 'data-ai', label: 'Data & AI', icon: TrendingUp },
  { id: 'web', label: 'Web Apps', icon: Zap },
  { id: 'games', label: 'Games', icon: Sparkles },
  { id: 'music', label: 'Music', icon: Sparkles },
  { id: 'design', label: 'Design', icon: Sparkles },
];

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState<Category>('all');

  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  const featuredProjects = filteredProjects.filter(p => p.featured);
  const otherProjects = filteredProjects.filter(p => !p.featured);

  return (
    <section 
      id="projects" 
      className="relative min-h-screen py-20 px-4 overflow-hidden bg-gradient-to-b from-black via-gray-900 to-black"
    >
      {/* Grid background */}
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
          className="mb-12 text-center"
        >
          <div className="inline-block mb-4">
            <span className="text-sm font-mono text-cyan-400 bg-cyan-400/10 px-4 py-2 rounded-full border border-cyan-400/30">
              $ ls -la ~/projects/
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">Projects</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            From production data pipelines processing 50M+ events daily to indie games and creative experiments
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`
                relative px-6 py-3 rounded-lg font-semibold transition-all duration-300
                flex items-center gap-2
                ${activeCategory === category.id
                  ? 'bg-cyan-500/20 text-cyan-300 border-2 border-cyan-500/50'
                  : 'glass-panel text-gray-400 border border-white/10 hover:border-white/30'
                }
              `}
            >
              <category.icon className="w-4 h-4" />
              {category.label}
              
              {/* Active glow effect */}
              {activeCategory === category.id && (
                <motion.div
                  layoutId="category-glow"
                  className="absolute inset-0 bg-cyan-500/20 rounded-lg blur-xl -z-10"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Featured Projects */}
        {featuredProjects.length > 0 && (
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-cyan-400" />
              Featured
            </h3>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory + '-featured'}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="grid md:grid-cols-2 gap-6"
              >
                {featuredProjects.map((project, index) => (
                  <ProjectCard 
                    key={project.id} 
                    project={project} 
                    index={index}
                    featured
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        )}

        {/* Other Projects - Masonry Grid */}
        {otherProjects.length > 0 && (
          <div>
            <h3 className="text-2xl font-bold text-white mb-8">
              More Projects
            </h3>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory + '-other'}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                style={{
                  gridAutoRows: 'auto',
                }}
              >
                {otherProjects.map((project, index) => (
                  <ProjectCard 
                    key={project.id} 
                    project={project} 
                    index={index}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
}

/**
 * ProjectCard - Individual project card with glass effect
 */
interface ProjectCardProps {
  project: Project;
  index: number;
  featured?: boolean;
}

function ProjectCard({ project, index, featured }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ 
        duration: 0.4, 
        delay: index * 0.1,
        layout: { type: 'spring', bounce: 0.2, duration: 0.6 }
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative"
    >
      <GlassCard className={`overflow-hidden h-full ${featured ? 'p-0' : 'p-6'}`}>
        {/* Image */}
        {project.image && (
          <div className={`relative w-full overflow-hidden ${featured ? 'h-64' : 'h-48 rounded-lg mb-4'}`}>
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            
            {/* Badges */}
            <div className="absolute top-4 left-4 flex gap-2">
              {project.confidential && (
                <span className="flex items-center gap-1 px-3 py-1 bg-red-500/20 text-red-300 text-xs font-semibold rounded-full border border-red-500/30 backdrop-blur-sm">
                  <Lock className="w-3 h-3" />
                  NDA
                </span>
              )}
              {project.status === 'in-progress' && (
                <span className="px-3 py-1 bg-yellow-500/20 text-yellow-300 text-xs font-semibold rounded-full border border-yellow-500/30 backdrop-blur-sm">
                  In Progress
                </span>
              )}
            </div>
          </div>
        )}

        <div className={featured ? 'p-6' : ''}>
          {/* Title & Description */}
          <h4 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
            {project.title}
          </h4>
          <p className="text-gray-400 text-sm mb-4 line-clamp-3">
            {project.description}
          </p>

          {/* Metrics */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="grid grid-cols-3 gap-3 mb-4">
              {project.metrics.map((metric: ProjectMetric, i: number) => (
                <div key={i} className="text-center p-2 bg-white/5 rounded-lg border border-white/10">
                  <div className="text-cyan-400 font-bold text-sm">{metric.value}</div>
                  <div className="text-gray-500 text-xs">{metric.label}</div>
                </div>
              ))}
            </div>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.slice(0, 4).map((tag: string) => (
              <span 
                key={tag} 
                className="px-2 py-1 text-xs bg-cyan-500/10 text-cyan-300 rounded border border-cyan-500/30"
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 4 && (
              <span className="px-2 py-1 text-xs text-gray-400">
                +{project.tags.length - 4} more
              </span>
            )}
          </div>

          {/* Links */}
          <div className="flex gap-3">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm text-gray-400 hover:text-white transition-colors"
              >
                <Github className="w-4 h-4" />
                Code
              </a>
            )}
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                View Project
              </a>
            )}
          </div>
        </div>

        {/* Hover glow */}
        {isHovered && (
          <motion.div
            layoutId={`project-glow-${project.id}`}
            className="absolute inset-0 bg-cyan-500/10 rounded-xl blur-xl -z-10 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </GlassCard>
    </motion.div>
  );
}
