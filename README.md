# Etsy Management App

A personal Etsy shop management application built with TypeScript, Vite, and Supabase.

## Technology Stack

- **Frontend**: TypeScript, Vite, Vanilla JS (no heavy frameworks)
- **Database**: Supabase (PostgreSQL)
- **Deployment**: Vercel
- **Testing**: Vitest

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Run tests
npm test

# Run linting
npm run lint

# Type check
npm run typecheck
```

## Project Structure

```
├── api/            # Vercel Functions
├── public/         # Static assets
├── src/
│   ├── components/ # UI components
│   ├── services/   # Business logic
│   ├── styles/     # CSS files
│   ├── types/      # TypeScript types
│   └── utils/      # Utility functions
└── tests/          # Test files
```