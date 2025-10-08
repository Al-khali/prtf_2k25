'use client';

import { useState, useEffect } from 'react';

export type DeviceTier = 'low' | 'mid' | 'high';

export interface DeviceDetection {
  isMobile: boolean;
  isTablet: boolean;
  isLowEnd: boolean;
  deviceTier: DeviceTier;
}

/**
 * Hook to detect device capabilities and tier for adaptive performance optimization
 * Detects mobile, tablet, low-end devices and calculates overall device tier
 */
export function useDeviceDetection(): DeviceDetection {
  const [device, setDevice] = useState<DeviceDetection>({
    isMobile: false,
    isTablet: false,
    isLowEnd: false,
    deviceTier: 'high',
  });

  useEffect(() => {
    const checkDevice = () => {
      // Detect mobile and tablet based on viewport
      const width = window.innerWidth;
      const isMobile = width < 768;
      const isTablet = width >= 768 && width < 1024;

      // Detect low-end devices based on hardware capabilities
      const hardwareConcurrency = navigator.hardwareConcurrency || 4;
      const deviceMemory = (navigator as any).deviceMemory || 4;
      
      // Check connection quality if available
      const connection = (navigator as any).connection;
      const effectiveType = connection?.effectiveType;
      const isSlowConnection = 
        effectiveType === '2g' || 
        effectiveType === 'slow-2g';

      // Determine if device is low-end based on multiple factors
      const isLowEnd = 
        hardwareConcurrency <= 2 ||
        deviceMemory <= 2 ||
        isSlowConnection;

      // Calculate device tier
      let deviceTier: DeviceTier;
      if (isLowEnd) {
        deviceTier = 'low';
      } else if (isMobile || isTablet) {
        deviceTier = 'mid';
      } else {
        deviceTier = 'high';
      }

      setDevice({ isMobile, isTablet, isLowEnd, deviceTier });
    };

    // Initial check
    checkDevice();

    // Re-check on resize
    window.addEventListener('resize', checkDevice);
    
    // Re-check on connection change if available
    const connection = (navigator as any).connection;
    if (connection) {
      connection.addEventListener('change', checkDevice);
    }

    return () => {
      window.removeEventListener('resize', checkDevice);
      if (connection) {
        connection.removeEventListener('change', checkDevice);
      }
    };
  }, []);

  return device;
}
