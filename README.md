# @zestic/oauth-react

[![npm version](https://badge.fury.io/js/@zestic%2Foauth-react.svg)](https://badge.fury.io/js/@zestic%2Foauth-react)
[![npm downloads](https://img.shields.io/npm/dm/@zestic/oauth-react.svg)](https://www.npmjs.com/package/@zestic/oauth-react)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/zestic/oauth-react/blob/main/LICENSE)
[![React](https://img.shields.io/badge/React-18%2B-blue.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20%2B-green.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

[![Test Status](https://github.com/zestic/oauth-react/workflows/Test/badge.svg)](https://github.com/zestic/oauth-react/actions)
[![codecov](https://codecov.io/gh/zestic/oauth-react/branch/main/graph/badge.svg)](https://codecov.io/gh/zestic/oauth-react)
[![Maintainability](https://api.codeclimate.com/v1/badges/oauth-react/maintainability)](https://codeclimate.com/github/zestic/oauth-react/maintainability)

React web adapter for the `@zestic/oauth-core` library, enabling consistent OAuth flows across web and mobile platforms.

## Overview

This package provides React-specific implementations and components for OAuth authentication, built on top of `@zestic/oauth-core`. It includes web-optimized adapters for storage (localStorage), HTTP requests (fetch API), and PKCE (Web Crypto API).

## Features

- 🔐 **Secure OAuth 2.0 flows** with PKCE support
- ⚛️ **React hooks and components** for easy integration
- 🌐 **Web-optimized adapters** using browser APIs
- 📱 **Consistent API** with mobile implementations
- 🎯 **TypeScript support** with full type safety
- 🧪 **Framework agnostic** - works with React Router, Next.js, Vite, etc.

## Installation

```bash
npm install @zestic/oauth-react @zestic/oauth-core
# or
yarn add @zestic/oauth-react @zestic/oauth-core
# or
pnpm add @zestic/oauth-react @zestic/oauth-core
```

## Requirements

- Node.js 20 or higher
- React 18 or higher

## Quick Start

### 1. Configure OAuth

```typescript
import { OAuthConfig } from '@zestic/oauth-core';

const oauthConfig: OAuthConfig = {
  clientId: 'your-client-id',
  endpoints: {
    authorization: 'https://auth.example.com/oauth/authorize',
    token: 'https://auth.example.com/oauth/token',
    revocation: 'https://auth.example.com/oauth/revoke',
  },
  redirectUri: `${window.location.origin}/auth/callback`,
  scopes: ['read', 'write'],
};
```

### 2. Set up OAuth Provider

```typescript
import { OAuthProvider } from '@zestic/oauth-react';

function App() {
  return (
    <OAuthProvider config={oauthConfig}>
      {/* Your app components */}
    </OAuthProvider>
  );
}
```

### 3. Create Callback Page

```typescript
// React Router 6 example
import { useNavigate, useSearchParams } from 'react-router-dom';
import { OAuthCallbackPage, ReactRouterParameterExtractor } from '@zestic/oauth-react';

function AuthCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  return (
    <OAuthCallbackPage
      config={oauthConfig}
      parameterExtractor={new ReactRouterParameterExtractor(searchParams)}
      onSuccess={(result) => {
        console.log('Authentication successful:', result);
        // Your app handles navigation
        navigate('/dashboard');
      }}
      onError={(error) => {
        console.error('Authentication failed:', error);
        // Your app handles error navigation
        navigate('/login?error=oauth_failed');
      }}
    />
  );
}
```

### 4. Initiate OAuth Flow

```typescript
import { ReactOAuthAdapter } from '@zestic/oauth-react';

function LoginButton() {
  const handleLogin = async () => {
    const adapter = new ReactOAuthAdapter(oauthConfig);
    const { url } = await adapter.generateAuthorizationUrl();

    // Your app handles the redirect
    window.location.href = url;
  };

  return <button onClick={handleLogin}>Login with OAuth</button>;
}
```

## Navigation-Agnostic Design

This library follows the same pattern as `@zestic/oauth-expo` - it's **navigation-agnostic**. This means:

✅ **No hard-coded navigation** - Your app controls all routing
✅ **Router flexibility** - Works with React Router, Next.js, or any routing solution
✅ **Callback-based** - Uses `onSuccess`/`onError` callbacks instead of automatic redirects
✅ **Parameter extraction** - Pluggable system for different router parameter handling

### Router-Specific Examples

#### React Router 6
```typescript
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ReactRouterParameterExtractor } from '@zestic/oauth-react';

// Use React Router's parameter extraction
const [searchParams] = useSearchParams();
const parameterExtractor = new ReactRouterParameterExtractor(searchParams);
```

#### Next.js
```typescript
import { useRouter } from 'next/router';
import { CustomParameterExtractor } from '@zestic/oauth-react';

// Use Next.js router
const router = useRouter();
const parameterExtractor = new CustomParameterExtractor(() =>
  new URLSearchParams(window.location.search)
);
```

#### Vanilla/Browser
```typescript
import { BrowserParameterExtractor } from '@zestic/oauth-react';

// Use browser's window.location.search
const parameterExtractor = new BrowserParameterExtractor();
```

## API Reference

### Components

- **`OAuthProvider`** - Context provider for OAuth configuration
- **`OAuthCallbackPage`** - Handles OAuth callback flow

### Hooks

- **`useOAuthCallback`** - Manages OAuth callback state
- **`useOAuthConfig`** - OAuth configuration management
- **`useOAuthState`** - Authentication state management

### Adapters

- **`ReactOAuthAdapter`** - Main OAuth adapter for React
- **`WebStorageAdapter`** - localStorage implementation
- **`WebHttpAdapter`** - fetch API implementation
- **`WebPKCEAdapter`** - Web Crypto API PKCE implementation

### Utilities

- **`urlUtils`** - URL parameter handling utilities
- **`cryptoUtils`** - Cryptographic utility functions

## Framework Examples

Examples for different React frameworks are available in the `examples/` directory:

- **React Router** - Standard React SPA setup
- **Next.js** - Server-side rendering support
- **Vite** - Modern build tool integration

## Development

### Prerequisites

- Node.js 20+
- npm, yarn, or pnpm

### Setup

```bash
# Install dependencies
npm install

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Build the package
npm run build

# Lint code
npm run lint

# Format code
npm run format
```

### Testing

The package uses Vitest for testing with jsdom environment for browser API simulation.

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Related Packages

- [`@zestic/oauth-core`](https://github.com/zestic/oauth-core) - Core OAuth functionality
- [`@zestic/oauth-expo`](https://github.com/zestic/oauth-expo) - Expo/React Native adapter

## Support

For questions and support, please open an issue on [GitHub](https://github.com/zestic/oauth-react/issues).
