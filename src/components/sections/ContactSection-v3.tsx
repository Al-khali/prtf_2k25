'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Music, MapPin, Clock, Mail } from 'lucide-react';
import ContactForm from '@/components/ContactForm';

/**
 * ContactSection v3 - Ultra Clean Design
 * 
 * Simplified:
 * - Minimal card designs
 * - Reduced hover effects
 * - Clean typography
 * - Focus on contact information
 */

const socialLinks = [
  {
    name: 'GitHub',
    url: 'https://github.com/Al-khali',
    icon: Github,
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/khalid-aourik',
    icon: Linkedin,
  },
  {
    name: 'SoundCloud',
    url: 'https://soundcloud.com/khalid',
    icon: Music,
  },
];

const infoItems = [
  {
    icon: MapPin,
    label: 'Location',
    value: 'Europe',
  },
  {
    icon: Clock,
    label: 'Response',
    value: '< 24h',
  },
  {
    icon: Mail,
    label: 'Status',
    value: 'Open to work',
  },
];

export default function ContactSection() {
  return (
    <section 
      id="contact" 
      className="relative py-32 px-6 overflow-hidden bg-black"
    >
      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <p className="text-cyan-400/30 font-mono text-xs mb-3">$ cat contact.txt</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Get In Touch
          </h2>
          <p className="text-gray-500 text-base md:text-lg max-w-xl">
            Looking for a data engineer who can also build indie games? Let&apos;s talk!
          </p>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold text-white mb-4">Send a Message</h3>
            <ContactForm />
          </motion.div>

          {/* Info & Social */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Work Info */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Let&apos;s Collaborate</h3>
              <p className="text-gray-500 text-sm mb-6">
                Data Engineering, ML Engineering, freelance consulting
              </p>

              <div className="space-y-3">
                {infoItems.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/10"
                  >
                    <item.icon className="w-4 h-4 text-gray-600" />
                    <div>
                      <p className="text-xs text-gray-600">{item.label}</p>
                      <p className="text-sm font-medium text-gray-400">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-base font-semibold text-white mb-3">Connect</h4>
              <div className="space-y-2">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg border border-white/10 
                      hover:border-white/15 transition-colors"
                  >
                    <link.icon className="w-4 h-4 text-gray-600" />
                    <span className="text-sm font-medium text-gray-400">{link.name}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Email CTA */}
            <div className="p-4 rounded-lg bg-white/[0.02] border border-white/10">
              <p className="text-gray-600 text-xs mb-1">Or email directly</p>
              <a 
                href="mailto:khalid@example.com" 
                className="text-cyan-400/70 hover:text-cyan-400 font-mono text-sm transition-colors"
              >
                khalid@example.com
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
