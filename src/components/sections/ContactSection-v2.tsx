'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Music, MapPin, Clock, Mail } from 'lucide-react';
import ContactForm from '@/components/ContactForm';

/**
 * ContactSection v2 - Refined, professional design
 * 
 * Changes:
 * - Softer colors and gradients
 * - Better spacing
 * - More professional appearance
 * - Improved readability
 */

const socialLinks = [
  {
    name: 'GitHub',
    url: 'https://github.com/Al-khali',
    icon: Github,
    color: 'text-gray-300 hover:text-white',
    bg: 'bg-gray-800/30 hover:bg-gray-800/50',
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/khalid-aourik',
    icon: Linkedin,
    color: 'text-blue-400 hover:text-blue-300',
    bg: 'bg-blue-500/10 hover:bg-blue-500/20',
  },
  {
    name: 'SoundCloud',
    url: 'https://soundcloud.com/khalid',
    icon: Music,
    color: 'text-orange-400 hover:text-orange-300',
    bg: 'bg-orange-500/10 hover:bg-orange-500/20',
  },
];

const infoItems = [
  {
    icon: MapPin,
    label: 'Location',
    value: 'Europe 🇪🇺',
    color: 'text-cyan-400/80',
  },
  {
    icon: Clock,
    label: 'Response Time',
    value: '< 24h',
    color: 'text-green-400/80',
  },
  {
    icon: Mail,
    label: 'Work Status',
    value: 'Open to opportunities',
    color: 'text-purple-400/80',
  },
];

export default function ContactSection() {
  return (
    <section 
      id="contact" 
      className="relative py-32 px-6 overflow-hidden bg-black"
    >
      {/* Subtle grid */}
      <div 
        className="absolute inset-0 opacity-[0.015]" 
        style={{
          backgroundImage: 'linear-gradient(rgba(0,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} 
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-cyan-400/50 font-mono text-sm mb-4">$ cat contact.txt</p>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
            Get In <span className="text-cyan-400/80">Touch</span>
          </h2>
          <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto">
            Looking for a data engineer who can also build indie games? Let&apos;s talk!
          </p>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-white mb-6">Send a Message</h3>
            <ContactForm />
          </motion.div>

          {/* Info & Social */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Work Info */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Let&apos;s Collaborate</h3>
              <p className="text-gray-400 mb-6">
                Data Engineering, ML Engineering, freelance consulting
              </p>

              <div className="space-y-4">
                {infoItems.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10"
                  >
                    <div className={`p-2 rounded-lg bg-white/5 ${item.color}`}>
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">{item.label}</p>
                      <p className="font-semibold text-gray-200">{item.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-xl font-bold text-white mb-4">Connect</h4>
              <div className="space-y-3">
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + index * 0.05 }}
                    whileHover={{ x: 4, scale: 1.02 }}
                    className={`flex items-center gap-4 p-4 rounded-xl border border-white/10 
                      hover:border-white/20 transition-all ${link.bg}`}
                  >
                    <link.icon className={`w-6 h-6 ${link.color}`} />
                    <div>
                      <p className="font-semibold text-gray-200">{link.name}</p>
                      <p className="text-sm text-gray-500">
                        {link.name === 'GitHub' && 'Check out my code'}
                        {link.name === 'LinkedIn' && 'Connect professionally'}
                        {link.name === 'SoundCloud' && 'Listen to my beats'}
                      </p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Email CTA */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-6 rounded-xl bg-gradient-to-br from-cyan-500/5 to-purple-500/5 
                border border-white/10"
            >
              <p className="text-gray-400 mb-2">Or just email me directly at</p>
              <a 
                href="mailto:khalid@example.com" 
                className="text-cyan-400 hover:text-cyan-300 font-mono text-lg transition-colors"
              >
                khalid@example.com
              </a>
            </motion.div>

            {/* Easter egg */}
            <p className="text-center text-gray-700 text-sm font-mono">
              <span className="opacity-50">{'//'} Coffee-driven development ☕</span>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
