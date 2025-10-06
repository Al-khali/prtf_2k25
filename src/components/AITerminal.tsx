'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TerminalHistory, TerminalOutput } from '@/types';
import { useTerminalHistory } from '@/hooks/useTerminalHistory';
import { useCommandAutocomplete } from '@/hooks/useCommandAutocomplete';

export interface AITerminalProps {
  onCommand?: (command: string) => TerminalOutput;
  availableCommands?: string[];
  autoFocus?: boolean;
  className?: string;
  onClear?: () => void;
}

/**
 * AITerminal - Interactive terminal component with command input and output display
 * 
 * Features:
 * - Command input with blinking cursor
 * - Scrollable output display
 * - Command history navigation (up/down arrows)
 * - Auto-complete suggestions
 * - Auto-focus on mount
 * - Terminal-style aesthetics
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
        return 'text-[#00ff9f]';
      case 'error':
        return 'text-[#ff0055]';
      case 'component':
        return 'text-white';
      default:
        return 'text-[#00d4ff]';
    }
  };

  return (
    <div
      ref={terminalRef}
      onClick={handleTerminalClick}
      className={`relative w-full h-full min-h-[400px] bg-[#0a0b0d] rounded-xl border border-[#00ff9f]/20 overflow-hidden font-mono ${className}`}
    >
      {/* Terminal Header */}
      <div className="flex items-center gap-2 px-4 py-3 bg-[#0c0d10] border-b border-[#00ff9f]/20">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-[#ff0055]" />
          <div className="w-3 h-3 rounded-full bg-[#ffd700]" />
          <div className="w-3 h-3 rounded-full bg-[#00ff9f]" />
        </div>
        <span className="ml-4 text-sm text-[#00ff9f]/70">khalid@portfolio:~$</span>
      </div>

      {/* Terminal Output */}
      <div
        ref={outputRef}
        className="h-[calc(100%-8rem)] overflow-y-auto px-4 py-4 space-y-3 scrollbar-thin scrollbar-thumb-[#00ff9f]/20 scrollbar-track-transparent"
      >
        {outputHistory.length === 0 && (
          <div className="text-white/50 text-sm">
            <p>Welcome to Khalid's Interactive Terminal</p>
            <p className="mt-2">Type <span className="text-[#00ff9f]">help</span> to see available commands.</p>
          </div>
        )}
        
        <AnimatePresence mode="popLayout">
          {outputHistory.map((entry, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-1"
            >
              {/* Command */}
              <div className="flex items-center gap-2">
                <span className="text-[#00ff9f]">$</span>
                <span className="text-white">{entry.command}</span>
              </div>
              
              {/* Output */}
              <div className={`pl-4 ${getOutputColor(entry.output.type)}`}>
                {typeof entry.output.content === 'string' ? (
                  <pre className="whitespace-pre-wrap font-mono text-sm">
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
      <div className="absolute bottom-0 left-0 right-0 bg-[#0c0d10] border-t border-[#00ff9f]/20">
        {/* Autocomplete suggestions */}
        {suggestions.length > 0 && (
          <div className="px-4 py-2 border-b border-[#00ff9f]/10 text-xs text-white/50">
            Suggestions: {suggestions.slice(0, 5).map((cmd, i) => (
              <span key={cmd}>
                {i > 0 && ', '}
                <span className={cmd === currentSuggestion ? 'text-[#00ff9f]' : ''}>
                  {cmd}
                </span>
              </span>
            ))}
            {suggestions.length > 5 && ` +${suggestions.length - 5} more`}
            <span className="ml-2 text-white/30">(Tab to complete)</span>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="flex items-center gap-2 px-4 py-3">
          <span className="text-[#00ff9f]">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-white outline-none font-mono text-sm placeholder:text-white/30"
            placeholder="Type 'help' for available commands..."
            autoComplete="off"
            spellCheck={false}
          />
          {/* Blinking cursor */}
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
            className="w-2 h-4 bg-[#00ff9f]"
          />
        </form>
      </div>
    </div>
  );
};
