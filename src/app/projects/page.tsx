'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import ProjectCard from '@/components/ProjectCard'

const projects = [
  {
    id: 'data-pipeline',
    title: 'Real-time ETL Pipeline',
    category: 'Data/AI',
    description: 'Streaming data pipeline processing 10M+ events/day with Apache Kafka and Spark',
    tech: ['Python', 'Apache Spark', 'Kafka', 'PostgreSQL', 'Docker'],
    demo: 'data-viz',
    github: 'https://github.com/khalid/data-pipeline',
    featured: true
  },
  {
    id: 'neon-runner',
    title: 'Neon Runner',
    category: 'Indie Games',
    description: 'Cyberpunk endless runner built with Phaser.js and WebGL shaders',
    tech: ['JavaScript', 'Phaser.js', 'WebGL', 'GLSL'],
    demo: 'game',
    github: 'https://github.com/khalid/neon-runner',
    featured: true
  },
  {
    id: 'ml-viz',
    title: 'ML Model Explainer',
    category: 'Data/AI',
    description: 'Interactive visualizations for explaining machine learning model decisions',
    tech: ['React', 'D3.js', 'Python', 'scikit-learn', 'Flask'],
    demo: 'interactive',
    github: 'https://github.com/khalid/ml-viz',
    featured: false
  },
  {
    id: 'synthwave-player',
    title: 'Synthwave Music Player',
    category: 'Music',
    description: 'Retro music player with audio visualization and 80s aesthetics',
    tech: ['React', 'Web Audio API', 'Canvas', 'TypeScript'],
    demo: 'music',
    github: 'https://github.com/khalid/synthwave-player',
    featured: false
  },
  {
    id: 'arch-rice',
    title: 'Arch Linux Rice',
    category: 'Design',
    description: 'Minimalist Arch Linux desktop configuration with custom polybar and rofi',
    tech: ['i3wm', 'Polybar', 'Rofi', 'Zsh', 'Neovim'],
    demo: 'showcase',
    github: 'https://github.com/khalid/arch-dotfiles',
    featured: false
  },
  {
    id: 'ctf-writeups',
    title: 'CTF Writeups',
    category: 'Security',
    description: 'Collection of CTF challenges and writeups from various competitions',
    tech: ['Python', 'Binary Analysis', 'Cryptography', 'Web Security'],
    demo: 'docs',
    github: 'https://github.com/khalid/ctf-writeups',
    featured: false
  }
]

const categories = ['All', 'Data/AI', 'Indie Games', 'Music', 'Design', 'Security']

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [showFeatured, setShowFeatured] = useState(false)

  const filteredProjects = projects.filter(project => {
    const categoryMatch = selectedCategory === 'All' || project.category === selectedCategory
    const featuredMatch = !showFeatured || project.featured
    return categoryMatch && featuredMatch
  })

  return (
    <div className="min-h-screen bg-black text-green-400 p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold mb-4 text-cyan-400">~/projects</h1>
          <p className="text-lg">A collection of things I've built while caffeinated</p>
        </motion.div>

        <div className="mb-8 flex flex-wrap gap-4 items-center">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded border transition-colors ${
                  selectedCategory === category
                    ? 'bg-green-600 border-green-400 text-black'
                    : 'border-green-600 hover:bg-green-900'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showFeatured}
              onChange={(e) => setShowFeatured(e.target.checked)}
              className="rounded"
            />
            <span>Featured only</span>
          </label>
        </div>

        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
            />
          ))}
        </motion.div>

        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-xl text-yellow-400">No projects found for the selected filters</p>
            <p className="mt-2">Try adjusting your search criteria</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}