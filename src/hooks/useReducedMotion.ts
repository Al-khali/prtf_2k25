'use client';

import { useState, useEffect } from 'react';

/**
 * useReducedMotion - Hook to detect user's motion preferences
 * 
 * Checks the prefers-reduced-motion media query and returns
 * whether the user prefers reduced motion for accessibility.
 * 
 * @returns {boolean} - True if user prefers reduced motion
 * 
 * @example
 * ```tsx
 * const shouldReduceMotion = useReducedMotion();
 * 
 * <motion.div
 *   animate={{ opacity: 1 }}
 *   transition={{ duration: shouldReduceMotion ? 0 : 0.3 }}
 * />
 * ```
 */
export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check if window is available (client-side)
    if (typeof window === 'undefined') {
      return;
    }

    // Create media query
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    // Set initial value
    setPrefersReducedMotion(mediaQuery.matches);

    // Handler for changes
    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    // Listen for changes
    // Use addEventListener for modern browsers, addListener for older ones
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleChange);
    }

    // Cleanup
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        // Fallback for older browsers
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  return prefersReducedMotion;
}

/**
 * getReducedMotionDuration - Helper to get animation duration based on motion preference
 * 
 * @param normalDuration - Duration in seconds for normal motion
 * @param prefersReducedMotion - Whether user prefers reduced motion
 * @returns Duration in seconds (0 if reduced motion preferred)
 */
export function getReducedMotionDuration(
  normalDuration: number,
  prefersReducedMotion: boolean
): number {
  return prefersReducedMotion ? 0 : normalDuration;
}

/**
 * getReducedMotionTransition - Helper to get Framer Motion transition config
 * 
 * @param normalTransition - Normal transition config
 * @param prefersReducedMotion - Whether user prefers reduced motion
 * @returns Transition config with adjusted duration
 */
export function getReducedMotionTransition<T extends Record<string, unknown>>(
  normalTransition: T,
  prefersReducedMotion: boolean
): T {
  if (prefersReducedMotion) {
    return {
      ...normalTransition,
      duration: 0,
      delay: 0,
    };
  }
  return normalTransition;
}
