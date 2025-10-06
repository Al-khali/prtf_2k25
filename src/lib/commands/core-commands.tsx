import React from 'react';
import { TerminalCommand } from '@/types';
import { projects, getCategories } from '@/lib/projects-data';

/**
 * Core terminal commands
 * Implements: ls, cat, whoami, help, clear, neofetch
 */

export const createCoreCommands = (
  onClear?: () => void,
  generateHelp?: () => string
): Record<string, TerminalCommand> => {
  return {
    help: {
      command: 'help',
      description: 'Display available commands',
      execute: () => ({
        type: 'success',
        content: generateHelp?.() || 'Help system not initialized',
      }),
    },

    clear: {
      command: 'clear',
      description: 'Clear terminal screen',
      execute: () => {
        onClear?.();
        return {
          type: 'success',
          content: '',
        };
      },
    },

    ls: {
      command: 'ls',
      description: 'List projects by category',
      execute: (args) => {
        if (args.length === 0 || args[0] !== 'projects') {
          return {
            type: 'text',
            content: 'Usage: ls projects\nLists all project categories and their projects.',
          };
        }

        const categories = getCategories();
        let output = 'Projects by category:\n\n';

        categories.forEach(({ id, label }) => {
          const categoryProjects = projects.filter(p => p.category === id);
          output += `📁 ${label} (${categoryProjects.length})\n`;
          categoryProjects.forEach(project => {
            const featured = project.featured ? ' ⭐' : '';
            output += `   └─ ${project.title}${featured}\n`;
          });
          output += '\n';
        });

        output += `Total: ${projects.length} projects`;

        return {
          type: 'text',
          content: output,
        };
      },
    },

    cat: {
      command: 'cat',
      description: 'Display file contents',
      execute: (args) => {
        if (args.length === 0) {
          return {
            type: 'error',
            content: 'Usage: cat <filename>\nAvailable files: about.txt',
          };
        }

        const filename = args[0].toLowerCase();

        if (filename === 'about.txt') {
          return {
            type: 'text',
            content: `╔════════════════════════════════════════════════════════════╗
║                        ABOUT.TXT                           ║
╚════════════════════════════════════════════════════════════╝

Name: Khalid
Role: Full-Stack Developer & Data Engineer
Status: Building cool stuff 🚀

I'm a developer who loves turning data into insights and ideas 
into interactive experiences. My work spans across:

• Data Engineering & Analytics
• Machine Learning & AI
• Game Development
• Music Production & Audio Tech
• Cybersecurity & CTF Challenges

When I'm not coding, you'll find me:
→ Making beats and exploring sound design
→ Solving CTF challenges
→ Experimenting with new technologies
→ Contributing to open source

Tech Stack:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Languages:  Python, TypeScript, JavaScript, SQL, C#
Data:       Airflow, dbt, BigQuery, Pandas, Spark
ML/AI:      PyTorch, TensorFlow, scikit-learn, Transformers
Web:        React, Next.js, Node.js, Tailwind CSS
Tools:      Git, Docker, Linux, AWS, GCP

"Code is poetry, data tells stories, and music is mathematics."

Type 'ls projects' to see my work or 'help' for more commands.`,
          };
        }

        return {
          type: 'error',
          content: `cat: ${filename}: No such file or directory\nTry: cat about.txt`,
        };
      },
    },

    whoami: {
      command: 'whoami',
      description: 'Display current user information',
      execute: () => ({
        type: 'success',
        content: `khalid

Full-Stack Developer & Data Engineer
Building at the intersection of data, code, and creativity.

🌐 Portfolio: khalid.dev
💼 Open to opportunities
🎯 Currently: Crafting data pipelines & interactive experiences

"Turning coffee into code since 2018"`,
      }),
    },

    neofetch: {
      command: 'neofetch',
      description: 'Display system information',
      execute: () => {
        const uptime = Math.floor((Date.now() - new Date('2018-01-01').getTime()) / (1000 * 60 * 60 * 24 * 365));
        
        return {
          type: 'component',
          content: (
            <div className="font-mono text-sm">
              <pre className="text-[#00ff9f]">{`
    ██╗  ██╗██╗  ██╗ █████╗ ██╗     ██╗██████╗ 
    ██║ ██╔╝██║  ██║██╔══██╗██║     ██║██╔══██╗
    █████╔╝ ███████║███████║██║     ██║██║  ██║
    ██╔═██╗ ██╔══██║██╔══██║██║     ██║██║  ██║
    ██║  ██╗██║  ██║██║  ██║███████╗██║██████╔╝
    ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚═╝╚═════╝ 
              `}</pre>
              <div className="mt-4 space-y-1 text-white/90">
                <div><span className="text-[#00ff9f]">OS:</span> Portfolio v2.0</div>
                <div><span className="text-[#00ff9f]">Host:</span> khalid.dev</div>
                <div><span className="text-[#00ff9f]">Kernel:</span> Next.js 14</div>
                <div><span className="text-[#00ff9f]">Uptime:</span> {uptime} years coding</div>
                <div><span className="text-[#00ff9f]">Shell:</span> zsh + oh-my-zsh</div>
                <div><span className="text-[#00ff9f]">Resolution:</span> 1920x1080 @ 144Hz</div>
                <div><span className="text-[#00ff9f]">DE:</span> Hyprland (btw I use Arch)</div>
                <div><span className="text-[#00ff9f]">Theme:</span> Cyberpunk Holographic</div>
                <div><span className="text-[#00ff9f]">Icons:</span> Custom Neon Pack</div>
                <div><span className="text-[#00ff9f]">Terminal:</span> Kitty</div>
                <div><span className="text-[#00ff9f]">CPU:</span> Coffee-powered Neural Network</div>
                <div><span className="text-[#00ff9f]">GPU:</span> Imagination Engine RTX</div>
                <div><span className="text-[#00ff9f]">Memory:</span> Unlimited creativity</div>
              </div>
            </div>
          ),
        };
      },
    },
  };
};
