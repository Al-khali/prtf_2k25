'use client';

import { createContext, useContext, useEffect, useRef, useState, ReactNode } from 'react';

interface AmbientMusicContextType {
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
  toggleMute: () => void;
  setVolume: (volume: number) => void;
}

const AmbientMusicContext = createContext<AmbientMusicContextType | undefined>(undefined);
const INITIAL_VOLUME = 0.3;

export function AmbientMusicProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolumeState] = useState(INITIAL_VOLUME); // 30% volume par défaut

  useEffect(() => {
    // Créer l'élément audio
    const audio = new Audio('/assets/music/ambient-pad-starry-nights_172bpm_B_major.wav');
    audio.loop = true;
  audio.volume = INITIAL_VOLUME;
    audioRef.current = audio;

    // Démarrer la musique après interaction utilisateur
    const startMusic = () => {
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch((error) => {
        console.log('Autoplay prevented:', error);
      });
      
      // Retirer le listener après la première interaction
      document.removeEventListener('click', startMusic);
      document.removeEventListener('keydown', startMusic);
    };

    // Attendre une interaction utilisateur pour démarrer
    document.addEventListener('click', startMusic);
    document.addEventListener('keydown', startMusic);

    return () => {
      audio.pause();
      audio.src = '';
      document.removeEventListener('click', startMusic);
      document.removeEventListener('keydown', startMusic);
    };
  }, []);

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const setVolume = (newVolume: number) => {
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
      setVolumeState(newVolume);
    }
  };

  return (
    <AmbientMusicContext.Provider
      value={{
        isPlaying,
        isMuted,
        volume,
        toggleMute,
        setVolume,
      }}
    >
      {children}
    </AmbientMusicContext.Provider>
  );
}

export function useAmbientMusic() {
  const context = useContext(AmbientMusicContext);
  if (context === undefined) {
    throw new Error('useAmbientMusic must be used within AmbientMusicProvider');
  }
  return context;
}
