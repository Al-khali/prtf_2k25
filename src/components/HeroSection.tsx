'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

// Lazy load 3D components for better performance
const R3FScene = dynamic(() => import('./R3FScene'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#0a0a0f] to-[#0f0f1a]">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-cyan-500 blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-purple-500 blur-3xl animate-pulse" />
      </div>
    </div>
  ),
});

const ParticleField = dynamic(() => import('./ParticleField'), {
  ssr: false,
});

export default function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const handleNavigate = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#0a0a0f] to-[#0f0f1a]">
      {/* 3D Particle Field Background */}
      <R3FScene>
        <ParticleField count={8000} mouseInfluence={0.3} />
      </R3FScene>

      {/* Main content overlay */}
      <motion.div
        className="relative z-10 text-center px-4 max-w-5xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Modern Name Display */}
        <motion.div variants={itemVariants} className="mb-6">
          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
              KHALID
            </span>
          </h1>
        </motion.div>

        {/* Role Badge */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-6 py-3">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
            <span className="text-white font-mono text-sm md:text-base">
              Data Engineer & Creative Technologist
            </span>
          </div>
        </motion.div>

        {/* Subtitle */}
        <motion.div variants={itemVariants} className="mb-12">
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
            Turning data into insights, coffee into code, and ideas into reality ✨
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap gap-4 justify-center items-center mb-16"
        >
          <button
            onClick={() => handleNavigate('projects')}
            className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105"
          >
            View Projects
          </button>
          <button
            onClick={() => handleNavigate('about')}
            className="px-8 py-3 bg-white/5 backdrop-blur-sm border border-white/10 text-white font-semibold rounded-lg hover:bg-white/10 hover:border-white/20 transition-all duration-300"
          >
            About Me
          </button>
          <button
            onClick={() => handleNavigate('contact')}
            className="px-8 py-3 bg-white/5 backdrop-blur-sm border border-white/10 text-white font-semibold rounded-lg hover:bg-white/10 hover:border-white/20 transition-all duration-300"
          >
            Get in Touch
          </button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          variants={itemVariants}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2 text-gray-500 cursor-pointer"
            onClick={() => handleNavigate('about')}
          >
            <span className="text-xs font-mono">Scroll to explore</span>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Subtle gradient overlays */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500 opacity-[0.03] rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500 opacity-[0.03] rounded-full blur-3xl" />
      </div>
    </section>
  );
}