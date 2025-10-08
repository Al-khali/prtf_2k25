'use client';

import { useEffect, useRef } from 'react';

/**
 * useFocusTrap - Hook to trap focus within a modal or dialog
 * 
 * Implements focus management for accessible modals:
 * - Traps focus within the modal
 * - Returns focus to trigger element on close
 * - Supports Escape key to close
 * - Blocks body scroll when active
 * 
 * @param isOpen - Whether the modal is open
 * @param onClose - Callback to close the modal
 * @returns Ref to attach to the modal container
 * 
 * @example
 * ```tsx
 * const modalRef = useFocusTrap(isOpen, () => setIsOpen(false));
 * 
 * return (
 *   <div ref={modalRef} role="dialog" aria-modal="true">
 *     Modal content
 *   </div>
 * );
 * ```
 */
export function useFocusTrap(
  isOpen: boolean,
  onClose?: () => void
) {
  const containerRef = useRef<HTMLElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    // Store the element that had focus before opening
    previousActiveElement.current = document.activeElement as HTMLElement;

    // Get all focusable elements within the container
    const getFocusableElements = (): HTMLElement[] => {
      if (!containerRef.current) return [];

      const focusableSelectors = [
        'a[href]',
        'button:not([disabled])',
        'textarea:not([disabled])',
        'input:not([disabled])',
        'select:not([disabled])',
        '[tabindex]:not([tabindex="-1"])',
      ].join(', ');

      return Array.from(
        containerRef.current.querySelectorAll<HTMLElement>(focusableSelectors)
      ).filter((el) => {
        // Filter out hidden elements
        return el.offsetParent !== null;
      });
    };

    // Focus the first focusable element
    const focusableElements = getFocusableElements();
    if (focusableElements.length > 0) {
      focusableElements[0].focus();
    }

    // Handle Tab key to trap focus
    const handleKeyDown = (event: KeyboardEvent) => {
      // Handle Escape key
      if (event.key === 'Escape' && onClose) {
        event.preventDefault();
        onClose();
        return;
      }

      // Handle Tab key
      if (event.key === 'Tab') {
        const focusableElements = getFocusableElements();
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        // Shift + Tab (backwards)
        if (event.shiftKey) {
          if (document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
          }
        }
        // Tab (forwards)
        else {
          if (document.activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    // Block body scroll
    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;
    
    // Calculate scrollbar width to prevent layout shift
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    
    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    // Add event listener
    document.addEventListener('keydown', handleKeyDown);

    // Cleanup
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      
      // Restore body scroll
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
      
      // Return focus to the element that had it before
      if (previousActiveElement.current) {
        previousActiveElement.current.focus();
      }
    };
  }, [isOpen, onClose]);

  return containerRef;
}

/**
 * useFocusLock - Simpler version that just locks focus without Escape handling
 * 
 * @param isActive - Whether focus lock is active
 * @returns Ref to attach to the container
 */
export function useFocusLock(isActive: boolean) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const container = containerRef.current;

    const handleFocusOut = (event: FocusEvent) => {
      const target = event.relatedTarget as HTMLElement;
      
      // If focus is moving outside the container, bring it back
      if (target && !container.contains(target)) {
        event.preventDefault();
        
        // Focus the first focusable element in the container
        const focusableElements = container.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        
        if (focusableElements.length > 0) {
          focusableElements[0].focus();
        }
      }
    };

    container.addEventListener('focusout', handleFocusOut);

    return () => {
      container.removeEventListener('focusout', handleFocusOut);
    };
  }, [isActive]);

  return containerRef;
}
