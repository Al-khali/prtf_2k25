'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

export interface HolographicTextProps extends Omit<HTMLMotionProps<'h1'>, 'children'> {
  children: React.ReactNode;
  /** HTML tag to render */
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  /** Gradient color scheme */
  gradient?: 'holographic' | 'cyan-magenta' | 'violet-gold' | 'terminal';
  /** Enable shimmer animation */
  shimmer?: boolean;
  /** Animation delay in seconds */
  delay?: number;
  /** Custom className */
  className?: string;
}

const gradientMap = {
  holographic: 'bg-gradient-to-r from-[#00f5ff] via-[#ff00ff] via-[#8b00ff] to-[#ffd700]',
  'cyan-magenta': 'bg-gradient-to-r from-[#00f5ff] to-[#ff00ff]',
  'violet-gold': 'bg-gradient-to-r from-[#8b00ff] to-[#ffd700]',
  terminal: 'bg-gradient-to-r from-[#00ff9f] to-[#00d4ff]',
};

/**
 * HolographicText - Animated text with holographic gradient effect
 * 
 * Features:
 * - CSS background-clip gradient effect
 * - Shimmer animation using keyframes
 * - Framer Motion entrance animation
 * - Configurable gradient schemes
 * - Semantic HTML tag support
 */
export const HolographicText = React.forwardRef<HTMLElement, HolographicTextProps>(
  (
    {
      children,
      as = 'h1',
      gradient = 'holographic',
      shimmer = true,
      delay = 0,
      className,
      ...motionProps
    },
    ref
  ) => {
  const Component = motion[as] as typeof motion[keyof typeof motion];
    const gradientClass = gradientMap[gradient];

    return (
      <>
        <style jsx>{`
          @keyframes shimmer {
            0% {
              background-position: -200% center;
            }
            100% {
              background-position: 200% center;
            }
          }
          
          .holographic-shimmer {
            background-size: 200% auto;
            animation: shimmer 3s linear infinite;
          }
        `}</style>
        
        <Component
          ref={ref}
          className={twMerge(
            // Base gradient styles
            gradientClass,
            'bg-clip-text text-transparent',
            // Shimmer animation
            shimmer && 'holographic-shimmer',
            // Font smoothing
            'antialiased',
            // Custom className
            className
          )}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay,
            ease: [0.4, 0, 0.2, 1],
          }}
          {...motionProps}
        >
          {children}
        </Component>
      </>
    );
  }
);

HolographicText.displayName = 'HolographicText';
