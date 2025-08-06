// Main exports for @zestic/oauth-react
export { ReactOAuthAdapter } from './ReactOAuthAdapter';

// Components
export { OAuthCallbackPage } from './components/OAuthCallbackPage';
export { OAuthProvider } from './components/OAuthProvider';

// Hooks
export { useOAuthCallback } from './hooks/useOAuthCallback';
export { useOAuthConfig } from './hooks/useOAuthConfig';
export { useOAuthState } from './hooks/useOAuthState';

// Adapters
export { WebStorageAdapter } from './adapters/WebStorageAdapter';
export { WebHttpAdapter } from './adapters/WebHttpAdapter';
export { WebPKCEAdapter } from './adapters/WebPKCEAdapter';

// Utils
export * from './utils/urlUtils';
export * from './utils/cryptoUtils';

// Re-export types from temporary oauth-core types for convenience
export type {
  OAuthConfig,
  OAuthTokens,
  StorageAdapter,
  HttpAdapter,
  PKCEAdapter,
  PKCEParams,
} from './types/oauth-core';
