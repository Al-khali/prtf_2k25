'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TerminalHistory, TerminalOutput } from '@/types';
import { useTerminalHistory } from '@/hooks/useTerminalHistory';
import { useCommandAutocomplete } from '@/hooks/useCommandAutocomplete';
import { Terminal } from 'lucide-react';

export interface AITerminalProps {
  onCommand?: (command: string) => TerminalOutput;
  availableCommands?: string[];
  autoFocus?: boolean;
  className?: string;
  onClear?: () => void;
}

/**
 * Modern Bash Terminal - Interactive terminal with modern design
 * 
 * Features:
 * - Modern glass morphism design
 * - Command input with blinking cursor
 * - Scrollable output display
 * - Command history navigation (up/down arrows)
 * - Auto-complete suggestions
 * - Easter eggs (fastfetch, fzf, eva, etc.)
 * - Terminal-style aesthetics with modern touch
 */
export const AITerminal: React.FC<AITerminalProps> = ({
  onCommand,
  availableCommands = [],
  autoFocus = true,
  className = '',
  onClear,
}) => {
  const [input, setInput] = useState('');
  const [outputHistory, setOutputHistory] = useState<TerminalHistory[]>([]);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Use custom hooks for history and autocomplete
  const {
    addToHistory,
    navigateHistory,
    resetIndex,
  } = useTerminalHistory({ maxHistory: 50 });

  const {
    suggestions,
    currentSuggestion,
    getSuggestions,
    clearSuggestions,
  } = useCommandAutocomplete({ commands: availableCommands });

  // Auto-focus on mount
  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  // Auto-scroll to bottom when new output is added
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [outputHistory]);

  // Focus input when clicking anywhere in terminal
  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  // Clear terminal
  const handleClear = useCallback(() => {
    setOutputHistory([]);
    onClear?.();
  }, [onClear]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;

    const trimmedInput = input.trim();

    // Check if it's the clear command
    if (trimmedInput.toLowerCase() === 'clear') {
      handleClear();
      setInput('');
      resetIndex();
      clearSuggestions();
      return;
    }

    // Execute command
    const output = onCommand?.(trimmedInput) || {
      type: 'error' as const,
      content: 'Command processor not initialized',
    };

    // Add to history
    const newHistoryEntry: TerminalHistory = {
      command: trimmedInput,
      output,
      timestamp: new Date(),
    };

    setOutputHistory((prev) => [...prev, newHistoryEntry]);
    addToHistory(trimmedInput);
    setInput('');
    resetIndex();
    clearSuggestions();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
    
    // Get autocomplete suggestions
    if (value.trim()) {
      getSuggestions(value.trim());
    } else {
      clearSuggestions();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Navigate command history with up/down arrows
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const command = navigateHistory('up');
      if (command !== null) {
        setInput(command);
        clearSuggestions();
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const command = navigateHistory('down');
      if (command !== null) {
        setInput(command);
        clearSuggestions();
      }
    } else if (e.key === 'Tab' && currentSuggestion) {
      // Tab to autocomplete
      e.preventDefault();
      setInput(currentSuggestion);
      clearSuggestions();
    } else if (e.key === 'Escape') {
      // Escape to clear suggestions
      clearSuggestions();
    }
  };

  const getOutputColor = (type: TerminalOutput['type']) => {
    switch (type) {
      case 'success':
        return 'text-green-400';
      case 'error':
        return 'text-red-400';
      case 'component':
        return 'text-white';
      default:
        return 'text-gray-300';
    }
  };

  return (
    <div
      ref={terminalRef}
      onClick={handleTerminalClick}
      className={`relative w-full h-full min-h-[500px] bg-gradient-to-br from-gray-900 to-black rounded-xl border border-cyan-500/20 overflow-hidden font-mono shadow-2xl ${className}`}
    >
      {/* Modern Terminal Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-white/5 backdrop-blur-sm border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors cursor-pointer" />
            <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 transition-colors cursor-pointer" />
            <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 transition-colors cursor-pointer" />
          </div>
          <div className="flex items-center gap-2 ml-2">
            <Terminal className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-gray-400 font-medium">bash</span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span>khalid@portfolio</span>
          <span className="text-cyan-400">~</span>
        </div>
      </div>

      {/* Terminal Output */}
      <div
        ref={outputRef}
        className="h-[calc(100%-9rem)] overflow-y-auto px-4 py-4 space-y-3 scrollbar-thin scrollbar-thumb-cyan-500/20 scrollbar-track-transparent"
        role="log"
        aria-live="polite"
        aria-label="Terminal output"
      >
        {outputHistory.length === 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-gray-400 text-sm space-y-2"
          >
            <p className="text-cyan-400 font-semibold">Welcome to Khalid's Interactive Terminal</p>
            <p>Type <span className="text-green-400 font-semibold">help</span> to see available commands.</p>
            <p className="text-xs text-gray-500 mt-4">
              💡 Try: <span className="text-cyan-400">neofetch</span>, <span className="text-cyan-400">fastfetch</span>, <span className="text-cyan-400">ls</span>, <span className="text-cyan-400">whoami</span>
            </p>
          </motion.div>
        )}
        
        <AnimatePresence mode="popLayout">
          {outputHistory.map((entry, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-2"
            >
              {/* Command */}
              <div className="flex items-center gap-2">
                <span className="text-cyan-400 font-semibold">❯</span>
                <span className="text-white">{entry.command}</span>
              </div>
              
              {/* Output */}
              <div className={`pl-4 ${getOutputColor(entry.output.type)}`}>
                {typeof entry.output.content === 'string' ? (
                  <pre className="whitespace-pre-wrap font-mono text-sm leading-relaxed">
                    {entry.output.content}
                  </pre>
                ) : (
                  entry.output.content
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Terminal Input */}
      <div className="absolute bottom-0 left-0 right-0 bg-white/5 backdrop-blur-sm border-t border-white/10">
        {/* Autocomplete suggestions */}
        {suggestions.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            id="terminal-suggestions" 
            className="px-4 py-2 border-b border-white/10 text-xs text-gray-400 bg-white/5"
            role="status"
            aria-live="polite"
          >
            <span className="text-cyan-400 font-semibold">Suggestions:</span>{' '}
            {suggestions.slice(0, 5).map((cmd, i) => (
              <span key={cmd}>
                {i > 0 && ', '}
                <span className={cmd === currentSuggestion ? 'text-green-400 font-semibold' : 'text-gray-300'}>
                  {cmd}
                </span>
              </span>
            ))}
            {suggestions.length > 5 && ` +${suggestions.length - 5} more`}
            <span className="ml-2 text-gray-500">(Tab to complete)</span>
          </motion.div>
        )}
        
        <form onSubmit={handleSubmit} className="flex items-center gap-3 px-4 py-3">
          <span className="text-cyan-400 font-semibold" aria-hidden="true">❯</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-white outline-none font-mono text-sm placeholder:text-gray-500"
            placeholder="Type a command..."
            autoComplete="off"
            spellCheck={false}
            aria-label="Terminal command input"
            aria-describedby="terminal-suggestions"
          />
          {/* Blinking cursor */}
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
            className="w-2 h-4 bg-cyan-400 rounded-sm"
          />
        </form>
      </div>
    </div>
  );
};
