# OAuth React Web Adapter Proposal

## Overview

This document outlines the implementation of `@zestic/oauth-react`, a React web adapter for the `@zestic/oauth-core` library. This adapter will enable React web applications to use the same OAuth flows as the Expo mobile apps, ensuring consistency across platforms.

## Prerequisites

- `@zestic/oauth-core` must be implemented and stable
- `@zestic/oauth-expo` should be completed as a reference implementation
- React web app should be ready for OAuth integration

## Package Structure

```
@zestic/oauth-react/
├── src/
│   ├── ReactOAuthAdapter.ts      # Main React web adapter
│   ├── components/
│   │   ├── OAuthCallbackPage.tsx # Web callback component
│   │   └── OAuthProvider.tsx     # Context provider for OAuth state
│   ├── hooks/
│   │   ├── useOAuthCallback.ts   # React hook for callback logic
│   │   ├── useOAuthConfig.ts     # Configuration management
│   │   └── useOAuthState.ts      # OAuth state management
│   ├── adapters/
│   │   ├── WebStorageAdapter.ts  # localStorage implementation
│   │   ├── WebHttpAdapter.ts     # fetch/axios implementation
│   │   └── WebPKCEAdapter.ts     # Web Crypto API PKCE
│   ├── utils/
│   │   ├── urlUtils.ts           # URL parameter handling
│   │   └── cryptoUtils.ts        # Web crypto utilities
│   └── index.ts                  # Main exports
├── package.json
├── tsconfig.json
├── README.md
└── examples/
    ├── react-router/             # React Router example
    ├── nextjs/                   # Next.js example
    └── vite/                     # Vite example
```

## Key Implementation Differences from Expo

### 1. Storage Adapter (localStorage vs AsyncStorage)

```typescript
// WebStorageAdapter.ts
import { StorageAdapter } from '@zestic/oauth-core';

export class WebStorageAdapter implements StorageAdapter {
  async setItem(key: string, value: string): Promise<void> {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.error('Failed to store item in localStorage:', error);
      throw error;
    }
  }

  async getItem(key: string): Promise<string | null> {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.error('Failed to retrieve item from localStorage:', error);
      return null;
    }
  }

  async removeItem(key: string): Promise<void> {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Failed to remove item from localStorage:', error);
      throw error;
    }
  }

  async removeItems(keys: string[]): Promise<void> {
    try {
      keys.forEach(key => localStorage.removeItem(key));
    } catch (error) {
      console.error('Failed to remove items from localStorage:', error);
      throw error;
    }
  }
}
```

### 2. PKCE Adapter (Web Crypto API vs expo-auth-session)

```typescript
// WebPKCEAdapter.ts
import { PKCEAdapter, PKCEParams } from '@zestic/oauth-core';

export class WebPKCEAdapter implements PKCEAdapter {
  async generatePKCE(): Promise<PKCEParams> {
    const codeVerifier = this.generateCodeVerifier();
    const codeChallenge = await this.generateCodeChallenge(codeVerifier);
    const state = crypto.randomUUID();

    return {
      codeVerifier,
      codeChallenge,
      codeChallengeMethod: 'S256',
      state,
    };
  }

  private generateCodeVerifier(): string {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return btoa(String.fromCharCode(...array))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');
  }

  private async generateCodeChallenge(codeVerifier: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(codeVerifier);
    const digest = await crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode(...new Uint8Array(digest)))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');
  }

  async validateState(storedState: string, receivedState: string): Promise<boolean> {
    return storedState === receivedState;
  }
}
```

### 3. HTTP Adapter (fetch vs Expo's fetch)

```typescript
// WebHttpAdapter.ts
import { HttpAdapter, HttpRequest, HttpResponse } from '@zestic/oauth-core';

export class WebHttpAdapter implements HttpAdapter {
  async request(request: HttpRequest): Promise<HttpResponse> {
    try {
      const response = await fetch(request.url, {
        method: request.method,
        headers: request.headers,
        body: request.body,
      });

      const data = await response.json().catch(() => ({}));

      return {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()),
        data,
        ok: response.ok,
      };
    } catch (error) {
      throw new Error(`Network request failed: ${error.message}`);
    }
  }
}
```

## React-Specific Components and Hooks

### 1. OAuth Callback Hook

```typescript
// useOAuthCallback.ts
import { useState, useCallback, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ReactOAuthAdapter } from '../ReactOAuthAdapter';

export function useOAuthCallback(config: OAuthConfig) {
  const [status, setStatus] = useState<'processing' | 'success' | 'error'>('processing');
  const [message, setMessage] = useState('Processing OAuth callback...');
  const [error, setError] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleCallback = useCallback(async () => {
    try {
      setStatus('processing');
      setMessage('Processing OAuth callback...');
      setError(null);

      const adapter = new ReactOAuthAdapter(config);
      const params = Object.fromEntries(searchParams.entries());
      const result = await adapter.handleCallback(params);

      if (result.success) {
        setStatus('success');
        setMessage('OAuth authentication successful!');
        
        // Store tokens and navigate to main app
        // This would typically integrate with your app's auth state management
        setTimeout(() => navigate('/'), 1500);
      } else {
        throw new Error(result.error || 'OAuth authentication failed');
      }
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
      setMessage('OAuth authentication failed');
    }
  }, [config, searchParams, navigate]);

  return {
    status,
    message,
    error,
    handleCallback,
  };
}
```

