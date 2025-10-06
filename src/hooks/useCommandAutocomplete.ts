import { useState, useCallback, useMemo } from 'react';

export interface UseCommandAutocompleteOptions {
  commands: string[];
}

export interface UseCommandAutocompleteReturn {
  suggestions: string[];
  currentSuggestion: string | null;
  getSuggestions: (input: string) => string[];
  selectSuggestion: (suggestion: string) => void;
  clearSuggestions: () => void;
}

/**
 * Custom hook for command autocomplete functionality
 * 
 * Features:
 * - Get command suggestions based on input
 * - Filter commands by prefix
 * - Select suggestions
 */
export const useCommandAutocomplete = (
  options: UseCommandAutocompleteOptions
): UseCommandAutocompleteReturn => {
  const { commands } = options;

  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [currentSuggestion, setCurrentSuggestion] = useState<string | null>(null);

  const getSuggestions = useCallback(
    (input: string): string[] => {
      if (!input.trim()) {
        setSuggestions([]);
        setCurrentSuggestion(null);
        return [];
      }

      const trimmedInput = input.trim().toLowerCase();
      const matches = commands.filter((cmd) =>
        cmd.toLowerCase().startsWith(trimmedInput)
      );

      setSuggestions(matches);
      setCurrentSuggestion(matches.length > 0 ? matches[0] : null);
      return matches;
    },
    [commands]
  );

  const selectSuggestion = useCallback((suggestion: string) => {
    setCurrentSuggestion(suggestion);
  }, []);

  const clearSuggestions = useCallback(() => {
    setSuggestions([]);
    setCurrentSuggestion(null);
  }, []);

  return {
    suggestions,
    currentSuggestion,
    getSuggestions,
    selectSuggestion,
    clearSuggestions,
  };
};
