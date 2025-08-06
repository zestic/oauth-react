# Examples

This directory contains example implementations of `@zestic/oauth-react` with different React frameworks and setups.

## Available Examples

### React Router (`react-router/`)
Standard React single-page application using React Router for navigation.

**Features:**
- Client-side routing with React Router v6
- OAuth callback handling
- Protected routes
- Token management

### Next.js (`nextjs/`)
Next.js application with server-side rendering support.

**Features:**
- Server-side rendering (SSR)
- API routes for token handling
- Environment variable configuration
- TypeScript support

### Vite (`vite/`)
Modern React application built with Vite for fast development.

**Features:**
- Fast HMR with Vite
- TypeScript support
- Modern build tooling
- Development server setup

## Running Examples

Each example directory contains its own README with specific setup instructions.

General steps:
1. Navigate to the example directory
2. Install dependencies: `npm install`
3. Copy environment variables: `cp .env.example .env.local`
4. Configure your OAuth settings in the environment file
5. Start the development server: `npm run dev`

## Configuration

All examples require OAuth configuration. Create a `.env.local` file in each example directory with:

```env
# OAuth Configuration
REACT_APP_AUTH_CLIENT_ID=your-client-id
REACT_APP_AUTH_OAUTH_BASE_URL=https://auth.example.com
REACT_APP_BASE_URL=http://localhost:3000
```

For Next.js, use `NEXT_PUBLIC_` prefix instead of `REACT_APP_`.

## Contributing

When adding new examples:
1. Create a new directory with a descriptive name
2. Include a comprehensive README.md
3. Add a .env.example file with required variables
4. Ensure the example follows best practices
5. Test the example thoroughly
