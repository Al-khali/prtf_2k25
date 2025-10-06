'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const categories = ['All', 'Data/AI', 'Indie Games', 'Music', 'Design', 'Security/CTF'];

const projects = [
  {
    id: 1,
    title: "Real-time Data Pipeline",
    description: "Scalable streaming data architecture processing 10M+ events/day",
    category: "Data/AI",
    tech: ["Python", "Apache Beam", "BigQuery", "GCP"],
    status: "Production",
    image: "🏗️",
    color: "from-blue-500 to-cyan-500"
  },
  {
    id: 2,
    title: "AI Content Generator",
    description: "GenAI platform for creating personalized content at scale",
    category: "Data/AI", 
    tech: ["OpenAI API", "LangChain", "FastAPI", "React"],
    status: "Active",
    image: "🤖",
    color: "from-purple-500 to-pink-500"
  },
  {
    id: 3,
    title: "Neon Runner",
    description: "Synthwave-inspired endless runner with procedural generation",
    category: "Indie Games",
    tech: ["Unity", "C#", "Blender", "Shader Graph"],
    status: "In Dev",
    image: "🎮",
    color: "from-pink-500 to-violet-500"
  },
  {
    id: 4,
    title: "Jazz Fusion Visualizer",
    description: "Real-time audio analysis with Three.js particle systems",
    category: "Music",
    tech: ["Three.js", "Web Audio API", "React", "TypeScript"],
    status: "Live",
    image: "🎵",
    color: "from-amber-500 to-orange-500"
  },
  {
    id: 5,
    title: "Arch Rice Collection",
    description: "Minimalist terminal setups with aesthetic workflows",
    category: "Design",
    tech: ["Arch Linux", "i3", "Polybar", "Neovim", "tmux"],
    status: "Ongoing",
    image: "🐧",
    color: "from-green-500 to-teal-500"
  },
  {
    id: 6,
    title: "CTF Writeups Portal",
    description: "Interactive cybersecurity challenge documentation",
    category: "Security/CTF",
    tech: ["Next.js", "MDX", "Docker", "Kali Linux"],
    status: "Active",
    image: "🔐",
    color: "from-red-500 to-pink-500"
  }
];

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  return (
    <section className="min-h-screen py-20 px-4" id="projects">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-space font-bold holo-text mb-4">
            Digital Workbench
          </h2>
          <p className="text-xl text-gray-300 font-inter">
            Where data meets creativity, and ideas become reality.
          </p>
        </motion.div>

        {/* Category filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-lg font-space font-medium transition-all duration-300 ${
                activeCategory === category
                  ? 'glass-intense text-white glow-cyan'
                  : 'glass text-gray-300 hover:text-white'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects grid */}
        <motion.div
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              className="glass-intense p-6 glow-hover cursor-pointer relative overflow-hidden group"
            >
              {/* Animated background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
              
              {/* Status indicator */}
              <div className="absolute top-4 right-4">
                <span className={`px-2 py-1 text-xs font-mono rounded ${
                  project.status === 'Production' || project.status === 'Live' 
                    ? 'bg-mint-green text-deep-void' 
                    : project.status === 'Active' || project.status === 'Ongoing'
                    ? 'bg-glacier-blue text-deep-void'
                    : 'bg-electric-purple text-deep-void'
                }`}>
                  {project.status}
                </span>
              </div>

              {/* Project icon */}
              <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                {project.image}
              </div>

              {/* Project info */}
              <h3 className="text-xl font-space font-semibold text-white mb-3 group-hover:holo-text transition-all duration-300">
                {project.title}
              </h3>
              
              <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                {project.description}
              </p>

              {/* Tech stack */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.slice(0, 3).map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 text-xs font-mono bg-void-lighter text-glacier-blue rounded"
                  >
                    {tech}
                  </span>
                ))}
                {project.tech.length > 3 && (
                  <span className="px-2 py-1 text-xs font-mono bg-void-lighter text-gray-400 rounded">
                    +{project.tech.length - 3}
                  </span>
                )}
              </div>

              {/* Hover overlay */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: hoveredProject === project.id ? 1 : 0,
                  y: hoveredProject === project.id ? 0 : 20
                }}
                className="absolute inset-0 bg-void-darker/90 backdrop-blur-sm p-6 flex flex-col justify-center"
              >
                <h4 className="text-lg font-space font-semibold text-white mb-2">
                  Full Tech Stack:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 text-xs font-mono bg-glass border border-glass-border text-white rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-6 glass-intense px-4 py-2 text-white font-space font-medium rounded-lg glow-hover"
                >
                  View Details →
                </motion.button>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-16"
        >
          <p className="text-lg text-gray-300 mb-6 font-inter">
            Interested in collaborating on the next big thing?
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="holo-border px-8 py-4 text-white font-space font-medium glow-hover transition-all duration-300 bg-deep-void"
          >
            Let's Build Something Amazing
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}