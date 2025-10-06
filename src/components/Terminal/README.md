# Terminal Component

Interactive terminal component with command processing, history navigation, and autocomplete.

## Features

- ✅ Command input with blinking cursor
- ✅ Scrollable output display
- ✅ Command history navigation (up/down arrows)
- ✅ Auto-complete suggestions (Tab to complete)
- ✅ Command registry system
- ✅ Easter egg commands
- ✅ Dark terminal aesthetic
- ✅ Auto-focus on section view

## Usage

### Basic Usage

```tsx
import { TerminalSection } from '@/components/Terminal';

export default function Page() {
  return <TerminalSection />;
}
```

### Available Commands

#### Core Commands
- `help` - Display available commands
- `clear` - Clear terminal screen
- `ls projects` - List all projects by category
- `cat about.txt` - Display about information
- `whoami` - Show user information
- `neofetch` - Display system information

#### Easter Egg Commands
- `sudo make me a coffee` - Animated coffee brewing
- `unlock 0xC0FFEE` - Unlock Ricing Mode
- `nmap khalid.dev` - Show open ports
- `show data-stack` - Display data technologies
- `cat ml-projects.json` - Show ML projects in JSON format

## Components

### TerminalSection
Main section component that includes the terminal with all commands configured.

### AITerminal
Core terminal component with input/output functionality.

**Props:**
- `onCommand?: (command: string) => TerminalOutput` - Command execution handler
- `availableCommands?: string[]` - List of available commands for autocomplete
- `autoFocus?: boolean` - Auto-focus input on mount (default: true)
- `className?: string` - Additional CSS classes
- `onClear?: () => void` - Clear callback

## Hooks

### useTerminalCommands
Manages command processor and execution.

```tsx
const { executeCommand, availableCommands, ricingModeUnlocked } = useTerminalCommands();
```

### useTerminalHistory
Manages command history navigation.

```tsx
const { addToHistory, navigateHistory, clearHistory } = useTerminalHistory({ maxHistory: 50 });
```

### useCommandAutocomplete
Provides autocomplete functionality.

```tsx
const { suggestions, currentSuggestion, getSuggestions } = useCommandAutocomplete({ commands });
```

## Adding New Commands

To add new commands, create them in `src/lib/commands/` and register them in `useTerminalCommands`:

```tsx
const myCommand: TerminalCommand = {
  command: 'mycommand',
  description: 'My custom command',
  execute: (args) => ({
    type: 'success',
    content: 'Command executed!',
  }),
};

processor.registerCommand('mycommand', myCommand);
```

## Keyboard Shortcuts

- `↑` / `↓` - Navigate command history
- `Tab` - Autocomplete current suggestion
- `Esc` - Clear autocomplete suggestions
- `Enter` - Execute command

## Styling

The terminal uses a dark cyberpunk aesthetic with:
- Background: `#0a0b0d`
- Primary color: `#00ff9f` (terminal green)
- Accent color: `#00d4ff` (cyan)
- Error color: `#ff0055` (red)
- Monospace font for terminal feel
