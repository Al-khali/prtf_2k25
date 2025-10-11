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
  'Creative Technologist',
];

const techIcons = [
  { icon: Database, label: 'Data Engineering', color: 'text-cyan-400' },
  { icon: TrendingUp, label: 'ML/AI', color: 'text-fuchsia-400' },
  { icon: Cpu, label: 'Cloud', color: 'text-violet-400' },
  { icon: Code2, label: 'ETL', color: 'text-green-400' },
  { icon: Terminal, label: 'Terminal', color: 'text-blue-400' },
  { icon: Coffee, label: 'Coffee', color: 'text-amber-400' },
];

/**
 * HeroSection v2 - Refined, professional design
 * 
 * Improvements:
 * - Reduced color saturation (50-60% opacity)
 * - Better spacing and hierarchy
 * - Softer animations
 * - Less visual noise
 * - More professional appearance
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
      {/* Subtle gradient background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-black to-cyan-950/10" />
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-fuchsia-500/5 rounded-full blur-[150px]" />
      </div>

      {/* Subtle scanlines */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="w-full h-full" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,255,0.03) 2px, rgba(0,255,255,0.03) 4px)',
        }} />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Terminal prompt */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 text-cyan-400/40 font-mono text-sm mb-16"
        >
          <Terminal className="w-4 h-4" />
          <span>guest@khalid.dev:~$</span>
          <span className="animate-pulse">_</span>
        </motion.div>

        {/* Name with holographic effect - MORE SUBTLE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-6xl md:text-8xl font-black mb-4 bg-gradient-to-r from-cyan-300/90 via-white to-fuchsia-300/90 bg-clip-text text-transparent">
            Khalid Aourik
          </h1>
        </motion.div>

        {/* Typing title */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="h-16 flex items-center justify-center mb-6"
        >
          <h2 className="text-2xl md:text-4xl font-bold text-gray-300">
            {displayText}
            <span className="text-cyan-400/50 animate-pulse">|</span>
          </h2>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-gray-500 text-lg md:text-xl max-w-3xl mx-auto mb-16 leading-relaxed"
        >
          Building scalable data pipelines, deploying ML models in production, and architecting modern data platforms
        </motion.p>

        {/* Tech icons - MORE SUBTLE */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap justify-center gap-8 mb-16"
        >
          {techIcons.map(({ icon: Icon, label, color }, index) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + index * 0.05 }}
              whileHover={{ scale: 1.1, y: -5 }}
              className="flex flex-col items-center gap-2 group cursor-default"
            >
              <div className={`p-3 rounded-xl bg-white/5 border border-white/10 group-hover:border-white/20 transition-all ${color}/80`}>
                <Icon className="w-6 h-6" />
              </div>
              <span className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors">{label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Buttons - REFINED */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <button
            onClick={() => handleNavigate('projects')}
            className="group px-8 py-3 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 
              rounded-lg font-semibold text-cyan-400/90 transition-all duration-300 
              hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(0,255,255,0.15)]"
          >
            View Projects
            <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
          </button>
          
          <button
            onClick={() => handleNavigate('terminal')}
            className="px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20
              rounded-lg font-semibold text-gray-300 hover:text-white transition-all duration-300 
              hover:scale-[1.02]"
          >
            Try Terminal
          </button>
          
          <button
            onClick={() => handleNavigate('about')}
            className="px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20
              rounded-lg font-medium text-gray-400 hover:text-gray-300 transition-all duration-300 
              hover:scale-[1.02]"
          >
            About Me
          </button>
        </motion.div>

        {/* Scroll indicator - SUBTLE */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-gray-700 rounded-full p-1">
            <div className="w-1 h-2 bg-gray-600 rounded-full mx-auto animate-bounce" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
