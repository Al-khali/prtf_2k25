/**
 * Audio infrastructure for music player
 * Manages playlists, tracks, and playback state
 */

export interface Track {
  id: string;
  title: string;
  artist: string;
  url: string;
  duration: number; // in seconds
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  tracks: Track[];
}

/**
 * Playlist data - three curated playlists
 * Using existing audio files from public/assets/music
 */
export const playlists: Playlist[] = [
  {
    id: 'city-pop',
    name: 'City Pop Mix',
    description: 'Smooth Japanese city pop vibes from the 80s',
    tracks: [
      {
        id: 'cp-1',
        title: 'Synthwave Dreams',
        artist: 'Khalid',
        url: '/assets/music/synthwave-loop.mp3',
        duration: 180,
      },
    ],
  },
  {
    id: 'jazz-fusion',
    name: 'Jazz Fusion Tokyo 1986',
    description: 'Sophisticated jazz fusion from Tokyo',
    tracks: [
      {
        id: 'jf-1',
        title: 'Jazz Fusion Loop',
        artist: 'Khalid',
        url: '/assets/music/jazz-fusion-loop.mp3',
        duration: 180,
      },
    ],
  },
  {
    id: 'boom-bap',
    name: '90s Boom Bap Focus Mode',
    description: 'Classic 90s hip-hop beats for deep focus',
    tracks: [
      {
        id: 'bb-1',
        title: 'Hip Hop Loop',
        artist: 'Khalid',
        url: '/assets/music/hip-hop-loop.mp3',
        duration: 180,
      },
    ],
  },
];

/**
 * Get playlist by ID
 */
export function getPlaylistById(id: string): Playlist | undefined {
  return playlists.find((p) => p.id === id);
}

/**
 * Get track by ID across all playlists
 */
export function getTrackById(trackId: string): Track | undefined {
  for (const playlist of playlists) {
    const track = playlist.tracks.find((t) => t.id === trackId);
    if (track) return track;
  }
  return undefined;
}

/**
 * Audio player state interface
 */
export interface AudioPlayerState {
  currentPlaylistId: string | null;
  currentTrackId: string | null;
  isPlaying: boolean;
  volume: number; // 0-1
  isMuted: boolean;
  currentTime: number;
  duration: number;
}

/**
 * Initial audio player state
 */
export const initialAudioState: AudioPlayerState = {
  currentPlaylistId: null,
  currentTrackId: null,
  isPlaying: false,
  volume: 0.7,
  isMuted: false,
  currentTime: 0,
  duration: 0,
};

/**
 * Audio manager class for handling playback logic
 * Uses HTML5 Audio API with lazy loading and retry logic
 */
export class AudioManager {
  private audio: HTMLAudioElement | null = null;
  private analyser: AnalyserNode | null = null;
  private audioContext: AudioContext | null = null;
  private source: MediaElementAudioSourceNode | null = null;
  private loadedTracks: Set<string> = new Set();
  private loadingTracks: Map<string, Promise<void>> = new Map();
  private preloadedTracks: Set<string> = new Set();

  constructor() {
    if (typeof window !== 'undefined') {
      this.audio = new Audio();
      this.audio.preload = 'none'; // Changed to 'none' for lazy loading
    }
  }

