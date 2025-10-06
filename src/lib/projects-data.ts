import { Project } from '@/types';

/**
 * Portfolio projects data
 * Comprehensive collection of projects across all categories
 */
export const projects: Project[] = [
  // Data/AI Projects
  {
    id: 'data-pipeline-optimization',
    title: 'Real-time Data Pipeline Optimization',
    description: 'Redesigned ETL pipeline reducing processing time by 60% using Apache Airflow and dbt. Handles 10M+ rows daily with improved reliability and cost efficiency.',
    category: 'data-ai',
    tags: ['Python', 'Airflow', 'dbt', 'BigQuery', 'Data Engineering'],
    image: '/images/projects/pipeline.jpg',
    metrics: [
      { label: 'Performance Gain', value: '60% faster' },
      { label: 'Data Volume', value: '10M+ rows/day' },
      { label: 'Cost Reduction', value: '40%' },
    ],
    featured: true,
    link: '/projects/data-pipeline-optimization',
  },
  {
    id: 'ml-recommendation-system',
    title: 'ML-Powered Recommendation Engine',
    description: 'Built collaborative filtering system with 94% accuracy using PyTorch and scikit-learn. Deployed on cloud infrastructure with <50ms latency.',
    category: 'data-ai',
    tags: ['Python', 'PyTorch', 'scikit-learn', 'ML', 'Data Science'],
    image: '/images/projects/ml-rec.jpg',
    metrics: [
      { label: 'Accuracy', value: '94%' },
      { label: 'Latency', value: '<50ms' },
      { label: 'User Engagement', value: '+35%' },
    ],
    featured: true,
    github: 'https://github.com/khalid/ml-rec-engine',
    link: '/projects/ml-recommendation-system',
  },
  {
    id: 'customer-churn-prediction',
    title: 'Customer Churn Prediction Model',
    description: 'Developed predictive model using XGBoost and feature engineering to identify at-risk customers. Achieved 89% precision with actionable insights.',
    category: 'data-ai',
    tags: ['Python', 'XGBoost', 'Pandas', 'Data Science', 'ML'],
    image: '/images/projects/churn.jpg',
    metrics: [
      { label: 'Precision', value: '89%' },
      { label: 'Recall', value: '85%' },
      { label: 'Retention Impact', value: '+22%' },
    ],
    link: '/projects/customer-churn-prediction',
  },
  {
    id: 'data-warehouse-modernization',
    title: 'Data Warehouse Modernization',
    description: 'Migrated legacy data warehouse to modern cloud architecture using BigQuery and dbt. Improved query performance by 10x and reduced costs by 50%.',
    category: 'data-ai',
    tags: ['BigQuery', 'dbt', 'SQL', 'Data Engineering', 'GCP'],
    image: '/images/projects/warehouse.jpg',
    metrics: [
      { label: 'Query Speed', value: '10x faster' },
      { label: 'Cost Savings', value: '50%' },
      { label: 'Data Volume', value: '5TB+' },
    ],
    link: '/projects/data-warehouse-modernization',
  },
  {
    id: 'nlp-sentiment-analysis',
    title: 'NLP Sentiment Analysis Platform',
    description: 'Built real-time sentiment analysis system using transformers and BERT. Processes 100K+ messages daily with multi-language support.',
    category: 'data-ai',
    tags: ['Python', 'Transformers', 'BERT', 'NLP', 'TensorFlow'],
    image: '/images/projects/nlp.jpg',
    metrics: [
      { label: 'Accuracy', value: '92%' },
      { label: 'Throughput', value: '100K+ msgs/day' },
      { label: 'Languages', value: '12' },
    ],
    github: 'https://github.com/khalid/nlp-sentiment',
    link: '/projects/nlp-sentiment-analysis',
  },
  {
    id: 'analytics-dashboard',
    title: 'Real-time Analytics Dashboard',
    description: 'Created interactive analytics dashboard with real-time data visualization. Built with React, D3.js, and WebSocket connections to data streams.',
    category: 'data-ai',
    tags: ['React', 'D3.js', 'Python', 'Data Visualization', 'WebSocket'],
    image: '/images/projects/dashboard.jpg',
    metrics: [
      { label: 'Update Latency', value: '<1s' },
      { label: 'Concurrent Users', value: '500+' },
      { label: 'Metrics Tracked', value: '50+' },
    ],
    link: '/projects/analytics-dashboard',
  },

  // Games Projects
  {
    id: 'neon-runner',
    title: 'Neon Runner',
    description: 'Cyberpunk endless runner game with procedural generation and synthwave aesthetics. Built with Unity and custom shaders.',
    category: 'games',
    tags: ['Unity', 'C#', 'Shaders', 'Game Dev', 'Procedural'],
    image: '/images/projects/neon-runner.jpg',
    featured: true,
    github: 'https://github.com/khalid/neon-runner',
    link: '/projects/neon-runner',
  },
  {
    id: 'pixel-dungeon',
    title: 'Pixel Dungeon Crawler',
    description: 'Roguelike dungeon crawler with pixel art aesthetics and procedural level generation. Features permadeath and strategic combat.',
    category: 'games',
    tags: ['Godot', 'GDScript', 'Pixel Art', 'Roguelike'],
    image: '/images/projects/dungeon.jpg',
    github: 'https://github.com/khalid/pixel-dungeon',
    link: '/projects/pixel-dungeon',
  },
  {
    id: 'rhythm-hacker',
    title: 'Rhythm Hacker',
    description: 'Music rhythm game with hacking theme. Sync your keystrokes to the beat to break through firewalls.',
    category: 'games',
    tags: ['JavaScript', 'Web Audio API', 'Canvas', 'Game Dev'],
    image: '/images/projects/rhythm.jpg',
    github: 'https://github.com/khalid/rhythm-hacker',
    link: '/projects/rhythm-hacker',
  },
  {
    id: 'voxel-builder',
    title: 'Voxel World Builder',
    description: 'Minecraft-inspired voxel engine with custom terrain generation and building mechanics. Optimized chunk rendering.',
    category: 'games',
    tags: ['Three.js', 'TypeScript', 'WebGL', 'Voxel'],
    image: '/images/projects/voxel.jpg',
    github: 'https://github.com/khalid/voxel-builder',
    link: '/projects/voxel-builder',
  },
  {
    id: 'terminal-quest',
    title: 'Terminal Quest',
    description: 'Text-based adventure game played entirely in the terminal. Features branching narratives and ASCII art.',
    category: 'games',
    tags: ['Python', 'CLI', 'Interactive Fiction', 'ASCII'],
    image: '/images/projects/terminal-quest.jpg',
    github: 'https://github.com/khalid/terminal-quest',
    link: '/projects/terminal-quest',
  },

  // Music Projects
  {
    id: 'beat-synthesizer',
    title: 'Web-based Beat Synthesizer',
    description: 'Browser-based music production tool with synthesizers, drum machines, and effects. Built with Tone.js and Web Audio API.',
    category: 'music',
    tags: ['Tone.js', 'Web Audio API', 'React', 'Music Production'],
    image: '/images/projects/synthesizer.jpg',
    featured: true,
    github: 'https://github.com/khalid/beat-synth',
    link: '/projects/beat-synthesizer',
  },
  {
    id: 'audio-visualizer',
    title: 'Real-time Audio Visualizer',
    description: 'Interactive audio visualizer with multiple visualization modes. Responds to frequency data with fluid animations.',
    category: 'music',
    tags: ['JavaScript', 'Canvas', 'Web Audio API', 'Shaders'],
    image: '/images/projects/visualizer.jpg',
    github: 'https://github.com/khalid/audio-viz',
    link: '/projects/audio-visualizer',
  },
  {
    id: 'lofi-generator',
    title: 'Lo-fi Beat Generator',
    description: 'AI-powered lo-fi hip-hop beat generator. Uses machine learning to create endless chill beats.',
    category: 'music',
    tags: ['Python', 'TensorFlow', 'Music ML', 'Generative'],
    image: '/images/projects/lofi.jpg',
    github: 'https://github.com/khalid/lofi-gen',
    link: '/projects/lofi-generator',
  },
  {
    id: 'midi-controller',
    title: 'Custom MIDI Controller',
    description: 'Hardware MIDI controller with custom firmware. Features touch-sensitive pads and rotary encoders.',
    category: 'music',
    tags: ['Arduino', 'C++', 'MIDI', 'Hardware'],
    image: '/images/projects/midi.jpg',
    link: '/projects/midi-controller',
  },
  {
    id: 'sample-library',
    title: 'Curated Sample Library',
    description: 'Collection of 500+ royalty-free samples for music production. Organized by genre and BPM.',
    category: 'music',
    tags: ['Audio Production', 'Sound Design', 'Samples'],
    image: '/images/projects/samples.jpg',
    link: '/projects/sample-library',
  },
  {
    id: 'chord-progression-tool',
    title: 'Chord Progression Generator',
    description: 'Interactive tool for generating and exploring chord progressions. Includes music theory suggestions.',
    category: 'music',
    tags: ['React', 'Music Theory', 'Web Audio API'],
    image: '/images/projects/chords.jpg',
    github: 'https://github.com/khalid/chord-tool',
    link: '/projects/chord-progression-tool',
  },
  {
    id: 'vinyl-collection',
    title: 'Digital Vinyl Collection',
    description: 'Web app for cataloging vinyl records with Discogs API integration. Features listening stats and recommendations.',
    category: 'music',
    tags: ['Next.js', 'TypeScript', 'API Integration', 'Database'],
    image: '/images/projects/vinyl.jpg',
    link: '/projects/vinyl-collection',
  },
  {
    id: 'jazz-improv-trainer',
    title: 'Jazz Improvisation Trainer',
    description: 'Practice tool for jazz musicians. Generates backing tracks and provides real-time feedback on improvisation.',
    category: 'music',
    tags: ['Python', 'Music ML', 'Audio Analysis', 'Education'],
    image: '/images/projects/jazz.jpg',
    link: '/projects/jazz-improv-trainer',
  },

  // Design Projects
  {
    id: 'design-system',
    title: 'Holographic Design System',
    description: 'Complete design system with glassmorphism components, holographic gradients, and animation library. Built with React and Tailwind.',
    category: 'design',
    tags: ['React', 'Tailwind', 'Design System', 'Storybook'],
    image: '/images/projects/design-system.jpg',
    featured: true,
    github: 'https://github.com/khalid/holo-design',
    link: '/projects/design-system',
  },
  {
    id: 'portfolio-v1',
    title: 'Portfolio v1.0',
    description: 'Previous iteration of personal portfolio with minimalist design and smooth animations.',
    category: 'design',
    tags: ['Next.js', 'Framer Motion', 'Design', 'Portfolio'],
    image: '/images/projects/portfolio-v1.jpg',
    link: '/projects/portfolio-v1',
  },
  {
    id: 'brand-identity',
    title: 'Personal Brand Identity',
    description: 'Complete brand identity including logo, color palette, typography, and visual guidelines.',
    category: 'design',
    tags: ['Branding', 'Figma', 'Visual Design', 'Identity'],
    image: '/images/projects/brand.jpg',
    link: '/projects/brand-identity',
  },
  {
    id: 'ui-experiments',
    title: 'UI/UX Experiments',
    description: 'Collection of experimental UI components and interactions. Exploring new design patterns and micro-interactions.',
    category: 'design',
    tags: ['React', 'Framer Motion', 'UI/UX', 'Experiments'],
    image: '/images/projects/ui-exp.jpg',
    github: 'https://github.com/khalid/ui-experiments',
    link: '/projects/ui-experiments',
  },
  {
    id: 'icon-pack',
    title: 'Cyberpunk Icon Pack',
    description: 'Set of 200+ icons with cyberpunk aesthetic. Available in SVG format with multiple styles.',
    category: 'design',
    tags: ['Icons', 'SVG', 'Design', 'Cyberpunk'],
    image: '/images/projects/icons.jpg',
    link: '/projects/icon-pack',
  },
  {
    id: 'motion-graphics',
    title: 'Motion Graphics Reel',
    description: 'Collection of motion graphics and animations created with After Effects and code.',
    category: 'design',
    tags: ['After Effects', 'Animation', 'Motion Design'],
    image: '/images/projects/motion.jpg',
    link: '/projects/motion-graphics',
  },

  // Security/CTF Projects
  {
    id: 'ctf-challenges',
    title: 'Custom CTF Challenges',
    description: 'Collection of capture-the-flag challenges covering web security, cryptography, and reverse engineering.',
    category: 'security',
    tags: ['Security', 'CTF', 'Python', 'Cryptography'],
    image: '/images/projects/ctf.jpg',
    github: 'https://github.com/khalid/ctf-challenges',
    link: '/projects/ctf-challenges',
  },
  {
    id: 'password-manager',
    title: 'Encrypted Password Manager',
    description: 'Command-line password manager with AES-256 encryption. Zero-knowledge architecture with local storage.',
    category: 'security',
    tags: ['Python', 'Cryptography', 'CLI', 'Security'],
    image: '/images/projects/password.jpg',
    github: 'https://github.com/khalid/pass-manager',
    link: '/projects/password-manager',
  },
  {
    id: 'network-scanner',
    title: 'Network Security Scanner',
    description: 'Tool for scanning networks and identifying vulnerabilities. Features port scanning and service detection.',
    category: 'security',
    tags: ['Python', 'Networking', 'Security', 'Pentesting'],
    image: '/images/projects/scanner.jpg',
    link: '/projects/network-scanner',
  },
  {
    id: 'steganography-tool',
    title: 'Steganography Tool',
    description: 'Hide messages in images using LSB steganography. Includes encryption for added security.',
    category: 'security',
    tags: ['Python', 'Cryptography', 'Steganography', 'PIL'],
    image: '/images/projects/stego.jpg',
    github: 'https://github.com/khalid/stego-tool',
    link: '/projects/steganography-tool',
  },
];

/**
 * Get all unique categories from projects
 */
export const getCategories = (): Array<{ id: Project['category']; label: string }> => {
  return [
    { id: 'data-ai', label: 'Data & AI' },
    { id: 'games', label: 'Games' },
    { id: 'music', label: 'Music' },
    { id: 'design', label: 'Design' },
    { id: 'security', label: 'Security' },
  ];
};

/**
 * Get projects by category
 */
export const getProjectsByCategory = (category: Project['category']): Project[] => {
  return projects.filter((project) => project.category === category);
};

/**
 * Get featured projects
 */
export const getFeaturedProjects = (): Project[] => {
  return projects.filter((project) => project.featured);
};

/**
 * Get project by ID
 */
export const getProjectById = (id: string): Project | undefined => {
  return projects.find((project) => project.id === id);
};

/**
 * Get all project tags
 */
export const getAllTags = (): string[] => {
  const tags = new Set<string>();
  projects.forEach((project) => {
    project.tags.forEach((tag) => tags.add(tag));
  });
  return Array.from(tags).sort();
};
