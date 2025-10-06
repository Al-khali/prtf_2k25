/**
 * Design System Theme Configuration
 * Central source of truth for colors, typography, spacing, and animation tokens
 */

export const theme = {
  colors: {
    background: {
      primary: '#0c0d10',
      secondary: '#1a1b1e',
      tertiary: '#2a2b2e',
      darker: '#080a0d',
      lighter: '#12141a',
    },
    holographic: {
      cyan: '#00f5ff',
      magenta: '#ff00ff',
      violet: '#8b00ff',
      gold: '#ffd700',
    },
    terminal: {
      green: '#00ff9f',
      blue: '#00d4ff',
      mint: '#50fa7b',
      glacier: '#8be9fd',
      purple: '#bd93f9',
    },
    glass: {
      background: 'rgba(255, 255, 255, 0.05)',
      backgroundIntense: 'rgba(255, 255, 255, 0.08)',
      border: 'rgba(255, 255, 255, 0.1)',
      borderIntense: 'rgba(255, 255, 255, 0.15)',
      blur: '20px',
      blurIntense: '30px',
    },
    glow: {
      cyan: 'rgba(0, 255, 255, 0.3)',
      magenta: 'rgba(255, 0, 255, 0.3)',
      violet: 'rgba(139, 0, 255, 0.3)',
      gold: 'rgba(255, 215, 0, 0.3)',
    },
    text: {
      primary: '#ffffff',
      secondary: '#e0e0e0',
      tertiary: '#a0a0a0',
      muted: '#707070',
    },
  },

  fonts: {
    heading: ['Space Grotesk', 'Neue Montreal', 'Satoshi', 'sans-serif'],
    body: ['Inter', 'IBM Plex Sans', 'sans-serif'],
    mono: ['IBM Plex Mono', 'Fira Code', 'Monaco', 'Consolas', 'monospace'],
  },

  fontSize: {
    xs: '0.75rem',      // 12px
    sm: '0.875rem',     // 14px
    base: '1rem',       // 16px
    lg: '1.125rem',     // 18px
    xl: '1.25rem',      // 20px
    '2xl': '1.5rem',    // 24px
    '3xl': '1.875rem',  // 30px
    '4xl': '2.25rem',   // 36px
    '5xl': '3rem',      // 48px
    '6xl': '3.75rem',   // 60px
    '7xl': '4.5rem',    // 72px
    '8xl': '6rem',      // 96px
    '9xl': '8rem',      // 128px
  },

  spacing: {
    px: '1px',
    0: '0',
    0.5: '0.125rem',
    1: '0.25rem',
    1.5: '0.375rem',
    2: '0.5rem',
    2.5: '0.625rem',
    3: '0.75rem',
    3.5: '0.875rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    7: '1.75rem',
    8: '2rem',
    9: '2.25rem',
    10: '2.5rem',
    11: '2.75rem',
    12: '3rem',
    14: '3.5rem',
    16: '4rem',
    20: '5rem',
    24: '6rem',
    28: '7rem',
    32: '8rem',
    36: '9rem',
    40: '10rem',
    44: '11rem',
    48: '12rem',
    52: '13rem',
    56: '14rem',
    60: '15rem',
    64: '16rem',
    72: '18rem',
    80: '20rem',
    96: '24rem',
  },

  borderRadius: {
    none: '0',
    sm: '0.125rem',
    base: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    '3xl': '1.5rem',
    full: '9999px',
  },

  animations: {
    duration: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms',
      slower: '800ms',
      slowest: '1000ms',
    },
    easing: {
      linear: 'linear',
      smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
      bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },

  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
    none: 'none',
    // Holographic glows
    glowCyan: '0 0 20px rgba(0, 255, 255, 0.3)',
    glowMagenta: '0 0 20px rgba(255, 0, 255, 0.3)',
    glowViolet: '0 0 20px rgba(139, 0, 255, 0.3)',
    glowGold: '0 0 20px rgba(255, 215, 0, 0.3)',
    glowHover: '0 0 30px rgba(0, 255, 255, 0.4), 0 0 60px rgba(255, 0, 255, 0.2)',
  },

  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },

  zIndex: {
    hide: -1,
    base: 0,
    dropdown: 1000,
    sticky: 1100,
    fixed: 1200,
    modalBackdrop: 1300,
    modal: 1400,
    popover: 1500,
    tooltip: 1600,
  },
} as const;

export type Theme = typeof theme;

// Utility type for accessing theme values
export type ThemeColors = typeof theme.colors;
export type ThemeFonts = typeof theme.fonts;
export type ThemeSpacing = typeof theme.spacing;
