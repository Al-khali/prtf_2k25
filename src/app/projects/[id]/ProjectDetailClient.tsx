'use client'

import { motion } from 'framer-motion'
import DataVizDemo from '@/components/DataVizDemo'

interface Project {
  title: string
  description: string
  longDescription: string
  tech: string[]
  github: string
  demo: string
  media: string
}

interface ProjectDetailClientProps {
  project: Project
}

export default function ProjectDetailClient({ project }: ProjectDetailClientProps) {
  return (
    <div className="min-h-screen bg-black text-green-400 p-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-4 text-cyan-400">{project.title}</h1>
          <p className="text-lg text-gray-300">{project.description}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="bg-gray-900 border border-green-600 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-bold mb-4 text-yellow-400">Technologies Used</h2>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-green-600 text-black rounded-full text-sm font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="prose prose-invert max-w-none">
            <h2 className="text-xl font-bold mb-4 text-yellow-400">Project Overview</h2>
            <pre className="whitespace-pre-wrap text-gray-300 font-mono text-sm leading-relaxed">
              {project.longDescription}
            </pre>
          </div>
        </motion.div>

        {project.demo === 'data-viz' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-8"
          >
            <h2 className="text-xl font-bold mb-4 text-yellow-400">Live Demo</h2>
            <DataVizDemo />
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex gap-4"
        >
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-green-600 text-black rounded-lg font-bold hover:bg-green-500 transition-colors"
          >
            View on GitHub
          </a>
          <a
            href="/projects"
            className="px-6 py-3 border border-green-600 rounded-lg font-bold hover:bg-green-900 transition-colors"
          >
            Back to Projects
          </a>
        </motion.div>
      </div>
    </div>
  )
}