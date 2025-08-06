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

// Re-export types from oauth-core for convenience
export type {
  OAuthConfig,
  OAuthResult,
  StorageAdapter,
  HttpAdapter,
  PKCEAdapter,
  PKCEChallenge,
  OAuthCore,
} from '@zestic/oauth-core';
