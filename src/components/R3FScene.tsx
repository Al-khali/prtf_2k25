'use client';

import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import { Suspense, useEffect, useState } from 'react';
import { useDeviceCapabilities } from '@/hooks/useDeviceCapabilities';

interface R3FSceneProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

/**
 * React Three Fiber Scene wrapper with performance monitoring and fallback
 * Provides camera setup, lighting, and responsive canvas sizing
 * Automatically falls back to static gradient on unsupported or low-end devices
 */
export default function R3FScene({ children, fallback }: R3FSceneProps) {
  const { isMobile, isLowEnd, supportsWebGL, prefersReducedMotion } = useDeviceCapabilities();
  const [shouldRender3D, setShouldRender3D] = useState(true);

  useEffect(() => {
    // Disable 3D on low-end devices or if WebGL not supported
    if (!supportsWebGL || isLowEnd) {
      setShouldRender3D(false);
      console.info('3D rendering disabled: using static fallback for better performance');
    }
  }, [supportsWebGL, isLowEnd]);

  // Fallback for unsupported or low-end devices
  if (!shouldRender3D) {
    return (
      <div className="absolute inset-0 -z-10">
        {fallback || (
          <div className="absolute inset-0 bg-gradient-to-br from-bg-primary via-bg-secondary to-bg-primary">
            <div className="absolute inset-0 opacity-20">
              <div 
                className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-holo-cyan blur-3xl"
                style={{
                  animation: prefersReducedMotion ? 'none' : 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite'
                }}
              />
              <div 
                className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-holo-magenta blur-3xl"
                style={{
                  animation: prefersReducedMotion ? 'none' : 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                  animationDelay: '1s'
                }}
              />
              <div 
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-holo-violet blur-3xl opacity-10"
                style={{
                  animation: prefersReducedMotion ? 'none' : 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                  animationDelay: '2s'
                }}
              />
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        dpr={[1, isMobile ? 1.5 : 2]} // Adaptive pixel ratio based on device
        performance={{ 
          min: 0.5, // Will reduce quality if FPS drops below 50%
          max: 1, // Maximum quality multiplier
          debounce: 200, // Debounce performance adjustments
        }}
        gl={{
          antialias: !isMobile, // Disable antialiasing on mobile for performance
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false, // Disable stencil buffer for performance
          depth: true,
          logarithmicDepthBuffer: false, // Disable for better performance
          preserveDrawingBuffer: false, // Don't preserve buffer for better performance
        }}
        frameloop="always" // Continuous rendering for animations
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
        onCreated={({ gl }) => {
          // Additional WebGL optimizations
          gl.setClearColor('#0c0d10', 1);
          
          // Log renderer info in development
          if (process.env.NODE_ENV === 'development') {
            console.log('[R3FScene] WebGL Renderer:', {
              vendor: gl.getParameter(gl.VENDOR),
              renderer: gl.getParameter(gl.RENDERER),
              maxTextures: gl.capabilities.maxTextures,
              maxVertexUniforms: gl.capabilities.maxVertexUniforms,
            });
          }
        }}
      >
        {/* Camera setup */}
        <PerspectiveCamera
          makeDefault
          position={[0, 0, 5]}
          fov={isMobile ? 85 : 75} // Wider FOV on mobile for better view
          near={0.1}
          far={1000}
        />

        {/* Lighting setup - optimized for particle rendering */}
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00f5ff" />

        {/* Scene content with Suspense boundary */}
        <Suspense fallback={null}>
          {children}
        </Suspense>
      </Canvas>
    </div>
  );
}
