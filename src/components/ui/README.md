# UI Component Library

Reusable UI components with glassmorphism and holographic effects for the portfolio.

## Components

### GlassCard

A glassmorphism card component with backdrop blur and animated border gradients.

**Features:**
- Configurable blur intensity (light, medium, heavy)
- Multiple border gradient options (holographic, cyan, magenta, violet, gold, terminal)
- Hover glow effects
- Responsive padding variants
- Framer Motion animations

**Usage:**
```tsx
import { GlassCard } from '@/components/ui';

<GlassCard 
  blur="medium" 
  borderGradient="holographic" 
  padding="lg"
  hoverGlow={true}
>
  <h2>Card Content</h2>
  <p>Your content here...</p>
</GlassCard>
```

### HolographicText

Animated text with holographic gradient effect using CSS background-clip.

**Features:**
- CSS background-clip gradient effect
- Shimmer animation using keyframes
- Framer Motion entrance animation
- Multiple gradient schemes
- Semantic HTML tag support (h1-h6, p, span)

**Usage:**
```tsx
import { HolographicText } from '@/components/ui';

<HolographicText 
  as="h1" 
  gradient="holographic" 
  shimmer={true}
  delay={0.2}
>
  KHALID
</HolographicText>
```

### Button

Interactive button component with multiple variants and loading states.

**Features:**
- Three variants: primary, secondary, ghost
- Hover and active states with micro-animations
- Loading state with spinner
- Size variants (sm, md, lg)
- Full width option
- Framer Motion animations

**Usage:**
```tsx
import { Button } from '@/components/ui';

<Button 
  variant="primary" 
  size="md"
  loading={false}
  onClick={() => console.log('clicked')}
>
  Click Me
</Button>
```

### Badge

Technology tag badge component with category-based color coding.

**Features:**
- Color-coded by category (data: blue, AI: purple, ML: violet, etc.)
- Optional icon support
- Hover glow effect
- Size variants (sm, md, lg)
- Framer Motion animations

**Usage:**
```tsx
import { Badge } from '@/components/ui';

<Badge 
  category="data" 
  size="md"
  hoverGlow={true}
  icon={<DataIcon />}
>
  Python
</Badge>
```

## Category Colors

- **data**: Blue (Data Engineering)
- **ai**: Purple (AI)
- **ml**: Violet (Machine Learning)
- **frontend**: Cyan (Frontend)
- **backend**: Green (Backend)
- **devops**: Orange (DevOps)
- **design**: Pink (Design)
- **security**: Red (Security)
- **default**: Gray (Default)

## Design Tokens

All components use the centralized theme configuration from `src/styles/theme.ts`:

- Colors: Holographic gradients (cyan, magenta, violet, gold)
- Fonts: Space Grotesk, Inter, IBM Plex Mono
- Animations: Smooth transitions with cubic-bezier easing
- Glass effects: Backdrop blur with semi-transparent backgrounds
