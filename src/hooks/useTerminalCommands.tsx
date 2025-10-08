import { useMemo, useCallback, useState } from 'react';
import { CommandProcessor } from '@/lib/terminal-commands';
import { createCoreCommands } from '@/lib/commands/core-commands';
import { createEasterEggCommands } from '@/lib/commands/easter-egg-commands';
import { TerminalOutput } from '@/types';

export interface UseTerminalCommandsReturn {
  executeCommand: (input: string) => TerminalOutput;
  availableCommands: string[];
  clearTerminal: () => void;
  ricingModeUnlocked: boolean;
}

/**
 * Custom hook for managing terminal commands
 * 
 * Features:
 * - Initialize CommandProcessor with all commands
 * - Execute commands
 * - Get list of available commands
 * - Handle special states (ricing mode, etc.)
 */
export const useTerminalCommands = (): UseTerminalCommandsReturn => {
  const [ricingModeUnlocked, setRicingModeUnlocked] = useState(false);
  const [, setClearTrigger] = useState(0);

  const processor = useMemo(() => {
    const proc = new CommandProcessor();

    // Callback for clearing terminal
    const handleClear = () => {
      setClearTrigger((prev) => prev + 1);
    };

    // Callback for unlocking ricing mode
    const handleRicingModeUnlock = () => {
      setRicingModeUnlocked(true);
    };

    // Generate help text
    const generateHelp = () => proc.generateHelpText();

    // Register core commands
    const coreCommands = createCoreCommands(handleClear, generateHelp);
    proc.registerCommands(coreCommands);

    // Register easter egg commands
    const easterEggCommands = createEasterEggCommands(handleRicingModeUnlock);
    proc.registerCommands(easterEggCommands);

    return proc;
  }, []);

  const executeCommand = useCallback(
    (input: string): TerminalOutput => {
      return processor.execute(input);
    },
    [processor]
  );

  const availableCommands = useMemo(() => {
    return processor.getAllCommands().map((cmd) => cmd.command);
  }, [processor]);

  const clearTerminal = useCallback(() => {
    setClearTrigger((prev) => prev + 1);
  }, []);

  return {
    executeCommand,
    availableCommands,
    clearTerminal,
    ricingModeUnlocked,
  };
};
