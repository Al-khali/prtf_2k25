import { useEffect } from 'react';

/**
 * Hook to detect keyboard navigation and add appropriate class to body
 * This helps show focus indicators only for keyboard users
 */
export function useKeyboardNavigation() {
  useEffect(() => {
    let isKeyboardUser = false;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Tab key indicates keyboard navigation
      if (e.key === 'Tab') {
        isKeyboardUser = true;
        document.body.classList.add('keyboard-user');
      }
    };

    const handleMouseDown = () => {
      // Mouse usage indicates non-keyboard navigation
      if (isKeyboardUser) {
        isKeyboardUser = false;
        document.body.classList.remove('keyboard-user');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('mousedown', handleMouseDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);
}

/**
 * Hook to detect user's motion preferences
 * @returns boolean indicating if user prefers reduced motion
 */
export function usePrefersReducedMotion() {
  if (typeof window === 'undefined') return false;

  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  return mediaQuery.matches;
}

/**
 * Hook to detect user's contrast preferences
 * @returns 'high' | 'normal'
 */
export function usePrefersContrast() {
  if (typeof window === 'undefined') return 'normal';

  const mediaQuery = window.matchMedia('(prefers-contrast: high)');
  return mediaQuery.matches ? 'high' : 'normal';
}
