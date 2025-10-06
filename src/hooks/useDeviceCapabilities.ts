'use client';

import { useState, useEffect } from 'react';

interface DeviceCapabilities {
  isMobile: boolean;
  isLowEnd: boolean;
  supportsWebGL: boolean;
  prefersReducedMotion: boolean;
}

/**
 * Hook to detect device capabilities for performance optimization
 */
export function useDeviceCapabilities(): DeviceCapabilities {
  const [capabilities, setCapabilities] = useState<DeviceCapabilities>({
    isMobile: false,
    isLowEnd: false,
    supportsWebGL: true,
    prefersReducedMotion: false,
  });

  useEffect(() => {
    // Check if mobile
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    ) || window.innerWidth < 768;

    // Check WebGL support
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    const supportsWebGL = !!gl;

    // Check if low-end device
    // Heuristics: mobile + low memory or old device
    const isLowEnd = isMobile && (
      // @ts-ignore - navigator.deviceMemory is not in all browsers
      (navigator.deviceMemory && navigator.deviceMemory < 4) ||
      // @ts-ignore - navigator.hardwareConcurrency
      (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4)
    );

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    setCapabilities({
      isMobile,
      isLowEnd,
      supportsWebGL,
      prefersReducedMotion,
    });
  }, []);

  return capabilities;
}
