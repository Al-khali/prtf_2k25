'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function Particles() {
  const ref = useRef<THREE.Points>(null);
  const [positions, colors, scales] = useMemo(() => {
    const positions = new Float32Array(1500 * 3);
    const colors = new Float32Array(1500 * 3);
    const scales = new Float32Array(1500);
    
    for (let i = 0; i < 1500; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 25;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 25;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 25;
      
      const color = new THREE.Color();
      const hue = Math.random() * 0.4 + 0.45; // More refined color range
      color.setHSL(hue, 0.7, 0.5 + Math.random() * 0.3);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
      
      scales[i] = Math.random() * 0.5 + 0.5;
    }
    
    return [positions, colors, scales];
  }, []);

  useFrame((state) => {
    if (ref.current) {
      // Slower, more organic rotation
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.2;
      ref.current.rotation.y = state.clock.elapsedTime * 0.08;
      
      const positions = ref.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        // More organic floating motion
        positions[i + 1] += Math.sin(state.clock.elapsedTime * 0.5 + positions[i] * 0.5) * 0.002;
        positions[i] += Math.cos(state.clock.elapsedTime * 0.3 + positions[i + 2] * 0.3) * 0.001;
      }
      ref.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <Points ref={ref} positions={positions} colors={colors}>
      <PointMaterial
        transparent
        vertexColors
        size={0.015}
        sizeAttenuation={true}
        alphaTest={0.001}
        opacity={0.6}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

export default function ParticleField() {
  return (
    <div className="particles-container">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 75 }}
        style={{ background: 'transparent' }}
      >
        <Particles />
      </Canvas>
    </div>
  );
}