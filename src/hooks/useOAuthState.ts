import { useState, useCallback, useEffect } from 'react';
import { OAuthTokens } from '../types/oauth-core';

interface OAuthState {
  isAuthenticated: boolean;
  tokens: OAuthTokens | null;
  isLoading: boolean;
  error: string | null;
}

interface UseOAuthStateResult extends OAuthState {
  setTokens: (tokens: OAuthTokens | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearState: () => void;
}

/**
 * React hook for managing OAuth authentication state
 * Provides centralized state management for OAuth tokens and authentication status
 */
export function useOAuthState(): UseOAuthStateResult {
  const [state, setState] = useState<OAuthState>({
    isAuthenticated: false,
    tokens: null,
    isLoading: false,
    error: null,
  });

  const setTokens = useCallback((tokens: OAuthTokens | null) => {
    setState(current => ({
      ...current,
      tokens,
      isAuthenticated: !!tokens,
      error: null,
    }));
  }, []);

  const setLoading = useCallback((isLoading: boolean) => {
    setState(current => ({
      ...current,
      isLoading,
    }));
  }, []);

  const setError = useCallback((error: string | null) => {
    setState(current => ({
      ...current,
      error,
      isLoading: false,
    }));
  }, []);

  const clearState = useCallback(() => {
    setState({
      isAuthenticated: false,
      tokens: null,
      isLoading: false,
      error: null,
    });
  }, []);

  // Check for existing tokens on mount
  useEffect(() => {
    // Implementation will check localStorage for existing tokens
    // This will be implemented in Phase 2
  }, []);

  return {
    ...state,
    setTokens,
    setLoading,
    setError,
    clearState,
  };
}
