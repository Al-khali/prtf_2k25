'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

function Particles() {
  const ref = useRef<THREE.Points>(null!)
  
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(2000 * 3)
    
    for (let i = 0; i < 2000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20
    }
    
    return positions
  }, [])

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.1
      ref.current.rotation.y = state.clock.elapsedTime * 0.05
    }
  })

  return (
    <Points ref={ref} positions={particlesPosition} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#00ffff"
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  )
}

function FloatingCubes() {
  const meshRef = useRef<THREE.Mesh>(null!)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.5
    }
  })

  return (
    <mesh ref={meshRef} position={[3, 0, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color="#ff00ff"
        transparent
        opacity={0.6}
        emissive="#ff00ff"
        emissiveIntensity={0.3}
      />
    </mesh>
  )
}

function GridPlane() {
  const gridRef = useRef<THREE.Mesh>(null!)
  
  useFrame((state) => {
    if (gridRef.current) {
      gridRef.current.position.z = ((state.clock.elapsedTime * 2) % 20) - 10
    }
  })

  return (
    <mesh ref={gridRef} position={[0, -5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[50, 50, 50, 50]} />
      <meshBasicMaterial
        color="#00ff00"
        wireframe
        transparent
        opacity={0.2}
      />
    </mesh>
  )
}

function NeonRings() {
  const ringRefs = useRef<THREE.Mesh[]>([])
  
  useFrame((state) => {
    ringRefs.current.forEach((ring, i) => {
      if (ring) {
        ring.rotation.x = state.clock.elapsedTime * (0.5 + i * 0.1)
        ring.rotation.y = state.clock.elapsedTime * (0.3 + i * 0.05)
      }
    })
  })

  return (
    <>
      {[...Array(3)].map((_, i) => (
        <mesh
          key={i}
          ref={(el) => el && (ringRefs.current[i] = el)}
          position={[-3, i * 2 - 2, 0]}
        >
          <torusGeometry args={[1 + i * 0.5, 0.1, 8, 32]} />
          <meshStandardMaterial
            color={i === 0 ? "#00ffff" : i === 1 ? "#ff00ff" : "#ffff00"}
            emissive={i === 0 ? "#00ffff" : i === 1 ? "#ff00ff" : "#ffff00"}
            emissiveIntensity={0.5}
            transparent
            opacity={0.8}
          />
        </mesh>
      ))}
    </>
  )
}

export default function R3FScene() {
  return (
    <>
      <ambientLight intensity={0.1} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00ffff" />
      <pointLight position={[-10, -10, -10]} intensity={1} color="#ff00ff" />
      
      <Particles />
      <FloatingCubes />
      <GridPlane />
      <NeonRings />
      
      <fog attach="fog" args={['#000000', 5, 50]} />
    </>
  )
}