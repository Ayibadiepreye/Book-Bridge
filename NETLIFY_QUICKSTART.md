# Netlify Quick Start Guide

Deploy BookBridge to Netlify in 5 minutes! 🚀

## Prerequisites

- GitHub/GitLab/Bitbucket account
- Netlify account (free tier is fine)
- Your code pushed to a Git repository

## Quick Deploy Steps

### 1. Push to Git (if not already done)

```bash
git add .
git commit -m "Prepare for Netlify deployment"
git push origin main
```

### 2. Deploy to Netlify

**Option A: One-Click Deploy**

1. Go to [Netlify](https://app.netlify.com/)
2. Click "Add new site" → "Import an existing project"
3. Choose your Git provider
4. Select your repository
5. Click "Deploy site" (settings are auto-detected from `netlify.toml`)

**Option B: Netlify CLI**

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy
netlify deploy --prod
```

### 3. Done! 🎉

Your site is live at: `https://your-site-name.netlify.app`

## Build Configuration (Auto-Detected)

The `netlify.toml` file contains:

```toml
[build]
  command = "pnpm --filter @workspace/bookbridge run build"
  publish = "artifacts/bookbridge/dist/public"

[build.environment]
  NODE_VERSION = "24"
  PORT = "19905"
  BASE_PATH = "/"
  NODE_ENV = "production"
```

## Environment Variables (Optional)

If you need to customize, add these in Netlify dashboard:

- `PORT` - Default: 19905
- `BASE_PATH` - Default: /
- `NODE_ENV` - Default: production

## Custom Domain (Optional)

1. Go to Site settings → Domain management
2. Click "Add custom domain"
3. Follow DNS configuration instructions

## Troubleshooting

**Build fails?**
- Check build logs in Netlify dashboard
- Ensure Node.js 24 is specified (it is in netlify.toml)
- Verify pnpm is detected (should be automatic)

**404 on routes?**
- The `_redirects` file is auto-generated during build
- Verify it exists in the publish directory

**Firebase not working?**
- Check Firebase config in `artifacts/bookbridge/index.html`
- Ensure Firebase project is active

## What's Deployed?

✅ Full React application
✅ All images and assets
✅ Firebase integration
✅ Admin dashboard
✅ Contact forms
✅ Gallery and carousel
✅ Responsive design

## Continuous Deployment

Netlify automatically deploys when you push to your main branch!

```bash
# Make changes
git add .
git commit -m "Update feature"
git push origin main

# Netlify automatically rebuilds and deploys!
```

## Performance

Your site includes:
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Asset optimization
- ✅ Gzip compression
- ✅ HTTP/2 support

## Support

- 📚 [Full deployment guide](./DEPLOYMENT.md)
- 🔧 [Setup instructions](./SETUP.md)
- 📝 [Changes documentation](./CHANGES.md)
- 🌐 [Netlify docs](https://docs.netlify.com/)

---

**That's it! Your BookBridge site is now live on Netlify! 🎊**
