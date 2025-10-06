'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import { ProjectsSection } from '@/components/ProjectsSection';
import { AITerminal } from '@/components/AITerminal';
import MusicSection from '@/components/MusicSection';
import ContactSection from '@/components/ContactSection';
import Navigation from '@/components/Navigation';
import { konamiDetector, easterEggs } from '@/utils/konamiCode';

export default function Home() {
  const [showKonamiMessage, setShowKonamiMessage] = useState(false);
  const [theme, setTheme] = useState<'normal' | 'riced'>('normal');

  useEffect(() => {
    // Initialize Konami code detector
    if (konamiDetector) {
      konamiDetector.onKonami(() => {
        setShowKonamiMessage(true);
        setTheme(theme === 'normal' ? 'riced' : 'normal');
        easterEggs.hacker();
        setTimeout(() => setShowKonamiMessage(false), 3000);
      });
    }
  }, [theme]);

  return (
    <main 
      id="main-content" 
      className={`relative ${theme === 'riced' ? 'riced-theme' : ''}`}
      role="main"
      aria-label="Main content"
    >
      {/* Riced mode header */}
      {theme === 'riced' && (
        <motion.div
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-mint-green p-2 terminal-font text-sm"
        >
          <div className="flex items-center justify-between text-mint-green">
            <div className="flex items-center gap-4">
              <span>📂 ~/portfolio</span>
              <span>🎵 synthwave.mp3</span>
              <span>💻 nvim main.tsx</span>
            </div>
            <div className="flex items-center gap-4">
              <span>📶 WiFi: ArchNet</span>
              <span>🔋 Battery: 69%</span>
              <span>⏰ {new Date().toLocaleTimeString()}</span>
              <button
                onClick={() => setTheme('normal')}
                className="text-red-400 hover:text-red-300 transition-colors"
              >
                [Exit Rice Mode]
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Konami code activation message */}
      <AnimatePresence>
        {showKonamiMessage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed top-4 right-4 z-50 glass-intense p-4 rounded-lg"
          >
            <div className="text-mint-green font-space font-semibold">
              {theme === 'riced' ? '🐧 Arch Mode Enabled' : '🎨 Normal Mode Restored'}
            </div>
            <div className="text-white text-sm">
              {theme === 'riced' ? 'Terminal aesthetic activated' : 'Clean design restored'}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <Navigation variant="dots" />

      {/* Sections */}
      <div className={theme === 'riced' ? 'pt-12' : ''}>
        <div id="hero">
          <HeroSection />
        </div>
        <div id="about">
          <AboutSection />
        </div>
        <div id="projects">
          <ProjectsSection />
        </div>
        <div id="terminal">
          <AITerminal />
        </div>
        <div id="music">
          <MusicSection />
        </div>
        <div id="contact">
          <ContactSection />
        </div>
      </div>

      {/* Floating easter egg hints - much more subtle */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 10, duration: 3 }}
        className="fixed bottom-2 left-2 text-xs text-gray-600 font-mono opacity-10 hover:opacity-60 transition-opacity duration-1000 z-30 cursor-default"
        title="Il y a des secrets cachés partout... Les vieux codes de triche marchent toujours 🎮"
      >
        <div>features.hidden = true</div>
      </motion.div>

      {/* Ambient background effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-holo-cyan opacity-[0.02] blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-holo-magenta opacity-[0.02] blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/3 left-1/4 w-60 h-60 rounded-full bg-holo-violet opacity-[0.01] blur-2xl animate-pulse delay-2000" />
      </div>

      {/* Riced theme styles */}
      {theme === 'riced' && (
        <style jsx global>{`
          .riced-theme {
            background: linear-gradient(45deg, #000 0%, #111 50%, #000 100%) !important;
          }
          
          .riced-theme * {
            font-family: 'IBM Plex Mono', 'Monaco', 'Menlo', 'Ubuntu Mono', monospace !important;
          }
          
          .riced-theme h1, .riced-theme h2, .riced-theme h3 {
            text-shadow: 0 0 10px currentColor;
          }

          .riced-theme .glass,
          .riced-theme .glass-intense {
            background: rgba(0, 255, 0, 0.05) !important;
            border-color: rgba(0, 255, 0, 0.2) !important;
          }

          .riced-theme .holo-text {
            background: linear-gradient(45deg, #00ff00, #50fa7b, #8be9fd) !important;
            background-size: 400% 400% !important;
            -webkit-background-clip: text !important;
            -webkit-text-fill-color: transparent !important;
            background-clip: text !important;
          }
        `}</style>
      )}
    </main>
  );
}