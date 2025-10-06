# Deployment Guide

This guide covers deploying the portfolio to Netlify with optimal configuration.

## Prerequisites

- Node.js 20.x or higher
- npm or yarn
- Netlify account
- Git repository connected to Netlify

## Environment Variables

Set these environment variables in Netlify dashboard (Site settings > Environment variables):

### Required Variables

```bash
# OpenAI API Key (for AI terminal feature)
NEXT_PUBLIC_OPENAI_KEY=sk-...

# Google Gemini API Key (alternative AI provider)
NEXT_PUBLIC_GEMINI_API_KEY=...

# Site URL (for metadata and SEO)
NEXT_PUBLIC_SITE_URL=https://your-domain.netlify.app
```

### Optional Variables

```bash
# Google Analytics (if using)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Contact form webhook (if using external service)
CONTACT_FORM_WEBHOOK=https://...

# Environment
NODE_ENV=production
```

## Build Configuration

The build is configured in `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = "out"
  
[build.environment]
  NODE_VERSION = "20"
```

### Build Command Explained

- `npm run build` - Runs Next.js build with static export
- Output directory: `out/` - Contains static HTML, CSS, JS files
- Build time: ~2-5 minutes depending on content

## Deployment Steps

### 1. Connect Repository

1. Log in to Netlify
2. Click "Add new site" > "Import an existing project"
3. Connect your Git provider (GitHub, GitLab, Bitbucket)
4. Select the repository
5. Configure build settings (auto-detected from netlify.toml)

### 2. Configure Environment Variables

1. Go to Site settings > Environment variables
2. Add all required variables listed above
3. Save changes

### 3. Deploy

1. Click "Deploy site"
2. Wait for build to complete (~2-5 minutes)
3. Site will be live at `https://[site-name].netlify.app`

### 4. Custom Domain (Optional)

