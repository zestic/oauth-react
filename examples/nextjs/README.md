# Next.js Example

This example demonstrates how to integrate `@zestic/oauth-react` with a Next.js application.

## Features

- Next.js 13+ with App Router
- Server-side rendering (SSR) support
- API routes for secure token handling
- OAuth authentication flow
- Protected pages and API routes
- TypeScript support

## Setup

1. Install dependencies:
```bash
npm install
```

2. Copy environment variables:
```bash
cp .env.example .env.local
```

3. Configure your OAuth settings in `.env.local`:
```env
NEXT_PUBLIC_AUTH_CLIENT_ID=your-client-id
NEXT_PUBLIC_AUTH_OAUTH_BASE_URL=https://auth.example.com
NEXT_PUBLIC_BASE_URL=http://localhost:3000
AUTH_SECRET=your-secret-key-for-jwt
```

4. Start the development server:
```bash
npm run dev
```

## Project Structure

```
nextjs/
├── src/
│   ├── app/
│   │   ├── auth/
│   │   │   └── callback/
│   │   │       └── page.tsx
│   │   ├── dashboard/
│   │   │   └── page.tsx
│   │   ├── api/
│   │   │   └── auth/
│   │   │       └── route.ts
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── AuthProvider.tsx
│   │   ├── LoginButton.tsx
│   │   └── LogoutButton.tsx
│   ├── lib/
│   │   ├── oauth.ts
│   │   └── auth.ts
│   └── middleware.ts
├── package.json
└── README.md
```

## Key Files

- **`src/lib/oauth.ts`** - OAuth configuration
- **`src/app/auth/callback/page.tsx`** - OAuth callback handler
- **`src/components/AuthProvider.tsx`** - Authentication context provider
- **`src/middleware.ts`** - Route protection middleware
- **`src/app/api/auth/route.ts`** - API routes for authentication

## Usage

1. Visit the home page
2. Click "Login" to start OAuth flow
3. Complete authentication on the OAuth provider
4. Get redirected back to the callback page
5. Access protected dashboard and API routes

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript checks

## Deployment

This example is ready for deployment on Vercel, Netlify, or any Node.js hosting platform.

Make sure to set the environment variables in your deployment platform.
