import { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform } from 'framer-motion';

interface ParallaxOptions {
  speed?: number; // Multiplier for parallax effect (0.5 = half speed, 2 = double speed)
  direction?: 'up' | 'down' | 'left' | 'right';
  offset?: number; // Starting offset
}

/**
 * Custom hook for creating parallax scroll effects
 * @param options - Configuration for parallax behavior
 * @returns Motion values for x and y transforms
 */
export function useScrollParallax(options: ParallaxOptions = {}) {
  const { speed = 0.5, direction = 'up', offset = 0 } = options;
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Calculate transform values based on direction
  const getTransformRange = () => {
    const range = 100 * speed;
    switch (direction) {
      case 'up':
        return [offset + range, offset - range];
      case 'down':
        return [offset - range, offset + range];
      case 'left':
        return [offset + range, offset - range];
      case 'right':
        return [offset - range, offset + range];
      default:
        return [offset, offset];
    }
  };

  const transformRange = getTransformRange();
  
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    direction === 'up' || direction === 'down' ? transformRange : [0, 0]
  );

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    direction === 'left' || direction === 'right' ? transformRange : [0, 0]
  );

  return { ref, x, y, scrollYProgress };
}

/**
 * Hook for scroll-triggered animations
 * @param threshold - Intersection threshold (0-1)
 * @returns ref and inView state
 */
export function useScrollTrigger(threshold = 0.1) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !inView) {
          setInView(true);
        }
      },
      { threshold }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, inView]);

  return { ref, inView };
}

/**
 * Hook for getting current scroll position
 * @returns Current scroll Y position
 */
export function useScrollPosition() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial value

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return scrollY;
}

/**
 * Hook for smooth scrolling to elements
 * @returns scrollTo function
 */
export function useSmoothScroll() {
  const scrollTo = (elementId: string, offset = 0) => {
    const element = document.getElementById(elementId);
    if (!element) return;

    const targetPosition = element.offsetTop - offset;
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth',
    });
  };

  return { scrollTo };
}
