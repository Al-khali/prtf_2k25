'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import { Terminal, Database, Cpu, TrendingUp, Coffee, Code2 } from 'lucide-react';

interface HeroSectionProps {
  onNavigate?: (section: 'about' | 'projects' | 'terminal') => void;
}

const titles = [
  'Data Engineer',
  'ML Engineer',
  'Data Pipeline Architect',
  'Analytics Engineer',
];

const techIcons = [
  { icon: Database, label: 'Data Engineering' },
  { icon: TrendingUp, label: 'ML/AI' },
  { icon: Cpu, label: 'Cloud' },
  { icon: Code2, label: 'ETL' },
  { icon: Terminal, label: 'Terminal' },
  { icon: Coffee, label: 'Coffee' },
];

/**
 * HeroSection v3 - Ultra Clean Design
 * 
 * Simplified:
 * - Removed gradient orbs (too distracting)
 * - Minimal scanlines (barely visible)
 * - Reduced animations
 * - Focus on typography and content
 */
export default function HeroSection({ onNavigate }: HeroSectionProps) {
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  // Typing animation
  useEffect(() => {
    const currentTitle = titles[titleIndex];
    
    if (isTyping) {
      if (displayText.length < currentTitle.length) {
        const timeout = setTimeout(() => {
          setDisplayText(currentTitle.slice(0, displayText.length + 1));
        }, 100);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => setIsTyping(false), 2000);
        return () => clearTimeout(timeout);
      }
    } else {
      if (displayText.length > 0) {
        const timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 50);
        return () => clearTimeout(timeout);
      } else {
        setTitleIndex((prev) => (prev + 1) % titles.length);
        setIsTyping(true);
      }
    }
  }, [displayText, isTyping, titleIndex]);

  const handleNavigate = useCallback((section: 'about' | 'projects' | 'terminal') => {
    onNavigate?.(section);
    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
  }, [onNavigate]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Minimal background - solid black with tiny gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-black to-gray-950" />

      {/* Ultra subtle scanlines */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,255,0.01) 2px, rgba(0,255,255,0.01) 4px)',
        }} />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Terminal prompt - minimal */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-cyan-400/30 font-mono text-xs mb-20 flex items-center justify-center gap-2"
        >
          <Terminal className="w-3 h-3" />
          <span>guest@khalid.dev</span>
        </motion.div>

        {/* Name - clean typography */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-3 tracking-tight">
            Khalid Aourik
          </h1>
        </motion.div>

        {/* Typing title - minimal */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="h-12 flex items-center justify-center mb-8"
        >
          <h2 className="text-xl md:text-3xl font-medium text-gray-400">
            {displayText}
            <span className="text-cyan-400/40 animate-pulse ml-1">|</span>
          </h2>
        </motion.div>

        {/* Tagline - clean */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto mb-16 leading-relaxed"
        >
          Building scalable data pipelines, deploying ML models in production, and architecting modern data platforms
        </motion.p>

        {/* Tech icons - ultra minimal */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap justify-center gap-6 mb-16"
        >
          {techIcons.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-1.5 group"
              title={label}
            >
              <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-gray-400 group-hover:text-cyan-400 group-hover:border-cyan-400/30 transition-all duration-300">
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-xs text-gray-600 group-hover:text-gray-500 transition-colors">{label}</span>
            </div>
          ))}
        </motion.div>

        {/* CTA Buttons - minimal design */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap justify-center gap-3"
        >
          <button
            onClick={() => handleNavigate('projects')}
            className="px-6 py-2.5 bg-cyan-500/10 hover:bg-cyan-500/15 border border-cyan-500/20 hover:border-cyan-500/30
              rounded-lg font-medium text-cyan-400 text-sm transition-all duration-200"
          >
            View Projects
          </button>
          
          <button
            onClick={() => handleNavigate('terminal')}
            className="px-6 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/15
              rounded-lg font-medium text-gray-400 hover:text-gray-300 text-sm transition-all duration-200"
          >
            Try Terminal
          </button>
          
          <button
            onClick={() => handleNavigate('about')}
            className="px-6 py-2.5 border border-white/10 hover:border-white/15
              rounded-lg font-medium text-gray-500 hover:text-gray-400 text-sm transition-all duration-200"
          >
            About Me
          </button>
        </motion.div>

        {/* Minimal scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.3, 0] }}
          transition={{ duration: 3, repeat: Infinity, delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-5 h-8 border border-gray-800 rounded-full p-1">
            <div className="w-1 h-1.5 bg-gray-700 rounded-full mx-auto" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
