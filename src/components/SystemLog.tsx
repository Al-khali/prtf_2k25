'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface LogLine {
  label: string;
  value: string;
  color: 'success' | 'info' | 'default';
}

const logLines: LogLine[] = [
  { label: 'Profile', value: 'Khalid', color: 'info' },
  { label: 'Status', value: 'caffeinated ☕', color: 'success' },
  { label: 'Environment', value: 'Arch / macOS hybrid', color: 'info' },
  { label: 'Uptime', value: '12000+ hours', color: 'success' },
  { label: 'Role', value: 'Data Engineer & Creative Technologist', color: 'default' },
  { label: 'Company', value: 'Colonies + Freelance consulting (Data & AI)', color: 'default' },
  { label: 'Editor', value: 'Neovim + tmux', color: 'info' },
  { label: 'Shell', value: 'zsh + oh-my-zsh', color: 'info' },
  { label: 'Interests', value: 'indie games, jazz fusion, city pop, 90s hip-hop, CTFs', color: 'default' },
];

const colorMap = {
  success: 'text-mint-green',
  info: 'text-glacier-blue',
  default: 'text-gray-300',
};

/**
 * SystemLog - Terminal-style system information display
 * 
 * Features:
 * - Terminal aesthetic with monospace font
 * - Typing animation for each log line
 * - Color-coded output (green for success, cyan for info)
 * - Displays current status, environment, and uptime
 */
export default function SystemLog() {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [typingLine, setTypingLine] = useState<string>('');
  const [currentLineIndex, setCurrentLineIndex] = useState<number>(0);

  useEffect(() => {
    if (currentLineIndex >= logLines.length) return;

    const currentLog = logLines[currentLineIndex];
    const fullText = `${currentLog.label}: ${currentLog.value}`;
    let charIndex = 0;

    const typingInterval = setInterval(() => {
      if (charIndex <= fullText.length) {
        setTypingLine(fullText.slice(0, charIndex));
        charIndex++;
      } else {
        clearInterval(typingInterval);
        setVisibleLines((prev) => prev + 1);
        setTypingLine('');
        setCurrentLineIndex((prev) => prev + 1);
      }
    }, 30); // Typing speed

    return () => clearInterval(typingInterval);
  }, [currentLineIndex]);

  return (
    <div className="font-mono text-sm">
      {/* Terminal header */}
      <div className="text-mint-green mb-4 flex items-center gap-2">
        <span className="text-glacier-blue">$</span>
        <span className="text-white">cat ~/.profile</span>
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className="inline-block w-2 h-4 bg-mint-green ml-1"
        />
      </div>

      {/* Boot sequence */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-mint-green mb-4 space-y-1"
      >
        <div>[OK] Booting profile system...</div>
        <div>[OK] Loading configuration...</div>
        <div>[OK] Initializing user data...</div>
        <div className="text-glacier-blue">---</div>
      </motion.div>

      {/* Log lines */}
      <div className="space-y-2">
        {logLines.slice(0, visibleLines).map((log, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className={colorMap[log.color]}
          >
            <span className="text-glacier-blue">{log.label}:</span>{' '}
            <span>{log.value}</span>
          </motion.div>
        ))}

        {/* Currently typing line */}
        {typingLine && (
          <div className={colorMap[logLines[currentLineIndex]?.color || 'default']}>
            {typingLine}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="inline-block w-2 h-4 bg-current ml-1 align-middle"
            />
          </div>
        )}
      </div>

      {/* Current status section */}
      {visibleLines >= logLines.length && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-6 pt-4 border-t border-gray-700"
        >
          <div className="text-glacier-blue mb-2">Current Status:</div>
          <div className="space-y-1 text-white">
            <div>→ Building data bridges between reality and imagination</div>
            <div>→ Crafting AI solutions that feel like magic</div>
            <div>→ Making terminals beautiful, one rice at a time</div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
