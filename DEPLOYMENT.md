# Netlify Deployment Guide

This guide will help you deploy BookBridge to Netlify.

## Prerequisites

- A Netlify account (free tier works fine)
- Your repository pushed to GitHub, GitLab, or Bitbucket
- Firebase project configured (for the database)

## Step 1: Prepare Your Repository

The project is already configured for Netlify deployment with:
- `netlify.toml` - Build configuration
- `_redirects` file (generated during build) - SPA routing

## Step 2: Connect to Netlify

1. Log in to [Netlify](https://app.netlify.com/)
2. Click "Add new site" → "Import an existing project"
3. Choose your Git provider (GitHub, GitLab, or Bitbucket)
4. Select the BookBridge repository
5. Authorize Netlify to access your repository

## Step 3: Configure Build Settings

Netlify should automatically detect the settings from `netlify.toml`, but verify:

- **Base directory**: (leave empty)
- **Build command**: `pnpm --filter @workspace/bookbridge run build`
- **Publish directory**: `artifacts/bookbridge/dist/public`
- **Node version**: 24 (set in netlify.toml)

## Step 4: Environment Variables

Add these environment variables in Netlify:

1. Go to Site settings → Environment variables
2. Add the following:

```
PORT=19905
BASE_PATH=/
NODE_ENV=production
```

**Note**: Firebase configuration is loaded via CDN in the HTML file, so no Firebase env vars are needed here.

## Step 5: Deploy

1. Click "Deploy site"
2. Wait for the build to complete (usually 2-5 minutes)
3. Your site will be live at a Netlify subdomain (e.g., `your-site-name.netlify.app`)

## Step 6: Custom Domain (Optional)

1. Go to Site settings → Domain management
2. Click "Add custom domain"
3. Follow the instructions to configure your DNS

## Troubleshooting

### Build Fails

**Issue**: `pnpm: command not found`
- **Solution**: Netlify should auto-detect pnpm. If not, add this to netlify.toml:
  ```toml
  [build.environment]
    NPM_FLAGS = "--version"
  ```

**Issue**: Out of memory during build
- **Solution**: The free tier should be sufficient. If you hit limits, try:
  - Reduce dependencies
  - Use Netlify Pro for more resources

### Site Loads But Routes Don't Work

**Issue**: 404 on page refresh
- **Solution**: Verify the `_redirects` file is in the publish directory. It should be auto-generated during build.

### Firebase Not Connecting

**Issue**: Database operations fail
- **Solution**: Check that Firebase config in `artifacts/bookbridge/index.html` has the correct credentials

## Continuous Deployment

Netlify automatically deploys when you push to your main branch. To configure:

1. Go to Site settings → Build & deploy → Continuous deployment
2. Set your production branch (usually `main` or `master`)
3. Enable automatic deploys

## Build Optimization

To speed up builds:

1. Enable build cache in Netlify settings
2. Use dependency caching (enabled by default)
3. Consider using Netlify's build plugins for optimization

## Monitoring

- **Build logs**: Available in the Deploys tab
- **Function logs**: Not applicable (no serverless functions)
- **Analytics**: Enable Netlify Analytics in Site settings

## Support

For issues:
- Check [Netlify documentation](https://docs.netlify.com/)
- Review build logs in the Netlify dashboard
- Check the [Netlify community forum](https://answers.netlify.com/)

## Post-Deployment Checklist

- [ ] Site loads correctly
- [ ] All routes work (test navigation)
- [ ] Images load properly
- [ ] Forms submit to Firebase
- [ ] Admin dashboard accessible at `/admin`
- [ ] Mobile responsive design works
- [ ] Gallery lightbox functions
- [ ] Carousel auto-rotates

## Performance Tips

1. **Enable asset optimization** in Netlify settings:
   - Minify CSS
   - Minify JS
   - Compress images

2. **Enable HTTPS** (automatic with Netlify)

3. **Configure caching headers** in netlify.toml:
   ```toml
   [[headers]]
     for = "/assets/*"
     [headers.values]
       Cache-Control = "public, max-age=31536000, immutable"
   ```

4. **Use Netlify CDN** (automatic)

## Updating Your Site

To deploy updates:

1. Make changes locally
2. Test thoroughly
3. Commit and push to your repository
4. Netlify automatically rebuilds and deploys

Or manually trigger a deploy:
1. Go to Deploys tab in Netlify
2. Click "Trigger deploy" → "Deploy site"

---

**Your BookBridge site is now live! 🎉**