### 2. OAuth Callback Page Component

```typescript
// OAuthCallbackPage.tsx
import React, { useEffect } from 'react';
import { useOAuthCallback } from '../hooks/useOAuthCallback';
import { OAuthConfig } from '@zestic/oauth-core';

interface OAuthCallbackPageProps {
  config: OAuthConfig;
  onSuccess?: (tokens: { accessToken: string; refreshToken?: string }) => void;
  onError?: (error: string) => void;
}

export function OAuthCallbackPage({ config, onSuccess, onError }: OAuthCallbackPageProps) {
  const { status, message, error, handleCallback } = useOAuthCallback(config);

  useEffect(() => {
    handleCallback();
  }, [handleCallback]);

  useEffect(() => {
    if (status === 'error' && error && onError) {
      onError(error);
    }
  }, [status, error, onError]);

  const renderContent = () => {
    switch (status) {
      case 'processing':
        return (
          <div className="oauth-callback-processing">
            <div className="spinner" />
            <p>{message}</p>
          </div>
        );

      case 'success':
        return (
          <div className="oauth-callback-success">
            <div className="success-icon">✅</div>
            <h2>Success!</h2>
            <p>{message}</p>
          </div>
        );

      case 'error':
        return (
          <div className="oauth-callback-error">
            <div className="error-icon">❌</div>
            <h2>Authentication Failed</h2>
            <p>{message}</p>
            {error && <p className="error-details">{error}</p>}
            <button onClick={() => window.location.href = '/login'}>
              Try Again
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="oauth-callback-container">
      {renderContent()}
    </div>
  );
}
```

## Configuration for Different React Frameworks

### React Router Configuration

```typescript
// React Router setup
const oauthConfig: OAuthConfig = {
  clientId: process.env.REACT_APP_AUTH_CLIENT_ID!,
  endpoints: {
    authorization: `${process.env.REACT_APP_AUTH_OAUTH_BASE_URL}/oauth/authorize`,
    token: `${process.env.REACT_APP_AUTH_OAUTH_BASE_URL}/oauth/token`,
    revocation: `${process.env.REACT_APP_AUTH_OAUTH_BASE_URL}/oauth/revoke`,
  },
  redirectUri: `${window.location.origin}/auth/callback`,
  scopes: ['read', 'write'],
};

// In your router setup
<Route 
  path="/auth/callback" 
  element={<OAuthCallbackPage config={oauthConfig} />} 
/>
```

### Next.js Configuration

```typescript
// Next.js pages/auth/callback.tsx
import { OAuthCallbackPage } from '@zestic/oauth-react';
import { GetServerSideProps } from 'next';

export default function AuthCallback({ config }: { config: OAuthConfig }) {
  return <OAuthCallbackPage config={config} />;
}

export const getServerSideProps: GetServerSideProps = async () => {
  const config: OAuthConfig = {
    clientId: process.env.NEXT_PUBLIC_AUTH_CLIENT_ID!,
    endpoints: {
      authorization: `${process.env.NEXT_PUBLIC_AUTH_OAUTH_BASE_URL}/oauth/authorize`,
      token: `${process.env.NEXT_PUBLIC_AUTH_OAUTH_BASE_URL}/oauth/token`,
      revocation: `${process.env.NEXT_PUBLIC_AUTH_OAUTH_BASE_URL}/oauth/revoke`,
    },
    redirectUri: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/callback`,
    scopes: ['read', 'write'],
  };

  return { props: { config } };
};
```

## Implementation Timeline

### Phase 1: Core Adapter (Week 1)
- Implement WebStorageAdapter, WebHttpAdapter, WebPKCEAdapter
- Create ReactOAuthAdapter class
- Basic TypeScript setup and configuration

### Phase 2: React Integration (Week 2)
- Implement useOAuthCallback hook
- Create OAuthCallbackPage component
- Add support for React Router

### Phase 3: Framework Support (Week 3)
- Add Next.js support and examples
- Add Vite support and examples
- Create comprehensive documentation

### Phase 4: Testing & Polish (Week 4)
- Unit tests for all adapters
- Integration tests with different React setups
- Performance optimization
- Final documentation and examples

## Dependencies

```json
{
  "dependencies": {
    "@zestic/oauth-core": "^1.0.0",
    "react": "^18.0.0"
  },
  "peerDependencies": {
    "react": ">=16.8.0",
    "react-dom": ">=16.8.0"
  },
  "devDependencies": {
    "@types/react": "^18.0.0",
    "typescript": "^5.0.0",
    "vite": "^4.0.0",
    "vitest": "^0.34.0"
  }
}
```

## Benefits

1. **Consistent OAuth flows** across mobile (Expo) and web (React)
2. **Shared core logic** reduces bugs and maintenance overhead
3. **Platform-optimized** implementations for best performance
4. **Framework flexibility** supports React Router, Next.js, Vite, etc.
5. **Type safety** with full TypeScript support
6. **Easy migration** from existing OAuth implementations

## Next Steps (For Implementation in ~1 Month)

1. Ensure `@zestic/oauth-core` is stable and well-tested
2. Review and finalize the React web app requirements
3. Set up the package structure and build configuration
4. Implement the core adapters (storage, HTTP, PKCE)
5. Create React hooks and components
6. Add framework-specific examples and documentation
7. Comprehensive testing across different React setups

This React adapter will complete the OAuth ecosystem, providing consistent authentication across all zestic applications while leveraging the best tools for each platform.
