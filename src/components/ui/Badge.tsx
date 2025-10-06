'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

export interface BadgeProps extends Omit<HTMLMotionProps<'span'>, 'children'> {
  children: React.ReactNode;
  /** Badge category for color-coding */
  category?: 'data' | 'ai' | 'ml' | 'frontend' | 'backend' | 'devops' | 'design' | 'security' | 'default';
  /** Optional icon */
  icon?: React.ReactNode;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Enable hover glow effect */
  hoverGlow?: boolean;
  /** Custom className */
  className?: string;
}

const categoryColorMap = {
  data: {
    bg: 'bg-blue-500/10',
    border: 'border-blue-400/30',
    text: 'text-blue-300',
    glow: 'hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]',
  },
  ai: {
    bg: 'bg-purple-500/10',
    border: 'border-purple-400/30',
    text: 'text-purple-300',
    glow: 'hover:shadow-[0_0_20px_rgba(168,85,247,0.5)]',
  },
  ml: {
    bg: 'bg-violet-500/10',
    border: 'border-violet-400/30',
    text: 'text-violet-300',
    glow: 'hover:shadow-[0_0_20px_rgba(139,0,255,0.5)]',
  },
  frontend: {
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-400/30',
    text: 'text-cyan-300',
    glow: 'hover:shadow-[0_0_20px_rgba(0,255,255,0.5)]',
  },
  backend: {
    bg: 'bg-green-500/10',
    border: 'border-green-400/30',
    text: 'text-green-300',
    glow: 'hover:shadow-[0_0_20px_rgba(0,255,159,0.5)]',
  },
  devops: {
    bg: 'bg-orange-500/10',
    border: 'border-orange-400/30',
    text: 'text-orange-300',
    glow: 'hover:shadow-[0_0_20px_rgba(251,146,60,0.5)]',
  },
  design: {
    bg: 'bg-pink-500/10',
    border: 'border-pink-400/30',
    text: 'text-pink-300',
    glow: 'hover:shadow-[0_0_20px_rgba(236,72,153,0.5)]',
  },
  security: {
    bg: 'bg-red-500/10',
    border: 'border-red-400/30',
    text: 'text-red-300',
    glow: 'hover:shadow-[0_0_20px_rgba(239,68,68,0.5)]',
  },
  default: {
    bg: 'bg-gray-500/10',
    border: 'border-gray-400/30',
    text: 'text-gray-300',
    glow: 'hover:shadow-[0_0_20px_rgba(156,163,175,0.5)]',
  },
};

const sizeMap = {
  sm: 'px-2 py-1 text-xs',
  md: 'px-3 py-1.5 text-sm',
  lg: 'px-4 py-2 text-base',
};

/**
 * Badge - Technology tag badge component
 * 
 * Features:
 * - Color-coded by category (data: blue, AI: purple, etc.)
 * - Optional icon support
 * - Hover glow effect
 * - Size variants
 * - Framer Motion animations
 */
export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      children,
      category = 'default',
      icon,
      size = 'md',
      hoverGlow = true,
      className,
      ...motionProps
    },
    ref
  ) => {
    const colors = categoryColorMap[category];
    const sizeClass = sizeMap[size];

    return (
      <motion.span
        ref={ref}
        className={twMerge(
          // Base styles
          'inline-flex items-center gap-1.5',
          'rounded-full border',
          'font-medium',
          'transition-all duration-300 ease-out',
          'backdrop-blur-sm',
          // Category colors
          colors.bg,
          colors.border,
          colors.text,
          // Hover glow
          hoverGlow && colors.glow,
          // Size
          sizeClass,
          // Custom className
          className
        )}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        whileHover={hoverGlow ? { scale: 1.05 } : {}}
        {...motionProps}
      >
        {icon && <span className="flex-shrink-0">{icon}</span>}
        <span>{children}</span>
      </motion.span>
    );
  }
);

Badge.displayName = 'Badge';
