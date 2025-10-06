'use client';

import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { AudioManager, playlists, getTrackById, Track } from '@/lib/audio';

interface MusicContextType {
  // State
  currentPlaylistId: string | null;
  currentTrackId: string | null;
  currentTrack: Track | null;
  isPlaying: boolean;
  volume: number;
  isMuted: boolean;
  currentTime: number;
  duration: number;
  analyser: AnalyserNode | null;
  
  // Actions
  selectPlaylist: (playlistId: string) => void;
  selectTrack: (trackId: string) => void;
  playPause: () => void;
  next: () => void;
  previous: () => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  seek: (time: number) => void;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

const STORAGE_KEY = 'music-player-state';

interface PersistedState {
  currentPlaylistId: string | null;
  currentTrackId: string | null;
  volume: number;
  isMuted: boolean;
}

export function MusicProvider({ children }: { children: React.ReactNode }) {
  const [currentPlaylistId, setCurrentPlaylistId] = useState<string | null>(null);
  const [currentTrackId, setCurrentTrackId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumeState] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);

  const audioManagerRef = useRef<AudioManager | null>(null);
  const timeUpdateIntervalRef = useRef<NodeJS.Timeout | undefined>(undefined);

  // Initialize audio manager
  useEffect(() => {
    audioManagerRef.current = new AudioManager();
    
    return () => {
      if (timeUpdateIntervalRef.current) {
        clearInterval(timeUpdateIntervalRef.current);
      }
      audioManagerRef.current?.destroy();
    };
  }, []);

  // Load persisted state on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const state: PersistedState = JSON.parse(stored);
        setCurrentPlaylistId(state.currentPlaylistId);
        setCurrentTrackId(state.currentTrackId);
        setVolumeState(state.volume);
        setIsMuted(state.isMuted);
        
