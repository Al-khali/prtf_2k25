'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Track } from '@/lib/audio';

interface MusicPlayerProps {
  currentTrack: Track | null;
  isPlaying: boolean;
  isLoading?: boolean;
  loadError?: string | null;
  volume: number;
  isMuted: boolean;
  currentTime: number;
  duration: number;
  onPlayPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onVolumeChange: (volume: number) => void;
  onMuteToggle: () => void;
  onSeek: (time: number) => void;
  onRetry?: () => void;
}

export default function MusicPlayer({
  currentTrack,
  isPlaying,
  isLoading = false,
  loadError = null,
  volume,
  isMuted,
  currentTime,
  duration,
  onPlayPause,
  onNext,
  onPrevious,
  onVolumeChange,
  onMuteToggle,
  onSeek,
  onRetry,
}: MusicPlayerProps) {
  const [isDragging, setIsDragging] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);

  // Format time as MM:SS
  const formatTime = (seconds: number): string => {
    if (!isFinite(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Handle progress bar click/drag
  const handleProgressInteraction = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current || !duration) return;
    
    const rect = progressRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, x / rect.width));
    const newTime = percentage * duration;
    
    onSeek(newTime);
  };

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false);
    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => window.removeEventListener('mouseup', handleGlobalMouseUp);
  }, []);

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative w-full max-w-2xl mx-auto"
    >
      {/* Glass container */}
      <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 shadow-2xl">
        {/* Holographic border glow */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/20 via-violet-500/20 to-magenta-500/20 blur-xl -z-10" />

        {/* Track info */}
        <div className="mb-6 text-center">
          {loadError ? (
            <div className="space-y-2">
              <p className="text-red-400 text-sm">⚠️ Failed to load audio</p>
              <p className="text-white/40 text-xs">{loadError}</p>
              {onRetry && (
                <motion.button
                  onClick={onRetry}
                  className="mt-2 px-4 py-2 text-xs bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Retry
                </motion.button>
              )}
            </div>
          ) : isLoading ? (
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                <div className="w-2 h-2 bg-violet-400 rounded-full animate-pulse delay-75" />
                <div className="w-2 h-2 bg-magenta-400 rounded-full animate-pulse delay-150" />
              </div>
              <p className="text-white/60 text-sm">Loading audio...</p>
            </div>
          ) : currentTrack ? (
            <>
              <h3 className="text-xl font-bold text-white mb-1">
                {currentTrack.title}
              </h3>
              <p className="text-sm text-white/60">{currentTrack.artist}</p>
            </>
          ) : (
            <p className="text-white/40">No track selected</p>
          )}
        </div>

        {/* Progress bar */}
        <div className="mb-6">
          <div
            ref={progressRef}
            className="relative h-2 bg-white/10 rounded-full cursor-pointer group"
            onClick={handleProgressInteraction}
            onMouseDown={handleMouseDown}
            onMouseMove={isDragging ? handleProgressInteraction : undefined}
            role="slider"
            aria-label="Seek audio position"
            aria-valuemin={0}
            aria-valuemax={duration}
            aria-valuenow={currentTime}
            aria-valuetext={`${formatTime(currentTime)} of ${formatTime(duration)}`}
            tabIndex={0}
          >
            {/* Progress fill */}
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-400 via-violet-400 to-magenta-400 rounded-full"
              style={{ width: `${progress}%` }}
              initial={false}
              animate={{ width: `${progress}%` }}
            />
            
            {/* Progress handle */}
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ left: `${progress}%`, marginLeft: '-8px' }}
              whileHover={{ scale: 1.2 }}
            />
          </div>

          {/* Time labels */}
          <div className="flex justify-between mt-2 text-xs text-white/60">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 mb-6">
          {/* Previous button */}
          <motion.button
            onClick={onPrevious}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            disabled={!currentTrack}
            aria-label="Previous track"
          >
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
            </svg>
          </motion.button>

          {/* Play/Pause button */}
          <motion.button
            onClick={onPlayPause}
            className="p-4 rounded-full bg-gradient-to-r from-cyan-500 via-violet-500 to-magenta-500 hover:shadow-lg hover:shadow-violet-500/50 transition-shadow disabled:opacity-30 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            disabled={!currentTrack || isLoading || !!loadError}
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isLoading ? (
              <svg className="w-6 h-6 text-white animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            ) : isPlaying ? (
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
              </svg>
            ) : (
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </motion.button>

          {/* Next button */}
          <motion.button
            onClick={onNext}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            disabled={!currentTrack}
            aria-label="Next track"
          >
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M16 18h2V6h-2zm-11-6l8.5-6v12z" />
            </svg>
          </motion.button>
        </div>

        {/* Volume control */}
        <div className="flex items-center gap-3">
          {/* Mute button */}
          <motion.button
            onClick={onMuteToggle}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted || volume === 0 ? (
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
              </svg>
            )}
          </motion.button>

          {/* Volume slider */}
          <div className="flex-1 relative">
            <input
              type="range"
              min="0"
              max="100"
              value={isMuted ? 0 : volume * 100}
              onChange={(e) => onVolumeChange(Number(e.target.value) / 100)}
              aria-label="Volume control"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round((isMuted ? 0 : volume) * 100)}
              aria-valuetext={`Volume ${Math.round((isMuted ? 0 : volume) * 100)}%`}
              className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer
                [&::-webkit-slider-thumb]:appearance-none
                [&::-webkit-slider-thumb]:w-3
                [&::-webkit-slider-thumb]:h-3
                [&::-webkit-slider-thumb]:rounded-full
                [&::-webkit-slider-thumb]:bg-white
                [&::-webkit-slider-thumb]:cursor-pointer
                [&::-webkit-slider-thumb]:shadow-lg
                [&::-moz-range-thumb]:w-3
                [&::-moz-range-thumb]:h-3
                [&::-moz-range-thumb]:rounded-full
                [&::-moz-range-thumb]:bg-white
                [&::-moz-range-thumb]:border-0
                [&::-moz-range-thumb]:cursor-pointer"
            />
          </div>

          {/* Volume percentage */}
          <span className="text-xs text-white/60 w-8 text-right">
            {Math.round((isMuted ? 0 : volume) * 100)}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
