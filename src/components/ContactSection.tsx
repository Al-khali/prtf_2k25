'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const socialLinks = [
  {
    name: 'LinkedIn',
    icon: '💼',
    url: '#',
    description: 'Professional network & career updates'
  },
  {
    name: 'GitHub',
    icon: '🐙',
    url: '#',
    description: 'Code repositories & open source projects'
  },
  {
    name: 'SoundCloud',
    icon: '🎵',
    url: '#',
    description: 'Music production & audio experiments'
  },
  {
    name: 'Email',
    icon: '📧',
    url: 'mailto:khalid@example.com',
    description: 'Direct communication channel'
  }
];

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section className="min-h-screen py-20 px-4 flex items-center" id="contact">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-space font-bold holo-text mb-4">
            Connect & Collaborate
          </h2>
          <p className="text-xl text-gray-300 font-inter">
            Ready to build something extraordinary together?
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="glass-intense p-8 rounded-2xl">
              <h3 className="text-2xl font-space font-semibold text-white mb-6">
                Send a Message
              </h3>
              
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="text-6xl mb-4">✅</div>
                  <h4 className="text-xl font-space font-semibold text-mint-green mb-2">
                    Message Sent!
                  </h4>
                  <p className="text-gray-300">
                    Thanks for reaching out. I'll get back to you soon!
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-void-darker border border-glass-border rounded-lg text-white placeholder-gray-400 focus:border-holo-cyan focus:outline-none transition-colors duration-300"
                      placeholder="Your name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-void-darker border border-glass-border rounded-lg text-white placeholder-gray-400 focus:border-holo-cyan focus:outline-none transition-colors duration-300"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 bg-void-darker border border-glass-border rounded-lg text-white placeholder-gray-400 focus:border-holo-cyan focus:outline-none transition-colors duration-300 resize-none"
                      placeholder="Tell me about your project, ideas, or just say hello..."
                    />
                  </div>
                  
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full holo-border py-4 text-white font-space font-medium glow-hover transition-all duration-300 bg-deep-void disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 border-2 border-holo-cyan border-t-transparent rounded-full animate-spin"></div>
                        Sending...
                      </span>
                    ) : (
                      'Send Message'
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Social Links & Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            {/* Quick Info */}
            <div className="glass-intense p-8 rounded-2xl">
              <h3 className="text-2xl font-space font-semibold text-white mb-6">
                Let's Connect
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-mint-green to-glacier-blue flex items-center justify-center text-2xl">
                    🌍
                  </div>
                  <div>
                    <h4 className="font-space font-medium text-white">Location</h4>
                    <p className="text-gray-300 text-sm">France, Europe</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-holo-magenta to-holo-violet flex items-center justify-center text-2xl">
                    ⏰
                  </div>
                  <div>
                    <h4 className="font-space font-medium text-white">Availability</h4>
                    <p className="text-gray-300 text-sm">Open for consulting & collaboration</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-holo-cyan to-holo-gold flex items-center justify-center text-2xl">
                    ⚡
                  </div>
                  <div>
                    <h4 className="font-space font-medium text-white">Response Time</h4>
                    <p className="text-gray-300 text-sm">Usually within 24 hours</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="glass-intense p-8 rounded-2xl">
              <h3 className="text-xl font-space font-semibold text-white mb-6">
                Find Me Online
              </h3>
              
              <div className="space-y-4">
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, x: 10 }}
                    className="flex items-center gap-4 p-4 rounded-lg bg-void-darker hover:bg-void-lighter transition-all duration-300 group"
                  >
                    <div className="text-2xl group-hover:scale-110 transition-transform duration-300">
                      {link.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-space font-medium text-white group-hover:holo-text transition-all duration-300">
                        {link.name}
                      </h4>
                      <p className="text-gray-400 text-sm">{link.description}</p>
                    </div>
                    <div className="text-gray-400 group-hover:text-holo-cyan transition-colors duration-300">
                      →
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Terminal-style contact info */}
            <div className="glass-intense p-6 rounded-2xl terminal-font">
              <div className="text-mint-green mb-2">
                <span className="text-glacier-blue">$ </span>
                <span className="text-white">curl -X GET /contact/khalid</span>
              </div>
              <div className="text-gray-300 text-sm space-y-1">
                <div>Status: Available for hire</div>
                <div>Specialties: ["Data Engineering", "AI/ML", "Creative Tech"]</div>
                <div>Timezone: Europe/Paris (UTC+1)</div>
                <div>Preferred communication: Email, LinkedIn</div>
                <div>Coffee status: Always brewing ☕</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-16 pt-16 border-t border-gray-800"
        >
          <p className="text-gray-400 font-inter">
            Designed & Built by Khalid — Running on caffeine & Arch Linux
          </p>
          <div className="flex items-center justify-center gap-2 mt-4 text-sm text-gray-500">
            <span>Made with</span>
            <span className="text-red-400">❤️</span>
            <span>using Next.js, Three.js & lots of jazz music</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}