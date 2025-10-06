import { useState, useCallback } from 'react';

export interface UseTerminalHistoryOptions {
  maxHistory?: number;
}

export interface UseTerminalHistoryReturn {
  history: string[];
  historyIndex: number;
  addToHistory: (command: string) => void;
  navigateHistory: (direction: 'up' | 'down') => string | null;
  clearHistory: () => void;
  resetIndex: () => void;
}

/**
 * Custom hook for managing terminal command history
 * 
 * Features:
 * - Store command history (max 50 by default)
 * - Navigate history with up/down arrows
 * - Clear history
 * - Reset navigation index
 */
export const useTerminalHistory = (
  options: UseTerminalHistoryOptions = {}
): UseTerminalHistoryReturn => {
  const { maxHistory = 50 } = options;

  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const addToHistory = useCallback(
    (command: string) => {
      if (!command.trim()) return;

      setHistory((prev) => {
        const newHistory = [...prev, command];
        // Keep only the last maxHistory commands
        return newHistory.slice(-maxHistory);
      });
      setHistoryIndex(-1);
    },
    [maxHistory]
  );

  const navigateHistory = useCallback(
    (direction: 'up' | 'down'): string | null => {
      if (history.length === 0) return null;

      if (direction === 'up') {
        const newIndex = historyIndex === -1 
          ? history.length - 1 
          : Math.max(0, historyIndex - 1);
        
        setHistoryIndex(newIndex);
        return history[newIndex];
      } else {
        // down
        if (historyIndex === -1) return null;

        const newIndex = historyIndex + 1;

        if (newIndex >= history.length) {
          setHistoryIndex(-1);
          return '';
        }

        setHistoryIndex(newIndex);
        return history[newIndex];
      }
    },
    [history, historyIndex]
  );

  const clearHistory = useCallback(() => {
    setHistory([]);
    setHistoryIndex(-1);
  }, []);

  const resetIndex = useCallback(() => {
    setHistoryIndex(-1);
  }, []);

  return {
    history,
    historyIndex,
    addToHistory,
    navigateHistory,
    clearHistory,
    resetIndex,
  };
};