        // Apply volume to audio manager
        if (audioManagerRef.current) {
          audioManagerRef.current.setVolume(state.isMuted ? 0 : state.volume);
        }
      }
    } catch (error) {
      console.error('Failed to load music state:', error);
    }
  }, []);

  // Persist state changes
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const state: PersistedState = {
      currentPlaylistId,
      currentTrackId,
      volume,
      isMuted,
    };

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      console.error('Failed to save music state:', error);
    }
  }, [currentPlaylistId, currentTrackId, volume, isMuted]);

  // Get current track
  const currentTrack = currentTrackId ? getTrackById(currentTrackId) || null : null;

  // Handle track ended - move to next track
  const handleTrackEnded = useCallback(() => {
    if (!currentPlaylistId) return;

    const playlist = playlists.find((p) => p.id === currentPlaylistId);
    if (!playlist) return;

    const currentIndex = playlist.tracks.findIndex((t) => t.id === currentTrackId);
    const nextIndex = (currentIndex + 1) % playlist.tracks.length;
    
    setCurrentTrackId(playlist.tracks[nextIndex].id);
    setIsPlaying(true);
  }, [currentPlaylistId, currentTrackId]);

  // Load track when it changes
  useEffect(() => {
    if (!currentTrack || !audioManagerRef.current) return;

    const loadAndPlay = async () => {
      const manager = audioManagerRef.current;
      if (!manager) return;

      // Load track
      await manager.loadTrack(currentTrack);

      // Initialize audio context and analyser on first interaction
      if (!analyser) {
        const newAnalyser = manager.initializeAudioContext();
        setAnalyser(newAnalyser);
      }

      // Set up event listeners
      const handleLoadedMetadata = () => {
        setDuration(manager.getDuration());
      };

      const handleEnded = () => {
        setIsPlaying(false);
        handleTrackEnded();
      };

      const handlePlay = () => {
        setIsPlaying(true);
      };

      const handlePause = () => {
        setIsPlaying(false);
      };

      manager.addEventListener('loadedmetadata', handleLoadedMetadata);
      manager.addEventListener('ended', handleEnded);
      manager.addEventListener('play', handlePlay);
      manager.addEventListener('pause', handlePause);

      // Auto-play if was playing
      if (isPlaying) {
        await manager.play();
      }

      return () => {
        manager.removeEventListener('loadedmetadata', handleLoadedMetadata);
        manager.removeEventListener('ended', handleEnded);
        manager.removeEventListener('play', handlePlay);
        manager.removeEventListener('pause', handlePause);
      };
    };

    loadAndPlay();
  }, [currentTrack, isPlaying, analyser, handleTrackEnded]);

  // Update current time periodically
  useEffect(() => {
    if (isPlaying && audioManagerRef.current) {
      timeUpdateIntervalRef.current = setInterval(() => {
        if (audioManagerRef.current) {
          setCurrentTime(audioManagerRef.current.getCurrentTime());
        }
      }, 100);
    } else {
      if (timeUpdateIntervalRef.current) {
        clearInterval(timeUpdateIntervalRef.current);
      }
    }

    return () => {
      if (timeUpdateIntervalRef.current) {
        clearInterval(timeUpdateIntervalRef.current);
      }
    };
  }, [isPlaying]);

  // Select playlist
  const selectPlaylist = useCallback((playlistId: string) => {
    const playlist = playlists.find((p) => p.id === playlistId);
    if (!playlist || playlist.tracks.length === 0) return;

    setCurrentPlaylistId(playlistId);
    
    // If no track selected or current track not in new playlist, select first track
    const currentTrackInPlaylist = playlist.tracks.find((t) => t.id === currentTrackId);
    if (!currentTrackInPlaylist) {
      setCurrentTrackId(playlist.tracks[0].id);
    }
  }, [currentTrackId]);

  // Select track
  const selectTrack = useCallback((trackId: string) => {
    setCurrentTrackId(trackId);
    setIsPlaying(true);
  }, []);

  // Play/pause
  const playPause = useCallback(async () => {
    if (!audioManagerRef.current || !currentTrack) return;

    if (isPlaying) {
      audioManagerRef.current.pause();
      setIsPlaying(false);
    } else {
      await audioManagerRef.current.play();
      setIsPlaying(true);
    }
  }, [isPlaying, currentTrack]);

  // Next track
  const next = useCallback(() => {
    if (!currentPlaylistId) return;

    const playlist = playlists.find((p) => p.id === currentPlaylistId);
    if (!playlist) return;

    const currentIndex = playlist.tracks.findIndex((t) => t.id === currentTrackId);
    const nextIndex = (currentIndex + 1) % playlist.tracks.length;
    
    setCurrentTrackId(playlist.tracks[nextIndex].id);
    setIsPlaying(true);
  }, [currentPlaylistId, currentTrackId]);

  // Previous track
  const previous = useCallback(() => {
    if (!currentPlaylistId) return;

    const playlist = playlists.find((p) => p.id === currentPlaylistId);
    if (!playlist) return;

    const currentIndex = playlist.tracks.findIndex((t) => t.id === currentTrackId);
    const prevIndex = currentIndex <= 0 ? playlist.tracks.length - 1 : currentIndex - 1;
    
    setCurrentTrackId(playlist.tracks[prevIndex].id);
    setIsPlaying(true);
  }, [currentPlaylistId, currentTrackId]);

  // Set volume
  const setVolume = useCallback((newVolume: number) => {
    const clampedVolume = Math.max(0, Math.min(1, newVolume));
    setVolumeState(clampedVolume);
    
    if (audioManagerRef.current) {
      audioManagerRef.current.setVolume(isMuted ? 0 : clampedVolume);
    }
  }, [isMuted]);

  // Toggle mute
  const toggleMute = useCallback(() => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    
    if (audioManagerRef.current) {
      audioManagerRef.current.setVolume(newMuted ? 0 : volume);
    }
  }, [isMuted, volume]);

  // Seek
  const seek = useCallback((time: number) => {
    if (audioManagerRef.current) {
      audioManagerRef.current.seek(time);
      setCurrentTime(time);
    }
  }, []);

  const value: MusicContextType = {
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
  };

  return <MusicContext.Provider value={value}>{children}</MusicContext.Provider>;
}

export function useMusic() {
  const context = useContext(MusicContext);
  if (context === undefined) {
    throw new Error('useMusic must be used within a MusicProvider');
  }
  return context;
}
