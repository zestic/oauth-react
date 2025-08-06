import { createContext, useContext, ReactNode } from 'react';
import { OAuthConfig } from '@zestic/oauth-core';

interface OAuthContextValue {
  config: OAuthConfig;
  // Additional context values will be added during implementation
}

const OAuthContext = createContext<OAuthContextValue | null>(null);

interface OAuthProviderProps {
  config: OAuthConfig;
  children: ReactNode;
}

/**
 * OAuth context provider for React applications
 * Provides OAuth configuration and state management throughout the component tree
 */
export function OAuthProvider({ config, children }: OAuthProviderProps) {
  const value: OAuthContextValue = {
    config,
    // Additional state management will be implemented in Phase 2
  };

  return <OAuthContext.Provider value={value}>{children}</OAuthContext.Provider>;
}

/**
 * Hook to access OAuth context
 */
export function useOAuthContext() {
  const context = useContext(OAuthContext);
  if (!context) {
    throw new Error('useOAuthContext must be used within an OAuthProvider');
  }
  return context;
}
