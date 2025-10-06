'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { defaultTracks, audioVisualizer, Track } from '@/lib/audio'

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrack, setCurrentTrack] = useState(0)
  const [volume, setVolume] = useState(0.5)
  const [isExpanded, setIsExpanded] = useState(false)
  const [visualData, setVisualData] = useState<Uint8Array | null>(null)
  const [concertMode, setConcertMode] = useState(false)
  
  const audioRef = useRef<HTMLAudioElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleLoadedData = async () => {
      try {
        await audioVisualizer.setupAudio(audio)
      } catch (error) {
        console.log('Audio setup failed:', error)
      }
    }

    audio.addEventListener('loadeddata', handleLoadedData)
    return () => audio.removeEventListener('loadeddata', handleLoadedData)
  }, [])

  useEffect(() => {
    if (isPlaying && visualData) {
      drawVisualization()
    }
  }, [visualData, isPlaying])

  useEffect(() => {
    if (isPlaying) {
      audioVisualizer.startVisualization((data) => {
        setVisualData(data)
      })
    } else {
      audioVisualizer.stopVisualization()
    }

    return () => audioVisualizer.stopVisualization()
  }, [isPlaying])

  const drawVisualization = () => {
    const canvas = canvasRef.current
    if (!canvas || !visualData) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const width = canvas.width
    const height = canvas.height
    const barWidth = width / visualData.length
    
    ctx.clearRect(0, 0, width, height)
    
    for (let i = 0; i < visualData.length; i++) {
      const barHeight = (visualData[i] / 255) * height * 0.8
      const hue = (i / visualData.length) * 360
      
      ctx.fillStyle = `hsl(${hue}, 100%, 50%)`
      ctx.fillRect(i * barWidth, height - barHeight, barWidth - 1, barHeight)
      
      ctx.fillStyle = `hsla(${hue}, 100%, 70%, 0.3)`
      ctx.fillRect(i * barWidth, height - barHeight - 10, barWidth - 1, 10)
    }
  }

  const togglePlay = async () => {
    const audio = audioRef.current
    if (!audio) return

    try {
      if (isPlaying) {
        audio.pause()
      } else {
        await audioVisualizer.resume()
        await audio.play()
      }
      setIsPlaying(!isPlaying)
    } catch (error) {
      console.log('Playback failed:', error)
    }
  }

  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % defaultTracks.length)
    setIsPlaying(false)
  }

  const prevTrack = () => {
    setCurrentTrack((prev) => (prev - 1 + defaultTracks.length) % defaultTracks.length)
    setIsPlaying(false)
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume
    }
  }

  const track = defaultTracks[currentTrack]

  return (
    <>
      <motion.div
        className="bg-gray-900 border border-green-600 rounded-lg overflow-hidden shadow-lg"
        animate={{ 
          width: isExpanded ? 320 : 60, 
          height: isExpanded ? 240 : 60 
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="p-2">
          {!isExpanded ? (
            <button
              onClick={() => setIsExpanded(true)}
              className="w-full h-full flex items-center justify-center text-green-400 hover:text-cyan-400 transition-colors"
            >
              🎵
            </button>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-cyan-400 truncate">
                  {track.title}
                </h3>
                <button
                  onClick={() => setIsExpanded(false)}
                  className="text-gray-400 hover:text-white transition-colors text-xs"
                >
                  ✕
                </button>
              </div>

              <div className="text-xs text-gray-400 truncate">
                {track.artist}
              </div>

              <canvas
                ref={canvasRef}
                width={280}
                height={60}
                className="w-full h-12 bg-black border border-gray-700 rounded"
              />

              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={prevTrack}
                  className="text-green-400 hover:text-cyan-400 transition-colors"
                >
                  ⏮
                </button>
                
                <button
                  onClick={togglePlay}
                  className="text-green-400 hover:text-cyan-400 transition-colors text-xl"
                >
                  {isPlaying ? '⏸' : '▶'}
                </button>
                
                <button
                  onClick={nextTrack}
                  className="text-green-400 hover:text-cyan-400 transition-colors"
                >
                  ⏭
                </button>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400">🔊</span>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="flex-1 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>

              <button
                onClick={() => setConcertMode(true)}
                className="w-full py-1 text-xs bg-purple-600 hover:bg-purple-500 text-white rounded transition-colors"
              >
                Concert Mode
              </button>
            </div>
          )}
        </div>
      </motion.div>

      <audio
        ref={audioRef}
        src={track.file}
        volume={volume}
        onEnded={() => setIsPlaying(false)}
        preload="metadata"
      />

      <AnimatePresence>
        {concertMode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black flex items-center justify-center"
            onClick={() => setConcertMode(false)}
          >
            <div className="text-center text-white">
              <motion.h1
                className="text-6xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
                animate={{
                  scale: visualData ? [1, 1.1, 1] : 1
                }}
                transition={{ duration: 0.5, repeat: Infinity }}
              >
                {track.title}
              </motion.h1>
              
              <motion.div
                className="text-2xl text-gray-300 mb-12"
                animate={{
                  opacity: visualData ? [0.5, 1, 0.5] : 0.5
                }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                {track.artist}
              </motion.div>

              <canvas
                ref={canvasRef}
                width={800}
                height={200}
                className="mx-auto border border-cyan-400 rounded-lg bg-black/50"
              />

              <div className="mt-8 flex items-center justify-center gap-6">
                <button
                  onClick={prevTrack}
                  className="text-4xl text-green-400 hover:text-cyan-400 transition-colors"
                >
                  ⏮
                </button>
                
                <button
                  onClick={togglePlay}
                  className="text-6xl text-green-400 hover:text-cyan-400 transition-colors"
                >
                  {isPlaying ? '⏸' : '▶'}
                </button>
                
                <button
                  onClick={nextTrack}
                  className="text-4xl text-green-400 hover:text-cyan-400 transition-colors"
                >
                  ⏭
                </button>
              </div>

              <div className="mt-8 text-sm text-gray-400">
                <p>Click anywhere to exit concert mode</p>
                <p className="mt-2 text-yellow-400">
                  Note: Audio files are placeholders. Replace with licensed tracks.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #00ffff;
          cursor: pointer;
        }
        
        .slider::-moz-range-thumb {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #00ffff;
          cursor: pointer;
          border: none;
        }
      `}</style>
    </>
  )
}