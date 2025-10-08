'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import ProjectCard from '@/components/ProjectCard'

// Import projects from centralized data
import { projects } from '@/lib/projects-data';
import type { Project } from '@/types';

const categories = ['All', 'Data & AI', 'Games', 'Music', 'Design', 'Security'];

// Map category names to match Project type
const categoryMap: Record<string, Project['category']> = {
  'All': 'data-ai', // This won't be used for filtering
  'Data & AI': 'data-ai',
  'Games': 'games',
  'Music': 'music',
  'Design': 'design',
  'Security': 'security',
};

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [showFeatured, setShowFeatured] = useState(false)

  const filteredProjects = projects.filter(project => {
    const categoryMatch = selectedCategory === 'All' || project.category === categoryMap[selectedCategory]
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
          <p className="text-lg">A collection of things I&apos;ve built while caffeinated</p>
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
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              imageUrl={project.image}
              title={project.title}
              description={project.description}
              tags={project.tags}
              projectUrl={project.link ?? project.github ?? '#'}
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