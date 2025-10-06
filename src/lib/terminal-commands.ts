import { TerminalCommand, TerminalOutput } from '@/types';

/**
 * CommandProcessor - Manages terminal command registry and execution
 * 
 * Features:
 * - Command registration and lookup
 * - Argument parsing
 * - Command execution
 * - Help system
 */
export class CommandProcessor {
  private commands: Map<string, TerminalCommand> = new Map();

  constructor() {
    // Commands will be registered externally
  }

  /**
   * Register a command
   */
  registerCommand(name: string, command: TerminalCommand): void {
    this.commands.set(name.toLowerCase(), command);
  }

  /**
   * Register multiple commands at once
   */
  registerCommands(commands: Record<string, TerminalCommand>): void {
    Object.entries(commands).forEach(([name, command]) => {
      this.registerCommand(name, command);
    });
  }

  /**
   * Parse command string into command name and arguments
   */
  parseCommand(input: string): { command: string; args: string[] } {
    const trimmed = input.trim();
    const parts = trimmed.match(/(?:[^\s"]+|"[^"]*")+/g) || [];
    
    const command = parts[0]?.toLowerCase() || '';
    const args = parts.slice(1).map(arg => arg.replace(/^"|"$/g, ''));
    
    return { command, args };
  }

  /**
   * Execute a command
   */
  execute(input: string): TerminalOutput {
    const { command, args } = this.parseCommand(input);

    if (!command) {
      return {
        type: 'error',
        content: 'No command provided',
      };
    }

    const cmd = this.commands.get(command);

    if (!cmd) {
      return {
        type: 'error',
        content: this.getCommandNotFoundMessage(command),
      };
    }

    try {
      return cmd.execute(args);
    } catch (error) {
      return {
        type: 'error',
        content: `Error executing command: ${error instanceof Error ? error.message : 'Unknown error'}`,
      };
    }
  }

  /**
   * Get all registered commands
   */
  getAllCommands(): TerminalCommand[] {
    return Array.from(this.commands.values());
  }

  /**
   * Get command by name
   */
  getCommand(name: string): TerminalCommand | undefined {
    return this.commands.get(name.toLowerCase());
  }

  /**
   * Check if command exists
   */
  hasCommand(name: string): boolean {
    return this.commands.has(name.toLowerCase());
  }

  /**
   * Get witty command not found message
   */
  private getCommandNotFoundMessage(command: string): string {
    const messages = [
      `bash: ${command}: command not found. Did you mean to type something else?`,
      `${command}: command not found. Try 'help' to see available commands.`,
      `Error 404: Command '${command}' not found in this dimension.`,
      `${command}? Never heard of it. Type 'help' for actual commands.`,
      `Command '${command}' is not recognized. Are you from the future?`,
      `${command}: No such command. Maybe it's a secret? Try 'help' first.`,
    ];
    
    return messages[Math.floor(Math.random() * messages.length)];
  }

  /**
   * Generate help text for all commands
   */
  generateHelpText(): string {
    const commands = Array.from(this.commands.entries())
      .sort(([a], [b]) => a.localeCompare(b));

    let helpText = 'Available commands:\n\n';
    
    commands.forEach(([name, cmd]) => {
      helpText += `  ${name.padEnd(20)} ${cmd.description}\n`;
    });

    helpText += '\nTip: Use arrow keys to navigate command history.';
    
    return helpText;
  }
}

/**
 * Create and return a new CommandProcessor instance
 */
export const createCommandProcessor = (): CommandProcessor => {
  return new CommandProcessor();
};
