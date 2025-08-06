# React Router Example

This example demonstrates how to integrate `@zestic/oauth-react` with a React Router application.

## Features

- React Router v6 for client-side routing
- OAuth authentication flow
- Protected routes
- Token management with localStorage
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
REACT_APP_AUTH_CLIENT_ID=your-client-id
REACT_APP_AUTH_OAUTH_BASE_URL=https://auth.example.com
REACT_APP_BASE_URL=http://localhost:3000
```

4. Start the development server:
```bash
npm run dev
```

## Project Structure

```
react-router/
├── src/
│   ├── components/
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
│   └── main.tsx
├── package.json
└── README.md
```

## Key Files

- **`src/config/oauth.ts`** - OAuth configuration
- **`src/pages/AuthCallback.tsx`** - OAuth callback handler
- **`src/components/ProtectedRoute.tsx`** - Route protection component
- **`src/App.tsx`** - Main app with routing setup

## Usage

1. Visit the home page
2. Click "Login" to start OAuth flow
3. Complete authentication on the OAuth provider
4. Get redirected back to the callback page
5. Access protected dashboard

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript checks
