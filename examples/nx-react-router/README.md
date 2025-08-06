# Nx + React Router 6 Example

This example demonstrates how to integrate `@zestic/oauth-react` with an Nx monorepo using React Router 6.

## Key Features

- ✅ **Navigation-agnostic**: Uses callback pattern, no hard-coded navigation
- ✅ **React Router 6**: Proper integration with `useNavigate` and `useSearchParams`
- ✅ **Nx monorepo**: Works seamlessly in Nx workspace
- ✅ **TypeScript**: Full type safety

## Setup

### 1. Install Dependencies

```bash
# In your Nx workspace
npm install @zestic/oauth-react @zestic/oauth-core
```

### 2. OAuth Configuration

```typescript
// libs/auth/src/oauth-config.ts
import { OAuthConfig } from '@zestic/oauth-core';

export const oauthConfig: OAuthConfig = {
  clientId: process.env['NX_AUTH_CLIENT_ID']!,
  endpoints: {
    authorization: `${process.env['NX_AUTH_OAUTH_BASE_URL']}/oauth/authorize`,
    token: `${process.env['NX_AUTH_OAUTH_BASE_URL']}/oauth/token`,
    revocation: `${process.env['NX_AUTH_OAUTH_BASE_URL']}/oauth/revoke`,
  },
  redirectUri: `${window.location.origin}/auth/callback`,
  scopes: ['read', 'write'],
};
```

### 3. Login Component

```typescript
// apps/my-app/src/components/LoginButton.tsx
import { ReactOAuthAdapter } from '@zestic/oauth-react';
import { oauthConfig } from '@my-workspace/auth';

export function LoginButton() {
  const handleLogin = async () => {
    const adapter = new ReactOAuthAdapter(oauthConfig);
    const { url } = await adapter.generateAuthorizationUrl();
    
    // App handles the redirect
    window.location.href = url;
  };

  return (
    <button onClick={handleLogin}>
      Login with OAuth
    </button>
  );
}
```

### 4. OAuth Callback Page

```typescript
// apps/my-app/src/pages/AuthCallback.tsx
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  OAuthCallbackPage, 
  ReactRouterParameterExtractor 
} from '@zestic/oauth-react';
import { oauthConfig } from '@my-workspace/auth';

export function AuthCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  return (
    <OAuthCallbackPage
      config={oauthConfig}
      parameterExtractor={new ReactRouterParameterExtractor(searchParams)}
      onSuccess={(result) => {
        // Store tokens in your auth state management
        console.log('OAuth success:', result);
        
        // Navigate to dashboard
        navigate('/dashboard');
      }}
      onError={(error) => {
        console.error('OAuth error:', error);
        
        // Navigate to login with error
        navigate('/login?error=oauth_failed');
      }}
      onRetry={() => {
        // Custom retry logic or navigate back to login
        navigate('/login');
      }}
    />
  );
}
```

### 5. Router Setup

```typescript
// apps/my-app/src/app/App.tsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthCallback } from '../pages/AuthCallback';
import { LoginButton } from '../components/LoginButton';

const router = createBrowserRouter([
  {
    path: '/',
    element: <div>Home <LoginButton /></div>,
  },
  {
    path: '/auth/callback',
    element: <AuthCallback />,
  },
  {
    path: '/dashboard',
    element: <div>Dashboard - You're logged in!</div>,
  },
  {
    path: '/login',
    element: <div>Login Page <LoginButton /></div>,
  },
]);

export function App() {
  return <RouterProvider router={router} />;
}
```

### 6. Environment Variables

```bash
# .env or environment files
NX_AUTH_CLIENT_ID=your_client_id
NX_AUTH_OAUTH_BASE_URL=https://your-oauth-provider.com
```

## Advanced Usage

### Custom Parameter Extraction

```typescript
// For custom routing solutions
import { CustomParameterExtractor } from '@zestic/oauth-react';

const customExtractor = new CustomParameterExtractor(() => {
  // Your custom logic to extract URL parameters
  return new URLSearchParams(customRouter.getSearchParams());
});

<OAuthCallbackPage
  config={oauthConfig}
  parameterExtractor={customExtractor}
  // ...
/>
```

### Integration with State Management

```typescript
// With Redux, Zustand, or other state management
export function AuthCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { setTokens, setUser } = useAuthStore();

  return (
    <OAuthCallbackPage
      config={oauthConfig}
      parameterExtractor={new ReactRouterParameterExtractor(searchParams)}
      onSuccess={(result) => {
        // Update your auth state
        setTokens({
          accessToken: result.accessToken!,
          refreshToken: result.refreshToken,
        });
        
        // Fetch user info, update state, etc.
        // Then navigate
        navigate('/dashboard');
      }}
      // ...
    />
  );
}
```

## Benefits

1. **Router Agnostic**: Works with any routing solution
2. **No Hard-coded Navigation**: Your app controls all navigation
3. **Type Safe**: Full TypeScript support
4. **Flexible**: Easy to integrate with existing auth state management
5. **Consistent**: Follows the same pattern as oauth-expo
