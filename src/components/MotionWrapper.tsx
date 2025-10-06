'use client';

import { motion, MotionProps } from 'framer-motion';
import { ReactNode, useEffect, useState } from 'react';

interface MotionWrapperProps extends MotionProps {
  children: ReactNode;
  as?: keyof typeof motion;
  reduceMotion?: boolean;
}

/**
 * Wrapper component that respects prefers-reduced-motion
 * Disables animations if user prefers reduced motion
 */
export default function MotionWrapper({
  children,
  as = 'div',
  reduceMotion = true,
  initial,
  animate,
  exit,
  transition,
  variants,
  ...props
}: MotionWrapperProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (!reduceMotion) return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [reduceMotion]);

  const MotionComponent = motion[as] as any;

  // If user prefers reduced motion, render without animations
  if (prefersReducedMotion && reduceMotion) {
    return (
      <MotionComponent {...props}>
        {children}
      </MotionComponent>
    );
  }

  // Otherwise, render with animations
  return (
    <MotionComponent
      initial={initial}
      animate={animate}
      exit={exit}
      transition={transition}
      variants={variants}
      {...props}
    >
      {children}
    </MotionComponent>
  );
}

/**
 * Hook to get animation variants that respect reduced motion
 * @param variants - Animation variants
 * @returns Variants or empty object if reduced motion is preferred
 */
export function useAccessibleVariants<T extends Record<string, any>>(variants: T): T | {} {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReducedMotion ? {} : variants;
}
