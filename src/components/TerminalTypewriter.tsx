'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TerminalTypewriterProps {
  text: string;
  speed?: number;
  delay?: number;
  onComplete?: () => void;
  className?: string;
  showCursor?: boolean;
}

/**
 * TerminalTypewriter - Terminal-style typing animation
 * Character-by-character reveal with blinking cursor
 */
export default function TerminalTypewriter({
  text,
  speed = 50,
  delay = 0,
  onComplete,
  className = '',
  showCursor = true,
}: TerminalTypewriterProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    let index = 0;

    const startTyping = () => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1));
        index++;
        timeout = setTimeout(startTyping, speed);
      } else {
        setIsComplete(true);
        onComplete?.();
      }
    };

    // Start after delay
    timeout = setTimeout(startTyping, delay);

    return () => clearTimeout(timeout);
  }, [text, speed, delay, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: delay / 1000 }}
      className={`font-mono ${className}`}
    >
      <span className="text-glacier-blue">$ </span>
      <span className="text-white">whoami</span>
      <span className="text-mint-green"> → </span>
      <span className="text-white">
        {displayedText}
        {showCursor && !isComplete && (
          <span className="inline-block w-2 h-5 bg-mint-green ml-1 animate-pulse" />
        )}
      </span>
    </motion.div>
  );
}
