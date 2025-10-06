# Image Assets

## Image Optimization Guidelines

All images in this directory should be optimized for web performance:

### Format Recommendations
- **Primary format**: WebP (automatically handled by Next.js Image component)
- **Fallback format**: AVIF for modern browsers
- **Original format**: Keep high-quality originals in a separate folder

### Size Guidelines
- **Project cards**: 800x600px (4:3 ratio)
- **Hero images**: 1920x1080px (16:9 ratio)
- **Thumbnails**: 400x300px (4:3 ratio)

### Optimization Tools
Use one of these tools to optimize images before adding them:

1. **ImageOptim** (Mac): https://imageoptim.com/
2. **Squoosh** (Web): https://squoosh.app/
3. **Sharp CLI** (Node.js):
   ```bash
   npm install -g sharp-cli
   sharp input.jpg -o output.webp --webp
   ```

### Naming Convention
Use descriptive, kebab-case names:
- `project-name-hero.webp`
- `project-name-thumbnail.webp`
- `project-name-screenshot-1.webp`

### Quality Settings
- **Thumbnails**: 60-70% quality
- **Cards**: 75-80% quality
- **Hero images**: 85-90% quality

### Next.js Image Component
All images are automatically optimized by Next.js:
- Lazy loading by default
- Responsive images with srcset
- Blur placeholders for better UX
- WebP/AVIF conversion on-the-fly

## Current Images
(Add your images here and document them)

Example:
- `data-pipeline-hero.webp` - Hero image for data pipeline project
- `ml-recommendation-card.webp` - Card image for ML recommendation project
