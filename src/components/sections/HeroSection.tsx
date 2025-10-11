'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import { Terminal, Database, Cpu, TrendingUp, Coffee, Code2 } from 'lucide-react';
import { HolographicText } from '@/components/ui/HolographicText';
import TerminalTypewriter from '@/components/TerminalTypewriter';

// Note: ParticleField commented out for now due to static export limitations
// Will use static gradient background instead
// const ParticleField = lazy(() => import('@/components/3d/ParticleField'));

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

/**
 * HeroSection - Main landing section with holographic effects
 * 
 * Features from design.md:
 * - 3D ParticleField with fallback gradient (lazy loaded)
 * - HolographicText for name/title
 * - TerminalTypewriter for tagline
 * - Navigation callbacks
 * - Optimized for performance with code splitting
 * - Graceful degradation if WebGL not supported
 */
export default function HeroSection({ onNavigate }: HeroSectionProps) {
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

  const handleNavigate = useCallback((section: 'about' | 'projects' | 'terminal') => {
    onNavigate?.(section);
    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
  }, [onNavigate]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Static gradient background - MORE SUBTLE */}
      <StaticGradientBackground />

      {/* CRT & Scanlines Effects - REDUCED */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="scanlines" style={{ opacity: 0.02 }} />
        <div className="crt" style={{ opacity: 0.3 }} />
      </div>

      {/* Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-magenta-500/20 rounded-full blur-[120px] animate-pulse" 
        style={{ animationDelay: '1s' }} />

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        {/* Terminal Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-lg glass-panel text-terminal-green font-mono text-sm"
        >
          <Terminal className="w-4 h-4" />
          <span>guest@khalid.dev:~$</span>
          <span className="animate-blink">_</span>
        </motion.div>

        {/* Main Title with Holographic Effect */}
        {/* Main title with holographic effect - REDUCED SIZE & OPACITY */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <HolographicText className="text-5xl md:text-7xl font-black mb-6 opacity-90">
            Khalid Aourik
          </HolographicText>
          
          <h2 className="text-2xl md:text-4xl font-bold text-gray-100 mb-2">
            {displayText}
            <span className="text-cyan-400/60 animate-pulse">|</span>
          </h2>
        </motion.div>        {/* Rotating Title with Typing Effect */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-8 h-20 flex items-center justify-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white">
            {displayText}
            <span className="animate-blink text-cyan-400">|</span>
          </h2>
        </motion.div>

        {/* Tagline with Typewriter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="max-w-3xl mx-auto mb-12"
        >
          <TerminalTypewriter
            text="Building scalable data pipelines, deploying ML models in production, and architecting modern data platforms"
            speed={30}
            delay={800}
            className="text-xl md:text-2xl text-gray-300 font-mono"
          />
        </motion.div>

        {/* Tech Icons Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="flex flex-wrap justify-center gap-6 mb-16"
        >
          <TechIcon icon={Database} label="Data Engineering" color="cyan" />
          <TechIcon icon={TrendingUp} label="ML/AI Models" color="magenta" />
          <TechIcon icon={Cpu} label="Cloud Infrastructure" color="violet" />
          <TechIcon icon={Code2} label="ETL Pipelines" color="green" />
          <TechIcon icon={Terminal} label="Terminal Lover" color="blue" />
          <TechIcon icon={Coffee} label="Coffee Addict" color="gold" />
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <button
            onClick={() => handleNavigate('projects')}
            className="px-8 py-4 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/50 
              rounded-lg font-semibold text-cyan-300 transition-all duration-300 
              hover:scale-105 hover:shadow-[0_0_30px_rgba(0,255,255,0.3)]"
          >
            View Projects →
          </button>
          <button
            onClick={() => handleNavigate('terminal')}
            className="px-8 py-4 glass-panel border border-white/20 
              rounded-lg font-semibold text-white transition-all duration-300 
              hover:scale-105 hover:border-white/40"
          >
            Try Terminal
          </button>
          <button
            onClick={() => handleNavigate('about')}
            className="px-8 py-4 glass-panel border border-white/10 
              rounded-lg font-semibold text-gray-300 transition-all duration-300 
              hover:scale-105 hover:border-white/20"
          >
            About Me
          </button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.8, repeat: Infinity, repeatType: 'reverse' }}
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-cyan-500/50 rounded-full flex items-start justify-center p-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-cyan-400 rounded-full"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/**
 * TechIcon - Individual tech icon with tooltip
 */
interface TechIconProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  color: 'cyan' | 'magenta' | 'violet' | 'green' | 'blue' | 'gold';
}

function TechIcon({ icon: Icon, label, color }: TechIconProps) {
  const colorMap = {
    cyan: 'text-cyan-400 hover:text-cyan-300 hover:shadow-[0_0_20px_rgba(0,255,255,0.4)]',
    magenta: 'text-magenta-400 hover:text-magenta-300 hover:shadow-[0_0_20px_rgba(255,0,255,0.4)]',
    violet: 'text-violet-400 hover:text-violet-300 hover:shadow-[0_0_20px_rgba(139,0,255,0.4)]',
    green: 'text-green-400 hover:text-green-300 hover:shadow-[0_0_20px_rgba(0,255,159,0.4)]',
    blue: 'text-blue-400 hover:text-blue-300 hover:shadow-[0_0_20px_rgba(0,212,255,0.4)]',
    gold: 'text-yellow-400 hover:text-yellow-300 hover:shadow-[0_0_20px_rgba(255,215,0,0.4)]',
  };

  return (
    <div className="group relative">
      <motion.div
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.95 }}
        className={`p-4 rounded-xl glass-panel border border-white/10 
          transition-all duration-300 cursor-pointer ${colorMap[color]}`}
      >
        <Icon className="w-8 h-8" />
      </motion.div>
      
      {/* Tooltip */}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 
        opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        <div className="bg-black/90 text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap
          border border-white/20">
          {label}
        </div>
      </div>
    </div>
  );
}

/**
 * StaticGradientBackground - Fallback for devices without WebGL
 */
function StaticGradientBackground() {
  return (
    <div className="absolute inset-0">
      {/* Animated gradient */}
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
  );
}
