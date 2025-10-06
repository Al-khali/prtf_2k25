# Pre-Deployment Checklist

Complete this checklist before deploying to production.

## Build & Test

### Local Build

- [ ] Run `npm run build` successfully
- [ ] No build errors or warnings
- [ ] Bundle size within budget (< 200KB first load)
- [ ] Run `npm run start` and test locally
- [ ] All pages load correctly
- [ ] No console errors

### Code Quality

- [ ] Run `npm run lint` with no errors
- [ ] Run `npm run test` with all tests passing
- [ ] Code reviewed and approved
- [ ] No TODO comments in production code
- [ ] No debug code or console.logs

## Performance

### Lighthouse Audit

- [ ] Performance score: 90+
- [ ] Accessibility score: 95+
- [ ] Best Practices score: 95+
- [ ] SEO score: 100
- [ ] Core Web Vitals passing (LCP < 2.5s, FID < 100ms, CLS < 0.1)

### Bundle Analysis

- [ ] First Load JS < 200KB
- [ ] Total JS < 500KB
- [ ] CSS < 50KB
- [ ] No duplicate dependencies
- [ ] Tree shaking working correctly

### Loading Performance

- [ ] Images optimized (WebP/AVIF)
- [ ] Fonts preloaded
- [ ] Critical CSS inlined
- [ ] Lazy loading implemented
- [ ] Code splitting working

### 3D Performance

- [ ] 60 FPS on desktop
- [ ] 30+ FPS on mobile
- [ ] Fallback working on low-end devices
- [ ] No memory leaks
- [ ] Performance monitoring active

## Functionality

### Core Features

- [ ] Hero section loads with 3D particles
- [ ] About section displays correctly
- [ ] Projects section shows all projects
- [ ] Project filtering works
- [ ] Project detail pages load
- [ ] Terminal accepts commands
- [ ] AI terminal responds (if API key set)
- [ ] Music player plays audio
- [ ] Audio visualizer works
- [ ] Contact form submits
- [ ] CTF challenges work
- [ ] Konami code activates

### Navigation

