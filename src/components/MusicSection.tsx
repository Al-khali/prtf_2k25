'use client';

import { motion } from 'framer-motion';
import { useMusic } from '@/contexts/MusicContext';
import { playlists } from '@/lib/audio';
import MusicPlayer from './MusicPlayer';
import PlaylistSelector from './PlaylistSelector';
import AudioVisualizer from './AudioVisualizer';

export default function MusicSection() {
  const {
    currentPlaylistId,
    currentTrackId,
    currentTrack,
    isPlaying,
    volume,
    isMuted,
    currentTime,
    duration,
    analyser,
    selectPlaylist,
    selectTrack,
    playPause,
    next,
    previous,
    setVolume,
    toggleMute,
    seek,
  } = useMusic();

  return (
    <section className="relative min-h-screen py-20 px-4 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0c0d10] via-[#1a1b1e] to-[#0c0d10] -z-10" />
      
      {/* Animated background orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block mb-4"
          >
            <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10">
              <svg className="w-5 h-5 text-violet-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 3v9.28c-.47-.17-.97-.28-1.5-.28C8.01 12 6 14.01 6 16.5S8.01 21 10.5 21c2.31 0 4.2-1.75 4.45-4H15V6h4V3h-7z" />
              </svg>
              <span className="text-sm font-medium text-white/80">Music Moodboard</span>
            </div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            <span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-magenta-400 bg-clip-text text-transparent">
              Sonic Influences
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg text-white/60 max-w-2xl mx-auto"
          >
            From city pop to jazz fusion to 90s boom bap — the soundtracks that fuel creativity
          </motion.p>
        </motion.div>

        {/* Main content grid */}
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Left column: Visualizer */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <AudioVisualizer analyser={analyser} isPlaying={isPlaying} />
          </motion.div>

          {/* Right column: Player and Playlist */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="space-y-8"
          >
            {/* Music Player */}
            <MusicPlayer
              currentTrack={currentTrack}
              isPlaying={isPlaying}
              volume={volume}
              isMuted={isMuted}
              currentTime={currentTime}
              duration={duration}
              onPlayPause={playPause}
              onNext={next}
              onPrevious={previous}
              onVolumeChange={setVolume}
              onMuteToggle={toggleMute}
              onSeek={seek}
            />

            {/* Playlist Selector */}
            <PlaylistSelector
              playlists={playlists}
              currentPlaylistId={currentPlaylistId}
              currentTrackId={currentTrackId}
              onPlaylistSelect={selectPlaylist}
              onTrackSelect={selectTrack}
            />
          </motion.div>
        </div>

        {/* Info text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <p className="text-sm text-white/40 font-mono">
            // Music continues playing as you navigate through the portfolio
          </p>
        </motion.div>
      </div>
    </section>
  );
}
