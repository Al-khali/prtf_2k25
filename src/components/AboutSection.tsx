'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const timelineEvents = [
  {
    timestamp: "2024-Present",
    event: "Data Engineer at Colonies",
    details: "Building scalable data infrastructure & AI solutions",
    status: "active"
  },
  {
    timestamp: "2023-Present", 
    event: "Freelance Consulting",
    details: "Data engineering & GenAI consulting via EI",
    status: "active"
  },
  {
    timestamp: "2022-2023",
    event: "Creative Technologist Journey",
    details: "Exploring intersection of data, design & indie games",
    status: "completed"
  },
  {
    timestamp: "2021-2022",
    event: "Arch Linux Rice Master",
    details: "Perfecting terminal-based development workflow",
    status: "completed"
  }
];

const techStack = [
  "Python", "TypeScript", "React", "Next.js", "BigQuery", "GCP",
  "Docker", "Kubernetes", "Apache Beam", "dbt", "Airflow",
  "Three.js", "Neovim", "tmux", "Arch Linux", "OpenAI API"
];

export default function AboutSection() {
  const [currentLog, setCurrentLog] = useState(0);
  const [bootSequence, setBootSequence] = useState(false);

  useEffect(() => {
    setBootSequence(true);
    const timer = setTimeout(() => setBootSequence(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="min-h-screen py-20 px-4" id="about">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-space font-bold holo-text mb-4">
            System Logbook
          </h2>
          <p className="text-xl text-gray-300 font-inter">
            A developer who sees data as art, and pipelines as rhythm.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Terminal-style system info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="glass p-8"
          >
            <div className="terminal-font">
              <div className="text-mint-green mb-4">
                <span className="text-glacier-blue">$ </span>
                <span className="text-white">cat ~/.profile</span>
              </div>
              
              {bootSequence && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-mint-green mb-4"
                >
                  <div>Booting profile: Khalid</div>
                  <div>Status: caffeinated ☕</div>
                  <div>Environment: Arch Linux / macOS hybrid</div>
                  <div>Uptime: 12000+ hours</div>
                  <div>---</div>
                </motion.div>
              )}

              <div className="space-y-2 text-gray-300">
                <div><span className="text-glacier-blue">Name:</span> Khalid</div>
                <div><span className="text-glacier-blue">Role:</span> Data Engineer & Creative Technologist</div>
                <div><span className="text-glacier-blue">Company:</span> Colonies + Freelance</div>
                <div><span className="text-glacier-blue">Location:</span> France</div>
                <div><span className="text-glacier-blue">Editor:</span> Neovim + tmux</div>
                <div><span className="text-glacier-blue">OS:</span> Arch Linux (riced to perfection)</div>
                <div><span className="text-glacier-blue">Interests:</span> Data, AI, Indie Games, Jazz Fusion, CTFs</div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-700">
                <div className="text-glacier-blue mb-2">Current Status:</div>
                <div className="text-white">
                  → Building data bridges between reality and imagination
                </div>
                <div className="text-white">
                  → Crafting AI solutions that feel like magic
                </div>
                <div className="text-white">
                  → Making terminals beautiful, one rice at a time
                </div>
              </div>
            </div>
          </motion.div>

          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-space font-semibold text-white mb-8">
              <span className="text-mint-green"># </span>Timeline
            </h3>
            
            {timelineEvents.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass p-6 glow-hover cursor-pointer"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-3 h-3 rounded-full mt-2 ${
                    event.status === 'active' ? 'bg-mint-green glow-cyan' : 'bg-gray-500'
                  }`} />
                  
                  <div className="flex-1">
                    <div className="terminal-font text-sm text-glacier-blue mb-1">
                      {event.timestamp}
                    </div>
                    <h4 className="font-space font-semibold text-white mb-2">
                      {event.event}
                    </h4>
                    <p className="text-gray-300 text-sm">
                      {event.details}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Tech stack */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-16"
        >
          <h3 className="text-2xl font-space font-semibold text-white mb-8 text-center">
            <span className="text-mint-green"># </span>Tech Arsenal
          </h3>
          
          <div className="flex flex-wrap gap-3 justify-center">
            {techStack.map((tech, index) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ scale: 1.1 }}
                className="glass px-4 py-2 text-sm font-mono text-white glow-hover"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-center mt-16"
        >
          <blockquote className="text-2xl md:text-3xl font-space font-light italic text-gray-300">
            "Sometimes, the best code is jazz."
          </blockquote>
        </motion.div>
      </div>
    </section>
  );
}