'use client';

import { motion } from 'framer-motion';
import { GlassCard } from './ui/GlassCard';
import ContactForm from './ContactForm';
import SocialLinks from './SocialLinks';

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
    },
  },
};

const headingVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

const contentVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      delay: 0.2,
      ease: 'easeOut',
    },
  },
};

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="relative min-h-screen py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent pointer-events-none" />
      
      {/* Animated background orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-magenta-500/10 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="relative max-w-4xl mx-auto">
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Section heading */}
          <motion.div variants={headingVariants} className="text-center mb-16">
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-sm font-mono text-pink-400">// Contact</span>
            </motion.div>
            
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-500 to-cyan-600">
                Let's Connect
              </span>
            </h2>
            
            <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
              Have a project in mind or just want to chat about data, AI, or indie games?
              <br />
              Drop me a message and let's build something amazing together.
            </p>
          </motion.div>

          {/* Main content card */}
          <motion.div variants={contentVariants}>
            <GlassCard className="p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-12">
                {/* Left column - Form */}
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Send a Message</h3>
                  <p className="text-white/60 mb-6">
                    Fill out the form and I&apos;ll get back to you within 24 hours.
                  </p>
                  <ContactForm />
                </div>

                {/* Right column - Social links and info */}
                <div className="space-y-8">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">Connect</h3>
                    <p className="text-white/60 mb-6">
                      Find me on these platforms or reach out directly.
                    </p>
                    <SocialLinks />
                  </div>

                  {/* Additional info */}
                  <div className="pt-8 border-t border-white/10">
                    <h4 className="text-lg font-semibold text-cyan-300 mb-3">
                      What I&apos;m Looking For
                    </h4>
                    <ul className="space-y-2 text-white/70">
                      <li className="flex items-start gap-2">
                        <span className="text-cyan-400 mt-1">→</span>
                        <span>Data engineering & pipeline architecture projects</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-cyan-400 mt-1">→</span>
                        <span>ML/AI implementation and consulting</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-cyan-400 mt-1">→</span>
                        <span>Creative collaborations in music & game dev</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-cyan-400 mt-1">→</span>
                        <span>Open source contributions</span>
                      </li>
                    </ul>
                  </div>

                  {/* Fun fact */}
                  <div className="pt-8 border-t border-white/10">
                    <div className="bg-gradient-to-r from-cyan-500/10 to-magenta-500/10 border border-cyan-500/20 rounded-lg p-4">
                      <p className="text-sm text-white/80 font-mono">
                        <span className="text-cyan-400">$</span> cat fun_fact.txt
                      </p>
                      <p className="text-sm text-white/60 mt-2">
                        I&apos;m usually online late at night (EST), fueled by coffee and lo-fi beats. 
                        Best time to catch me for a quick chat!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* Footer */}
          <motion.footer
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 text-center"
          >
            <div className="inline-block px-6 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full">
              <p className="text-sm text-white/60 font-mono">
                Designed & Built by <span className="text-cyan-400">Khalid</span> — Running on{' '}
                <span className="text-magenta-400">caffeine</span> &{' '}
                <span className="text-violet-400">Arch Linux</span>
              </p>
            </div>

            {/* Copyright */}
            <p className="mt-6 text-xs text-white/40">
              © {new Date().getFullYear()} Khalid. All rights reserved.
            </p>
          </motion.footer>
        </motion.div>
      </div>
    </section>
  );
}
