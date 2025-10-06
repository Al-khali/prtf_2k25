import { notFound } from 'next/navigation'
import ProjectDetailClient from './ProjectDetailClient'

export function generateStaticParams() {
  return [
    { id: 'data-pipeline' },
    { id: 'neon-runner' },
    { id: 'ml-viz' },
    { id: 'synthwave-player' },
    { id: 'arch-rice' },
    { id: 'ctf-writeups' }
  ]
}

const projectDetails = {
  'data-pipeline': {
    title: 'Real-time ETL Pipeline',
    description: 'A high-throughput streaming data pipeline built to handle millions of events per day.',
    longDescription: `
This project demonstrates a complete real-time data processing pipeline using Apache Kafka for streaming,
Apache Spark for processing, and PostgreSQL for storage. The system is designed to handle high-volume
data ingestion with fault tolerance and exactly-once processing guarantees.

Key features:
- Real-time stream processing with sub-second latency
- Fault-tolerant architecture with automatic recovery
- Horizontal scaling capabilities
- Real-time monitoring and alerting
- Data quality validation and error handling
    `,
    tech: ['Python', 'Apache Spark', 'Kafka', 'PostgreSQL', 'Docker', 'Kubernetes'],
    github: 'https://github.com/khalid/data-pipeline',
    demo: 'data-viz',
    media: '/assets/images/data-pipeline.png'
  },
  'neon-runner': {
    title: 'Neon Runner',
    description: 'A cyberpunk-themed endless runner game with stunning visual effects.',
    longDescription: `
Neon Runner is an endless runner game set in a cyberpunk world. Built with Phaser.js and enhanced
with custom WebGL shaders, the game features dynamic lighting, particle effects, and procedural
level generation.

Game features:
- Procedural level generation
- Real-time lighting and shadows
- Particle effects system
- Power-ups and collectibles
- High score leaderboard
- Responsive controls for mobile and desktop
    `,
    tech: ['JavaScript', 'Phaser.js', 'WebGL', 'GLSL', 'Canvas API'],
    github: 'https://github.com/khalid/neon-runner',
    demo: 'game',
    media: '/assets/images/neon-runner.png'
  }
}

export default function ProjectDetail({ params }: { params: { id: string } }) {
  const project = projectDetails[params.id as keyof typeof projectDetails]

  if (!project) {
    notFound()
  }

  return <ProjectDetailClient project={project} />
}