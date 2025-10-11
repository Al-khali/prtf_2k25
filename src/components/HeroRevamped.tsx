'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Terminal, Zap, Code2, Database, TrendingUp, Coffee } from 'lucide-react';

/**
 * 🚀 HERO SECTION - Refonte Complète
 * Style: Terminal/Hacker + Futuriste Moderne
 * Inspiré par: Cyberpunk, Matrix, Synthwave
 */

const titles = [
  'Data Engineer',
  'ML Engineer',
  'Data Pipeline Architect',
  'Analytics Engineer',
  'Creative Technologist',
];

export default function HeroRevamped() {
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  // Typing animation effect
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

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden scanlines crt">
      {/* Animated Background - Sans R3F pour éviter les erreurs */}
      <div className="absolute inset-0">
        {/* Gradient animé */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900" />
        
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-magenta-500/20 rounded-full blur-[120px] animate-pulse delay-1000" />

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        {/* Terminal Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 mb-8 px-4 py-2 glass rounded-full border border-cyan-500/30"
        >
          <Terminal className="w-4 h-4 text-cyan-400" />
          <span className="font-terminal text-sm text-cyan-400">khalid@portfolio:~$</span>
          <span className="w-2 h-4 bg-cyan-400 animate-pulse ml-1" />
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-7xl md:text-8xl lg:text-9xl font-bold mb-6 tracking-tight"
        >
          <span className="relative inline-block">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-magenta-500 holographic">
              KHALID
            </span>
            {/* Glitch layers */}
            <span 
              className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-magenta-500 opacity-70"
              style={{
                transform: 'translate(-2px, 2px)',
                mixBlendMode: 'screen',
              }}
              aria-hidden="true"
            >
              KHALID
            </span>
          </span>
        </motion.h1>

        {/* Animated Subtitle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-8"
        >
          <div className="text-3xl md:text-4xl lg:text-5xl font-terminal text-cyan-400 h-16 flex items-center justify-center">
            <span className="text-neon">&gt; </span>
            <span className="ml-2">{displayText}</span>
            <span className="w-3 h-8 bg-cyan-400 ml-1 animate-pulse inline-block" />
          </div>
        </motion.div>

        {/* Description with Icons */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed"
        >
          Building{' '}
          <span className="text-cyan-400 font-semibold glow-cyan">scalable data pipelines</span>,
          deploying{' '}
          <span className="text-blue-400 font-semibold">ML models in production</span>, and
          architecting{' '}
          <span className="text-magenta-400 font-semibold glow-magenta">modern data platforms</span>
          {' '}⚡
        </motion.p>

        {/* Tech Stack Icons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex items-center justify-center gap-6 mb-12"
        >
          <div className="group relative">
            <Database className="w-8 h-8 text-cyan-400 group-hover:scale-125 transition-transform duration-300" />
            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Data Pipelines
            </span>
          </div>
          <div className="group relative">
            <Zap className="w-8 h-8 text-yellow-400 group-hover:scale-125 transition-transform duration-300" />
            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Real-time Processing
            </span>
          </div>
          <div className="group relative">
            <Code2 className="w-8 h-8 text-blue-400 group-hover:scale-125 transition-transform duration-300" />
            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Python & SQL
            </span>
          </div>
          <div className="group relative">
            <TrendingUp className="w-8 h-8 text-magenta-400 group-hover:scale-125 transition-transform duration-300" />
            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              ML/AI Models
            </span>
          </div>
          <div className="group relative">
            <Coffee className="w-8 h-8 text-orange-400 group-hover:scale-125 transition-transform duration-300" />
            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Coffee Addict
            </span>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <button
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="group relative px-8 py-4 font-terminal font-bold rounded-lg overflow-hidden transition-all duration-300 hover:scale-105"
          >
            {/* Neon border animation */}
            <span className="absolute inset-0 border-2 border-cyan-500 rounded-lg group-hover:border-cyan-400 transition-colors" />
            <span className="absolute inset-0 bg-cyan-500/20 group-hover:bg-cyan-500/30 transition-colors" />
            <span className="relative z-10 text-cyan-400 group-hover:text-cyan-300 flex items-center gap-2">
              <Terminal className="w-5 h-5" />
              View Projects
            </span>
          </button>

          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="group relative px-8 py-4 font-terminal font-bold rounded-lg overflow-hidden transition-all duration-300 hover:scale-105"
          >
            <span className="absolute inset-0 border-2 border-magenta-500 rounded-lg group-hover:border-magenta-400 transition-colors" />
            <span className="absolute inset-0 bg-magenta-500/20 group-hover:bg-magenta-500/30 transition-colors" />
            <span className="relative z-10 text-magenta-400 group-hover:text-magenta-300 flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Get in Touch
            </span>
          </button>
        </motion.div>

        {/* Terminal Prompt Hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 glass rounded-lg border border-green-500/30"
        >
          <span className="font-terminal text-sm text-green-400">
            $ ls -la portfolio/
          </span>
          <span className="text-gray-500 text-sm">
            {'//'} Try the terminal below 👇
          </span>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          delay: 1.4,
          repeat: Infinity,
          repeatType: 'reverse',
          repeatDelay: 0.5,
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="font-terminal text-xs text-cyan-400">scroll</span>
          <div className="w-6 h-10 border-2 border-cyan-500 rounded-full p-1">
            <div className="w-1.5 h-3 bg-cyan-400 rounded-full mx-auto animate-bounce" />
          </div>
        </div>
      </motion.div>

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      />
    </section>
  );
}
