# Design Tokens Reference

Quick reference guide for design tokens used throughout the portfolio.

## Colors

### Background Colors
```css
--deep-void: #0c0d10          /* Primary background */
--void-darker: #080a0d        /* Darker variant */
--void-lighter: #12141a       /* Lighter variant */
--void-secondary: #1a1b1e     /* Secondary surfaces */
--void-tertiary: #2a2b2e      /* Tertiary surfaces */
```

### Holographic Gradients
```css
--holo-cyan: #00f5ff          /* Bright cyan */
--holo-magenta: #ff00ff       /* Vibrant magenta */
--holo-violet: #8b00ff        /* Deep violet */
--holo-gold: #ffd700          /* Rich gold */
```

### Terminal Accents
```css
--terminal-green: #00ff9f     /* Success/active */
--terminal-blue: #00d4ff      /* Info/links */
--mint-green: #50fa7b         /* Mint accent */
--glacier-blue: #8be9fd       /* Glacier accent */
--electric-purple: #bd93f9    /* Purple accent */
```

### Glass Effects
```css
--glass-bg: rgba(255, 255, 255, 0.05)           /* Standard glass */
--glass-bg-intense: rgba(255, 255, 255, 0.08)   /* Intense glass */
--glass-border: rgba(255, 255, 255, 0.1)        /* Standard border */
--glass-border-intense: rgba(255, 255, 255, 0.15) /* Intense border */
--glass-blur: 20px                               /* Standard blur */
--glass-blur-intense: 30px                       /* Intense blur */
```

### Glow Effects
```css
--glow-cyan: rgba(0, 255, 255, 0.3)
--glow-magenta: rgba(255, 0, 255, 0.3)
--glow-violet: rgba(139, 0, 255, 0.3)
--glow-gold: rgba(255, 215, 0, 0.3)
```

### Text Colors
```css
--text-primary: #ffffff       /* Primary text */
--text-secondary: #e0e0e0     /* Secondary text */
--text-tertiary: #a0a0a0      /* Tertiary text */
--text-muted: #707070         /* Muted text */
```

## Typography

### Font Families
```css
--font-sans: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif
--font-mono: 'IBM Plex Mono', 'Fira Code', 'Monaco', 'Consolas', monospace
--font-space: 'Space Grotesk', sans-serif
```

### Font Sizes
| Token | Size | Pixels | Usage |
|-------|------|--------|-------|
| xs | 0.75rem | 12px | Small labels |
| sm | 0.875rem | 14px | Secondary text |
| base | 1rem | 16px | Body text |
| lg | 1.125rem | 18px | Large body |
| xl | 1.25rem | 20px | Small headings |
| 2xl | 1.5rem | 24px | Subheadings |
| 3xl | 1.875rem | 30px | Section titles |
| 4xl | 2.25rem | 36px | Page titles |
| 5xl | 3rem | 48px | Hero text |
| 6xl | 3.75rem | 60px | Large hero |
| 7xl | 4.5rem | 72px | Extra large |
| 8xl | 6rem | 96px | Massive |
| 9xl | 8rem | 128px | Ultra massive |

## Spacing Scale

| Token | Size | Pixels |
|-------|------|--------|
| 0 | 0 | 0px |
| 1 | 0.25rem | 4px |
| 2 | 0.5rem | 8px |
| 3 | 0.75rem | 12px |
| 4 | 1rem | 16px |
| 5 | 1.25rem | 20px |
| 6 | 1.5rem | 24px |
| 8 | 2rem | 32px |
| 10 | 2.5rem | 40px |
| 12 | 3rem | 48px |
| 16 | 4rem | 64px |
| 20 | 5rem | 80px |
| 24 | 6rem | 96px |
| 32 | 8rem | 128px |

## Border Radius

| Token | Size | Usage |
|-------|------|-------|
| sm | 0.5rem | Small elements |
| md | 1rem | Standard cards |
| lg | 1.5rem | Large panels |
| xl | 2rem | Hero sections |
| full | 9999px | Circular |

## Animation Timing

### Durations
```css
--duration-fast: 150ms        /* Micro-interactions */
--duration-normal: 300ms      /* Standard transitions */
--duration-slow: 500ms        /* Emphasis */
--duration-slower: 800ms      /* Dramatic effects */
```

### Easing Functions
```css
--ease-smooth: cubic-bezier(0.4, 0, 0.2, 1)           /* Standard */
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55) /* Playful */
```

## Shadows

### Standard Shadows
- `sm`: Subtle elevation
- `md`: Standard cards
- `lg`: Prominent panels
- `xl`: Modals and overlays
- `2xl`: Maximum elevation

### Holographic Glows
```css
--shadow-glow-cyan: 0 0 20px rgba(0, 255, 255, 0.3)
--shadow-glow-magenta: 0 0 20px rgba(255, 0, 255, 0.3)
--shadow-glow-violet: 0 0 20px rgba(139, 0, 255, 0.3)
--shadow-glow-hover: 0 0 30px rgba(0, 255, 255, 0.4), 0 0 60px rgba(255, 0, 255, 0.2)
```

## Breakpoints

| Name | Size | Usage |
|------|------|-------|
| sm | 640px | Mobile landscape |
| md | 768px | Tablet portrait |
| lg | 1024px | Tablet landscape |
| xl | 1280px | Desktop |
| 2xl | 1536px | Large desktop |

## Z-Index Scale

| Layer | Value | Usage |
|-------|-------|-------|
| hide | -1 | Hidden elements |
| base | 0 | Default layer |
| dropdown | 1000 | Dropdowns |
| sticky | 1100 | Sticky headers |
| fixed | 1200 | Fixed elements |
| modalBackdrop | 1300 | Modal backdrops |
| modal | 1400 | Modals |
| popover | 1500 | Popovers |
| tooltip | 1600 | Tooltips |

## Common Patterns

### Glassmorphism Card
```css
background: var(--glass-bg);
backdrop-filter: blur(var(--glass-blur));
border: 1px solid var(--glass-border);
border-radius: var(--radius-md);
```

### Holographic Text
```css
background: linear-gradient(45deg, 
  var(--holo-cyan), 
  var(--holo-magenta), 
  var(--holo-violet), 
  var(--holo-gold)
);
background-size: 400% 400%;
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
animation: holo-shift 8s ease-in-out infinite;
```

### Glow Hover Effect
```css
transition: all var(--duration-normal) var(--ease-smooth);

&:hover {
  box-shadow: var(--shadow-glow-hover);
  transform: translateY(-2px);
}
```

### Terminal Cursor
```css
font-family: var(--font-mono);
color: var(--terminal-green);

&::after {
  content: '▋';
  animation: blink 1s infinite;
}
```

## Accessibility

### Focus Indicators
```css
&:focus-visible {
  outline: 2px solid var(--holo-cyan);
  outline-offset: 2px;
}
```

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### High Contrast
Ensure all text meets WCAG AA standards:
- Primary text on dark background: #ffffff (21:1 ratio)
- Secondary text: #e0e0e0 (17:1 ratio)
- Tertiary text: #a0a0a0 (10:1 ratio)
