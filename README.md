# BookBridge

A Nigerian educational nonprofit website that connects underserved junior secondary students with donated books and learning resources.

## Tech Stack

- **Frontend**: React + Vite + TypeScript
- **Styling**: Tailwind CSS v4
- **Database**: Firebase Realtime Database
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Carousel**: Embla Carousel React
- **Package Manager**: pnpm workspaces

## Project Structure

```
artifacts/
  bookbridge/          - Main frontend application
  api-server/          - Express API server
  mockup-sandbox/      - Component mockup sandbox
lib/                   - Shared libraries
  api-client-react/    - React API client
  api-spec/            - API specifications
  api-zod/             - Zod schemas
  db/                  - Database utilities
```

## Local Development

### Prerequisites

- Node.js 24+
- pnpm 9+

### Installation

```bash
# Install dependencies
pnpm install

# Run the frontend dev server
pnpm --filter @workspace/bookbridge run dev

# Run the API server (port 5000)
pnpm --filter @workspace/api-server run dev

# Typecheck all packages
pnpm run typecheck

# Build all packages
pnpm run build
```

## Netlify Deployment

### Build Settings

- **Build command**: `pnpm --filter @workspace/bookbridge run build`
- **Publish directory**: `artifacts/bookbridge/dist/public`
- **Node version**: 24

### Environment Variables

Set the following environment variables in Netlify:

```
PORT=19905
BASE_PATH=/
NODE_ENV=production
```

### Redirects

The project includes a `_redirects` file in the build output for SPA routing:
```
/* /index.html 200
```

### Deploy Steps

1. Connect your repository to Netlify
2. Configure build settings as shown above
3. Add environment variables
4. Deploy!

## Firebase Configuration

The project uses Firebase Realtime Database (compat SDK loaded via CDN).

Collections:
- `requests` - Book requests from students
- `donations` - Book donations

## Features

- **Hero Section**: Auto-rotating carousel with student photos
- **Stats Counter**: Animated statistics (books, students, schools, communities)
- **About Section**: Mission statement with photo collage
- **Subjects**: JSS subject cards with "Resources Coming Soon" badges
- **Gallery**: Masonry grid with lightbox (26 photos)
- **Contact Forms**: Book request and donation forms with Firebase integration
- **Admin Dashboard**: Login-protected admin panel at `/admin`
  - Credentials: `admin` / `admin123`
  - Manage book requests and donations
  - View statistics and submissions

## License

MIT
