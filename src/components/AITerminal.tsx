'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

interface TerminalEntry {
  type: 'input' | 'output' | 'system';
  content: string;
  timestamp?: string;
}

const easterEggCommands: Record<string, string[]> = {
  'ls projects': [
    'total 42',
    'drwxr-xr-x data-pipeline/',
    'drwxr-xr-x ai-content-gen/',
    'drwxr-xr-x neon-runner/',
    'drwxr-xr-x jazz-visualizer/',
    '-rw-r--r-- secret_project.tar.gz',
    '-rw-r--r-- .hidden_sauce'
  ],
  'cat about.txt': [
    'Name: Khalid',
    'Status: Caffeinated & Coding',
    'Favorite Language: Python (but TypeScript is growing on me)',
    'Current Obsession: Making data pipelines sing jazz',
    'Secret Talent: Can rice Arch Linux in under 30 minutes',
    'Coffee Consumption: ∞ cups/day',
    'Debugging Method: Rubber duck + lo-fi beats'
  ],
  'sudo make me a coffee': [
    '☕ Brewing coffee...',
    '[████████████████████] 100%',
    '✅ Coffee ready! Here\'s your virtual caffeine boost.',
    'Warning: Side effects may include increased productivity and better code.'
  ],
  'unlock 0xC0FFEE': [
    '🔓 Access granted to Ricing Mode!',
    'Loading Arch Linux aesthetic...',
    '[██████████] 100%',
    '🐧 Welcome to the beautiful terminal zone.',
    'Current rice: Minimalist Cyberpunk Theme',
    'Neovim config: ~/.config/nvim/',
    'Terminal: Alacritty + tmux',
    'WM: i3-gaps with polybar'
  ],
  'nmap khalid.dev': [
    'Starting Nmap scan...',
    'Interesting ports on khalid.dev:',
    'PORT     STATE SERVICE',
    '22/tcp   open  ssh',
    '80/tcp   open  http',
    '443/tcp  open  https',
    '1337/tcp open  ctf-portal',
    '3000/tcp open  node-dev',
    '8080/tcp open  music-server',
    'Scan complete. 6 ports scanned.'
  ],
  'whoami': [
    'khalid',
    'Data Engineer & Creative Technologist',
    'Builder of digital experiences',
    'Terminal rice connoisseur'
  ],
  'pwd': ['/home/khalid/portfolio'],
  'date': [new Date().toString()],
  'uname -a': [
    'KhalidOS 5.4.0-aesthetic #42-Ubuntu SMP Jazz+Fusion Arch x86_64 GNU/Linux'
  ],
  'ps aux | grep creativity': [
    'khalid   1337  0.0  5.0  data-pipeline  running',
    'khalid   2048  0.0  3.0  music-viz      active',
    'khalid   4096  0.0  8.0  indie-game     developing',
    'khalid   8192  0.0  ∞    coffee-daemon  always'
  ],
  'echo $CREATIVITY_LEVEL': ['Over 9000! 🚀'],
  'fortune': [
    '"The best way to predict the future is to invent it." - Alan Kay',
    '"Code is poetry written for machines and humans alike."',
    '"In jazz and in code, improvisation leads to innovation."',
    '"Sometimes the most elegant solution is also the most fun."'
  ]
};

export default function AITerminal() {
  const [entries, setEntries] = useState<TerminalEntry[]>([
    { type: 'system', content: 'Welcome to KhalidOS Terminal v2.1.0' },
    { type: 'system', content: 'Type "help" for available commands or try exploring...' }
  ]);
  const [currentInput, setCurrentInput] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [entries]);

  const addEntry = (type: TerminalEntry['type'], content: string) => {
    setEntries(prev => [...prev, { 
      type, 
      content, 
      timestamp: new Date().toLocaleTimeString() 
    }]);
  };

  const handleCommand = (command: string) => {
    addEntry('input', `$ ${command}`);
    
    const cmd = command.toLowerCase().trim();
    
    if (easterEggCommands[cmd]) {
      const responses = easterEggCommands[cmd];
      responses.forEach((response, index) => {
        setTimeout(() => {
          addEntry('output', response);
        }, index * 200);
      });
    } else if (cmd === 'help') {
      const helpText = [
        'Available commands:',
        '  ls projects     - List current projects',
        '  cat about.txt   - Display profile info',
        '  whoami          - Current user info',
        '  sudo make me a coffee - ☕ Emergency caffeine',
        '  unlock 0xC0FFEE - Access special mode',
        '  nmap khalid.dev - Port scan simulation',
        '  fortune         - Random wisdom',
        '  clear           - Clear terminal',
        '',
        'Easter eggs hidden throughout... 🥚'
      ];
      helpText.forEach((line, index) => {
        setTimeout(() => {
          addEntry('output', line);
        }, index * 100);
      });
    } else if (cmd === 'clear') {
      setEntries([]);
    } else if (cmd === '') {
      // Do nothing for empty command
    } else {
      setTimeout(() => {
        addEntry('output', `Command not found: ${command}`);
        addEntry('output', 'Try "help" for available commands.');
      }, 200);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (currentInput.trim()) {
        handleCommand(currentInput);
      }
      setCurrentInput('');
    }
  };

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <section className="min-h-screen py-20 px-4 flex items-center" id="terminal">
      <div className="max-w-4xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          onViewportEnter={() => setIsVisible(true)}
          className="text-center mb-12"
        >
          <h2 className="text-5xl md:text-6xl font-space font-bold holo-text mb-4">
            Interactive Shell
          </h2>
          <p className="text-xl text-gray-300 font-inter">
            Explore the system. Discover hidden features. Have fun.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glass-intense p-6 terminal-font"
          onClick={focusInput}
        >
          {/* Terminal header */}
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-700">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="text-gray-400 text-sm">
              khalid@khalid-os:~/portfolio
            </div>
          </div>

          {/* Terminal content */}
          <div 
            ref={terminalRef}
            className="h-96 overflow-y-auto space-y-1 text-sm"
          >
            {entries.map((entry, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className={`${
                  entry.type === 'input' 
                    ? 'text-white' 
                    : entry.type === 'system'
                    ? 'text-glacier-blue'
                    : 'text-mint-green'
                }`}
              >
                {entry.content}
              </motion.div>
            ))}

            {/* Current input line */}
            <div className="flex items-center text-white">
              <span className="text-glacier-blue mr-2">$</span>
              <input
                ref={inputRef}
                type="text"
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                onKeyPress={handleKeyPress}
                className="bg-transparent border-none outline-none flex-1 text-white terminal-cursor"
                placeholder="Type a command..."
                autoFocus={isVisible}
              />
            </div>
          </div>

          {/* Terminal footer */}
          <div className="mt-4 pt-4 border-t border-gray-700 text-xs text-gray-500">
            <div className="flex justify-between">
              <span>Interactive Terminal - Try typing "help"</span>
              <span>Press Enter to execute commands</span>
            </div>
          </div>
        </motion.div>

        {/* Quick command buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap gap-3 justify-center mt-8"
        >
          {['help', 'ls projects', 'whoami', 'sudo make me a coffee'].map((cmd) => (
            <motion.button
              key={cmd}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setCurrentInput(cmd);
                handleCommand(cmd);
                setCurrentInput('');
              }}
              className="glass px-4 py-2 text-sm terminal-font text-glacier-blue hover:text-white transition-colors duration-300"
            >
              {cmd}
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}