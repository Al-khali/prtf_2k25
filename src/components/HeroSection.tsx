'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import ParticleField from './ParticleField';

const typewriterTexts = [
  "Data Engineer & Creative Technologist",
  "Builder of digital experiences",
  "Architect of data pipelines",
  "Creator of interactive art"
];

export default function HeroSection() {
  const [currentText, setCurrentText] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const text = typewriterTexts[currentText];
    let index = 0;
    setIsTyping(true);

    const typeInterval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(typeInterval);
        
        setTimeout(() => {
          setCurrentText((prev) => (prev + 1) % typewriterTexts.length);
          setDisplayedText('');
        }, 2000);
      }
    }, 100);

    return () => clearInterval(typeInterval);
  }, [currentText]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <ParticleField />
      
      {/* Main content */}
      <motion.div
        className="relative z-10 text-center px-4 max-w-5xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Name */}
        <motion.div variants={itemVariants}>
          <h1 className="text-8xl md:text-9xl lg:text-[12rem] font-space font-bold tracking-wider mb-8">
            <span className="holo-text">KHALID</span>
          </h1>
        </motion.div>

        {/* Whoami terminal */}
        <motion.div 
          variants={itemVariants}
          className="terminal-font text-lg md:text-xl mb-6 text-mint-green"
        >
          <span className="text-glacier-blue">$ </span>
          <span className="text-white">whoami</span>
        </motion.div>

        {/* Typewriter subtitle */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="terminal-font text-xl md:text-2xl lg:text-3xl text-white min-h-[2em] flex items-center justify-center">
            <span className="text-mint-green">→ </span>
            <span className={isTyping ? 'terminal-cursor' : ''}>{displayedText}</span>
          </div>
        </motion.div>

        {/* Tagline */}
        <motion.div variants={itemVariants} className="mb-12">
          <p className="text-lg md:text-xl text-gray-300 font-inter italic">
            "Building bridges between data, design and dreams."
          </p>
        </motion.div>

        {/* Action buttons */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="glass-intense px-8 py-4 text-white font-space font-medium glow-hover transition-all duration-300 min-w-[180px]"
          >
            About
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="glass-intense px-8 py-4 text-white font-space font-medium glow-hover transition-all duration-300 min-w-[180px]"
          >
            Projects
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="holo-border px-8 py-4 text-white font-space font-medium glow-hover transition-all duration-300 min-w-[180px] bg-deep-void"
          >
            Open Terminal
          </motion.button>
        </motion.div>

        {/* Konami code hint */}
        <motion.div 
          variants={itemVariants}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="terminal-font text-sm text-gray-500 opacity-60 hover:opacity-100 transition-opacity duration-300">
            <span className="text-glacier-blue">Hint:</span> ↑↑↓↓←→←→BA for a surprise
          </div>
        </motion.div>
      </motion.div>

      {/* Ambient glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-holo-cyan opacity-5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-holo-magenta opacity-5 rounded-full blur-3xl animate-pulse delay-1000" />
    </section>
  );
}