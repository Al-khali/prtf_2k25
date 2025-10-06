'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '@/types';
import { ProjectCard } from '@/components/ProjectCard';
import { twMerge } from 'tailwind-merge';

export interface ProjectGridProps {
  /** Projects to display */
  projects: Project[];
  /** Custom className */
  className?: string;
}

/**
 * ProjectGrid - Responsive grid layout for project cards
 * 
 * Features:
 * - Responsive CSS Grid layout
 * - Framer Motion AnimatePresence for filter transitions
 * - Stagger animation for cards
 * - Smooth layout animations
 */
export const ProjectGrid: React.FC<ProjectGridProps> = ({ projects, className }) => {
  return (
    <motion.div
      className={twMerge(
        'grid gap-6',
        'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
        'w-full',
        className
      )}
      layout
    >
      <AnimatePresence mode="popLayout">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            layout
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{
              duration: 0.5,
              delay: index * 0.05,
              ease: 'easeOut',
              layout: { duration: 0.4 },
            }}
          >
            <ProjectCard project={project} delay={index * 0.05} />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Empty state */}
      {projects.length === 0 && (
        <motion.div
          className="col-span-full flex flex-col items-center justify-center py-20 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-2xl font-bold text-white mb-2">No projects found</h3>
          <p className="text-gray-400">Try selecting a different category</p>
        </motion.div>
      )}
    </motion.div>
  );
};
