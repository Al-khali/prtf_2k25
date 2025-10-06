/**
 * Image optimization utilities
 * Provides blur placeholders and responsive image configurations
 */

/**
 * Generate a simple blur data URL for placeholder
 * This creates a tiny 10x10 gradient that can be used as a blur placeholder
 */
export function generateBlurDataURL(color1 = '#00f5ff', color2 = '#ff00ff'): string {
  // Create a simple SVG gradient
  const svg = `
    <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${color1};stop-opacity:0.3" />
          <stop offset="100%" style="stop-color:${color2};stop-opacity:0.3" />
        </linearGradient>
      </defs>
      <rect width="10" height="10" fill="url(#grad)" />
    </svg>
  `.trim();

  // Convert to base64
  const base64 = Buffer.from(svg).toString('base64');
  return `data:image/svg+xml;base64,${base64}`;
}

/**
 * Get blur placeholder based on project category
 */
export function getCategoryBlurPlaceholder(category: string): string {
  const colorMap: Record<string, [string, string]> = {
    'data-ai': ['#00f5ff', '#8b00ff'],
    'games': ['#ff00ff', '#ff1493'],
    'music': ['#ff1493', '#ff4500'],
    'design': ['#ffa500', '#ffd700'],
    'security': ['#ff4500', '#ff6347'],
    'default': ['#00f5ff', '#ff00ff'],
  };

  const [color1, color2] = colorMap[category] || colorMap.default;
  return generateBlurDataURL(color1, color2);
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