  /**
   * Initialize Web Audio API for visualizations
   */
  initializeAudioContext(): AnalyserNode | null {
    if (!this.audio || this.analyser) return this.analyser;

    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = 256;
      
      this.source = this.audioContext.createMediaElementSource(this.audio);
      this.source.connect(this.analyser);
      this.analyser.connect(this.audioContext.destination);

      return this.analyser;
    } catch (error) {
      console.error('Failed to initialize audio context:', error);
      return null;
    }
  }

  /**
   * Preload a track without playing it
   * Used to preload the first track of each playlist
   */
  async preloadTrack(track: Track): Promise<void> {
    if (this.preloadedTracks.has(track.id)) return;

    try {
      // Create a temporary audio element for preloading
      const tempAudio = new Audio();
      tempAudio.preload = 'auto';
      tempAudio.src = track.url;
      
      await new Promise<void>((resolve, reject) => {
        const timeout = setTimeout(() => {
          reject(new Error('Preload timeout'));
        }, 10000); // 10 second timeout

        tempAudio.addEventListener('canplaythrough', () => {
          clearTimeout(timeout);
          this.preloadedTracks.add(track.id);
          resolve();
        }, { once: true });

        tempAudio.addEventListener('error', () => {
          clearTimeout(timeout);
          reject(new Error('Preload failed'));
        }, { once: true });

        tempAudio.load();
      });
    } catch (error) {
      console.warn(`Failed to preload track ${track.id}:`, error);
      // Don't throw - preloading is optional
    }
  }

  /**
   * Load a track with retry logic
   */
  async loadTrack(track: Track, retries = 3): Promise<void> {
    if (!this.audio) return;

    // If already loading this track, return the existing promise
    if (this.loadingTracks.has(track.id)) {
      return this.loadingTracks.get(track.id);
    }

    // If already loaded, just set the source
    if (this.loadedTracks.has(track.id)) {
      this.audio.src = track.url;
      return;
    }

    const loadPromise = this._loadTrackWithRetry(track, retries);
    this.loadingTracks.set(track.id, loadPromise);

    try {
      await loadPromise;
      this.loadedTracks.add(track.id);
    } finally {
      this.loadingTracks.delete(track.id);
    }
  }

  /**
   * Internal method to load track with retry logic
   */
  private async _loadTrackWithRetry(track: Track, retries: number): Promise<void> {
    if (!this.audio) return;

    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        this.audio.src = track.url;
        
        await new Promise<void>((resolve, reject) => {
          if (!this.audio) {
            reject(new Error('Audio element not available'));
            return;
          }

          const timeout = setTimeout(() => {
            reject(new Error('Load timeout'));
          }, 15000); // 15 second timeout

          const handleCanPlay = () => {
            clearTimeout(timeout);
            cleanup();
            resolve();
          };

          const handleError = () => {
            clearTimeout(timeout);
            cleanup();
            reject(new Error(`Failed to load audio: ${track.url}`));
          };

          const cleanup = () => {
            this.audio?.removeEventListener('canplay', handleCanPlay);
            this.audio?.removeEventListener('error', handleError);
          };

          this.audio.addEventListener('canplay', handleCanPlay, { once: true });
          this.audio.addEventListener('error', handleError, { once: true });
          this.audio.load();
        });

        // Success - exit retry loop
        return;
      } catch (error) {
        if (attempt === retries) {
          // Last attempt failed
          throw new Error(`Failed to load track after ${retries + 1} attempts: ${error}`);
        }
        
        // Wait before retrying (exponential backoff)
        const delay = Math.min(1000 * Math.pow(2, attempt), 5000);
        await new Promise(resolve => setTimeout(resolve, delay));
        
        console.warn(`Retry ${attempt + 1}/${retries} for track ${track.id}`);
      }
    }
  }

  /**
   * Check if a track is currently loading
   */
  isLoading(trackId: string): boolean {
    return this.loadingTracks.has(trackId);
  }

  /**
   * Check if a track is loaded
   */
  isLoaded(trackId: string): boolean {
    return this.loadedTracks.has(trackId);
  }

  /**
   * Play audio
   */
  async play(): Promise<void> {
    if (!this.audio) return;

    try {
      // Resume audio context if suspended
      if (this.audioContext?.state === 'suspended') {
        await this.audioContext.resume();
      }
      await this.audio.play();
    } catch (error) {
      console.error('Failed to play audio:', error);
    }
  }

  /**
   * Pause audio
   */
  pause(): void {
    if (!this.audio) return;
    this.audio.pause();
  }

  /**
   * Set volume (0-1)
   */
  setVolume(volume: number): void {
    if (!this.audio) return;
    this.audio.volume = Math.max(0, Math.min(1, volume));
  }

  /**
   * Seek to time (in seconds)
   */
  seek(time: number): void {
    if (!this.audio) return;
    this.audio.currentTime = time;
  }

  /**
   * Get current time
   */
  getCurrentTime(): number {
    return this.audio?.currentTime || 0;
  }

  /**
   * Get duration
   */
  getDuration(): number {
    return this.audio?.duration || 0;
  }

  /**
   * Add event listener
   */
  addEventListener(event: string, handler: EventListener): void {
    this.audio?.addEventListener(event, handler);
  }

  /**
   * Remove event listener
   */
  removeEventListener(event: string, handler: EventListener): void {
    this.audio?.removeEventListener(event, handler);
  }

  /**
   * Get analyser node for visualizations
   */
  getAnalyser(): AnalyserNode | null {
    return this.analyser;
  }

  /**
   * Cleanup
   */
  destroy(): void {
    if (this.audio) {
      this.audio.pause();
      this.audio.src = '';
    }
    if (this.audioContext) {
      this.audioContext.close();
    }
  }
}
