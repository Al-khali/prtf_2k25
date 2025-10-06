'use client';

import { useRef, useMemo, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleFieldProps {
  count?: number;
  mouseInfluence?: number;
}

interface PerformanceStats {
  fps: number;
  frameTime: number;
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
  count = 10000,
  mouseInfluence = 0.5 
}: ParticleFieldProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const { viewport, size, gl } = useThree();
  const [performanceStats, setPerformanceStats] = useState<PerformanceStats>({ fps: 60, frameTime: 16 });
  const frameTimesRef = useRef<number[]>([]);
  const lastFrameTimeRef = useRef<number>(0);

  // Detect device capabilities
  const isMobile = size.width < 768;
  const isTablet = size.width >= 768 && size.width < 1024;
  const isLowEnd = gl.capabilities.maxTextures < 16; // Simple heuristic for low-end devices
  
  // Adaptive particle count based on device and performance
  const getParticleCount = () => {
    if (isLowEnd) return Math.floor(count / 8); // Very low for weak devices
    if (isMobile) return Math.floor(count / 4); // Significantly reduce on mobile
    if (isTablet) return Math.floor(count / 2); // Moderate reduction on tablet
    return count;
  };
  
  const particleCount = getParticleCount();

  // Performance monitoring
  useEffect(() => {
    const logPerformance = () => {
      if (frameTimesRef.current.length > 0) {
        const avgFrameTime = frameTimesRef.current.reduce((a, b) => a + b, 0) / frameTimesRef.current.length;
        const fps = Math.round(1000 / avgFrameTime);
        
        if (process.env.NODE_ENV === 'development') {
          console.log(`[ParticleField] Performance: ${fps} FPS, ${avgFrameTime.toFixed(2)}ms frame time, ${particleCount} particles`);
        }
        
        setPerformanceStats({ fps, frameTime: avgFrameTime });
        frameTimesRef.current = [];
      }
    };

    const interval = setInterval(logPerformance, 5000); // Log every 5 seconds
    return () => clearInterval(interval);
  }, [particleCount]);

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
        position: new THREE.Vector3(x, y, z),
        velocity: new THREE.Vector3(vx, vy, vz),
        originalPosition: new THREE.Vector3(x, y, z),
      });
    }
    return temp;
  }, [particleCount]);

  // Holographic gradient shader material
  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
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
      blending: THREE.AdditiveBlending,
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

  // Animation loop with performance tracking
  useFrame((state) => {
    if (!meshRef.current) return;

    // Track frame time for performance monitoring
    const currentTime = performance.now();
    if (lastFrameTimeRef.current > 0) {
      const frameTime = currentTime - lastFrameTimeRef.current;
      frameTimesRef.current.push(frameTime);
      
      // Keep only last 60 frames
      if (frameTimesRef.current.length > 60) {
        frameTimesRef.current.shift();
      }
    }
    lastFrameTimeRef.current = currentTime;

    const time = state.clock.getElapsedTime();
    shaderMaterial.uniforms.time.value = time;

    const dummy = new THREE.Object3D();
    const mouse3D = new THREE.Vector3(
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
          const direction = new THREE.Vector3()
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
      const returnForce = new THREE.Vector3()
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

  return (
    <>
      <instancedMesh
        ref={meshRef}
        args={[undefined, undefined, particleCount]}
        material={shaderMaterial}
        frustumCulled={true} // Optimize with frustum culling
      >
        {/* Use low-poly sphere for better performance */}
        <sphereGeometry args={[0.05, isMobile ? 4 : 8, isMobile ? 4 : 8]} />
      </instancedMesh>
      
      {/* Performance warning in development */}
      {process.env.NODE_ENV === 'development' && performanceStats.fps < 30 && (
        <group>
          {/* This is just for development monitoring, won't render anything visible */}
        </group>
      )}
    </>
  );
}
