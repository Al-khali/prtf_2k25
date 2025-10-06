/**
 * Global type definitions
 */

// Project types
export interface Project {
  id: string;
  title: string;
  description: string;
  category: 'data-ai' | 'games' | 'music' | 'design' | 'security';
  tags: string[];
  image: string;
  link?: string;
  github?: string;
  metrics?: ProjectMetric[];
  featured?: boolean;
}

export interface ProjectMetric {
  label: string;
  value: string;
}

// Terminal types
export interface TerminalCommand {
  command: string;
  description: string;
  execute: (args: string[]) => TerminalOutput;
}

export interface TerminalOutput {
  type: 'text' | 'error' | 'success' | 'component';
  content: string | React.ReactNode;
}

export interface TerminalHistory {
  command: string;
  output: TerminalOutput;
  timestamp: Date;
}

// Music types
export interface Track {
  title: string;
  artist: string;
  url: string;
  duration: number;
}

export interface Playlist {
  id: string;
  name: string;
  description?: string;
  tracks: Track[];
}

export interface MusicPlayerState {
  isPlaying: boolean;
  currentTrack: Track | null;
  currentPlaylist: Playlist | null;
  volume: number;
  currentTime: number;
  duration: number;
}

// CTF types
export interface CTFChallenge {
  id: string;
  title: string;
  description: string;
  hint?: string;
  solution: string;
  reward: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface CTFProgress {
  unlockedChallenges: string[];
  solvedChallenges: string[];
  achievements: string[];
  konamiUnlocked: boolean;
}

// Contact form types
export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface SocialLink {
  platform: 'linkedin' | 'github' | 'soundcloud' | 'twitter';
  url: string;
  icon: React.ReactNode;
  label: string;
}

// About section types
export interface AboutData {
  currentRole: string;
  company: string;
  status: string;
  environment: string;
  uptime: string;
  stack: string[];
  expertise: string[];
  interests: string[];
}

export interface TimelineEntry {
  id: string;
  title: string;
  description: string;
  date?: string;
  icon?: React.ReactNode;
}

// Animation types
export type AnimationVariant = 'fadeIn' | 'fadeInUp' | 'fadeInDown' | 'fadeInLeft' | 'fadeInRight' | 'scaleIn' | 'slideInBottom';

// Theme types
export type ThemeMode = 'dark' | 'light';

// Navigation types
export type SectionId = 'hero' | 'about' | 'projects' | 'terminal' | 'music' | 'ctf' | 'contact';

export interface NavigationItem {
  id: SectionId;
  label: string;
  href: string;
}
