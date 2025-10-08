'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSmoothScroll } from '@/hooks/useScrollParallax';
import { Menu, X, Volume2, VolumeX } from 'lucide-react';
import { useAmbientMusic } from '@/contexts/AmbientMusicContext';

interface NavItem {
  id: string;
  label: string;
  section: string;
}

const navItems: NavItem[] = [
  { id: 'hero', label: 'Home', section: 'hero' },
  { id: 'about', label: 'About', section: 'about' },
  { id: 'projects', label: 'Projects', section: 'projects' },
  { id: 'terminal', label: 'Terminal', section: 'terminal' },
  { id: 'music', label: 'Music', section: 'music' },
  { id: 'contact', label: 'Contact', section: 'contact' },
];

interface NavigationProps {
  variant?: 'header' | 'dots';
  className?: string;
}

/**
 * Modern Navigation Component
 * Features fixed header with glass morphism, mobile menu, and smooth scrolling
 */
export default function Navigation({ variant = 'header', className = '' }: NavigationProps) {
  const [currentSection, setCurrentSection] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollTo } = useSmoothScroll();
  const { isMuted, toggleMute } = useAmbientMusic();

  useEffect(() => {
    const handleScroll = () => {
      // Update scroll state for header background
      setIsScrolled(window.scrollY > 50);

      // Update current section
      const sections = document.querySelectorAll('section[id]');
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      sections.forEach((section, index) => {
        const sectionTop = section.getBoundingClientRect().top + window.scrollY;
        const sectionBottom = sectionTop + section.clientHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          setCurrentSection(index);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId: string, index: number) => {
    scrollTo(sectionId, 80);
    setCurrentSection(index);
    setIsMenuOpen(false);
  };

  if (variant === 'dots') {
    // Keep dots variant for backward compatibility
    return (
      <nav
        className={`fixed right-8 top-1/2 transform -translate-y-1/2 z-40 space-y-4 ${className}`}
        aria-label="Section navigation"
      >
        {navItems.map((item, index) => (
          <motion.button
            key={item.id}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            className={`block w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${
              currentSection === index
                ? 'bg-cyan-400 shadow-lg shadow-cyan-500/50'
                : 'bg-gray-600 hover:bg-gray-400'
            }`}
            onClick={() => handleNavClick(item.section, index)}
            aria-label={`Navigate to ${item.label}`}
            title={item.label}
          />
        ))}
      </nav>
    );
  }

  return (
    <>
      {/* Modern Fixed Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-black/80 backdrop-blur-lg border-b border-white/10 shadow-lg'
            : 'bg-transparent'
        } ${className}`}
      >
        <nav className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo / Name */}
            <motion.button
              onClick={() => handleNavClick('hero', 0)}
              className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              KHALID
            </motion.button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.slice(1).map((item, index) => (
                <motion.button
                  key={item.id}
                  onClick={() => handleNavClick(item.section, index + 1)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    currentSection === index + 1
                      ? 'bg-white/10 text-cyan-400'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.label}
                </motion.button>
              ))}
              
              {/* Music Toggle Button */}
              <motion.button
                onClick={toggleMute}
                className="ml-2 p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label={isMuted ? 'Unmute ambient music' : 'Mute ambient music'}
                title={isMuted ? 'Unmute ambient music' : 'Mute ambient music'}
              >
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </motion.button>
            </div>

            {/* Mobile Controls */}
            <div className="md:hidden flex items-center gap-2">
              {/* Music Toggle Button */}
              <motion.button
                onClick={toggleMute}
                className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label={isMuted ? 'Unmute ambient music' : 'Mute ambient music'}
              >
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </motion.button>
              
              {/* Menu Button */}
              <motion.button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </motion.button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 md:hidden"
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-80 bg-black/95 backdrop-blur-xl border-l border-white/10 z-50 md:hidden"
            >
              <div className="flex flex-col h-full p-6">
                {/* Close button */}
                <div className="flex justify-end mb-8">
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Menu Items */}
                <nav className="flex-1 space-y-2">
                  {navItems.map((item, index) => (
                    <motion.button
                      key={item.id}
                      onClick={() => handleNavClick(item.section, index)}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`w-full text-left px-4 py-3 rounded-lg text-lg font-medium transition-all ${
                        currentSection === index
                          ? 'bg-white/10 text-cyan-400 border border-cyan-500/30'
                          : 'text-gray-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {item.label}
                    </motion.button>
                  ))}
                </nav>

                {/* Footer */}
                <div className="pt-6 border-t border-white/10">
                  <p className="text-xs text-gray-500 font-mono">
                    💡 Tip: Try the Konami code
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

/**
 * Section Navigator - CTA buttons for quick navigation
 */
interface SectionNavigatorProps {
  onNavigate: (section: 'about' | 'projects' | 'terminal') => void;
}

export function SectionNavigator({ onNavigate }: SectionNavigatorProps) {
  const { scrollTo } = useSmoothScroll();

  const handleNavigate = (section: 'about' | 'projects' | 'terminal') => {
    scrollTo(section);
    onNavigate(section);
  };

  return (
    <div className="flex gap-4 flex-wrap justify-center">
      <motion.button
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => handleNavigate('about')}
        className="px-6 py-3 bg-white/5 border border-white/10 rounded-lg font-medium text-cyan-400 hover:bg-white/10 hover:border-cyan-500/30 hover:shadow-lg hover:shadow-cyan-500/20 transition-all"
      >
        About
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => handleNavigate('projects')}
        className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg font-medium text-white hover:shadow-lg hover:shadow-cyan-500/30 transition-all"
      >
        View Projects
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => handleNavigate('terminal')}
        className="px-6 py-3 bg-white/5 border border-white/10 rounded-lg font-medium text-green-400 hover:bg-white/10 hover:border-green-500/30 hover:shadow-lg hover:shadow-green-500/20 transition-all"
      >
        Open Terminal
      </motion.button>
    </div>
  );
}
