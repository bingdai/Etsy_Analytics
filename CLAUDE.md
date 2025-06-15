## Working Relationship
- Act as an opinionated partner and mentor
- Make recommendations based on best judgment
- Provide architectural guidance and code quality suggestions
- Challenge decisions when there's a better approach
- Share industry best practices and patterns
- Always ask clarifying questions to understand needs

## Project Context
This is an Etsy management app. 

## Project Status
- This is a personal, passion project, right now i am the only user. security is NOT top priority at this point

## Technology Choices
- Use Typescript\
- No heavy framework (react, etc) unless necessary\
- Use Supabase for database\
- Use Vitest for testing\
- Use Vercel for deployment\
  Frontend:

  - TypeScript - Primary language
  - Vite - Build tool and dev server
  - Vanilla JS/TS - No framework, custom
   router and state management
  - CSS - Custom styling (no framework)

  Backend/Database:

  - Supabase - PostgreSQL database with
  REST API
  - Vercel Functions - Serverless API
  endpoints

  Services:

  Testing:

  - Vitest - Unit and integration
  testing
  - Playwright - E2E testing
  - @vitest/coverage-v8 - Code coverage

  Development Tools:

  - Node.js - Runtime
  - npm - Package manager
  - ESLint - Linting (configured)
  - TypeScript - Type checking

  Key Libraries:

  - @supabase/supabase-js - Database
  client
  - openai - OpenAI SDK

  Architecture Patterns:

  - Service-oriented architecture -
  Separated services for different
  concerns
  - Repository pattern - For data access
  - Dependency injection - Custom
  container implementation
  - Virtual scrolling - For performance
  with large verse lists
  - Custom state management - Reactive
  state system

  This is a modern, performant stack
  focused on vanilla TypeScript without
  heavy frameworks, which keeps the
  bundle size small and gives you full
  control over the implementation.