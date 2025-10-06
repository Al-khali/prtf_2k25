'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Project } from '@/types';
import { twMerge } from 'tailwind-merge';

export interface CategoryFilterProps {
  /** Currently selected category */
  selectedCategory: Project['category'] | 'all';
  /** Callback when category changes */
  onCategoryChange: (category: Project['category'] | 'all') => void;
  /** Custom className */
  className?: string;
}

interface CategoryOption {
  id: Project['category'] | 'all';
  label: string;
  icon: string;
}

const categories: CategoryOption[] = [
  { id: 'all', label: 'All Projects', icon: '✨' },
  { id: 'data-ai', label: 'Data & AI', icon: '📊' },
  { id: 'games', label: 'Games', icon: '🎮' },
  { id: 'music', label: 'Music', icon: '🎵' },
  { id: 'design', label: 'Design', icon: '🎨' },
  { id: 'security', label: 'Security', icon: '🔐' },
];

/**
 * CategoryFilter - Filter buttons for project categories
 * 
 * Features:
 * - Filter buttons for each category plus "All"
 * - Active state with glow effect
 * - Smooth transitions
 * - Responsive layout
 */
export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onCategoryChange,
  className,
}) => {
  return (
    <div className={twMerge('flex flex-wrap gap-3 justify-center', className)}>
      {categories.map((category, index) => {
        const isActive = selectedCategory === category.id;

        return (
          <motion.button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={twMerge(
              'relative px-6 py-3 rounded-lg',
              'font-medium text-sm',
              'transition-all duration-300 ease-out',
              'backdrop-blur-md',
              'border',
              'focus:outline-none focus:ring-2 focus:ring-[#00f5ff] focus:ring-offset-2 focus:ring-offset-[#0c0d10]',
              // Inactive state
              !isActive && [
                'bg-white/5',
                'border-white/10',
                'text-gray-300',
                'hover:bg-white/10',
                'hover:border-white/20',
                'hover:text-white',
                'hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]',
              ],
              // Active state
              isActive && [
                'bg-gradient-to-r from-[#00f5ff]/20 to-[#ff00ff]/20',
                'border-[#00f5ff]/50',
                'text-white',
                'shadow-[0_0_30px_rgba(0,255,255,0.4),0_0_60px_rgba(255,0,255,0.2)]',
              ]
            )}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05, ease: 'easeOut' }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Active indicator */}
            {isActive && (
              <motion.div
                className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#00f5ff]/10 to-[#ff00ff]/10"
                layoutId="activeCategory"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}

            {/* Content */}
            <span className="relative flex items-center gap-2">
              <span className="text-lg">{category.icon}</span>
              <span>{category.label}</span>
            </span>

            {/* Glow effect for active state */}
            {isActive && (
              <motion.div
                className="absolute inset-0 rounded-lg opacity-50 blur-xl bg-gradient-to-r from-[#00f5ff] to-[#ff00ff]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                transition={{ duration: 0.5 }}
                style={{ zIndex: -1 }}
              />
            )}
          </motion.button>
        );
      })}
    </div>
  );
};
