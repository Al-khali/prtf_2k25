import React, { useState, useEffect } from 'react';
import { TerminalCommand } from '@/types';
import { projects } from '@/lib/projects-data';

/**
 * Easter egg commands
 * Implements: sudo, unlock, nmap, show, cat ml-projects.json
 */

// Animated coffee component
const AnimatedCoffee: React.FC = () => {
  const [frame, setFrame] = useState(0);
  
  const frames = [
    '☕',
    '☕️',
    '🫖',
    '☕',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((prev) => (prev + 1) % frames.length);
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-2xl">
      {frames[frame]} Brewing your coffee...
    </div>
  );
};

export const createEasterEggCommands = (
  onRicingModeUnlock?: () => void
): Record<string, TerminalCommand> => {
  return {
    sudo: {
      command: 'sudo',
      description: 'Execute command as superuser',
      execute: (args) => {
        const subCommand = args.join(' ').toLowerCase();

        if (subCommand === 'make me a coffee' || subCommand === 'make me coffee') {
          return {
            type: 'component',
            content: (
              <div className="space-y-2">
                <AnimatedCoffee />
                <div className="text-[#00ff9f] mt-4">
                  <p>☕ Your coffee is ready!</p>
                  <p className="text-white/70 text-sm mt-2">
                    [sudo] password for khalid: ********
                  </p>
                  <p className="text-white/70 text-sm">
                    Brewing... Done! ✨
                  </p>
                  <p className="text-white/90 mt-2">
                    One perfectly crafted virtual coffee, served with a side of code.
                  </p>
                </div>
              </div>
            ),
          };
        }

        if (subCommand.startsWith('rm -rf')) {
          return {
            type: 'error',
            content: `Nice try! 😏 But I'm not letting you delete anything here.
This is a portfolio, not a production server.`,
          };
        }

        return {
          type: 'error',
          content: `sudo: ${args.join(' ')}: command not found
Try: sudo make me a coffee`,
        };
      },
    },

    unlock: {
      command: 'unlock',
      description: 'Unlock hidden features',
      execute: (args) => {
        if (args.length === 0) {
          return {
            type: 'text',
            content: `Usage: unlock <code>
Hint: The code is hexadecimal and smells like coffee... ☕`,
          };
        }

        const code = args[0].toLowerCase();

        if (code === '0xc0ffee') {
          onRicingModeUnlock?.();
          return {
            type: 'success',
            content: `🎉 ACCESS GRANTED! 🎉

╔═══════════════════════════════════════════════════════════╗
║           RICING MODE ACTIVATED                           ║
╚═══════════════════════════════════════════════════════════╝

You've unlocked the secret Ricing Mode!

Features unlocked:
✓ Enhanced visual effects
✓ Custom color schemes
✓ Advanced animations
✓ Secret project showcase
✓ Developer tools access

"Welcome to the matrix, Neo." 😎

Type 'show data-stack' to see hidden data technologies.`,
          };
        }

        return {
          type: 'error',
          content: `❌ Invalid code: ${code}
Access denied. Try again or type 'unlock' for a hint.`,
        };
      },
    },

    nmap: {
      command: 'nmap',
      description: 'Network mapper - scan ports',
      execute: (args) => {
        if (args.length === 0 || args[0] !== 'khalid.dev') {
          return {
            type: 'text',
            content: 'Usage: nmap khalid.dev',
          };
        }

        return {
          type: 'text',
          content: `Starting Nmap 7.94 ( https://nmap.org )
Nmap scan report for khalid.dev (192.168.1.42)
Host is up (0.00042s latency).

PORT      STATE    SERVICE       VERSION
22/tcp    open     ssh           OpenSSH 9.0
80/tcp    open     http          nginx 1.24.0
443/tcp   open     https         nginx 1.24.0
3000/tcp  open     node          Node.js Express
5432/tcp  filtered postgresql    
6379/tcp  filtered redis         
8080/tcp  open     http-proxy    
9000/tcp  open     sonarqube     
1337/tcp  open     ??? 🎮        Game Server
3141/tcp  open     ??? 🎵        Music Streaming
4200/tcp  open     ??? 📊        Analytics Dashboard
8888/tcp  open     ??? 🤖        ML Model API
31337/tcp open     ??? 🏴        Elite Hacker Port

Service detection performed. Please report any incorrect results.
Nmap done: 1 IP address (1 host up) scanned in 4.20 seconds

Note: Some ports are intentionally filtered for security. 🔒`,
        };
      },
    },

    show: {
      command: 'show',
      description: 'Display hidden information',
      execute: (args) => {
        if (args.length === 0) {
          return {
            type: 'text',
            content: `Usage: show <category>
Available categories:
  - data-stack    Show data engineering technologies
  - secrets       Show hidden easter eggs (if unlocked)`,
          };
        }

        const category = args[0].toLowerCase();

        if (category === 'data-stack') {
          return {
            type: 'component',
            content: (
              <div className="space-y-3">
                <div className="text-[#00ff9f] font-bold">📊 DATA ENGINEERING STACK</div>
                
                <div className="space-y-2 text-sm">
                  <div>
                    <div className="text-[#00d4ff]">▸ Data Orchestration</div>
                    <div className="pl-4 text-white/80">Apache Airflow, Prefect, Dagster</div>
                  </div>
                  
                  <div>
                    <div className="text-[#00d4ff]">▸ Data Transformation</div>
                    <div className="pl-4 text-white/80">dbt, SQL, Pandas, PySpark</div>
                  </div>
                  
                  <div>
                    <div className="text-[#00d4ff]">▸ Data Warehouses</div>
                    <div className="pl-4 text-white/80">BigQuery, Snowflake, Redshift, PostgreSQL</div>
                  </div>
                  
                  <div>
                    <div className="text-[#00d4ff]">▸ Streaming</div>
                    <div className="pl-4 text-white/80">Kafka, Spark Streaming, Flink</div>
                  </div>
                  
                  <div>
                    <div className="text-[#00d4ff]">▸ ML/AI</div>
                    <div className="pl-4 text-white/80">PyTorch, TensorFlow, scikit-learn, Hugging Face</div>
                  </div>
                  
                  <div>
                    <div className="text-[#00d4ff]">▸ Cloud Platforms</div>
                    <div className="pl-4 text-white/80">GCP, AWS, Azure</div>
                  </div>
                  
                  <div>
                    <div className="text-[#00d4ff]">▸ Visualization</div>
                    <div className="pl-4 text-white/80">Looker, Tableau, Metabase, D3.js</div>
                  </div>
                </div>

                <div className="text-white/60 text-xs mt-4">
                  💡 Tip: Try &apos;cat ml-projects.json&apos; to see ML projects
                </div>
              </div>
            ),
          };
        }

        return {
          type: 'error',
          content: `Unknown category: ${category}
Try: show data-stack`,
        };
      },
    },

    cat_ml: {
      command: 'cat',
      description: 'Display ML projects (hidden)',
      execute: (args) => {
        if (args[0]?.toLowerCase() === 'ml-projects.json') {
          const mlProjects = projects.filter(p => 
            p.category === 'data-ai' && 
            p.tags.some(tag => tag.toLowerCase().includes('ml') || tag.toLowerCase().includes('ai'))
          );

          const jsonOutput = {
            total: mlProjects.length,
            projects: mlProjects.map(p => ({
              id: p.id,
              title: p.title,
              description: p.description,
              tags: p.tags,
              metrics: p.metrics,
              featured: p.featured || false,
            })),
            metadata: {
              generated: new Date().toISOString(),
              version: '2.0',
              author: 'khalid',
            },
          };

          return {
            type: 'text',
            content: JSON.stringify(jsonOutput, null, 2),
          };
        }

        // This will be handled by the core cat command
        return {
          type: 'error',
          content: 'This should not be reached',
        };
      },
    },
  };
};
