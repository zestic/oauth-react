# @zestic/oauth-react

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
import { OAuthCallbackPage } from '@zestic/oauth-react';

function AuthCallback() {
  return (
    <OAuthCallbackPage
      config={oauthConfig}
      onSuccess={(tokens) => {
        console.log('Authentication successful:', tokens);
      }}
      onError={(error) => {
        console.error('Authentication failed:', error);
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
    await adapter.startAuthFlow();
  };

  return <button onClick={handleLogin}>Login with OAuth</button>;
}
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

- Node.js 16+
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
