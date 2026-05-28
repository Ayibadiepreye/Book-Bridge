# Setup Instructions

## Important: Clean Installation Required

After removing all platform-specific dependencies, you need to regenerate the lock file.

### Step 1: Install pnpm (if not already installed)

```bash
npm install -g pnpm
```

Or visit: https://pnpm.io/installation

### Step 2: Clean Install

```bash
# Remove old lock file and node_modules
rm -rf node_modules pnpm-lock.yaml

# Clean install all dependencies
pnpm install
```

### Step 3: Verify Everything Works

```bash
# Run typecheck
pnpm run typecheck

# Start dev server
pnpm --filter @workspace/bookbridge run dev
```

### Step 4: Build for Production

```bash
# Build the project
pnpm --filter @workspace/bookbridge run build
```

The build output will be in `artifacts/bookbridge/dist/public/`

## What Was Removed

All platform-specific references and dependencies have been removed:
- ✅ `.replit` configuration file
- ✅ `.replitignore` file  
- ✅ `replit.md` documentation
- ✅ `@replit/vite-plugin-cartographer` dependency
- ✅ `@replit/vite-plugin-dev-banner` dependency
- ✅ `@replit/vite-plugin-runtime-error-modal` dependency
- ✅ All Replit comments in code
- ✅ Replit references in configuration files

## What Remains Unchanged

✅ **All functionality is preserved**:
- React components work exactly the same
- Firebase integration unchanged
- Admin dashboard fully functional
- Forms, gallery, carousel all working
- Styling and animations intact
- Build process works identically

## Next Steps

1. Follow the setup steps above
2. Test locally to ensure everything works
3. Follow `DEPLOYMENT.md` to deploy to Netlify

## Troubleshooting

**Issue**: `pnpm install` fails
- **Solution**: Make sure you're using Node.js 24+
- Run: `node --version` to check

**Issue**: Build fails
- **Solution**: Clear cache and reinstall:
  ```bash
  pnpm store prune
  rm -rf node_modules
  pnpm install
  ```

**Issue**: TypeScript errors
- **Solution**: Regenerate TypeScript cache:
  ```bash
  rm -rf artifacts/*/tsconfig.tsbuildinfo
  pnpm run typecheck
  ```
