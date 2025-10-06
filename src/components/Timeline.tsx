'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { GlassCard } from './ui/GlassCard';

interface TimelineEntry {
  timestamp: string;
  title: string;
  description: string;
  status: 'active' | 'completed';
  expertise?: string[];
}

const timelineData: TimelineEntry[] = [
  {
    timestamp: '2024-Present',
    title: 'Data Engineer at Colonies',
    description: 'Building scalable data infrastructure & AI solutions',
    status: 'active',
    expertise: ['Data Engineering', 'Data Science', 'Gen AI'],
  },
  {
    timestamp: '2023-Present',
    title: 'Freelance Consulting',
    description: 'Data engineering & GenAI consulting via EI',
    status: 'active',
    expertise: ['Data Analysis', 'Infrastructure', 'AI/ML'],
  },
  {
    timestamp: '2022-2023',
    title: 'Creative Technologist Journey',
    description: 'Exploring intersection of data, design & indie games',
    status: 'completed',
    expertise: ['Data Visualization', 'Creative Coding', 'Game Dev'],
  },
  {
    timestamp: '2021-2022',
    title: 'Arch Linux Rice Master',
    description: 'Perfecting terminal-based development workflow',
    status: 'completed',
    expertise: ['DevOps', 'Terminal Development', 'System Design'],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0 },
};

/**
 * Timeline - Animated vertical timeline component
 * 
 * Features:
 * - Vertical timeline with glass cards
 * - Framer Motion stagger animation for entries
 * - Intersection Observer for scroll-triggered reveals
 * - Displays expertise areas and technical stack
 */
export default function Timeline() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <div ref={ref}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="space-y-6"
      >
        {timelineData.map((entry, index) => (
          <motion.div 
            key={index} 
            variants={itemVariants}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          >
            <GlassCard
              blur="medium"
              borderGradient={entry.status === 'active' ? 'terminal' : 'holographic'}
              padding="lg"
              hoverGlow={true}
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-start gap-4">
                {/* Status indicator */}
                <motion.div
                  className={`w-3 h-3 rounded-full mt-2 flex-shrink-0 ${
                    entry.status === 'active'
                      ? 'bg-mint-green shadow-[0_0_10px_rgba(0,255,159,0.8)]'
                      : 'bg-gray-500'
                  }`}
                  animate={
                    entry.status === 'active'
                      ? {
                          scale: [1, 1.2, 1],
                          opacity: [1, 0.8, 1],
                        }
                      : {}
                  }
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />

                {/* Content */}
                <div className="flex-1">
                  {/* Timestamp */}
                  <div className="font-mono text-sm text-glacier-blue mb-2">
                    {entry.timestamp}
                  </div>

                  {/* Title */}
                  <h4 className="font-space font-semibold text-white text-lg mb-2">
                    {entry.title}
                  </h4>

                  {/* Description */}
                  <p className="text-gray-300 text-sm mb-3">
                    {entry.description}
                  </p>

                  {/* Expertise tags */}
                  {entry.expertise && entry.expertise.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {entry.expertise.map((skill, skillIndex) => (
                        <motion.span
                          key={skillIndex}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.1 * skillIndex }}
                          className="px-2 py-1 text-xs font-mono bg-white/5 border border-white/10 rounded text-gray-300 hover:text-mint-green hover:border-mint-green/30 transition-colors duration-300"
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