1. Go to Site settings > Domain management
2. Add custom domain
3. Configure DNS records as instructed
4. Enable HTTPS (automatic with Let's Encrypt)

## Performance Optimizations

### Caching Strategy

The `netlify.toml` configures aggressive caching:

- **Static assets** (`/assets/*`): 1 year cache
- **JS/CSS bundles**: 1 year cache (immutable)
- **Fonts**: 1 year cache (immutable)
- **Audio files**: 1 year cache (immutable)
- **Images**: 1 year cache (immutable)

### Headers

Security and performance headers are configured:

- **Security**: CSP, X-Frame-Options, X-Content-Type-Options
- **Performance**: Cache-Control, immutable assets
- **Privacy**: Referrer-Policy, Permissions-Policy

### Redirects

Configured redirects for better UX:

- `/root` → `/#ctf` (CTF easter egg)
- `/terminal` → `/#terminal` (Terminal section)
- `/projects` → `/#projects` (Projects section)
- `/admin` → `/admin/0x1337` (Admin easter egg)

## Build Optimization

### Code Splitting

The app uses dynamic imports for heavy components:

- 3D components (React Three Fiber)
- Terminal section
- Music player
- Project sections

### Image Optimization

- Next.js Image component with automatic WebP/AVIF conversion
- Responsive images with srcset
- Blur placeholders for better UX
- Lazy loading below the fold

### Bundle Size

Target bundle sizes:

- **First Load JS**: < 200KB
- **Total JS**: < 500KB
- **CSS**: < 50KB

Check bundle size:

```bash
npm run build
# Look for "First Load JS" in output
```

## Monitoring

### Build Logs

Monitor build logs in Netlify dashboard:

1. Go to Deploys
2. Click on latest deploy
3. View deploy log

### Performance Monitoring

Use Lighthouse CI or Netlify Analytics:

```bash
# Run Lighthouse locally
npx lighthouse https://your-site.netlify.app --view
```

Target scores:

- **Performance**: 90+
- **Accessibility**: 95+
- **Best Practices**: 95+
- **SEO**: 100

### Error Tracking

Consider adding error tracking:

- Sentry
- LogRocket
- Rollbar

## Troubleshooting

### Build Fails

**Issue**: Build fails with "Module not found"

**Solution**: 
```bash
# Clear cache and rebuild
rm -rf node_modules package-lock.json
npm install
npm run build
```

**Issue**: Build fails with "Out of memory"

**Solution**: Increase Node memory in netlify.toml:
```toml
[build.environment]
  NODE_OPTIONS = "--max-old-space-size=4096"
```

### 3D Not Rendering

**Issue**: 3D particles not showing on deployed site

**Solution**: 
- Check browser console for WebGL errors
- Verify Three.js is properly bundled
- Test on different devices/browsers

### Images Not Loading

**Issue**: Images return 404

**Solution**:
- Verify images are in `public/` directory
- Check image paths are relative to public root
- Ensure images are committed to Git

### API Keys Not Working

**Issue**: AI terminal not responding

**Solution**:
- Verify environment variables are set in Netlify
- Check variable names match code (NEXT_PUBLIC_ prefix)
- Redeploy after adding variables

## Continuous Deployment

### Automatic Deploys

Netlify automatically deploys on:

- Push to main/master branch
- Pull request (deploy preview)
- Manual trigger

### Deploy Previews

Every PR gets a unique preview URL:

- Test changes before merging
- Share with team for review
- Automatic cleanup after merge

### Branch Deploys

Configure branch deploys for staging:

1. Go to Site settings > Build & deploy
2. Configure branch deploys
3. Set branch deploy contexts

## Post-Deployment Checklist

- [ ] Verify all pages load correctly
- [ ] Test 3D particle field on desktop and mobile
- [ ] Test terminal commands
- [ ] Test music player
- [ ] Test contact form
- [ ] Test CTF challenges and Konami code
- [ ] Verify all images load
- [ ] Check console for errors
- [ ] Run Lighthouse audit
- [ ] Test on multiple browsers (Chrome, Firefox, Safari, Edge)
- [ ] Test on mobile devices (iOS and Android)
- [ ] Verify custom domain (if configured)
- [ ] Check SSL certificate
- [ ] Test all redirects
- [ ] Verify analytics tracking (if configured)

## Rollback

If deployment has issues:

1. Go to Deploys in Netlify dashboard
2. Find last working deploy
3. Click "Publish deploy"
4. Site will rollback instantly

## Support

- Netlify Docs: https://docs.netlify.com/
- Next.js Docs: https://nextjs.org/docs
- Community: Netlify Community Forums

## Performance Tips

1. **Optimize images before upload**
   - Use WebP format
   - Compress with tools like Squoosh
   - Keep file sizes under 500KB

2. **Minimize JavaScript**
   - Remove unused dependencies
   - Use dynamic imports
   - Enable tree shaking

3. **Reduce CSS**
   - Purge unused Tailwind classes
   - Minimize custom CSS
   - Use CSS modules

4. **Optimize fonts**
   - Use font-display: swap
   - Preload critical fonts
   - Subset fonts if possible

5. **Enable compression**
   - Netlify automatically enables Brotli/Gzip
   - Verify in Network tab

## Security

1. **API Keys**
   - Never commit API keys to Git
   - Use environment variables
   - Rotate keys regularly

2. **Headers**
   - CSP configured in netlify.toml
   - HTTPS enforced automatically
   - Security headers enabled

3. **Dependencies**
   - Run `npm audit` regularly
   - Update dependencies
   - Use Dependabot for alerts

## Maintenance

### Regular Tasks

- Update dependencies monthly
- Run security audits
- Monitor performance metrics
- Check error logs
- Review analytics

### Updates

```bash
# Update dependencies
npm update

# Check for outdated packages
npm outdated

# Update Next.js
npm install next@latest react@latest react-dom@latest

# Rebuild and test
npm run build
npm run start
```

## Cost Optimization

Netlify free tier includes:

- 100GB bandwidth/month
- 300 build minutes/month
- Unlimited sites
- HTTPS included
- CDN included

For higher traffic:

- Upgrade to Pro ($19/month)
- 400GB bandwidth
- 1000 build minutes
- Analytics included

## Analytics

### Netlify Analytics

Enable in Site settings > Analytics:

- Page views
- Unique visitors
- Top pages
- Traffic sources
- No client-side JavaScript required

### Google Analytics

Add to environment variables:

```bash
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

Implement in `_app.tsx` or layout.

## Conclusion

Your portfolio is now deployed and optimized for performance! 🚀

For questions or issues, refer to the documentation or open an issue in the repository.
