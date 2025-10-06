'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function AdminPage() {
  const [password, setPassword] = useState('')
  const [authenticated, setAuthenticated] = useState(false)
  const [attempts, setAttempts] = useState(0)

  useEffect(() => {
    const audio = new Audio('/assets/music/dial-up.mp3')
    audio.volume = 0.3
    audio.play().catch(() => {})
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === 'k4l1d') {
      setAuthenticated(true)
    } else {
      setAttempts(prev => prev + 1)
      setPassword('')
    }
  }

  if (authenticated) {
    return (
      <div className="min-h-screen bg-black text-green-400 font-mono p-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 text-cyan-400">ACCESS GRANTED</h1>
            <p className="text-yellow-400">Welcome to the hidden vault, Neo...</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="border border-green-600 p-6 rounded"
            >
              <h2 className="text-xl font-bold mb-4 text-yellow-400">Hidden Files</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>secret_projects.tar.gz</span>
                  <span className="text-cyan-400">2.3MB</span>
                </div>
                <div className="flex justify-between">
                  <span>ctf_flags.txt</span>
                  <span className="text-cyan-400">1.2KB</span>
                </div>
                <div className="flex justify-between">
                  <span>the_matrix.glb</span>
                  <span className="text-cyan-400">15.7MB</span>
                </div>
                <div className="flex justify-between">
                  <span>khalid_resume_secret.pdf</span>
                  <span className="text-cyan-400">450KB</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="border border-green-600 p-6 rounded"
            >
              <h2 className="text-xl font-bold mb-4 text-yellow-400">Debug Console</h2>
              <div className="bg-gray-900 p-4 rounded text-xs">
                <div className="text-green-400">{'>'} system.status</div>
                <div className="text-gray-400">Status: ONLINE</div>
                <div className="text-gray-400">Uptime: 1337 days</div>
                <div className="text-gray-400">Coffee level: CRITICAL</div>
                <div className="text-green-400 mt-2">{'>'} easter_eggs.list</div>
                <div className="text-gray-400">• Konami Code: ACTIVE</div>
                <div className="text-gray-400">• Terminal: READY</div>
                <div className="text-gray-400">• Music Player: VIBING</div>
                <div className="text-gray-400">• 3D Scene: RENDERING</div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-8 text-center"
          >
            <pre className="text-xs text-cyan-400">
{`
  _   _  ___  _   _   _____ _____ _   _ _   _ ____  
 | | | |/ _ \\| | | | |  ___/ ____| | | | \\ | |  _ \\ 
 | |_| | | | | | | | | |_ | |  | | | |  \\| | | | |
 |  _  | |_| | |_| | |  _|| |__| |_| | |\\  | |_| |
 |_| |_|\\___/ \\___/  |_|   \\____\\___/|_| \\_|____/ 

     THE EASTER EGG MATRIX - LEVEL: COMPLETED
            Thanks for playing! 🎮
`}
            </pre>
          </motion.div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full p-8 border border-red-600 rounded"
      >
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-2 text-red-400">RESTRICTED ACCESS</h1>
          <p className="text-sm">Authorization required to proceed</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-2">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-gray-900 border border-green-600 rounded text-green-400 focus:outline-none focus:border-cyan-400"
              placeholder="Enter access code..."
              autoFocus
            />
          </div>
          
          <button
            type="submit"
            className="w-full p-3 bg-green-600 text-black rounded font-bold hover:bg-green-500 transition-colors"
          >
            ACCESS SYSTEM
          </button>
        </form>

        {attempts > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 text-center text-red-400 text-sm"
          >
            Access denied. Attempts: {attempts}/3
            {attempts >= 2 && (
              <div className="mt-2 text-yellow-400">
                Hint: Check the about page for clues...
              </div>
            )}
          </motion.div>
        )}

        <div className="mt-6 text-xs text-gray-400 text-center">
          <p>Warning: This is a demo easter egg</p>
          <p>No real security is implemented</p>
        </div>
      </motion.div>
    </div>
  )
}