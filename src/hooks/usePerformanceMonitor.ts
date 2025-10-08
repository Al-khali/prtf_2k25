'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

export type QualityAdjustment = 'reduce' | 'increase';

export interface PerformanceMetrics {
  fps: number;
  avgFps: number;
  isLowPerformance: boolean;
}

export interface UsePerformanceMonitorReturn extends PerformanceMetrics {
  adjustQuality: (adjustment: QualityAdjustment) => void;
}

/**
 * Hook to monitor FPS in real-time and provide quality adjustment capabilities
 * Tracks FPS using requestAnimationFrame and calculates rolling average over 60 frames
 */
export function usePerformanceMonitor(): UsePerformanceMonitorReturn {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 60,
    avgFps: 60,
    isLowPerformance: false,
  });

  const frameTimesRef = useRef<number[]>([]);
  const lastFrameTimeRef = useRef<number>(performance.now());
  const rafIdRef = useRef<number | undefined>(undefined);

  const adjustQuality = useCallback((adjustment: QualityAdjustment) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[PerformanceMonitor] Quality adjustment requested: ${adjustment}`);
    }
    // This function is exposed for external components to react to quality changes
    // The actual adjustment logic will be in the consuming component
  }, []);

  useEffect(() => {
    let isActive = true;

    const measureFPS = (currentTime: number) => {
      if (!isActive) return;

      // Calculate time since last frame
      const deltaTime = currentTime - lastFrameTimeRef.current;
      lastFrameTimeRef.current = currentTime;

      // Calculate current FPS
      const currentFps = deltaTime > 0 ? 1000 / deltaTime : 60;

      // Store frame time (keep last 60 frames for rolling average)
      frameTimesRef.current.push(currentFps);
      if (frameTimesRef.current.length > 60) {
        frameTimesRef.current.shift();
      }

      // Calculate average FPS over last 60 frames
      const avgFps = frameTimesRef.current.reduce((sum, fps) => sum + fps, 0) / frameTimesRef.current.length;

      // Determine if performance is low (below 30 FPS average)
      const isLowPerformance = avgFps < 30;

      // Update metrics every 10 frames to avoid too frequent re-renders
      if (frameTimesRef.current.length % 10 === 0) {
        setMetrics({
          fps: Math.round(currentFps),
          avgFps: Math.round(avgFps),
          isLowPerformance,
        });

        // Log performance metrics in development
        if (process.env.NODE_ENV === 'development' && isLowPerformance) {
          console.warn(`[PerformanceMonitor] Low performance detected: ${Math.round(avgFps)} FPS`);
        }
      }

      // Continue monitoring
      rafIdRef.current = requestAnimationFrame(measureFPS);
    };

    // Start monitoring
    rafIdRef.current = requestAnimationFrame(measureFPS);

    return () => {
      isActive = false;
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []);

  return {
    ...metrics,
    adjustQuality,
  };
}
