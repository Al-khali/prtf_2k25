'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSmoothScroll } from '@/hooks/useScrollParallax';

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
  variant?: 'dots' | 'menu';
  className?: string;
}

export default function Navigation({ variant = 'dots', className = '' }: NavigationProps) {
  const [currentSection, setCurrentSection] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollTo } = useSmoothScroll();

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      const scrollPosition = window.scrollY + window.innerHeight / 2;

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
                ? 'bg-holo-cyan glow-cyan'
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
      {/* Menu Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className={`fixed top-8 right-8 z-50 glass-intense p-3 rounded-lg hover:glow-cyan transition-all ${className}`}
        aria-label="Toggle navigation menu"
        aria-expanded={isMenuOpen}
      >
        <div className="w-6 h-5 flex flex-col justify-between">
          <motion.span
            animate={isMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            className="w-full h-0.5 bg-holo-cyan block transition-all"
          />
          <motion.span
            animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
            className="w-full h-0.5 bg-holo-cyan block transition-all"
          />
          <motion.span
            animate={isMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            className="w-full h-0.5 bg-holo-cyan block transition-all"
          />
        </div>
      </motion.button>

      {/* Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
            />

            {/* Menu Panel */}
            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-80 glass-intense border-l border-glass-border z-40 p-8"
              aria-label="Main navigation"
            >
              <div className="flex flex-col h-full">
                <div className="mb-8">
                  <h2 className="text-2xl font-space font-bold holo-text">Navigation</h2>
                  <p className="text-sm text-text-tertiary mt-2">Jump to section</p>
                </div>

                <ul className="flex-1 space-y-4">
                  {navItems.map((item, index) => (
                    <motion.li
                      key={item.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <button
                        onClick={() => handleNavClick(item.section, index)}
                        className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                          currentSection === index
                            ? 'glass-intense text-holo-cyan glow-cyan'
                            : 'text-text-secondary hover:glass hover:text-holo-cyan'
                        }`}
                        aria-current={currentSection === index ? 'true' : undefined}
                      >
                        <span className="font-space font-medium">{item.label}</span>
                      </button>
                    </motion.li>
                  ))}
                </ul>

                <div className="mt-8 pt-8 border-t border-glass-border">
                  <p className="text-xs text-text-muted terminal-font">
                    Tip: Use ↑↑↓↓←→←→BA for a surprise
                  </p>
                </div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

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
        className="glass-intense px-6 py-3 rounded-lg font-space font-medium text-holo-cyan hover:glow-cyan transition-all"
      >
        About
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => handleNavigate('projects')}
        className="glass-intense px-6 py-3 rounded-lg font-space font-medium text-holo-magenta hover:glow-magenta transition-all"
      >
        Projects
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => handleNavigate('terminal')}
        className="glass-intense px-6 py-3 rounded-lg font-space font-medium text-terminal-green hover:glow-cyan transition-all"
      >
        Open Terminal
      </motion.button>
    </div>
  );
}
