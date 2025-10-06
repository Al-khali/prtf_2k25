'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Project } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { twMerge } from 'tailwind-merge';
import { getCategoryBlurPlaceholder, responsiveImageSizes, imageQuality } from '@/lib/image-utils';

export interface ProjectCardProps {
  project: Project;
  /** Custom className */
  className?: string;
  /** Animation delay for stagger effect */
  delay?: number;
}

/**
 * Map technology tags to badge categories
 */
const getTechCategory = (tag: string): 'data' | 'ai' | 'ml' | 'frontend' | 'backend' | 'devops' | 'design' | 'security' | 'default' => {
  const tagLower = tag.toLowerCase();
  
  // Data Engineering
  if (['bigquery', 'dbt', 'airflow', 'spark', 'sql', 'data engineering', 'etl'].some(t => tagLower.includes(t))) {
    return 'data';
  }
  
  // AI/ML
  if (['pytorch', 'tensorflow', 'ml', 'machine learning', 'transformers', 'bert'].some(t => tagLower.includes(t))) {
    return 'ml';
  }
  
  if (['ai', 'nlp', 'data science', 'scikit-learn', 'xgboost'].some(t => tagLower.includes(t))) {
    return 'ai';
  }
  
  // Frontend
  if (['react', 'next.js', 'typescript', 'javascript', 'tailwind', 'framer'].some(t => tagLower.includes(t))) {
    return 'frontend';
  }
  
  // Backend
  if (['python', 'node', 'api', 'database', 'backend'].some(t => tagLower.includes(t))) {
    return 'backend';
  }
  
  // DevOps
  if (['docker', 'kubernetes', 'aws', 'gcp', 'devops', 'ci/cd'].some(t => tagLower.includes(t))) {
    return 'devops';
  }
  
  // Design
  if (['figma', 'design', 'ui/ux', 'branding', 'animation'].some(t => tagLower.includes(t))) {
    return 'design';
  }
  
  // Security
  if (['security', 'ctf', 'cryptography', 'pentesting'].some(t => tagLower.includes(t))) {
    return 'security';
  }
  
  return 'default';
};

/**
 * ProjectCard - Glass card component for displaying project information
 * 
 * Features:
 * - Image with overlay gradient
 * - Hover animation with expand effect and luminous glow
 * - Technology badges at bottom
 * - Click handler for navigation
 * - Metrics display for data projects
 */
export const ProjectCard: React.FC<ProjectCardProps> = ({ project, className, delay = 0 }) => {
  const router = useRouter();

  const handleClick = () => {
    if (project.link) {
      router.push(project.link);
    }
  };

  return (
    <motion.div
      className={twMerge(
        'group relative rounded-xl overflow-hidden cursor-pointer',
        'bg-white/5 backdrop-blur-md',
        'border border-white/10',
        'transition-all duration-500 ease-out',
        'hover:bg-white/10 hover:border-white/20',
        'hover:shadow-[0_0_40px_rgba(0,255,255,0.3),0_0_80px_rgba(255,0,255,0.2)]',
        'hover:scale-[1.02]',
        className
      )}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      onClick={handleClick}
      whileHover={{ y: -8 }}
    >
      {/* Image Container */}
      <div className="relative w-full h-48 overflow-hidden bg-gradient-to-br from-[#0c0d10] to-[#1a1b1e]">
        {/* Optimized Image with blur placeholder */}
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes={responsiveImageSizes.card}
            quality={imageQuality.card}
            placeholder="blur"
            blurDataURL={getCategoryBlurPlaceholder(project.category)}
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          /* Placeholder gradient if no image */
          <div className="absolute inset-0 bg-gradient-to-br from-[#00f5ff]/20 via-[#ff00ff]/20 to-[#8b00ff]/20" />
        )}
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d10] via-[#0c0d10]/50 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500 z-[1]" />
        
        {/* Featured badge */}
        {project.featured && (
          <div className="absolute top-3 right-3 z-10">
            <Badge category="ai" size="sm" className="backdrop-blur-md">
              ⭐ Featured
            </Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Title */}
        <h3 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#00f5ff] group-hover:to-[#ff00ff] transition-all duration-300">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-gray-300 text-sm line-clamp-3 leading-relaxed">
          {project.description}
        </p>

        {/* Metrics (for data projects) */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="flex flex-wrap gap-3 pt-2">
            {project.metrics.map((metric, index) => (
              <div key={index} className="flex flex-col">
                <span className="text-xs text-gray-400">{metric.label}</span>
                <span className="text-sm font-semibold text-[#00ff9f]">{metric.value}</span>
              </div>
            ))}
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-2 pt-2">
          {project.tags.slice(0, 4).map((tag, index) => (
            <Badge
              key={index}
              category={getTechCategory(tag)}
              size="sm"
              hoverGlow={false}
            >
              {tag}
            </Badge>
          ))}
          {project.tags.length > 4 && (
            <Badge category="default" size="sm" hoverGlow={false}>
              +{project.tags.length - 4}
            </Badge>
          )}
        </div>

        {/* Links */}
        <div className="flex items-center gap-3 pt-2">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-xs text-gray-400 hover:text-[#00f5ff] transition-colors duration-300 flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </a>
          )}
          <span className="text-xs text-gray-500 flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
            View Details
          </span>
        </div>
      </div>

      {/* Hover glow effect overlay */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[#00f5ff]/5 via-transparent to-[#ff00ff]/5" />
      </div>
    </motion.div>
  );
};
