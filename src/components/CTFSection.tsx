'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useKonamiCode } from '@/hooks/useKonamiCode';
import { ctfChallenges, getCTFProgress, markChallengeSolved } from '@/lib/ctf-puzzles';
import { CTFProgress } from '@/types';
import CTFChallenge from './CTFChallenge';
import CTFReward from './CTFReward';

export default function CTFSection() {
  const [progress, setProgress] = useState<CTFProgress | null>(null);
  const [showUnlockAnimation, setShowUnlockAnimation] = useState(false);
  const [showReward, setShowReward] = useState(false);
  const { isUnlocked } = useKonamiCode(() => {
    setShowUnlockAnimation(true);
    setTimeout(() => setShowUnlockAnimation(false), 2000);
  });

  useEffect(() => {
    // Load progress on mount
    const loadedProgress = getCTFProgress();
    setProgress(loadedProgress);
  }, []);

  const handleChallengeSolved = (challengeId: string) => {
    const newProgress = markChallengeSolved(challengeId);
    setProgress(newProgress);

    // Check if all challenges are solved
    if (newProgress.solvedChallenges.length === ctfChallenges.length) {
      setTimeout(() => setShowReward(true), 1000);
    }
  };

  if (!isUnlocked) {
    return (
      <section
        id="ctf"
        className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0c0d10] to-[#1a1b1e] relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#00f5ff_1px,transparent_1px),linear-gradient(to_bottom,#00f5ff_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center z-10 px-4"
        >
          <div className="mb-8">
            <svg
              className="w-24 h-24 mx-auto mb-6 text-[#00f5ff]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-[#00f5ff] via-[#ff00ff] to-[#8b00ff] bg-clip-text text-transparent">
            RESTRICTED AREA
          </h2>

          <p className="text-xl text-gray-400 mb-8 font-mono">
            ACCESS DENIED
          </p>

          <div className="bg-black/30 backdrop-blur-sm border border-[#00f5ff]/20 rounded-lg p-6 max-w-md mx-auto">
            <p className="text-[#00ff9f] font-mono text-sm mb-4">
              {'>'} HINT: Try entering a special key sequence...
            </p>
            <p className="text-gray-500 font-mono text-xs">
              ↑↑↓↓←→←→BA
            </p>
          </div>
        </motion.div>
      </section>
    );
  }

  return (
    <section
      id="ctf"
      className="min-h-screen py-20 bg-gradient-to-b from-[#0c0d10] to-[#1a1b1e] relative overflow-hidden"
    >
      {/* HUD Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00f5ff] to-transparent opacity-50" />
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#ff00ff] to-transparent opacity-50" />
        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-transparent via-[#00f5ff] to-transparent opacity-50" />
        <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-transparent via-[#ff00ff] to-transparent opacity-50" />
      </div>

      {/* Grid background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00f5ff_1px,transparent_1px),linear-gradient(to_bottom,#00f5ff_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      {/* Unlock Animation */}
      <AnimatePresence>
        {showUnlockAnimation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.5, rotateY: 0 }}
              animate={{ scale: 1, rotateY: 360 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="text-center"
            >
              <div className="text-6xl md:text-8xl font-bold mb-4 bg-gradient-to-r from-[#00ff9f] via-[#00f5ff] to-[#ff00ff] bg-clip-text text-transparent">
                ACCESS GRANTED
              </div>
              <div className="text-2xl text-[#00ff9f] font-mono">
                CTF ZONE UNLOCKED
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-[#00f5ff] via-[#ff00ff] to-[#8b00ff] bg-clip-text text-transparent">
            CTF ZONE
          </h2>
          <p className="text-xl text-gray-400 font-mono mb-4">
            {'>'} CAPTURE THE FLAG CHALLENGES
          </p>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Test your hacking skills with these challenges. Solve them all to unlock special rewards.
          </p>

          {/* Progress Bar */}
          {progress && (
            <div className="mt-8 max-w-md mx-auto">
              <div className="flex justify-between text-sm text-gray-400 mb-2 font-mono">
                <span>PROGRESS</span>
                <span>
                  {progress.solvedChallenges.length} / {ctfChallenges.length}
                </span>
              </div>
              <div className="h-2 bg-black/50 rounded-full overflow-hidden border border-[#00f5ff]/20">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{
                    width: `${(progress.solvedChallenges.length / ctfChallenges.length) * 100}%`,
                  }}
                  transition={{ duration: 0.5 }}
                  className="h-full bg-gradient-to-r from-[#00ff9f] to-[#00f5ff]"
                />
              </div>
            </div>
          )}
        </motion.div>

        {/* Challenge Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {ctfChallenges.map((challenge, index) => (
            <motion.div
              key={challenge.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <CTFChallenge
                challenge={challenge}
                isSolved={progress?.solvedChallenges.includes(challenge.id) || false}
                onSolved={() => handleChallengeSolved(challenge.id)}
              />
            </motion.div>
          ))}
        </div>

        {/* Achievements */}
        {progress && progress.achievements.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-16 max-w-4xl mx-auto"
          >
            <h3 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-[#ffd700] to-[#ff00ff] bg-clip-text text-transparent">
              ACHIEVEMENTS UNLOCKED
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {progress.achievements.map((achievementId) => {
                const achievement = getAchievementDetails(achievementId);
                return (
                  <motion.div
                    key={achievementId}
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    className="bg-black/30 backdrop-blur-sm border border-[#ffd700]/30 rounded-lg p-4 flex items-center gap-4"
                  >
                    <div className="text-4xl">🏆</div>
                    <div>
                      <div className="font-bold text-[#ffd700]">{achievement.title}</div>
                      <div className="text-sm text-gray-400">{achievement.description}</div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>

      {/* Master Hacker Reward Modal */}
      <CTFReward show={showReward} onClose={() => setShowReward(false)} />
    </section>
  );
}

function getAchievementDetails(achievementId: string): { title: string; description: string } {
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
