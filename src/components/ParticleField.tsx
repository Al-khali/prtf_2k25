'use client';

import { useRef, useMemo, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Vector3, InstancedMesh, ShaderMaterial, AdditiveBlending, Object3D } from 'three';
import { useDeviceDetection } from '@/hooks/useDeviceDetection';
import { usePerformanceMonitor } from '@/hooks/usePerformanceMonitor';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface ParticleFieldProps {
  mouseInfluence?: number;
}



/**
 * ParticleField component with mouse interaction
 * Uses instanced meshes for performance with 10,000+ particles
 * Implements shader-based holographic gradient coloring
 * 
 * Performance optimizations:
 * - Adaptive particle count based on device
 * - Frustum culling enabled
 * - Instanced rendering
 * - Efficient shader materials
 * - Performance monitoring
 */
export default function ParticleField({ 
  mouseInfluence = 0.5 
}: ParticleFieldProps) {
  const meshRef = useRef<InstancedMesh>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const { viewport, size } = useThree();
  
  // Use new hooks for device detection and performance monitoring
  const { isMobile, isTablet, isLowEnd, deviceTier } = useDeviceDetection();
  const { avgFps } = usePerformanceMonitor();
  const prefersReducedMotion = useReducedMotion();
  
  // Track quality adjustments
  const [currentQuality, setCurrentQuality] = useState<'high' | 'mid' | 'low'>('high');
  
  // Adaptive particle count based on device tier and performance
  const getParticleCount = () => {
    // If low-end device, return 0 to trigger CSS fallback
    if (isLowEnd) return 0;
    
    // Adjust based on current quality setting
    const baseCount = isMobile ? 2000 : isTablet ? 5000 : 10000;
    
    if (currentQuality === 'low') return Math.floor(baseCount * 0.5);
    if (currentQuality === 'mid') return Math.floor(baseCount * 0.75);
    return baseCount;
  };
  
  const particleCount = getParticleCount();

  // Dynamic quality adjustment based on performance
  useEffect(() => {
    if (isLowEnd) return; // Skip if using CSS fallback
    
    // Reduce quality if FPS is consistently low
    if (avgFps < 30 && currentQuality !== 'low') {
      if (currentQuality === 'high') {
        setCurrentQuality('mid');
        if (process.env.NODE_ENV === 'development') {
          console.warn(`[ParticleField] Reducing quality to mid due to low FPS: ${avgFps}`);
        }
      } else if (currentQuality === 'mid') {
        setCurrentQuality('low');
        if (process.env.NODE_ENV === 'development') {
          console.warn(`[ParticleField] Reducing quality to low due to low FPS: ${avgFps}`);
        }
      }
    }
    
    // Increase quality if performance improves
    if (avgFps > 50 && currentQuality !== 'high') {
      if (currentQuality === 'low') {
        setCurrentQuality('mid');
        if (process.env.NODE_ENV === 'development') {
          console.log(`[ParticleField] Increasing quality to mid, FPS: ${avgFps}`);
        }
      } else if (currentQuality === 'mid') {
        setCurrentQuality('high');
        if (process.env.NODE_ENV === 'development') {
          console.log(`[ParticleField] Increasing quality to high, FPS: ${avgFps}`);
        }
      }
    }
  }, [avgFps, currentQuality, isLowEnd]);
  
  // Performance logging
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[ParticleField] Device: ${deviceTier}, Quality: ${currentQuality}, Particles: ${particleCount}, FPS: ${avgFps}`);
    }
  }, [deviceTier, currentQuality, particleCount, avgFps]);

  // Generate particle positions and velocities
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < particleCount; i++) {
      const x = (Math.random() - 0.5) * 20;
      const y = (Math.random() - 0.5) * 20;
      const z = (Math.random() - 0.5) * 20;
      const vx = (Math.random() - 0.5) * 0.02;
      const vy = (Math.random() - 0.5) * 0.02;
      const vz = (Math.random() - 0.5) * 0.02;
      
      temp.push({
        position: new Vector3(x, y, z),
        velocity: new Vector3(vx, vy, vz),
        originalPosition: new Vector3(x, y, z),
      });
    }
    return temp;
  }, [particleCount]);

  // Holographic gradient shader material
  const shaderMaterial = useMemo(() => {
    return new ShaderMaterial({
      uniforms: {
        time: { value: 0 },
      },
      vertexShader: `
        varying vec3 vPosition;
        
        void main() {
          vPosition = position;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_Position = projectionMatrix * mvPosition;
          gl_PointSize = 2.0 * (300.0 / -mvPosition.z);
        }
      `,
      fragmentShader: `
        uniform float time;
        varying vec3 vPosition;
        
        void main() {
          // Holographic gradient colors
          vec3 cyan = vec3(0.0, 0.96, 1.0);
          vec3 magenta = vec3(1.0, 0.0, 1.0);
          vec3 violet = vec3(0.55, 0.0, 1.0);
          vec3 gold = vec3(1.0, 0.84, 0.0);
          
          // Create gradient based on position and time
          float mixFactor = sin(vPosition.x * 0.5 + time) * 0.5 + 0.5;
          float mixFactor2 = cos(vPosition.y * 0.5 + time * 0.7) * 0.5 + 0.5;
          
          vec3 color1 = mix(cyan, magenta, mixFactor);
          vec3 color2 = mix(violet, gold, mixFactor2);
          vec3 finalColor = mix(color1, color2, 0.5);
          
          // Circular particle shape
          vec2 center = gl_PointCoord - vec2(0.5);
          float dist = length(center);
          if (dist > 0.5) discard;
          
          // Soft edges with reduced opacity for better text readability
          float alpha = 1.0 - smoothstep(0.3, 0.5, dist);
          
          // Lower opacity to ensure text remains readable
          gl_FragColor = vec4(finalColor, alpha * 0.4);
        }
      `,
      transparent: true,
      blending: AdditiveBlending,
      depthWrite: false,
    });
  }, []);

  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      // Normalize mouse coordinates to -1 to 1
      mouseRef.current.x = (event.clientX / size.width) * 2 - 1;
      mouseRef.current.y = -(event.clientY / size.height) * 2 + 1;
    };

    // Disable mouse interaction on touch devices
    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }
  }, [size, isMobile]);

  // Animation loop
  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.getElapsedTime();
    
    // If user prefers reduced motion, slow down or stop animations
    if (prefersReducedMotion) {
      shaderMaterial.uniforms.time.value = time * 0.1; // Very slow animation
      return; // Skip particle movement
    }
    
    shaderMaterial.uniforms.time.value = time;

    const dummy = new Object3D();
    const mouse3D = new Vector3(
      mouseRef.current.x * viewport.width / 2,
      mouseRef.current.y * viewport.height / 2,
      0
    );

    // Batch matrix updates for better performance
    particles.forEach((particle, i) => {
      // Update position with velocity
      particle.position.add(particle.velocity);

      // Mouse interaction (attraction/repulsion)
      if (!isMobile) {
        const distance = particle.position.distanceTo(mouse3D);
        if (distance < 3) {
          const direction = new Vector3()
            .subVectors(particle.position, mouse3D)
            .normalize();
          particle.position.add(direction.multiplyScalar(mouseInfluence * 0.1));
        }
      }

      // Boundary check - wrap around
      if (Math.abs(particle.position.x) > 10) {
        particle.position.x = -Math.sign(particle.position.x) * 10;
      }
      if (Math.abs(particle.position.y) > 10) {
        particle.position.y = -Math.sign(particle.position.y) * 10;
      }
      if (Math.abs(particle.position.z) > 10) {
        particle.position.z = -Math.sign(particle.position.z) * 10;
      }

      // Gentle pull back to original position
      const returnForce = new Vector3()
        .subVectors(particle.originalPosition, particle.position)
        .multiplyScalar(0.001);
      particle.velocity.add(returnForce);

      // Apply damping
      particle.velocity.multiplyScalar(0.99);

      // Update instance matrix
      dummy.position.copy(particle.position);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  // If low-end device or no particles, return null (R3FScene will handle fallback)
  if (isLowEnd || particleCount === 0) {
    return null;
  }

  return (
    <>
      <instancedMesh
        ref={meshRef}
        args={[undefined, undefined, particleCount]}
        material={shaderMaterial}
        frustumCulled={true}
      >
        <sphereGeometry args={[0.05, isMobile ? 4 : 8, isMobile ? 4 : 8]} />
      </instancedMesh>
      
      {/* Quality indicator in development */}
      {process.env.NODE_ENV === 'development' && currentQuality !== 'high' && (
        <group>
          {/* Development monitoring only */}
        </group>
      )}
    </>
  );
}
