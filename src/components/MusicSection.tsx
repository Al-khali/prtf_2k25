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
    isLoading,
    loadError,
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
    retryLoad,
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
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-sm font-mono text-amber-400">{"// Music"}</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-pink-600">
              Sonic Vibes
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto"
          >
            From city pop to jazz fusion to 90s boom bap — the soundtracks that fuel creativity.
            <br />
            <span className="text-sm text-gray-500 mt-2 inline-block">Music continues playing as you navigate 🎵</span>
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
              isLoading={isLoading}
              loadError={loadError}
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
              onRetry={retryLoad}
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

        {/* Info badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 flex flex-wrap justify-center gap-3"
        >
          {['City Pop', 'Jazz Fusion', 'Lo-fi', 'Boom Bap', 'Synthwave'].map((genre) => (
            <div
              key={genre}
              className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-gray-400 hover:bg-white/10 hover:border-amber-500/30 hover:text-amber-400 transition-all duration-200"
            >
              {genre}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
