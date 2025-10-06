import { useEffect, useState } from 'react';

const KONAMI_CODE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
];

export function useKonamiCode(onSuccess?: () => void) {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [keySequence, setKeySequence] = useState<string[]>([]);

  useEffect(() => {
    // Check localStorage for existing unlock state
    const unlocked = localStorage.getItem('ctf_unlocked') === 'true';
    if (unlocked) {
      setIsUnlocked(true);
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ignore if already unlocked
      if (isUnlocked) return;

      // Ignore if user is typing in an input field
      const target = event.target as HTMLElement;
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable
      ) {
        return;
      }

      setKeySequence((prev) => {
        const newSequence = [...prev, event.key];
        
        // Keep only the last 10 keys
        if (newSequence.length > KONAMI_CODE.length) {
          newSequence.shift();
        }

        // Check if the sequence matches the Konami code
        const matches = KONAMI_CODE.every(
          (key, index) => key === newSequence[index]
        );

        if (matches && newSequence.length === KONAMI_CODE.length) {
          // Success! Unlock CTF
          setIsUnlocked(true);
          localStorage.setItem('ctf_unlocked', 'true');
          
          // Play unlock sound effect
          playUnlockSound();
          
          // Call success callback
          if (onSuccess) {
            onSuccess();
          }

          return [];
        }

        return newSequence;
      });
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isUnlocked, onSuccess]);

  const unlock = () => {
    setIsUnlocked(true);
    localStorage.setItem('ctf_unlocked', 'true');
  };

  const reset = () => {
    setIsUnlocked(false);
    localStorage.removeItem('ctf_unlocked');
    setKeySequence([]);
  };

  return { isUnlocked, unlock, reset };
}

function playUnlockSound() {
  try {
    // Create a simple beep sound using Web Audio API
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 800;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
  } catch (error) {
    console.log('Audio not supported');
  }
}
