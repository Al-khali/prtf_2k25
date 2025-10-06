'use client';

import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';

const playlists = [
  {
    id: 1,
    title: "City Pop Focus",
    artist: "Japanese City Pop Mix",
    description: "Smooth vibes for coding sessions",
    duration: "45:30",
    color: "from-pink-400 to-violet-400",
    genre: "City Pop"
  },
  {
    id: 2,
    title: "Jazz Fusion Tokyo 1986",
    artist: "Fusion Collection",
    description: "Complex rhythms for complex algorithms",
    duration: "52:15",
    color: "from-amber-400 to-orange-400",
    genre: "Jazz Fusion"
  },
  {
    id: 3,
    title: "90s Boom Bap Focus Mode",
    artist: "Hip-Hop Classics",
    description: "Beats that make debugging fun",
    duration: "38:42",
    color: "from-green-400 to-teal-400",
    genre: "Hip-Hop"
  },
  {
    id: 4,
    title: "Synthwave Terminal",
    artist: "Cyberpunk Vibes",
    description: "Perfect for late-night coding",
    duration: "41:18",
    color: "from-purple-400 to-blue-400",
    genre: "Synthwave"
  }
];

export default function MusicSection() {
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration] = useState(180); // 3 minutes demo
  const [volume, setVolume] = useState(0.7);
  const [visualizerData, setVisualizerData] = useState<number[]>([]);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const visualizerRef = useRef<HTMLCanvasElement>(null);

  // Simulate audio visualizer data
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        const newData = Array.from({ length: 32 }, () => 
          Math.random() * 100 * (0.5 + Math.sin(Date.now() / 1000) * 0.5)
        );
        setVisualizerData(newData);
        setCurrentTime(prev => prev + 0.1);
      }, 100);

      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  // Draw visualizer
  useEffect(() => {
    if (visualizerRef.current && visualizerData.length > 0) {
      const canvas = visualizerRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const barWidth = canvas.width / visualizerData.length;
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#00ffff');
      gradient.addColorStop(0.5, '#ff00ff');
      gradient.addColorStop(1, '#8a2be2');
      
      ctx.fillStyle = gradient;

      visualizerData.forEach((value, index) => {
        const barHeight = (value / 100) * canvas.height;
        const x = index * barWidth;
        const y = canvas.height - barHeight;
        
        ctx.fillRect(x, y, barWidth - 2, barHeight);
      });
    }
  }, [visualizerData]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const selectTrack = (index: number) => {
    setCurrentTrack(index);
    setCurrentTime(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <section className="min-h-screen py-20 px-4 flex items-center" id="music">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-space font-bold holo-text mb-4">
            Sound Lab
          </h2>
          <p className="text-xl text-gray-300 font-inter">
            Music that codes itself into your workflow.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Music Player */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            {/* Current track display */}
            <div className="glass-intense p-8 rounded-2xl">
              <div className={`w-full h-48 rounded-xl bg-gradient-to-br ${playlists[currentTrack].color} mb-6 flex items-center justify-center`}>
                <div className="text-6xl">🎵</div>
              </div>
              
              <h3 className="text-2xl font-space font-bold text-white mb-2">
                {playlists[currentTrack].title}
              </h3>
              <p className="text-gray-300 mb-1">{playlists[currentTrack].artist}</p>
              <p className="text-sm text-gray-400 mb-4">{playlists[currentTrack].description}</p>
              
              <div className="text-xs terminal-font text-glacier-blue mb-4">
                {playlists[currentTrack].genre} • {playlists[currentTrack].duration}
              </div>

              {/* Progress bar */}
              <div className="space-y-2">
                <div className="w-full bg-void-darker rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-holo-cyan to-holo-magenta h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(currentTime / duration) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-400 terminal-font">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center gap-6 mt-6">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => selectTrack((currentTrack - 1 + playlists.length) % playlists.length)}
                  className="text-2xl text-gray-400 hover:text-white transition-colors"
                >
                  ⏮️
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={togglePlay}
                  className="w-16 h-16 rounded-full glass-intense flex items-center justify-center text-3xl glow-hover"
                >
                  {isPlaying ? '⏸️' : '▶️'}
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => selectTrack((currentTrack + 1) % playlists.length)}
                  className="text-2xl text-gray-400 hover:text-white transition-colors"
                >
                  ⏭️
                </motion.button>
              </div>

              {/* Volume control */}
              <div className="flex items-center gap-4 mt-6">
                <span className="text-gray-400 text-sm">🔊</span>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="flex-1 h-2 bg-void-darker rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-gray-400 text-sm terminal-font">
                  {Math.round(volume * 100)}%
                </span>
              </div>
            </div>
          </motion.div>

          {/* Visualizer & Playlist */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            {/* Audio Visualizer */}
            <div className="glass-intense p-6 rounded-2xl">
              <h4 className="text-lg font-space font-semibold text-white mb-4">
                Audio Visualizer
              </h4>
              <canvas
                ref={visualizerRef}
                width={400}
                height={150}
                className="w-full h-32 rounded-lg bg-void-darker"
              />
              <div className="mt-4 text-sm text-gray-400 terminal-font text-center">
                {isPlaying ? 'Now analyzing audio frequencies...' : 'Press play to see visualization'}
              </div>
            </div>

            {/* Playlist */}
            <div className="glass-intense p-6 rounded-2xl">
              <h4 className="text-lg font-space font-semibold text-white mb-4">
                Curated Playlists
              </h4>
              <div className="space-y-3">
                {playlists.map((playlist, index) => (
                  <motion.div
                    key={playlist.id}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => selectTrack(index)}
                    className={`p-4 rounded-lg cursor-pointer transition-all duration-300 ${
                      currentTrack === index
                        ? 'glass border border-holo-cyan glow-cyan'
                        : 'bg-void-lighter hover:bg-void-darker'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${playlist.color} flex items-center justify-center text-2xl`}>
                        🎵
                      </div>
                      <div className="flex-1">
                        <h5 className="font-space font-medium text-white text-sm">
                          {playlist.title}
                        </h5>
                        <p className="text-xs text-gray-400">{playlist.genre}</p>
                      </div>
                      <div className="text-xs text-gray-400 terminal-font">
                        {playlist.duration}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Music philosophy quote */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-16"
        >
          <blockquote className="text-2xl md:text-3xl font-space font-light italic text-gray-300">
            "Code without music is like data without soul."
          </blockquote>
        </motion.div>
      </div>
    </section>
  );
}