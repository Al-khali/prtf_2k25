'use client';

import { useEffect, ReactNode } from 'react';
import { useKeyboardNavigation } from '@/hooks/useKeyboardNavigation';
import SkipLinks from '@/components/SkipLink';

interface AccessibilityProviderProps {
  children: ReactNode;
}

export default function AccessibilityProvider({ children }: AccessibilityProviderProps) {
  // Enable keyboard navigation detection
  useKeyboardNavigation();

  useEffect(() => {
    // Set up ARIA live region for announcements
    const liveRegion = document.createElement('div');
    liveRegion.id = 'aria-live-region';
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'sr-only';
    document.body.appendChild(liveRegion);

    return () => {
      const region = document.getElementById('aria-live-region');
      if (region) {
        document.body.removeChild(region);
      }
    };
  }, []);

  return (
    <>
      <SkipLinks />
      {children}
    </>
  );
}

/**
 * Utility function to announce messages to screen readers
 * @param message - Message to announce
 * @param priority - 'polite' or 'assertive'
 */
export function announceToScreenReader(message: string, priority: 'polite' | 'assertive' = 'polite') {
  const liveRegion = document.getElementById('aria-live-region');
  if (liveRegion) {
    liveRegion.setAttribute('aria-live', priority);
    liveRegion.textContent = message;
    
    // Clear after announcement
    setTimeout(() => {
      liveRegion.textContent = '';
    }, 1000);
  }
}
