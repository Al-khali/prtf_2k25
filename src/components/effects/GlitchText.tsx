'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface GlitchTextProps {
  children: string;
  className?: string;
  glitchColors?: {
    primary: string;
    secondary: string;
  };
  intensity?: 'low' | 'medium' | 'high';
}

/**
 * 🎭 Glitch Text Effect Component
 * Crée un effet de glitch cyberpunk sur du texte
 */
export default function GlitchText({
  children,
  className = '',
  glitchColors = {
    primary: 'from-cyan-400 to-blue-500',
    secondary: 'from-magenta-500 to-pink-500',
  },
  intensity = 'medium',
}: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const glitchInterval = intensity === 'low' ? 5000 : intensity === 'medium' ? 3000 : 2000;

    const interval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 200);
    }, glitchInterval);

    return () => clearInterval(interval);
  }, [intensity]);

  return (
    <span className={`relative inline-block ${className}`}>
      {/* Main Text */}
      <span className={`text-transparent bg-clip-text bg-gradient-to-r ${glitchColors.primary}`}>
        {children}
      </span>

      {/* Glitch Layer 1 */}
      {isGlitching && (
        <motion.span
          initial={{ opacity: 0.7, x: -2, y: 2 }}
          animate={{ opacity: 0, x: 2, y: -2 }}
          transition={{ duration: 0.15 }}
          className={`absolute inset-0 text-transparent bg-clip-text bg-gradient-to-r ${glitchColors.secondary} mix-blend-screen`}
          aria-hidden="true"
        >
          {children}
        </motion.span>
      )}

      {/* Glitch Layer 2 */}
      {isGlitching && (
        <motion.span
          initial={{ opacity: 0.7, x: 2, y: -2 }}
          animate={{ opacity: 0, x: -2, y: 2 }}
          transition={{ duration: 0.15, delay: 0.05 }}
          className={`absolute inset-0 text-transparent bg-clip-text bg-gradient-to-r ${glitchColors.primary} mix-blend-screen`}
          aria-hidden="true"
        >
          {children}
        </motion.span>
      )}
    </span>
  );
}

/**
 * 💫 Neon Text - Texte avec effet néon
 */
export function NeonText({
  children,
  color = 'cyan',
  className = '',
}: {
  children: React.ReactNode;
  color?: 'cyan' | 'magenta' | 'green' | 'yellow' | 'pink';
  className?: string;
}) {
  const colorClasses = {
    cyan: 'text-cyan-400',
    magenta: 'text-magenta-400',
    green: 'text-green-400',
    yellow: 'text-yellow-400',
    pink: 'text-pink-400',
  };

  const shadowClasses = {
    cyan: 'drop-shadow-[0_0_10px_rgba(0,255,255,0.7)]',
    magenta: 'drop-shadow-[0_0_10px_rgba(255,0,255,0.7)]',
    green: 'drop-shadow-[0_0_10px_rgba(0,255,65,0.7)]',
    yellow: 'drop-shadow-[0_0_10px_rgba(255,255,0,0.7)]',
    pink: 'drop-shadow-[0_0_10px_rgba(255,20,147,0.7)]',
  };

  return (
    <span className={`${colorClasses[color]} ${shadowClasses[color]} ${className}`}>
      {children}
    </span>
  );
}

/**
 * ⚡ Typing Text - Effet machine à écrire
 */
export function TypingText({
  text,
  speed = 100,
  className = '',
  onComplete,
}: {
  text: string;
  speed?: number;
  className?: string;
  onComplete?: () => void;
}) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, text, speed, onComplete]);

  return (
    <span className={className}>
      {displayText}
      <span className="inline-block w-2 h-5 bg-current ml-1 animate-pulse" />
    </span>
  );
}
