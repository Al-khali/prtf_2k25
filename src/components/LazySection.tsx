'use client';

import { lazy, Suspense, ReactNode, ComponentType } from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { ErrorBoundary } from './ErrorBoundary';

interface LazySectionProps {
  children: ReactNode;
  fallback: ReactNode;
  preloadDistance?: number;
  className?: string;
}

export function LazySection({
  children,
  fallback,
  preloadDistance = 200,
  className = '',
}: LazySectionProps) {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0,
    rootMargin: `${preloadDistance}px`,
    freezeOnceVisible: true,
  });

  return (
    <div ref={ref} className={className}>
      <ErrorBoundary>
        <Suspense fallback={fallback}>
          {isIntersecting ? children : fallback}
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
