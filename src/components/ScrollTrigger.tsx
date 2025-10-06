'use client';

import { ReactNode } from 'react';
import { useScrollTrigger } from '@/hooks/useScrollParallax';

interface ScrollTriggerProps {
  children: ReactNode;
  animation?: 'fade' | 'slide-left' | 'slide-right' | 'scale';
  threshold?: number;
  className?: string;
  delay?: number;
}

export default function ScrollTrigger({
  children,
  animation = 'fade',
  threshold = 0.1,
  className = '',
  delay = 0,
}: ScrollTriggerProps) {
  const { ref, inView } = useScrollTrigger(threshold);

  const animationClass = {
    fade: 'scroll-fade-in',
    'slide-left': 'scroll-slide-left',
    'slide-right': 'scroll-slide-right',
    scale: 'scroll-scale-in',
  }[animation];

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`${animationClass} ${inView ? 'in-view' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
