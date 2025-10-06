'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

export interface GlassCardProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: React.ReactNode;
  /** Blur intensity: 'light', 'medium', 'heavy' */
  blur?: 'light' | 'medium' | 'heavy';
  /** Border gradient colors */
  borderGradient?: 'holographic' | 'cyan' | 'magenta' | 'violet' | 'gold' | 'terminal';
  /** Padding size */
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  /** Enable hover glow effect */
  hoverGlow?: boolean;
  /** Custom className */
  className?: string;
}

const blurIntensityMap = {
  light: 'backdrop-blur-sm',
  medium: 'backdrop-blur-md',
  heavy: 'backdrop-blur-xl',
};

const paddingMap = {
  none: 'p-0',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
  xl: 'p-10',
};

const borderGradientMap = {
  holographic: 'before:bg-gradient-to-r before:from-[#00f5ff] before:via-[#ff00ff] before:to-[#8b00ff]',
  cyan: 'before:bg-gradient-to-r before:from-[#00f5ff] before:to-[#00d4ff]',
  magenta: 'before:bg-gradient-to-r before:from-[#ff00ff] before:to-[#ff1493]',
  violet: 'before:bg-gradient-to-r before:from-[#8b00ff] before:to-[#9370db]',
  gold: 'before:bg-gradient-to-r before:from-[#ffd700] before:to-[#ffed4e]',
  terminal: 'before:bg-gradient-to-r before:from-[#00ff9f] before:to-[#00d4ff]',
};

const hoverGlowMap = {
  holographic: 'hover:shadow-[0_0_30px_rgba(0,255,255,0.4),0_0_60px_rgba(255,0,255,0.2)]',
  cyan: 'hover:shadow-[0_0_30px_rgba(0,255,255,0.5)]',
  magenta: 'hover:shadow-[0_0_30px_rgba(255,0,255,0.5)]',
  violet: 'hover:shadow-[0_0_30px_rgba(139,0,255,0.5)]',
  gold: 'hover:shadow-[0_0_30px_rgba(255,215,0,0.5)]',
  terminal: 'hover:shadow-[0_0_30px_rgba(0,255,159,0.5)]',
};

/**
 * GlassCard - A glassmorphism card component with backdrop blur and border gradient
 * 
 * Features:
 * - Configurable blur intensity
 * - Animated border gradients
 * - Hover glow effects
 * - Responsive padding variants
 * - Framer Motion animations
 */
export const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  (
    {
      children,
      blur = 'medium',
      borderGradient = 'holographic',
      padding = 'md',
      hoverGlow = true,
      className,
      ...motionProps
    },
    ref
  ) => {
    const blurClass = blurIntensityMap[blur];
    const paddingClass = paddingMap[padding];
    const borderGradientClass = borderGradientMap[borderGradient];
    const hoverGlowClass = hoverGlow ? hoverGlowMap[borderGradient] : '';

    return (
      <motion.div
        ref={ref}
        className={twMerge(
          // Base styles
          'relative rounded-xl overflow-hidden',
          // Glass effect
          'bg-white/5',
          blurClass,
          // Border gradient (using pseudo-element)
          'before:absolute before:inset-0 before:rounded-xl before:p-[1px]',
          'before:-z-10 before:content-[""]',
          borderGradientClass,
          'before:mask-[linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)]',
          'before:mask-composite-[exclude]',
          'before:[mask-composite:exclude]',
          // Padding
          paddingClass,
          // Hover effects
          'transition-all duration-300 ease-out',
          hoverGlowClass,
          // Custom className
          className
        )}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        {...motionProps}
      >
        {children}
      </motion.div>
    );
  }
);

GlassCard.displayName = 'GlassCard';
