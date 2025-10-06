'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CTFChallenge as CTFChallengeType } from '@/types';
import { validateSolution } from '@/lib/ctf-puzzles';

interface CTFChallengeProps {
  challenge: CTFChallengeType;
  isSolved: boolean;
  onSolved: () => void;
}

export default function CTFChallenge({ challenge, isSolved, onSolved }: CTFChallengeProps) {
  const [userInput, setUserInput] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isSolved) return;

    const isCorrect = validateSolution(challenge.id, userInput);

    if (isCorrect) {
      setShowSuccess(true);
      setTimeout(() => {
        onSolved();
      }, 2000);
    } else {
      setShowError(true);
      setAttempts((prev) => prev + 1);
      setTimeout(() => setShowError(false), 1000);
    }
  };

  const getDifficultyColor = () => {
    switch (challenge.difficulty) {
      case 'easy':
        return 'from-[#00ff9f] to-[#00d4ff]';
      case 'medium':
        return 'from-[#ffd700] to-[#ff8c00]';
      case 'hard':
        return 'from-[#ff00ff] to-[#8b00ff]';
      default:
        return 'from-[#00f5ff] to-[#ff00ff]';
    }
  };

  return (
    <motion.div
      className={`relative bg-black/30 backdrop-blur-sm border rounded-lg p-6 transition-all duration-300 ${
        isSolved
          ? 'border-[#00ff9f]/50 shadow-[0_0_20px_rgba(0,255,159,0.3)]'
          : 'border-[#00f5ff]/20 hover:border-[#00f5ff]/40'
      }`}
      whileHover={{ scale: isSolved ? 1 : 1.02 }}
      animate={showError ? { x: [-10, 10, -10, 10, 0] } : {}}
      transition={{ duration: 0.4 }}
    >
      {/* Glitch Effect on Success */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0, 1, 0, 1, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 bg-[#00ff9f]/20 rounded-lg pointer-events-none z-10"
          />
        )}
      </AnimatePresence>

      {/* Difficulty Badge */}
      <div className="flex items-center justify-between mb-4">
        <span
          className={`px-3 py-1 rounded-full text-xs font-bold uppercase bg-gradient-to-r ${getDifficultyColor()} text-black`}
        >
          {challenge.difficulty}
        </span>

        {isSolved && (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 10 }}
            className="text-2xl"
          >
            ✓
          </motion.div>
        )}
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold mb-3 text-white">{challenge.title}</h3>

      {/* Description */}
      <div className="mb-4 text-gray-300 text-sm font-mono whitespace-pre-wrap bg-black/50 p-3 rounded border border-[#00f5ff]/10">
        {challenge.description}
      </div>

      {/* Hint Button */}
      {challenge.hint && !isSolved && (
        <button
          onClick={() => setShowHint(!showHint)}
          className="text-xs text-[#ffd700] hover:text-[#ffd700]/80 mb-3 font-mono transition-colors"
        >
          {showHint ? '▼ Hide Hint' : '▶ Show Hint'}
        </button>
      )}

      {/* Hint */}
      <AnimatePresence>
        {showHint && challenge.hint && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-4 text-sm text-[#ffd700] bg-[#ffd700]/10 p-3 rounded border border-[#ffd700]/20 font-mono overflow-hidden"
          >
            💡 {challenge.hint}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input Form */}
      {!isSolved ? (
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Enter your solution..."
            className="w-full bg-black/50 border border-[#00f5ff]/20 rounded px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-[#00f5ff]/50 transition-colors font-mono text-sm"
          />

          <button
            type="submit"
            disabled={!userInput.trim()}
            className="w-full bg-gradient-to-r from-[#00f5ff] to-[#ff00ff] text-black font-bold py-2 px-4 rounded hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            SUBMIT
          </button>

          {attempts > 0 && (
            <p className="text-xs text-gray-500 text-center font-mono">
              Attempts: {attempts}
            </p>
          )}
        </form>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-3"
        >
          <div className="bg-[#00ff9f]/10 border border-[#00ff9f]/30 rounded p-4 text-center">
            <div className="text-2xl font-bold text-[#00ff9f] mb-2 font-mono glitch-text">
              ACCESS GRANTED
            </div>
            <p className="text-sm text-gray-300">{challenge.reward}</p>
          </div>
        </motion.div>
      )}

      {/* Error Feedback */}
      <AnimatePresence>
        {showError && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute top-0 left-0 right-0 bg-red-500/20 border border-red-500/50 rounded-t-lg p-2 text-center text-red-400 text-sm font-mono"
          >
            ACCESS DENIED
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        @keyframes glitch {
          0% {
            text-shadow: 0.05em 0 0 rgba(255, 0, 0, 0.75),
              -0.05em -0.025em 0 rgba(0, 255, 0, 0.75),
              -0.025em 0.05em 0 rgba(0, 0, 255, 0.75);
          }
          14% {
            text-shadow: 0.05em 0 0 rgba(255, 0, 0, 0.75),
              -0.05em -0.025em 0 rgba(0, 255, 0, 0.75),
              -0.025em 0.05em 0 rgba(0, 0, 255, 0.75);
          }
          15% {
            text-shadow: -0.05em -0.025em 0 rgba(255, 0, 0, 0.75),
              0.025em 0.025em 0 rgba(0, 255, 0, 0.75),
              -0.05em -0.05em 0 rgba(0, 0, 255, 0.75);
          }
          49% {
            text-shadow: -0.05em -0.025em 0 rgba(255, 0, 0, 0.75),
              0.025em 0.025em 0 rgba(0, 255, 0, 0.75),
              -0.05em -0.05em 0 rgba(0, 0, 255, 0.75);
          }
          50% {
            text-shadow: 0.025em 0.05em 0 rgba(255, 0, 0, 0.75),
              0.05em 0 0 rgba(0, 255, 0, 0.75), 0 -0.05em 0 rgba(0, 0, 255, 0.75);
          }
          99% {
            text-shadow: 0.025em 0.05em 0 rgba(255, 0, 0, 0.75),
              0.05em 0 0 rgba(0, 255, 0, 0.75), 0 -0.05em 0 rgba(0, 0, 255, 0.75);
          }
          100% {
            text-shadow: -0.025em 0 0 rgba(255, 0, 0, 0.75),
              -0.025em -0.025em 0 rgba(0, 255, 0, 0.75),
              -0.025em -0.05em 0 rgba(0, 0, 255, 0.75);
          }
        }

        .glitch-text {
          animation: glitch 1s infinite;
        }
      `}</style>
    </motion.div>
  );
}