- [ ] All internal links work
- [ ] Smooth scrolling works
- [ ] Section anchors work (#about, #projects, etc.)
- [ ] Back button works on project pages
- [ ] Navigation menu works (if implemented)

### Interactions

- [ ] Hover effects work
- [ ] Click handlers work
- [ ] Keyboard navigation works
- [ ] Touch interactions work on mobile
- [ ] Animations play smoothly
- [ ] No janky scrolling

## Accessibility

### Keyboard Navigation

- [ ] All interactive elements keyboard accessible
- [ ] Tab order is logical
- [ ] Focus indicators visible
- [ ] Skip links work
- [ ] Escape key closes modals/overlays

### Screen Reader

- [ ] All images have alt text
- [ ] ARIA labels present
- [ ] Headings properly structured
- [ ] Form labels associated
- [ ] Error messages announced
- [ ] Dynamic content announced

### Visual

- [ ] Color contrast meets WCAG AA (4.5:1)
- [ ] Text readable at all sizes
- [ ] No text in images
- [ ] Icons have labels
- [ ] Focus indicators visible

### Motion

- [ ] Respects prefers-reduced-motion
- [ ] Animations can be disabled
- [ ] No auto-playing videos
- [ ] No flashing content

## Browser Compatibility

### Desktop Browsers

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

### Mobile Browsers

- [ ] iOS Safari (latest)
- [ ] Chrome Android (latest)
- [ ] Samsung Internet
- [ ] Firefox Mobile

### Responsive Design

- [ ] Mobile (320px - 767px)
- [ ] Tablet (768px - 1023px)
- [ ] Desktop (1024px+)
- [ ] Large desktop (1920px+)

## Content

### Text Content

- [ ] No typos or grammatical errors
- [ ] All text readable and clear
- [ ] Proper capitalization
- [ ] Consistent tone and voice

### Images

- [ ] All images load correctly
- [ ] No broken image links
- [ ] Images properly sized
- [ ] Alt text descriptive

### Links

- [ ] All external links work
- [ ] Links open in new tab (if appropriate)
- [ ] No broken links
- [ ] GitHub links correct
- [ ] Social media links correct

## SEO

### Meta Tags

- [ ] Title tag present and unique
- [ ] Meta description present (< 160 chars)
- [ ] Open Graph tags present
- [ ] Twitter Card tags present
- [ ] Canonical URL set

### Structured Data

- [ ] JSON-LD schema present
- [ ] Person schema for portfolio
- [ ] Breadcrumbs (if applicable)
- [ ] Valid structured data (test with Google)

### Sitemap & Robots

- [ ] sitemap.xml generated
- [ ] robots.txt present
- [ ] Sitemap submitted to Google
- [ ] No pages blocked unintentionally

## Security

### Headers

- [ ] CSP header configured
- [ ] X-Frame-Options set
- [ ] X-Content-Type-Options set
- [ ] Referrer-Policy set
- [ ] Permissions-Policy set

### HTTPS

- [ ] HTTPS enforced
- [ ] SSL certificate valid
- [ ] No mixed content warnings
- [ ] HSTS enabled

### API Keys

- [ ] No API keys in code
- [ ] Environment variables set in Netlify
- [ ] API keys rotated if exposed
- [ ] Rate limiting implemented

### Dependencies

- [ ] No known vulnerabilities (`npm audit`)
- [ ] Dependencies up to date
- [ ] No unused dependencies
- [ ] License compliance checked

## Deployment

### Environment Variables

- [ ] All required env vars set in Netlify
- [ ] NEXT_PUBLIC_OPENAI_KEY set (if using)
- [ ] NEXT_PUBLIC_GEMINI_API_KEY set (if using)
- [ ] NEXT_PUBLIC_SITE_URL set
- [ ] NODE_ENV set to production

### Netlify Configuration

- [ ] netlify.toml configured
- [ ] Build command correct
- [ ] Publish directory correct
- [ ] Redirects configured
- [ ] Headers configured
- [ ] Node version specified

### Domain

- [ ] Custom domain configured (if applicable)
- [ ] DNS records correct
- [ ] SSL certificate issued
- [ ] WWW redirect configured (if needed)

## Post-Deployment

### Verification

- [ ] Site loads on production URL
- [ ] All pages accessible
- [ ] No 404 errors
- [ ] No console errors
- [ ] Analytics tracking works (if configured)

### Testing

- [ ] Test on real mobile devices
- [ ] Test on different networks (3G, 4G, WiFi)
- [ ] Test with ad blockers
- [ ] Test with VPN
- [ ] Test from different locations

### Monitoring

- [ ] Error tracking configured (if using)
- [ ] Performance monitoring active
- [ ] Analytics configured (if using)
- [ ] Uptime monitoring (if using)

### Documentation

- [ ] README updated
- [ ] DEPLOYMENT.md reviewed
- [ ] Environment variables documented
- [ ] Known issues documented

## Final Checks

- [ ] All checklist items completed
- [ ] Team reviewed and approved
- [ ] Stakeholders notified
- [ ] Rollback plan ready
- [ ] Support team briefed (if applicable)

## Sign-off

- **Developer**: _________________ Date: _______
- **Reviewer**: _________________ Date: _______
- **Approver**: _________________ Date: _______

## Notes

Add any additional notes or concerns here:

---

## Quick Commands

```bash
# Build and test
npm run build
npm run start

# Run Lighthouse
npm run lighthouse

# Check bundle size
npm run build:analyze

# Security audit
npm run audit

# Deploy to Netlify
git push origin main
```

## Emergency Rollback

If issues occur after deployment:

1. Go to Netlify dashboard
2. Navigate to Deploys
3. Find last working deploy
4. Click "Publish deploy"
5. Site will rollback instantly

## Support

- Netlify Support: https://www.netlify.com/support/
- Next.js Docs: https://nextjs.org/docs
- Project Issues: [GitHub Issues URL]
