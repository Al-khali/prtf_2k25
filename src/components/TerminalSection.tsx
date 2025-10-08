'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { AITerminal } from './AITerminal';
import { GlassCard } from './ui/GlassCard';
import { useTerminalCommands } from '@/hooks/useTerminalCommands';

/**
 * TerminalSection - Main section component for the interactive terminal
 * 
 * Features:
 * - Glass card container with terminal aesthetic
 * - Scroll-triggered entrance animations
 * - Responsive layout
 * - Integrated command processor
 */
export const TerminalSection: React.FC = () => {
  const { executeCommand, availableCommands, ricingModeUnlocked } = useTerminalCommands();

  return (
    <section id="terminal" className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-sm font-mono text-cyan-400">// Terminal</span>
          </motion.div>
          
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-green-500 to-blue-600">
              Interactive Shell
            </span>
          </h2>
          
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
            Explore my portfolio through a bash terminal. Try commands like{' '}
            <span className="text-green-400 font-mono">neofetch</span>,{' '}
            <span className="text-green-400 font-mono">ls</span>, or{' '}
            <span className="text-green-400 font-mono">help</span>.
          </p>
        </motion.div>

        {/* Terminal Container */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <GlassCard
            blur="heavy"
            borderGradient={ricingModeUnlocked ? 'holographic' : 'terminal'}
            padding="none"
            className="overflow-hidden"
          >
            <AITerminal 
              onCommand={executeCommand} 
              availableCommands={availableCommands}
              autoFocus={false} 
            />
          </GlassCard>
        </motion.div>

        {/* Hint Text */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 flex flex-wrap justify-center gap-3"
        >
          {['neofetch', 'fastfetch', 'ls', 'whoami', 'help', 'clear'].map((cmd) => (
            <div
              key={cmd}
              className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-sm font-mono text-gray-400 hover:bg-white/10 hover:border-cyan-500/30 hover:text-cyan-400 transition-all duration-200"
            >
              {cmd}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
