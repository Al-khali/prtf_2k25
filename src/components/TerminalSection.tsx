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
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-[#00f5ff] via-[#ff00ff] to-[#8b00ff] bg-clip-text text-transparent">
            Interactive Terminal
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Explore my portfolio through a command-line interface. Type <span className="text-[#00ff9f] font-mono">help</span> to get started.
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
          className="mt-6 text-center text-sm text-white/50"
        >
          <p>
            💡 Try commands like <span className="text-[#00ff9f] font-mono">ls projects</span>,{' '}
            <span className="text-[#00ff9f] font-mono">whoami</span>, or{' '}
            <span className="text-[#00ff9f] font-mono">neofetch</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};
