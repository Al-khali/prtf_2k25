'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Project } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { GlassCard } from '@/components/ui/GlassCard';
import { getCategoryBlurPlaceholder, responsiveImageSizes, imageQuality } from '@/lib/image-utils';

interface ProjectDetailClientProps {
  project: Project;
}

/**
 * Map technology tags to badge categories
 */
const getTechCategory = (tag: string): 'data' | 'ai' | 'ml' | 'frontend' | 'backend' | 'devops' | 'design' | 'security' | 'default' => {
  const tagLower = tag.toLowerCase();
  
  if (['bigquery', 'dbt', 'airflow', 'spark', 'sql', 'data engineering', 'etl'].some(t => tagLower.includes(t))) {
    return 'data';
  }
  if (['pytorch', 'tensorflow', 'ml', 'machine learning', 'transformers', 'bert'].some(t => tagLower.includes(t))) {
    return 'ml';
  }
  if (['ai', 'nlp', 'data science', 'scikit-learn', 'xgboost'].some(t => tagLower.includes(t))) {
    return 'ai';
  }
  if (['react', 'next.js', 'typescript', 'javascript', 'tailwind', 'framer'].some(t => tagLower.includes(t))) {
    return 'frontend';
  }
  if (['python', 'node', 'api', 'database', 'backend'].some(t => tagLower.includes(t))) {
    return 'backend';
  }
  if (['docker', 'kubernetes', 'aws', 'gcp', 'devops', 'ci/cd'].some(t => tagLower.includes(t))) {
    return 'devops';
  }
  if (['figma', 'design', 'ui/ux', 'branding', 'animation'].some(t => tagLower.includes(t))) {
    return 'design';
  }
  if (['security', 'ctf', 'cryptography', 'pentesting'].some(t => tagLower.includes(t))) {
    return 'security';
  }
  
  return 'default';
};

/**
 * Get category display info
 */
const getCategoryInfo = (category: Project['category']) => {
  const categoryMap = {
    'data-ai': { label: 'Data & AI', icon: '📊', color: 'from-blue-500 to-purple-500' },
    'games': { label: 'Games', icon: '🎮', color: 'from-purple-500 to-pink-500' },
    'music': { label: 'Music', icon: '🎵', color: 'from-pink-500 to-red-500' },
    'design': { label: 'Design', icon: '🎨', color: 'from-orange-500 to-yellow-500' },
    'security': { label: 'Security', icon: '🔐', color: 'from-red-500 to-orange-500' },
  };
  return categoryMap[category];
};

/**
 * ProjectDetailClient - Client component for project detail page
 * 
 * Features:
 * - Full project information display
 * - Image gallery
 * - Technology stack
 * - Metrics display
 * - Links to GitHub and live demo
 * - Back navigation
 */
const ProjectDetailClient: React.FC<ProjectDetailClientProps> = ({ project }) => {
  const router = useRouter();
  const categoryInfo = getCategoryInfo(project.category);

  return (
    <div className="min-h-screen bg-[#0c0d10] text-white">
      {/* Hero Section */}
      <div className="relative w-full h-[60vh] overflow-hidden">
        {/* Optimized hero image */}
        {project.image && (
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes={responsiveImageSizes.hero}
            quality={imageQuality.hero}
            placeholder="blur"
            blurDataURL={getCategoryBlurPlaceholder(project.category)}
            className="object-cover"
            priority
          />
        )}
        
        {/* Background gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${categoryInfo.color} opacity-20 z-[1]`} />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0c0d10]/50 to-[#0c0d10] z-[2]" />

        {/* Back button */}
        <motion.div
          className="absolute top-8 left-8 z-[3]"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button
            variant="secondary"
            size="md"
            onClick={() => router.back()}
            className="backdrop-blur-xl"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back
          </Button>
        </motion.div>

        {/* Title and category */}
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 z-[3]">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">{categoryInfo.icon}</span>
                <Badge category="default" size="md">
                  {categoryInfo.label}
                </Badge>
                {project.featured && (
                  <Badge category="ai" size="md">
                    ⭐ Featured
                  </Badge>
                )}
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#00f5ff] via-[#ff00ff] to-[#8b00ff]">
                {project.title}
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl">
                {project.description}
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-8 py-16 space-y-12">
        {/* Metrics */}
        {project.metrics && project.metrics.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <GlassCard padding="lg" borderGradient="holographic">
              <h2 className="text-2xl font-bold mb-6 text-[#00f5ff]">Key Metrics</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {project.metrics.map((metric, index) => (
                  <motion.div
                    key={index}
                    className="text-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  >
                    <div className="text-4xl font-bold text-[#00ff9f] mb-2">
                      {metric.value}
                    </div>
                    <div className="text-gray-400">{metric.label}</div>
                  </motion.div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        )}

        {/* Technology Stack */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <GlassCard padding="lg" borderGradient="terminal">
            <h2 className="text-2xl font-bold mb-6 text-[#00f5ff]">Technology Stack</h2>
            <div className="flex flex-wrap gap-3">
              {project.tags.map((tag, index) => (
                <Badge
                  key={index}
                  category={getTechCategory(tag)}
                  size="lg"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* Links */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <GlassCard padding="lg" borderGradient="cyan">
            <h2 className="text-2xl font-bold mb-6 text-[#00f5ff]">Links</h2>
            <div className="flex flex-wrap gap-4">
              {project.github && (
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => window.open(project.github, '_blank')}
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  View on GitHub
                </Button>
              )}
              <Button
                variant="secondary"
                size="lg"
                onClick={() => router.push('/projects')}
              >
                View All Projects
              </Button>
            </div>
          </GlassCard>
        </motion.div>

        {/* Project Details Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <GlassCard padding="lg" borderGradient="violet">
            <h2 className="text-2xl font-bold mb-6 text-[#00f5ff]">About This Project</h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300 text-lg leading-relaxed">
                {project.description}
              </p>
              
              {/* Additional project details can be added here */}
              <div className="mt-8 p-6 bg-white/5 rounded-lg border border-white/10">
                <p className="text-sm text-gray-400 mb-2">💡 Project Highlights:</p>
                <ul className="list-disc list-inside space-y-2 text-gray-300">
                  <li>Built with modern technologies and best practices</li>
                  <li>Optimized for performance and scalability</li>
                  <li>Clean, maintainable codebase</li>
                  {project.metrics && <li>Measurable impact and results</li>}
                </ul>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectDetailClient;
