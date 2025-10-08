import { useEffect, useCallback } from 'react';

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

    const handlePointerDown = () => {
      // Touch/pointer usage indicates non-keyboard navigation
      if (isKeyboardUser) {
        isKeyboardUser = false;
        document.body.classList.remove('keyboard-user');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('pointerdown', handlePointerDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('pointerdown', handlePointerDown);
    };
  }, []);
}

/**
 * Hook for keyboard shortcuts
 * 
 * @param shortcuts - Object mapping key combinations to callbacks
 * @example
 * useKeyboardShortcuts({
 *   'Escape': () => closeModal(),
 *   'ctrl+k': () => openSearch(),
 * });
 */
export function useKeyboardShortcuts(
  shortcuts: Record<string, () => void>,
  enabled: boolean = true
) {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!enabled) return;

      // Build key combination string
      const keys: string[] = [];
      if (event.ctrlKey) keys.push('ctrl');
      if (event.altKey) keys.push('alt');
      if (event.shiftKey) keys.push('shift');
      if (event.metaKey) keys.push('meta');
      keys.push(event.key.toLowerCase());

      const combination = keys.join('+');

      // Check if this combination has a handler
      if (shortcuts[combination]) {
        event.preventDefault();
        shortcuts[combination]();
      }

      // Also check for single key shortcuts
      if (shortcuts[event.key]) {
        event.preventDefault();
        shortcuts[event.key]();
      }
    },
    [shortcuts, enabled]
  );

  useEffect(() => {
    if (!enabled) return;

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown, enabled]);
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
