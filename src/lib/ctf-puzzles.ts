import { CTFChallenge, CTFProgress } from '@/types';

/**
 * CTF Challenge definitions
 */
export const ctfChallenges: CTFChallenge[] = [
  {
    id: 'base64-decode',
    title: 'The Encoded Message',
    description: 'Decode this message: S2hhbGlkIGJ1aWxkcyBicmlkZ2VzIGJldHdlZW4gZGF0YSwgZGVzaWduIGFuZCBkcmVhbXM=',
    hint: 'This looks like Base64 encoding. Try decoding it.',
    solution: 'Khalid builds bridges between data, design and dreams',
    reward: 'ACCESS GRANTED: You understand the language of data',
    difficulty: 'easy',
  },
  {
    id: 'ascii-art',
    title: 'Hidden in Plain Sight',
    description: `Find the hidden word in this ASCII art:
    
 ██████╗ ██╗  ██╗ ██████╗ ███████╗████████╗
██╔════╝ ██║  ██║██╔═══██╗██╔════╝╚══██╔══╝
██║  ███╗███████║██║   ██║███████╗   ██║   
██║   ██║██╔══██║██║   ██║╚════██║   ██║   
╚██████╔╝██║  ██║╚██████╔╝███████║   ██║   
 ╚═════╝ ╚═╝  ╚═╝ ╚═════╝ ╚══════╝   ╚═╝   `,
    hint: 'Read the ASCII art carefully. What word is spelled out?',
    solution: 'GHOST',
    reward: 'ACCESS GRANTED: Ghost in the Shell reference unlocked',
    difficulty: 'easy',
  },
  {
    id: 'cipher-decode',
    title: 'The Caesar Shift',
    description: 'Decrypt this message (ROT13): Lbh qvqa\'g fnl gur zntvp jbeq',
    hint: 'ROT13 is a simple letter substitution cipher. Each letter is replaced by the letter 13 positions after it in the alphabet.',
    solution: 'You didn\'t say the magic word',
    reward: 'ACCESS GRANTED: Ah ah ah! Nedry would be proud',
    difficulty: 'medium',
  },
  {
    id: 'hidden-route',
    title: 'The Secret Path',
    description: 'There\'s a hidden route in this portfolio. Find the path that leads to /root',
    hint: 'Try navigating to /root in your browser, or look for clues in the terminal commands.',
    solution: '/root',
    reward: 'ACCESS GRANTED: You found the backdoor',
    difficulty: 'medium',
  },
  {
    id: 'terminal-secret',
    title: 'The Hidden Command',
    description: 'There\'s a secret terminal command that unlocks something special. What is it?',
    hint: 'Try typing "unlock" followed by a hexadecimal code in the terminal. Think coffee...',
    solution: 'unlock 0xC0FFEE',
    reward: 'ACCESS GRANTED: Ricing Mode activated',
    difficulty: 'hard',
  },
  {
    id: 'jurassic-park',
    title: 'Nedry\'s Revenge',
    description: 'Complete the famous quote: "Ah ah ah, you didn\'t say the _____ _____"',
    hint: 'This is from Jurassic Park. What did Nedry\'s system say?',
    solution: 'magic word',
    reward: 'ACCESS GRANTED: Welcome to Jurassic Park',
    difficulty: 'easy',
  },
];

/**
 * Validate a solution for a challenge
 */
export function validateSolution(challengeId: string, userSolution: string): boolean {
  const challenge = ctfChallenges.find((c) => c.id === challengeId);
  if (!challenge) return false;

  const normalizedUserSolution = userSolution.trim().toLowerCase();
  const normalizedCorrectSolution = challenge.solution.trim().toLowerCase();

  return normalizedUserSolution === normalizedCorrectSolution;
}

/**
 * Get CTF progress from localStorage
 */
export function getCTFProgress(): CTFProgress {
  if (typeof window === 'undefined') {
    return {
      unlockedChallenges: [],
      solvedChallenges: [],
      achievements: [],
      konamiUnlocked: false,
    };
  }

  try {
    const stored = localStorage.getItem('ctf_progress');
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error loading CTF progress:', error);
  }

  return {
    unlockedChallenges: [],
    solvedChallenges: [],
    achievements: [],
    konamiUnlocked: localStorage.getItem('ctf_unlocked') === 'true',
  };
}

/**
 * Save CTF progress to localStorage
 */
export function saveCTFProgress(progress: CTFProgress): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem('ctf_progress', JSON.stringify(progress));
  } catch (error) {
    console.error('Error saving CTF progress:', error);
  }
}

/**
 * Mark a challenge as solved
 */
export function markChallengeSolved(challengeId: string): CTFProgress {
  const progress = getCTFProgress();

  if (!progress.solvedChallenges.includes(challengeId)) {
    progress.solvedChallenges.push(challengeId);
  }

  // Check for achievements
  const newAchievements = checkAchievements(progress);
  progress.achievements = [...new Set([...progress.achievements, ...newAchievements])];

  saveCTFProgress(progress);
  return progress;
}

/**
 * Check for new achievements based on progress
 */
export function checkAchievements(progress: CTFProgress): string[] {
  const achievements: string[] = [];

  // First blood
  if (progress.solvedChallenges.length === 1) {
    achievements.push('first_blood');
  }

  // Half way there
  if (progress.solvedChallenges.length >= Math.ceil(ctfChallenges.length / 2)) {
    achievements.push('halfway');
  }

  // Master hacker
  if (progress.solvedChallenges.length === ctfChallenges.length) {
    achievements.push('master_hacker');
  }

  // Konami warrior
  if (progress.konamiUnlocked) {
    achievements.push('konami_warrior');
  }

  return achievements;
}

/**
 * Get achievement details
 */
export function getAchievementDetails(achievementId: string): { title: string; description: string } {
  const achievements: Record<string, { title: string; description: string }> = {
    first_blood: {
      title: 'First Blood',
      description: 'Solved your first challenge',
    },
    halfway: {
      title: 'Halfway There',
      description: 'Solved half of all challenges',
    },
    master_hacker: {
      title: 'Master Hacker',
      description: 'Solved all CTF challenges',
    },
    konami_warrior: {
      title: 'Konami Warrior',
      description: 'Unlocked the secret with the Konami code',
    },
  };

  return achievements[achievementId] || { title: 'Unknown', description: 'Unknown achievement' };
}

/**
 * Reset all CTF progress
 */
export function resetCTFProgress(): void {
  if (typeof window === 'undefined') return;

  localStorage.removeItem('ctf_progress');
  localStorage.removeItem('ctf_unlocked');
}
