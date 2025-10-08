/**
 * Critical CSS for above-the-fold content
 * This CSS is inlined in the <head> for immediate rendering
 */

export const criticalCSS = `
/* CSS Variables - Critical for initial render */
:root {
  --deep-void: #0c0d10;
  --void-darker: #080a0d;
  --void-lighter: #12141a;
  --void-secondary: #1a1b1e;
  --void-tertiary: #2a2b2e;
  --holo-cyan: #00f5ff;
  --holo-magenta: #ff00ff;
  --holo-violet: #8b00ff;
  --holo-gold: #ffd700;
  --terminal-green: #00ff9f;
  --terminal-blue: #00d4ff;
  --mint-green: #50fa7b;
  --glacier-blue: #8be9fd;
  --electric-purple: #bd93f9;
  --glass-bg: rgba(255, 255, 255, 0.05);
  --glass-bg-intense: rgba(255, 255, 255, 0.08);
  --glass-border: rgba(255, 255, 255, 0.1);
  --glass-border-intense: rgba(255, 255, 255, 0.15);
  --glass-blur: 20px;
  --glass-blur-intense: 30px;
  --glow-cyan: rgba(0, 255, 255, 0.3);
  --glow-magenta: rgba(255, 0, 255, 0.3);
  --glow-violet: rgba(139, 0, 255, 0.3);
  --glow-gold: rgba(255, 215, 0, 0.3);
  --text-primary: #ffffff;
  --text-secondary: #e0e0e0;
  --text-tertiary: #a0a0a0;
  --text-muted: #707070;
  --duration-fast: 150ms;
  --duration-normal: 300ms;
  --duration-slow: 500ms;
  --duration-slower: 800ms;
  --ease-smooth: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
  --background: var(--deep-void);
  --foreground: var(--text-primary);
}

/* Base reset - Critical */
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

/* HTML/Body - Critical for initial render */
html {
  scroll-behavior: smooth;
  overflow-x: hidden;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  background: var(--deep-void);
  color: #ffffff;
  overflow-x: hidden;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Holographic text - Used in hero */
.holo-text {
  background: linear-gradient(45deg, var(--holo-cyan), var(--holo-magenta), var(--holo-violet), var(--holo-gold));
  background-size: 400% 400%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: holo-shift 8s ease-in-out infinite;
}

@keyframes holo-shift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

/* Glass effects - Used in hero and navigation */
.glass {
  background: var(--glass-bg);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid var(--glass-border);
  border-radius: 16px;
}

.glass-intense {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 20px;
}

/* Glow effects - Used in hero buttons */
.glow-cyan {
  box-shadow: 0 0 20px var(--glow-cyan);
}

.glow-magenta {
  box-shadow: 0 0 20px var(--glow-magenta);
}

.glow-hover {
  transition: all 0.3s ease;
}

.glow-hover:hover {
  box-shadow: 0 0 30px rgba(0, 255, 255, 0.4), 0 0 60px rgba(255, 0, 255, 0.2);
  transform: translateY(-2px);
}

/* Particles container - Hero background */
.particles-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: -1;
}

/* Focus indicators - Accessibility critical */
*:focus {
  outline: none;
}

*:focus-visible {
  outline: 2px solid var(--holo-cyan);
  outline-offset: 4px;
  border-radius: 4px;
  transition: outline-color 0.2s ease, box-shadow 0.2s ease;
}

/* Skip links - Accessibility critical */
.skip-links a {
  position: absolute;
  left: -9999px;
  z-index: 999;
  padding: 1em;
  background-color: var(--deep-void);
  color: var(--holo-cyan);
  text-decoration: none;
  border: 2px solid var(--holo-cyan);
  border-radius: 8px;
}

.skip-links a:focus {
  left: 50%;
  transform: translateX(-50%);
  top: 1rem;
}

/* Screen reader only - Accessibility critical */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

/* Reduced motion - Accessibility critical */
@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
  
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
`;
