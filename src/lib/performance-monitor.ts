/**
 * Performance monitoring utilities for 3D rendering
 */

export interface PerformanceMetrics {
  fps: number;
  frameTime: number;
  memory?: number;
  drawCalls?: number;
}

export class PerformanceMonitor {
  private frameTimes: number[] = [];
  private lastFrameTime: number = 0;
  private maxSamples: number = 60;

  constructor(maxSamples: number = 60) {
    this.maxSamples = maxSamples;
  }

  /**
   * Record a frame time
   */
  recordFrame(): void {
    const currentTime = performance.now();
    
    if (this.lastFrameTime > 0) {
      const frameTime = currentTime - this.lastFrameTime;
      this.frameTimes.push(frameTime);
      
      // Keep only the last N samples
      if (this.frameTimes.length > this.maxSamples) {
        this.frameTimes.shift();
      }
    }
    
    this.lastFrameTime = currentTime;
  }

  /**
   * Get current performance metrics
   */
  getMetrics(): PerformanceMetrics {
    if (this.frameTimes.length === 0) {
      return { fps: 60, frameTime: 16.67 };
    }

    const avgFrameTime = this.frameTimes.reduce((a, b) => a + b, 0) / this.frameTimes.length;
    const fps = Math.round(1000 / avgFrameTime);

    const metrics: PerformanceMetrics = {
      fps,
      frameTime: avgFrameTime,
    };

    // Add memory info if available
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      metrics.memory = memory.usedJSHeapSize / 1048576; // Convert to MB
    }

    return metrics;
  }

  /**
   * Check if performance is acceptable
   */
  isPerformanceGood(minFps: number = 30): boolean {
    const metrics = this.getMetrics();
    return metrics.fps >= minFps;
  }

  /**
   * Reset the monitor
   */
  reset(): void {
    this.frameTimes = [];
    this.lastFrameTime = 0;
  }

  /**
   * Get performance level (high, medium, low)
   */
  getPerformanceLevel(): 'high' | 'medium' | 'low' {
    const metrics = this.getMetrics();
    
    if (metrics.fps >= 55) return 'high';
    if (metrics.fps >= 30) return 'medium';
    return 'low';
  }
}

/**
 * Detect device performance tier
 */
export function detectDeviceTier(): 'high' | 'medium' | 'low' {
  // Check hardware concurrency (CPU cores)
  const cores = navigator.hardwareConcurrency || 2;
  
  // Check memory if available
  let memory = 4; // Default assumption
  if ('deviceMemory' in navigator) {
    memory = (navigator as any).deviceMemory;
  }
  
  // Check if mobile
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  // Scoring system
  let score = 0;
  
  if (cores >= 8) score += 3;
  else if (cores >= 4) score += 2;
  else score += 1;
  
  if (memory >= 8) score += 3;
  else if (memory >= 4) score += 2;
  else score += 1;
  
  if (!isMobile) score += 2;
  
  // Determine tier
  if (score >= 7) return 'high';
  if (score >= 4) return 'medium';
  return 'low';
}

/**
 * Get recommended particle count based on device tier
 */
export function getRecommendedParticleCount(baseCount: number = 10000): number {
  const tier = detectDeviceTier();
  
  switch (tier) {
    case 'high':
      return baseCount;
    case 'medium':
      return Math.floor(baseCount / 2);
    case 'low':
      return Math.floor(baseCount / 4);
  }
}

/**
 * Log performance metrics to console (development only)
 */
export function logPerformanceMetrics(metrics: PerformanceMetrics, context: string = ''): void {
  if (process.env.NODE_ENV !== 'development') return;
  
  const prefix = context ? `[${context}]` : '[Performance]';
  console.log(`${prefix} FPS: ${metrics.fps}, Frame Time: ${metrics.frameTime.toFixed(2)}ms${metrics.memory ? `, Memory: ${metrics.memory.toFixed(2)}MB` : ''}`);
}
