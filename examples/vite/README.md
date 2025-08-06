# Vite Example

This example demonstrates how to integrate `@zestic/oauth-react` with a Vite-powered React application.

## Features

- Vite for fast development and building
- React 18 with modern features
- OAuth authentication flow
- Hot module replacement (HMR)
- TypeScript support
- Modern build tooling

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
VITE_AUTH_CLIENT_ID=your-client-id
VITE_AUTH_OAUTH_BASE_URL=https://auth.example.com
VITE_BASE_URL=http://localhost:5173
```

4. Start the development server:
```bash
npm run dev
```

## Project Structure

```
vite/
├── src/
│   ├── components/
│   │   ├── AuthProvider.tsx
│   │   ├── LoginButton.tsx
│   │   ├── LogoutButton.tsx
│   │   └── ProtectedRoute.tsx
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Login.tsx
│   │   ├── Dashboard.tsx
│   │   └── AuthCallback.tsx
│   ├── config/
│   │   └── oauth.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── vite-env.d.ts
├── index.html
├── vite.config.ts
├── package.json
└── README.md
```

## Key Files

- **`src/config/oauth.ts`** - OAuth configuration using Vite env vars
- **`src/pages/AuthCallback.tsx`** - OAuth callback handler
- **`src/components/AuthProvider.tsx`** - Authentication context provider
- **`vite.config.ts`** - Vite configuration with React plugin

## Usage

1. Visit the home page at `http://localhost:5173`
2. Click "Login" to start OAuth flow
3. Complete authentication on the OAuth provider
4. Get redirected back to the callback page
5. Access protected dashboard

## Available Scripts

- `npm run dev` - Start development server (with HMR)
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript checks

## Environment Variables

Vite uses the `VITE_` prefix for environment variables that should be exposed to the client:

```env
VITE_AUTH_CLIENT_ID=your-client-id
VITE_AUTH_OAUTH_BASE_URL=https://auth.example.com
VITE_BASE_URL=http://localhost:5173
```

## Deployment

This example can be deployed to any static hosting service:

- **Vercel**: `npm run build` and deploy the `dist` folder
- **Netlify**: Connect your repository and set build command to `npm run build`
- **GitHub Pages**: Use GitHub Actions to build and deploy

Make sure to set the environment variables in your deployment platform.
