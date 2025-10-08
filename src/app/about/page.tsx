'use client'

import { motion } from 'framer-motion'

export default function About() {
  const asciiArt = `
██╗  ██╗██╗  ██╗ █████╗ ██╗     ██╗██████╗ 
██║ ██╔╝██║  ██║██╔══██╗██║     ██║██╔══██╗
█████╔╝ ███████║███████║██║     ██║██║  ██║
██╔═██╗ ██╔══██║██╔══██║██║     ██║██║  ██║
██║  ██╗██║  ██║██║  ██║███████╗██║██████╔╝
╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚═╝╚═════╝ 

Data Engineer & Creative Technologist
Building bridges between data and dreams
  `

  const bioText = `
Welcome, Neo...

I'm Khalid, a Data Engineer who believes that data tells stories, 
and the best stories are interactive. When I'm not building ETL 
pipelines or taming unruly datasets, you'll find me:

🎵 Vibing to Japanese jazz fusion and 90s hip-hop
🎮 Crafting indie games that question reality
🎨 Designing interfaces that feel like magic
🔒 Solving CTF challenges (h4ck th3 pl4n3t)
🗯️ Ricing my Arch setup (btw, I use Arch)

My stack spans from Python & Scala for data wizardry to React & 
Three.js for frontend sorcery. I've built ML pipelines that 
process terabytes, crafted visualizations that make CFOs weep 
with joy, and created games that make people question if they're 
still in Kansas.

Current status: Seeking the next adventure in data engineering, 
preferably one that involves building the Matrix (or at least 
something equally cool).

> type 'sudo access /secret' in the terminal for a surprise...
  `

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <pre className="text-xs md:text-sm mb-8 text-cyan-400">
          {asciiArt}
        </pre>
        
        <div className="space-y-6 text-sm md:text-base leading-relaxed">
          {bioText.split('\n').map((line, index) => (
            <motion.p
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={line.startsWith('>') ? 'text-yellow-400' : ''}
            >
              {line}
            </motion.p>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="mt-12 border border-green-600 p-4 rounded"
        >
          <h3 className="text-cyan-400 mb-4">{"// Skills & Technologies"}</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            <div>
              <h4 className="text-yellow-400">Data Engineering</h4>
              <ul className="mt-2 space-y-1">
                <li>• Python, Scala, SQL</li>
                <li>• Apache Spark, Kafka</li>
                <li>• dbt, Airflow</li>
                <li>• AWS, GCP, Azure</li>
              </ul>
            </div>
            <div>
              <h4 className="text-yellow-400">Frontend Sorcery</h4>
              <ul className="mt-2 space-y-1">
                <li>• React, Next.js, TypeScript</li>
                <li>• Three.js, WebGL</li>
                <li>• D3.js, Framer Motion</li>
                <li>• Tailwind, GSAP</li>
              </ul>
            </div>
            <div>
              <h4 className="text-yellow-400">Other Passions</h4>
              <ul className="mt-2 space-y-1">
                <li>• Game Development</li>
                <li>• Cybersecurity / CTF</li>
                <li>• Music Production</li>
                <li>• Linux Ricing</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}