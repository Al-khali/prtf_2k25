/**
 * Image optimization utilities
 * Provides blur placeholders and responsive image configurations
 */

/**
 * Generate a blur data URL for placeholder using SVG
 * Creates a gradient that matches the design system colors
 */
export function generateBlurDataURL(color1: string, color2: string, color3?: string): string {
  const svg = color3
    ? `<svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:${color1};stop-opacity:0.4" />
            <stop offset="50%" style="stop-color:${color2};stop-opacity:0.4" />
            <stop offset="100%" style="stop-color:${color3};stop-opacity:0.4" />
          </linearGradient>
        </defs>
        <rect width="40" height="40" fill="url(#grad)" />
      </svg>`
    : `<svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:${color1};stop-opacity:0.4" />
            <stop offset="100%" style="stop-color:${color2};stop-opacity:0.4" />
          </linearGradient>
        </defs>
        <rect width="40" height="40" fill="url(#grad)" />
      </svg>`;

  // Convert to base64 - works in both browser and Node.js
  if (typeof window === 'undefined') {
    // Server-side (Node.js)
    const base64 = Buffer.from(svg).toString('base64');
    return `data:image/svg+xml;base64,${base64}`;
  } else {
    // Client-side (browser)
    const base64 = btoa(svg);
    return `data:image/svg+xml;base64,${base64}`;
  }
}

/**
 * Get blur placeholder based on project category
 * Uses design system colors for consistency
 */
export function getCategoryBlurPlaceholder(category: string): string {
  const placeholders: Record<string, string> = {
    // Data & AI - Cyan to Purple gradient (holographic tech feel)
    'data-ai': generateBlurDataURL('#00f5ff', '#8b00ff', '#00d4ff'),
    
    // Games - Purple to Magenta gradient (vibrant gaming aesthetic)
    'games': generateBlurDataURL('#8b00ff', '#ff00ff', '#ff1493'),
    
    // Music - Cyan to Orange gradient (audio spectrum feel)
    'music': generateBlurDataURL('#00f5ff', '#ff1493', '#ff4500'),
    
    // Design - Orange to Yellow gradient (creative warmth)
    'design': generateBlurDataURL('#ff4500', '#ffa500', '#ffd700'),
    
    // Security - Green to Cyan gradient (matrix/terminal aesthetic)
    'security': generateBlurDataURL('#00ff9f', '#00f5ff', '#00d4ff'),
    
    // Default - Holographic cyan to magenta
    'default': generateBlurDataURL('#00f5ff', '#ff00ff'),
  };

  return placeholders[category] || placeholders['default'];
}

/**
 * Responsive image sizes for different breakpoints
 */
export const responsiveImageSizes = {
  card: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
  hero: '100vw',
  detail: '(max-width: 768px) 100vw, 80vw',
};

/**
 * Image quality settings
 */
export const imageQuality = {
  thumbnail: 60,
  card: 75,
  hero: 85,
  detail: 90,
};
