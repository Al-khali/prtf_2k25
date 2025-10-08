'use client';

import { motion } from 'framer-motion';
import { Project } from '@/types';
import { ExternalLink, Github, Lock, FileText, Mail } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  index: number;
}

/**
 * Modern ProjectCard component with NDA support
 * Features glass morphism, smooth animations, and professional badges
 */
export default function ProjectCard({ project, index }: ProjectCardProps) {
  const {
    title,
    description,
    tags,
    image,
    github,
    link,
    caseStudy,
    metrics,
    confidential,
    status,
  } = project;

  // Gradient colors based on category
  const gradients = {
    'data-ai': 'from-cyan-500 to-blue-500',
    'games': 'from-purple-500 to-pink-500',
    'music': 'from-amber-500 to-orange-500',
    'design': 'from-green-500 to-teal-500',
    'security': 'from-red-500 to-rose-500',
  };

  const gradient = gradients[project.category] || 'from-cyan-500 to-blue-500';

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group relative h-full"
    >
      <div className="relative h-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:shadow-lg hover:shadow-cyan-500/10">
        
        {/* Image with overlay */}
        <div className="relative h-48 overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800">
          {image && (
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          )}
          
          {/* Gradient overlay */}
          <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-20 mix-blend-overlay`} />
          
          {/* Badges overlay */}
          <div className="absolute top-3 right-3 flex gap-2">
            {confidential && (
              <span className="flex items-center gap-1 px-2 py-1 bg-red-500/90 backdrop-blur-sm text-white text-xs font-medium rounded-full">
                <Lock className="w-3 h-3" />
                NDA
              </span>
            )}
            {status === 'in-progress' && (
              <span className="px-2 py-1 bg-amber-500/90 backdrop-blur-sm text-white text-xs font-medium rounded-full">
                In Progress
              </span>
            )}
            {status === 'private' && (
              <span className="px-2 py-1 bg-purple-500/90 backdrop-blur-sm text-white text-xs font-medium rounded-full">
                Private
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col h-[calc(100%-12rem)]">
          {/* Title */}
          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-blue-500 transition-all duration-300">
            {title}
          </h3>

          {/* Description */}
          <p className="text-gray-400 text-sm mb-4 line-clamp-3 flex-grow">
            {description}
          </p>

          {/* Metrics */}
          {metrics && metrics.length > 0 && (
            <div className="grid grid-cols-3 gap-2 mb-4 pb-4 border-b border-white/10">
              {metrics.slice(0, 3).map((metric, idx) => (
                <div key={idx} className="text-center">
                  <div className={`text-sm font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
                    {metric.value}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.slice(0, 4).map((tag, idx) => (
              <span
                key={idx}
                className="px-2 py-1 bg-white/5 border border-white/10 rounded-md text-xs text-gray-300 hover:bg-white/10 hover:border-white/20 transition-all duration-200"
              >
                {tag}
              </span>
            ))}
            {tags.length > 4 && (
              <span className="px-2 py-1 text-xs text-gray-500">
                +{tags.length - 4} more
              </span>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-2 mt-auto">
            {github && !confidential && (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-gray-300 hover:bg-white/10 hover:border-white/20 hover:text-white transition-all duration-200 flex-1 justify-center"
              >
                <Github className="w-4 h-4" />
                Code
              </a>
            )}
            
            {confidential && caseStudy && (
              <a
                href={caseStudy}
                className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-gray-300 hover:bg-white/10 hover:border-white/20 hover:text-white transition-all duration-200 flex-1 justify-center"
              >
                <FileText className="w-4 h-4" />
                Case Study
              </a>
            )}
            
            {confidential && !caseStudy && !github && (
              <button
                className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-gray-300 hover:bg-white/10 hover:border-white/20 hover:text-white transition-all duration-200 flex-1 justify-center"
                onClick={() => window.location.href = '#contact'}
              >
                <Mail className="w-4 h-4" />
                Contact
              </button>
            )}
            
            {link && (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${gradient} rounded-lg text-sm text-white font-medium hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-200 ${github || (confidential && caseStudy) ? 'flex-1' : 'w-full'} justify-center`}
              >
                <ExternalLink className="w-4 h-4" />
                View Project
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}
