'use client'

import { useState, useEffect, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { motion } from 'framer-motion'
import R3FScene from './R3FScene'
import MusicPlayer from './MusicPlayer'
import TerminalShell from './TerminalShell'

export default function Hero() {
  const [showTerminal, setShowTerminal] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return (
      <div className="h-screen bg-black flex items-center justify-center">
        <div className="text-green-400 font-mono">Loading...</div>
      </div>
    )
  }

  return (
    <div className="relative h-screen overflow-hidden bg-black">
      <div className="absolute inset-0 z-0">
        <Suspense fallback={<div className="h-full bg-gradient-to-br from-purple-900 via-blue-900 to-black" />}>
          <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
            <R3FScene />
          </Canvas>
        </Suspense>
      </div>

      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-center mb-8"
        >
          <motion.h1
            className="text-6xl md:text-8xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
            KHALID
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="text-xl md:text-2xl text-green-400 font-mono mb-8"
          >
            <span className="text-cyan-400">$</span> whoami
            <br />
            <span className="text-yellow-400">Data Engineer</span> & <span className="text-pink-400">Creative Technologist</span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="text-lg text-gray-300 max-w-2xl mx-auto mb-12 px-4"
          >
            Building bridges between data and dreams. Crafting pipelines that process millions, 
            games that inspire thousands, and experiences that last forever.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5 }}
          className="flex flex-wrap gap-4 justify-center mb-8"
        >
          <a
            href="/about"
            className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-bold hover:from-cyan-400 hover:to-blue-400 transition-all duration-300 transform hover:scale-105"
          >
            About Me
          </a>
          
          <a
            href="/projects"
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-bold hover:from-purple-400 hover:to-pink-400 transition-all duration-300 transform hover:scale-105"
          >
            Projects
          </a>
          
          <button
            onClick={() => setShowTerminal(true)}
            className="px-6 py-3 border-2 border-green-400 text-green-400 rounded-lg font-bold hover:bg-green-400 hover:text-black transition-all duration-300 transform hover:scale-105"
          >
            Open Terminal
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}
          className="text-center text-sm text-gray-400 font-mono"
        >
          <p>Press ↑ ↑ ↓ ↓ ← → ← → B A for a surprise</p>
          <p className="mt-2">Try ?unlock=0xC0FFEE in the URL</p>
        </motion.div>
      </div>

      <div className="absolute top-4 right-4 z-20">
        <MusicPlayer />
      </div>

      <div className="absolute bottom-4 left-4 z-20 text-green-400 font-mono text-xs">
        <div>System Status: <span className="text-cyan-400">ONLINE</span></div>
        <div>Coffee Level: <span className="text-yellow-400">OPTIMAL</span></div>
        <div>Creativity: <span className="text-pink-400">MAXIMUM</span></div>
      </div>

      {showTerminal && (
        <div className="absolute inset-0 z-30">
          <TerminalShell onClose={() => setShowTerminal(false)} />
        </div>
      )}
    </div>
  )
}