import { TerminalOutput } from '@/types';
import { projects } from './projects-data';

/**
 * Terminal Commands Registry - All available commands
 * Following design.md specification with easter eggs
 */

export const terminalCommands = {
  help: {
    command: 'help',
    description: 'List all available commands',
    execute: (): TerminalOutput => ({
      type: 'text',
      content: `
Available commands:

  help                    Show this help message
  ls projects             List all project categories
  cat about.txt           Display information about Khalid
  whoami                  Show current user identity
  neofetch                Display system information
  show data-stack         Display data engineering tech stack
  cat ml-projects.json    Show machine learning projects
  nmap khalid.dev         Scan for open ports (easter egg)
  sudo make me a coffee   Make a coffee (easter egg) ☕
  unlock 0xC0FFEE         Activate ricing mode (easter egg)
  clear                   Clear the terminal
  history                 Show command history

Type any command to get started!
      `.trim(),
    }),
  },

  'ls projects': {
    command: 'ls projects',
    description: 'List all project categories',
    execute: (): TerminalOutput => {
      const categories = {
        'data-ai': projects.filter(p => p.category === 'data-ai').length,
        'games': projects.filter(p => p.category === 'games').length,
        'music': projects.filter(p => p.category === 'music').length,
        'design': projects.filter(p => p.category === 'design').length,
        'security': projects.filter(p => p.category === 'security').length,
      };

      return {
        type: 'text',
        content: `
📊 data-ai/        (${categories['data-ai']} projects)
🎮 games/          (${categories['games']} projects)
🎵 music/          (${categories['music']} projects)
🎨 design/         (${categories['design']} projects)
🔐 security/       (${categories['security']} projects)

Total: ${projects.length} projects
        `.trim(),
      };
    },
  },

  'cat about.txt': {
    command: 'cat about.txt',
    description: 'Display information about Khalid',
    execute: (): TerminalOutput => ({
      type: 'text',
      content: `
┌─────────────────────────────────────────────┐
│         Khalid Aourik - Data Engineer       │
└─────────────────────────────────────────────┘

PROFILE:
  Data Engineer & Creative Technologist
  Building scalable data pipelines by day
  Crafting indie games and music by night

CURRENT_ROLE:
  Data Engineer at Colonies
  Freelance Data & AI Consulting (EI)

EXPERTISE:
  • Data Engineering (Python, Spark, Airflow, dbt)
  • Machine Learning (PyTorch, TensorFlow)
  • Cloud Infrastructure (AWS, GCP, Kubernetes)
  • Creative Tech (Unity, Godot, Ableton Live)

ENVIRONMENT:
  OS: Arch Linux / macOS hybrid
  Editor: Neovim + tmux
  Shell: zsh + oh-my-zsh

UPTIME:
  12000+ hours coding
  50+ projects shipped
  ∞ coffee consumed ☕

INTERESTS:
  indie games, jazz fusion, city pop
  90s hip-hop, CTF challenges, terminal ricing

STATUS:
  Open to work | Remote-friendly 🚀
      `.trim(),
    }),
  },

  whoami: {
    command: 'whoami',
    description: 'Show current user identity',
    execute: (): TerminalOutput => ({
      type: 'success',
      content: 'guest@khalid.dev - Data Engineer & Creative Technologist',
    }),
  },

  neofetch: {
    command: 'neofetch',
    description: 'Display system information (neofetch style)',
    execute: (): TerminalOutput => ({
      type: 'text',
      content: `
       _,met$$$$$gg.          guest@khalid.dev
    ,g$$$$$$$$$$$$$$$P.       ─────────────────
  ,g$$P"     """Y$$.".        OS: Portfolio v2.0 (Next.js 15)
 ,$$P'              \`$$$.     Host: Netlify Edge
',$$P       ,ggs.     \`$$b:   Kernel: React 19 + TypeScript
\`d$$'     ,$P"'   .    $$$    Uptime: 12000+ hours
 $$P      d$'     ,    $$P    Shell: zsh + oh-my-zsh
 $$:      $$.   -    ,d$$'    Resolution: ∞x∞ (responsive)
 $$;      Y$b._   _,d$P'      DE: Framer Motion + Tailwind
 Y$$.    \`.Y8888gg_P"'        Theme: Cyberpunk Terminal
 \`$$b      "-.__              Icons: Lucide React
  \`Y$$                        Font: IBM Plex Mono
   \`Y$$.                      CPU: Coffee-driven (∞ cores)
     \`$$b.                    GPU: Three.js (RTX imagination)
       \`Y$$b.                 Memory: ∞ TB of ideas
          \`"Y$b._             Disk: Filled with data pipelines
              \`"""            

Current stack: Python, Spark, Airflow, dbt
Status: Open to work ☕🚀
      `.trim(),
    }),
  },

  'show data-stack': {
    command: 'show data-stack',
    description: 'Display data engineering tech stack',
    execute: (): TerminalOutput => ({
      type: 'text',
      content: `
╔═══════════════════════════════════════════════╗
║      DATA ENGINEERING TECH STACK              ║
╚═══════════════════════════════════════════════╝

🔹 LANGUAGES & CORE:
  Python          ████████████████░░  95%
  SQL             ██████████████████  98%
  Scala           ████████░░░░░░░░░░  45%
  Bash/Shell      ██████████████░░░░  75%

🔹 DATA PROCESSING:
  Apache Spark    ████████████████░░  90%
  Apache Airflow  ████████████████░░  92%
  dbt             ████████████████░░  88%
  Kafka           ████████████░░░░░░  70%

🔹 DATABASES:
  PostgreSQL      ██████████████████  95%
  BigQuery        ████████████████░░  85%
  Snowflake       ██████████████░░░░  80%
  Redis           ████████████░░░░░░  65%

🔹 CLOUD & INFRA:
  GCP             ████████████████░░  88%
  AWS             ██████████████░░░░  75%
  Docker          ████████████████░░  92%
  Kubernetes      ████████████░░░░░░  70%

🔹 ML & AI:
  PyTorch         ████████████████░░  85%
  TensorFlow      ██████████████░░░░  78%
  scikit-learn    ████████████████░░  90%
  LangChain       ████████████░░░░░░  65%

Total projects: 50+  |  Lines of code: 500K+
      `.trim(),
    }),
  },

  'cat ml-projects.json': {
    command: 'cat ml-projects.json',
    description: 'Show machine learning projects',
    execute: (): TerminalOutput => {
      const mlProjects = projects.filter(p => 
        p.category === 'data-ai' && 
        (p.tags.some(t => t.toLowerCase().includes('ml')) || 
         p.tags.some(t => t.toLowerCase().includes('ai')))
      );

      const projectsList = mlProjects.map(p => ({
        title: p.title,
        tags: p.tags.filter(t => t.toLowerCase().includes('ml') || 
                                t.toLowerCase().includes('ai') || 
                                t.toLowerCase().includes('pytorch') ||
                                t.toLowerCase().includes('tensorflow')),
        metrics: p.metrics || [],
        confidential: p.confidential || false,
      }));

      return {
        type: 'text',
        content: `
{
  "ml_projects": ${JSON.stringify(projectsList, null, 2)},
  "total_count": ${mlProjects.length},
  "note": "Some projects are under NDA 🔒"
}
        `.trim(),
      };
    },
  },

  'nmap khalid.dev': {
    command: 'nmap khalid.dev',
    description: 'Scan for open ports (easter egg)',
    execute: (): TerminalOutput => ({
      type: 'text',
      content: `
Starting Nmap scan on khalid.dev...

Host is up (0.0042s latency).
Not shown: 997 closed ports

PORT     STATE SERVICE
22/tcp   open  ssh         (Neovim remote editing)
80/tcp   open  http        (Portfolio site)
443/tcp  open  https       (Portfolio site - secure)
3000/tcp open  ppp         (Next.js dev server)
5432/tcp open  postgresql  (Database for data projects)
6379/tcp open  redis       (Cache for performance)
8080/tcp open  http-proxy  (Airflow webserver)
9000/tcp open  cslistener  (Jupyter notebooks)

Hidden services detected:
🎮 port 6969: Indie game dev server
🎵 port 4200: Music production studio
☕ port 2077: Coffee brewing API

Scan complete. Host appears to be a full-stack data engineer 🚀
      `.trim(),
    }),
  },

  'sudo make me a coffee': {
    command: 'sudo make me a coffee',
    description: 'Make a coffee (easter egg)',
    execute: (): TerminalOutput => ({
      type: 'text',
      content: `
[sudo] password for guest: 

Brewing coffee...
████████████████████████████████ 100%

        (  )   (   )  )
         ) (   )  (  (
         ( )  (    ) )
         _____________
        <_____________> ___
        |             |/ _ \\
        |   ☕ COFFEE  | | |
        |             |_| |
     ___|_____________|\\___/
    /    \\___________/    \\
    \\_____________________/

✓ Coffee brewed successfully!
✓ Caffeine levels: OPTIMAL
✓ Productivity boost: +9000%
✓ Bug-fixing ability: LEGENDARY

Warning: Developer now operates at 420 WPM 🚀
      `.trim(),
    }),
  },

  'unlock 0xC0FFEE': {
    command: 'unlock 0xC0FFEE',
    description: 'Activate ricing mode (easter egg)',
    execute: (): TerminalOutput => ({
      type: 'success',
      content: `
🔓 Unlocking secret mode...

Code: 0xC0FFEE verified ✓

╔════════════════════════════════════╗
║   RICING MODE ACTIVATED 🎨         ║
║   Arch Linux Powers: UNLEASHED     ║
╚════════════════════════════════════╝

Features unlocked:
  ✓ Terminal transparency: 85%
  ✓ CRT scanlines: ENABLED
  ✓ Neovim config: REVEALED
  ✓ i3wm rice: ACTIVATED
  ✓ Polybar themes: UNLOCKED
  ✓ Picom effects: MAX

You can now:
  - View dotfiles at github.com/khalid/dotfiles
  - Access terminal color schemes
  - Explore window manager configs
  - See custom Neovim setup

"I use Arch btw" badge: EQUIPPED 🐧

Enjoy the aesthetic!
      `.trim(),
    }),
  },

  clear: {
    command: 'clear',
    description: 'Clear the terminal',
    execute: (): TerminalOutput => ({
      type: 'clear',
      content: '',
    }),
  },
};

// Helper function to get command suggestions for autocomplete
export function getCommandSuggestions(partial: string): string[] {
  const allCommands = Object.keys(terminalCommands);
  return allCommands.filter(cmd => cmd.startsWith(partial.toLowerCase()));
}

// Helper function to format command output
export function formatCommandOutput(output: TerminalOutput): string {
  const colorMap = {
    text: '',
    success: '✓ ',
    error: '✗ ',
    component: '',
    clear: '',
  };

  const prefix = colorMap[output.type] || '';
  return typeof output.content === 'string' 
    ? `${prefix}${output.content}` 
    : output.content;
}
