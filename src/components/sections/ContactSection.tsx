'use client';

import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Music, MapPin, Coffee } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import ContactForm from '@/components/ContactForm';

/**
 * ContactSection - Professional contact section with form and social links
 * 
 * Features from design.md:
 * - ContactForm with validation (zod schema)
 * - SocialLinks with hover glow effects
 * - GlassPanel container for visual consistency
 * - Toast notifications for success/error
 * - Netlify Forms integration (via existing ContactForm)
 * - Responsive layout with glass morphism
 */

interface SocialLinkData {
  platform: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  color: string;
}

const socialLinks: SocialLinkData[] = [
  {
    platform: 'GitHub',
    url: 'https://github.com/Al-khali',
    icon: Github,
    label: 'Check out my code',
    color: 'from-gray-400 to-gray-600',
  },
  {
    platform: 'LinkedIn',
    url: 'https://linkedin.com/in/khalid-aourik',
    icon: Linkedin,
    label: 'Connect professionally',
    color: 'from-blue-400 to-blue-600',
  },
  {
    platform: 'SoundCloud',
    url: 'https://soundcloud.com/khalid',
    icon: Music,
    label: 'Listen to my beats',
    color: 'from-orange-400 to-orange-600',
  },
];

export default function ContactSection() {
  return (
    <section 
      id="contact" 
      className="relative min-h-screen py-20 px-4 overflow-hidden bg-gradient-to-b from-black via-gray-900 to-black"
    >
      {/* Grid background */}
      <div 
        className="absolute inset-0 opacity-[0.02]" 
        style={{
          backgroundImage: 'linear-gradient(rgba(0,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} 
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <div className="inline-block mb-4">
            <span className="text-sm font-mono text-terminal-green bg-terminal-green/10 px-4 py-2 rounded-full border border-terminal-green/30">
              $ cat contact.txt
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Get In <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">Touch</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Looking for a data engineer who can also build indie games? Let&apos;s talk! ☕
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Left: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <GlassCard className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <Mail className="w-6 h-6 text-cyan-400" />
                <h3 className="text-2xl font-bold text-white">Send a Message</h3>
              </div>
              <ContactForm />
            </GlassCard>
          </motion.div>

          {/* Right: Info & Social Links */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-8"
          >
            {/* Info Card */}
            <GlassCard className="p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Let&apos;s Collaborate</h3>
              <div className="space-y-4 text-gray-300">
                <div className="flex items-start gap-3">
                  <Coffee className="w-5 h-5 text-cyan-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-white mb-1">Open to Work</p>
                    <p className="text-sm">Data Engineering, ML Engineering, freelance consulting</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-cyan-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-white mb-1">Location</p>
                    <p className="text-sm">Remote-friendly, based in Europe 🇪🇺</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-cyan-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-white mb-1">Response Time</p>
                    <p className="text-sm">Usually within 24 hours ⚡</p>
                  </div>
                </div>
              </div>
            </GlassCard>

            {/* Social Links */}
            <GlassCard className="p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Connect</h3>
              <div className="space-y-4">
                {socialLinks.map((link) => (
                  <SocialLinkItem key={link.platform} {...link} />
                ))}
              </div>
            </GlassCard>

            {/* Fun Fact */}
            <div className="text-center">
              <div className="inline-block px-6 py-3 glass-panel rounded-lg border border-cyan-500/30">
                <p className="text-gray-300 font-mono text-sm">
                  <span className="text-cyan-400">$</span> echo &quot;Coffee-driven development&quot; ☕
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-400 text-lg">
            Or just email me directly at{' '}
            <a 
              href="mailto:khalid@example.com" 
              className="text-cyan-400 hover:text-cyan-300 transition-colors underline"
            >
              khalid@example.com
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/**
 * SocialLinkItem - Individual social link with hover glow
 */
function SocialLinkItem({ platform, url, icon: Icon, label, color }: SocialLinkData) {
  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ x: 5, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="group relative flex items-center gap-4 p-4 rounded-lg bg-white/5 border border-white/10 
        hover:border-white/30 hover:bg-white/10 transition-all duration-300"
    >
      {/* Icon with gradient */}
      <div className={`p-3 rounded-lg bg-gradient-to-br ${color} bg-opacity-20`}>
        <Icon className="w-6 h-6 text-white" />
      </div>

      {/* Text */}
      <div className="flex-1">
        <h4 className="font-semibold text-white group-hover:text-cyan-400 transition-colors">
          {platform}
        </h4>
        <p className="text-sm text-gray-400">{label}</p>
      </div>

      {/* Arrow indicator */}
      <svg 
        className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-all duration-300 
          group-hover:translate-x-1" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>

      {/* Hover glow */}
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        className={`absolute inset-0 bg-gradient-to-r ${color} opacity-10 rounded-lg blur-xl -z-10`}
        transition={{ duration: 0.3 }}
      />
    </motion.a>
  );
}
