'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { easterEggs } from '@/utils/eastereggs'

interface TerminalLine {
  type: 'input' | 'output' | 'error'
  content: string
  timestamp: Date
}

interface TerminalShellProps {
  onClose: () => void
}

const initialLines: TerminalLine[] = [
  {
    type: 'output',
    content: 'Welcome to KhalidOS v2.0.1 - "The Matrix Edition"',
    timestamp: new Date()
  },
  {
    type: 'output',
    content: 'Type "help" for available commands',
    timestamp: new Date()
  },
  {
    type: 'output',
    content: 'Type "exit" to close terminal',
    timestamp: new Date()
  }
]

export default function TerminalShell({ onClose }: TerminalShellProps) {
  const [lines, setLines] = useState<TerminalLine[]>(initialLines)
  const [currentInput, setCurrentInput] = useState('')
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [lines])

  const addLine = (content: string, type: 'output' | 'error' = 'output') => {
    setLines(prev => [...prev, { type, content, timestamp: new Date() }])
  }

  const executeCommand = (command: string) => {
    const cmd = command.trim().toLowerCase()
    
    setLines(prev => [...prev, { 
      type: 'input', 
      content: `khalid@matrix:~$ ${command}`, 
      timestamp: new Date() 
    }])

    switch (cmd) {
      case 'help':
        addLine('Available commands:')
        addLine('  ls projects     - List available projects')
        addLine('  cat about.txt   - View about information')
        addLine('  sudo access /secret - Access secret files (requires auth)')
        addLine('  whoami         - Display current user')
        addLine('  date           - Show current date')
        addLine('  clear          - Clear terminal')
        addLine('  neofetch       - System information')
        addLine('  hack           - Try to hack the mainframe')
        addLine('  exit           - Close terminal')
        break

      case 'ls projects':
        addLine('total 8')
        addLine('drwxr-xr-x 2 khalid wheel  64 Oct  6 2024 data-engineering/')
        addLine('drwxr-xr-x 2 khalid wheel  64 Oct  6 2024 indie-games/')
        addLine('drwxr-xr-x 2 khalid wheel  64 Oct  6 2024 music-viz/')
        addLine('drwxr-xr-x 2 khalid wheel  64 Oct  6 2024 web-experiences/')
        addLine('')
        addLine('Click any project folder to explore: ')
        addLine('  <a href="/projects" class="text-cyan-400 underline hover:text-cyan-300">View All Projects →</a>')
        break

      case 'cat about.txt':
        addLine('Loading about.txt...')
        setTimeout(() => {
          addLine('')
          addLine('██╗  ██╗██╗  ██╗ █████╗ ██╗     ██╗██████╗')
          addLine('██║ ██╔╝██║  ██║██╔══██╗██║     ██║██╔══██╗')
          addLine('█████╔╝ ███████║███████║██║     ██║██║  ██║')
          addLine('██╔═██╗ ██╔══██║██╔══██║██║     ██║██║  ██║')
          addLine('██║  ██╗██║  ██║██║  ██║███████╗██║██████╔╝')
          addLine('╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚═╝╚═════╝')
          addLine('')
          addLine('Data Engineer & Creative Technologist')
          addLine('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
          addLine('> Building pipelines that process millions')
          addLine('> Creating games that inspire thousands')
          addLine('> Crafting experiences that last forever')
          addLine('')
          addLine('Status: Seeking new adventures in data engineering')
          addLine('Coffee consumption: HIGH')
          addLine('Currently listening to: Japanese jazz fusion')
          addLine('')
          addLine('More info: /about')
        }, 500)
        break

      case 'sudo access /secret':
        if (!isAuthenticated) {
          addLine('[sudo] password for khalid:', 'error')
          addLine('Enter password to access restricted files')
          addLine('Hint: Check the about page... 🤔')
        } else {
          addLine('Access granted! Triggering secret protocols...')
          easterEggs.triggerSecretAccess()
          setTimeout(() => {
            addLine('Secret files accessed successfully!')
            addLine('Visit /admin/0x1337 for the hidden vault')
          }, 2000)
        }
        break

      case 'k4l1d':
        if (lines[lines.length - 1]?.content.includes('password for khalid')) {
          setIsAuthenticated(true)
          addLine('Authentication successful!')
          addLine('Secret access enabled. Try "sudo access /secret" again.')
        } else {
          addLine('Command not found: k4l1d', 'error')
        }
        break

      case 'whoami':
        addLine('khalid')
        addLine('Data Engineer, Creative Technologist, and occasional wizard')
        break

      case 'date':
        addLine(new Date().toString())
        break

      case 'clear':
        setLines([])
        break

      case 'neofetch':
        addLine('                   -`                    khalid@matrix')
        addLine('                  .o+`                   ─────────────')
        addLine('                 `ooo/                   OS: KhalidOS x86_64')
        addLine('                `+oooo:                  Host: Creative Workstation')
        addLine('               `+oooooo:                 Kernel: 6.1.0-arch1-1')
        addLine('               -+oooooo+:                Uptime: 1337 days')
        addLine('             `/:-:++oooo+:               Packages: ∞')
        addLine('            `/++++/+++++++:              Shell: zsh 5.9')
        addLine('           `/++++++++++++++:             Resolution: 3440x1440')
        addLine('          `/+++ooooooooo+++/             WM: i3')
        addLine('         ./ooosssso++osssso+`            Theme: Dracula')
        addLine('        .oossssso-````/ossso+`           Icons: Dracula')
        addLine('       -osssssso.      :ssssso.          Terminal: kitty')
        addLine('      :osssssss/        osssso+-         CPU: Caffeine (8) @ 3.8GHz')
        addLine('     /ossssssss/        +ssssooo:        GPU: NVIDIA GeForce RTX 4080')
        addLine('   `/ossssso+/:-        -:/+osssso+-     Memory: 32GB DDR5')
        addLine('  `+sso+:-`                 `.-/+oso:')
        addLine(' `++:.                           `-/+/')
        addLine(' .`                                 `/')
        break

      case 'hack':
        addLine('Initializing hack sequence...')
        addLine('Target: mainframe.corporate.evil')
        addLine('Scanning for vulnerabilities...')
        setTimeout(() => {
          addLine('SQL injection attempt... FAILED')
          addLine('Buffer overflow attempt... FAILED')
          addLine('Social engineering... FAILED')
          addLine('')
          addLine('ERROR: Unable to hack mainframe')
          addLine('Reason: This is a portfolio site, not a hacking simulator! 😄')
          addLine('Try building something cool instead!')
        }, 2000)
        break

      case 'exit':
        onClose()
        break

      case '':
        break

      default:
        addLine(`Command not found: ${command}`, 'error')
        addLine('Type "help" for available commands')
    }

    setCommandHistory(prev => [...prev, command])
    setHistoryIndex(-1)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      executeCommand(currentInput)
      setCurrentInput('')
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1
        setHistoryIndex(newIndex)
        setCurrentInput(commandHistory[commandHistory.length - 1 - newIndex] || '')
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1
        setHistoryIndex(newIndex)
        setCurrentInput(commandHistory[commandHistory.length - 1 - newIndex] || '')
      } else if (historyIndex === 0) {
        setHistoryIndex(-1)
        setCurrentInput('')
      }
    } else if (e.key === 'Escape') {
      onClose()
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center p-4 z-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-black border-2 border-green-400 rounded-lg w-full max-w-4xl h-96 font-mono text-sm shadow-2xl shadow-green-400/20"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between bg-green-400 text-black px-4 py-2 rounded-t-lg">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <span className="font-bold">khalid@matrix: ~</span>
            <button
              onClick={onClose}
              className="text-black hover:text-red-600 font-bold"
            >
              ✕
            </button>
          </div>

          <div
            ref={terminalRef}
            className="p-4 h-80 overflow-y-auto text-green-400 bg-black"
          >
            {lines.map((line, index) => (
              <div
                key={index}
                className={`mb-1 ${
                  line.type === 'input' 
                    ? 'text-white' 
                    : line.type === 'error' 
                    ? 'text-red-400' 
                    : 'text-green-400'
                }`}
                dangerouslySetInnerHTML={{ __html: line.content }}
              />
            ))}
            
            <div className="flex items-center">
              <span className="text-cyan-400">khalid@matrix:~$ </span>
              <input
                ref={inputRef}
                type="text"
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent text-white outline-none ml-1"
                autoFocus
                spellCheck={false}
              />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}