'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Playlist, Track } from '@/lib/audio';

interface PlaylistSelectorProps {
  playlists: Playlist[];
  currentPlaylistId: string | null;
  currentTrackId: string | null;
  onPlaylistSelect: (playlistId: string) => void;
  onTrackSelect: (trackId: string) => void;
}

export default function PlaylistSelector({
  playlists,
  currentPlaylistId,
  currentTrackId,
  onPlaylistSelect,
  onTrackSelect,
}: PlaylistSelectorProps) {
  const currentPlaylist = playlists.find((p) => p.id === currentPlaylistId);

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* Playlist tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {playlists.map((playlist) => {
          const isActive = playlist.id === currentPlaylistId;
          
          return (
            <motion.button
              key={playlist.id}
              onClick={() => onPlaylistSelect(playlist.id)}
              className={`
                relative px-6 py-3 rounded-xl font-medium text-sm whitespace-nowrap
                transition-all duration-300
                ${isActive 
                  ? 'text-white' 
                  : 'text-white/60 hover:text-white/80 bg-white/5 hover:bg-white/10'
                }
              `}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Active indicator */}
              {isActive && (
                <motion.div
                  layoutId="activePlaylist"
                  className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-violet-500/20 to-magenta-500/20 rounded-xl border border-white/20"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
              
              {/* Glow effect */}
              {isActive && (
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/30 via-violet-500/30 to-magenta-500/30 rounded-xl blur-xl -z-10" />
              )}
              
              <span className="relative z-10">{playlist.name}</span>
            </motion.button>
          );
        })}
      </div>

      {/* Playlist description */}
      <AnimatePresence mode="wait">
        {currentPlaylist && (
          <motion.div
            key={currentPlaylist.id}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className="text-center"
          >
            <p className="text-sm text-white/60">{currentPlaylist.description}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Track list */}
      <AnimatePresence mode="wait">
        {currentPlaylist && (
          <motion.div
            key={currentPlaylist.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, staggerChildren: 0.1 }}
            className="space-y-2"
          >
            {currentPlaylist.tracks.map((track, index) => {
              const isCurrentTrack = track.id === currentTrackId;
              
              return (
                <motion.button
                  key={track.id}
                  onClick={() => onTrackSelect(track.id)}
                  className={`
                    w-full p-4 rounded-xl text-left
                    backdrop-blur-xl border transition-all duration-300
                    ${isCurrentTrack
                      ? 'bg-white/10 border-white/20'
                      : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                    }
                  `}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-4">
                    {/* Track number or playing indicator */}
                    <div className="w-8 h-8 flex items-center justify-center">
                      {isCurrentTrack ? (
                        <motion.div
                          className="flex gap-1 items-end h-4"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          {[0, 1, 2].map((i) => (
                            <motion.div
                              key={i}
                              className="w-1 bg-gradient-to-t from-cyan-400 to-violet-400 rounded-full"
                              animate={{
                                height: ['4px', '16px', '4px'],
                              }}
                              transition={{
                                duration: 0.8,
                                repeat: Infinity,
                                delay: i * 0.2,
                              }}
                            />
                          ))}
                        </motion.div>
                      ) : (
                        <span className="text-white/40 text-sm font-mono">
                          {(index + 1).toString().padStart(2, '0')}
                        </span>
                      )}
                    </div>

                    {/* Track info */}
                    <div className="flex-1 min-w-0">
                      <h4 className={`font-medium truncate ${isCurrentTrack ? 'text-white' : 'text-white/80'}`}>
                        {track.title}
                      </h4>
                      <p className="text-sm text-white/50 truncate">{track.artist}</p>
                    </div>

                    {/* Duration */}
                    <div className="text-sm text-white/40 font-mono">
                      {Math.floor(track.duration / 60)}:{(track.duration % 60).toString().padStart(2, '0')}
                    </div>
                  </div>

                  {/* Current track glow */}
                  {isCurrentTrack && (
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-violet-500/10 to-magenta-500/10 rounded-xl blur-xl -z-10" />
                  )}
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
