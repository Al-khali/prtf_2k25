'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

interface Project {
  id: string
  title: string
  category: string
  description: string
  tech: string[]
  demo: string
  github: string
  featured: boolean
}

interface ProjectCardProps {
  project: Project
  index: number
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const categoryColors = {
    'Data/AI': 'from-blue-500 to-cyan-500',
    'Indie Games': 'from-purple-500 to-pink-500',
    'Music': 'from-yellow-500 to-orange-500',
    'Design': 'from-green-500 to-teal-500',
    'Security': 'from-red-500 to-rose-500'
  }

  const demoIcons = {
    'data-viz': '📊',
    'game': '🎮',
    'interactive': '⚡',
    'music': '🎵',
    'showcase': '🎨',
    'docs': '📖'
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative group"
    >
      <div className="bg-gray-900 border border-green-600 rounded-lg p-6 h-full flex flex-col hover:border-cyan-400 transition-all duration-300">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">
              {demoIcons[project.demo as keyof typeof demoIcons] || '💻'}
            </span>
            {project.featured && (
              <span className="bg-yellow-500 text-black text-xs px-2 py-1 rounded-full font-bold">
                FEATURED
              </span>
            )}
          </div>
          <span className={`px-2 py-1 text-xs font-bold rounded-full bg-gradient-to-r ${
            categoryColors[project.category as keyof typeof categoryColors] || 'from-gray-500 to-gray-600'
          } text-white`}>
            {project.category}
          </span>
        </div>

        <h3 className="text-xl font-bold text-cyan-400 mb-2 group-hover:text-cyan-300 transition-colors">
          {project.title}
        </h3>

        <p className="text-gray-300 text-sm mb-4 flex-grow">
          {project.description}
        </p>

        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 bg-green-600 text-black text-xs rounded font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="flex gap-2 mt-auto">
          <Link
            href={`/projects/${project.id}`}
            className="flex-1 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-center rounded font-bold hover:from-cyan-400 hover:to-blue-400 transition-all duration-300 text-sm"
          >
            View Details
          </Link>
          
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 border border-green-600 text-green-400 rounded font-bold hover:bg-green-900 transition-all duration-300 text-sm"
          >
            GitHub
          </a>
        </div>

        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          animate={{
            background: isHovered 
              ? 'linear-gradient(135deg, rgba(6, 182, 212, 0.1), rgba(147, 51, 234, 0.1))'
              : 'transparent'
          }}
        />
      </div>
    </motion.div>
  )
}