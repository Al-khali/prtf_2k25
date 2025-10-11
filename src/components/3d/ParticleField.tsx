'use client';

import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * ParticleField - 3D particle system using React Three Fiber
 * 
 * Features from design.md:
 * - Responds to mouse movement with subtle attraction/repulsion
 * - Uses instanced meshes for performance (10,000+ particles)
 * - Shader-based coloring with holographic gradient
 * - frameloop="demand" for better performance
 * - Graceful error handling
 */

interface ParticleSystemProps {
  count?: number;
  mousePosition: { x: number; y: number };
}

function ParticleSystem({ count = 5000, mousePosition }: ParticleSystemProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, [count]);

  const colors = useMemo(() => {
    const col = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const t = i / count;
      // Holographic gradient: cyan -> magenta -> violet -> gold
      if (t < 0.33) {
        // Cyan to magenta
        const mix = t / 0.33;
        col[i * 3] = mix; // R
        col[i * 3 + 1] = 1 - mix; // G
        col[i * 3 + 2] = 1; // B
      } else if (t < 0.66) {
        // Magenta to violet
        const mix = (t - 0.33) / 0.33;
        col[i * 3] = 1 - mix * 0.45; // R
        col[i * 3 + 1] = 0; // G
        col[i * 3 + 2] = 1; // B
      } else {
        // Violet to gold
        const mix = (t - 0.66) / 0.34;
        col[i * 3] = 0.55 + mix * 0.45; // R
        col[i * 3 + 1] = mix * 0.84; // G
        col[i * 3 + 2] = 1 - mix; // B
      }
    }
    return col;
  }, [count]);

  // Animation loop
  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.getElapsedTime();
    const dummy = new THREE.Object3D();

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Original position
      const x = positions[i3];
      const y = positions[i3 + 1];
      const z = positions[i3 + 2];

      // Subtle floating animation
      const offsetY = Math.sin(time * 0.5 + i * 0.01) * 0.5;
      const offsetX = Math.cos(time * 0.3 + i * 0.02) * 0.3;

      // Mouse interaction (subtle attraction/repulsion)
      const mouseInfluence = 2;
      const dx = mousePosition.x * 10 - x;
      const dy = mousePosition.y * 10 - y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const force = Math.max(0, 1 - distance / 10) * mouseInfluence;

      dummy.position.set(
        x + offsetX + dx * force * 0.1,
        y + offsetY + dy * force * 0.1,
        z
      );
      
      // Subtle rotation
      dummy.rotation.set(
        time * 0.5 + i * 0.01,
        time * 0.3 + i * 0.02,
        0
      );

      // Pulsing scale
      const scale = 0.03 + Math.sin(time * 2 + i * 0.1) * 0.01;
      dummy.scale.setScalar(scale);

      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial vertexColors transparent opacity={0.6} />
      <instancedBufferAttribute
        attach="geometry-attributes-color"
        args={[colors, 3]}
      />
    </instancedMesh>
  );
}

/**
 * ParticleField - Main component with Canvas wrapper
 */
export default function ParticleField() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Error handling - if Canvas fails, don't show anything
  if (hasError) {
    return null;
  }

  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 75 }}
      frameloop="demand" // Performance optimization
      gl={{ 
        antialias: false, // Better performance
        alpha: true,
        powerPreference: 'high-performance',
      }}
      onError={() => setHasError(true)}
    >
      <ParticleSystem mousePosition={mousePosition} />
    </Canvas>
  );
}
