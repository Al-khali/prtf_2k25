'use client';

import { motion, MotionProps } from 'framer-motion';
import { ReactNode } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface MotionWrapperProps extends MotionProps {
  children: ReactNode;
  as?: keyof typeof motion;
  respectReducedMotion?: boolean;
}

/**
 * Wrapper component that respects prefers-reduced-motion
 * Disables animations if user prefers reduced motion
 */
export default function MotionWrapper({
  children,
  as = 'div',
  respectReducedMotion = true,
  initial,
  animate,
  exit,
  transition,
  variants,
  ...props
}: MotionWrapperProps) {
  const prefersReducedMotion = useReducedMotion();

  const MotionComponent = motion[as] as typeof motion[keyof typeof motion];

  // If user prefers reduced motion, render without animations
  if (prefersReducedMotion && respectReducedMotion) {
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
export function useAccessibleVariants<T extends Record<string, unknown>>(
  variants: T,
): T | Record<string, never> {
  const prefersReducedMotion = useReducedMotion();
  return prefersReducedMotion ? {} : variants;
}
