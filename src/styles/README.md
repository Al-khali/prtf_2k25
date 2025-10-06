# Design System

This directory contains the core design system configuration for the portfolio.

## Files

### `theme.ts`
Central theme configuration with design tokens:
- **Colors**: Background, holographic gradients, terminal accents, glass effects, glows
- **Typography**: Font families, sizes, and weights
- **Spacing**: Consistent spacing scale
- **Animations**: Duration and easing functions
- **Shadows**: Standard and holographic glow effects
- **Breakpoints**: Responsive design breakpoints
- **Z-index**: Layering system

### `animations.ts`
Framer Motion animation variants:
- Fade animations (in, up, down, left, right)
- Scale and slide animations
- Stagger containers for sequential animations
- Hover effects (scale, glow)
- Special effects (glitch, shimmer, float, pulse)
- Page and modal transitions

## Usage

### Using Theme Values

```typescript
import { theme } from '@/styles/theme';

// In a component
const MyComponent = () => (
  <div style={{ 
    backgroundColor: theme.colors.background.primary,
    color: theme.colors.holographic.cyan 
  }}>
    Content
  </div>
);
```

### Using Animation Variants

```typescript
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/styles/animations';

const MyComponent = () => (
  <motion.div
    variants={staggerContainer}
    initial="hidden"
    animate="visible"
  >
    <motion.div variants={fadeInUp}>Item 1</motion.div>
    <motion.div variants={fadeInUp}>Item 2</motion.div>
  </motion.div>
);
```

### Using CSS Variables

CSS variables are defined in `globals.css` and can be used directly:

```css
.my-class {
  background: var(--deep-void);
  color: var(--holo-cyan);
  backdrop-filter: blur(var(--glass-blur));
}
```

### Using Tailwind Classes

Tailwind v4 configuration is in `globals.css` under `@theme inline`:

```tsx
<div className="bg-background text-foreground font-space">
  <h1 className="text-holo-cyan">Holographic Text</h1>
</div>
```

## Design Principles

1. **Holographic Aesthetic**: Cyan, magenta, violet, and gold gradients
2. **Glassmorphism**: Translucent panels with backdrop blur
3. **Terminal Inspiration**: Monospace fonts and green/blue accents
4. **Smooth Animations**: 60fps performance with Framer Motion
5. **Responsive Design**: Mobile-first approach with breakpoints
6. **Accessibility**: High contrast, keyboard navigation, reduced motion support

## Color Palette

### Background
- Primary: `#0c0d10` (Deep void)
- Secondary: `#1a1b1e`
- Tertiary: `#2a2b2e`

### Holographic
- Cyan: `#00f5ff`
- Magenta: `#ff00ff`
- Violet: `#8b00ff`
- Gold: `#ffd700`

### Terminal
- Green: `#00ff9f`
- Blue: `#00d4ff`
- Mint: `#50fa7b`
- Glacier: `#8be9fd`
- Purple: `#bd93f9`

## Typography

### Font Families
- **Headings**: Space Grotesk
- **Body**: Inter
- **Monospace**: IBM Plex Mono

### Font Sizes
- xs: 12px
- sm: 14px
- base: 16px
- lg: 18px
- xl: 20px
- 2xl: 24px
- 3xl: 30px
- 4xl: 36px
- 5xl: 48px
- 6xl: 60px
- 7xl: 72px
- 8xl: 96px
- 9xl: 128px

## Animation Timing

- **Fast**: 150ms (micro-interactions)
- **Normal**: 300ms (standard transitions)
- **Slow**: 500ms (emphasis)
- **Slower**: 800ms (dramatic effects)

## Easing Functions

- **Smooth**: `cubic-bezier(0.4, 0, 0.2, 1)` - Standard easing
- **Bounce**: `cubic-bezier(0.68, -0.55, 0.265, 1.55)` - Playful bounce
