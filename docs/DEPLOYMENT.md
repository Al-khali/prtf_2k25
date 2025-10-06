# 🚀 Deployment Guide

## Netlify Deployment (Recommended)

### 1. Prepare Repository
```bash
git add .
git commit -m "Complete portfolio refactor - futuristic design"
git push origin main
```

### 2. Netlify Settings
- **Build Command**: `npm run build`
- **Publish Directory**: `out`
- **Node Version**: `18.x`

### 3. Environment Variables
```
NEXT_PUBLIC_SITE_URL=https://your-site.netlify.app
```

### 4. netlify.toml Configuration
Already configured with:
- Static export optimization
- Security headers
- Cache settings
- Redirect rules

## Build Commands

```bash
# Production build
npm run build

# Static export (for deployment)
npm run export

# Combined build and export
npm run build && npm run export
```

## Pre-deployment Checklist

- [ ] All components build without errors
- [ ] 3D scenes load properly
- [ ] Konami code functions
- [ ] Terminal commands work
- [ ] Music player operates
- [ ] Contact form submits
- [ ] Mobile responsive
- [ ] Performance optimized
- [ ] Easter eggs functional

## Performance Optimization

### Bundle Analysis
```bash
npm run build
# Check bundle sizes in build output
```

### Image Optimization
- All images use Next.js Image component
- WebP format recommended
- Responsive sizing implemented

### 3D Performance
- Particle count optimized
- LOD (Level of Detail) implemented
- GPU-friendly shaders

## Post-deployment Testing

1. **Functionality Test**
   - Visit all sections
   - Test interactive elements
   - Verify easter eggs
   - Check mobile experience

2. **Performance Test**
   - Lighthouse audit
   - Core Web Vitals
   - Load time measurement

3. **Browser Compatibility**
   - Chrome/Edge (Chromium)
   - Firefox
   - Safari
   - Mobile browsers

## Troubleshooting

### Build Failures
```bash
# Clear cache
rm -rf .next out node_modules
npm install
npm run build
```

### 3D Issues
- Check WebGL support
- Verify Three.js compatibility
- Test on different devices

### Audio Problems
- Browser autoplay policies
- File format compatibility
- CORS headers

## Maintenance

### Regular Updates
- Dependencies security updates
- Performance monitoring
- User feedback integration
- Content updates

### Monitoring
- Analytics setup
- Error tracking
- Performance metrics
- User behavior analysis