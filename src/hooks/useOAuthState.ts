import { useState, useCallback, useEffect } from 'react';
import { OAuthResult } from '@zestic/oauth-core';

interface OAuthTokens {
  accessToken: string;
  refreshToken?: string;
  expiresIn?: number;
}

interface OAuthState {
  isAuthenticated: boolean;
  tokens: OAuthTokens | null;
  isLoading: boolean;
  error: string | null;
}

interface UseOAuthStateResult extends OAuthState {
  setTokens: (tokens: OAuthTokens | null) => void;
  setResult: (result: OAuthResult) => void;
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

  const setResult = useCallback((result: OAuthResult) => {
    if (result.success && result.accessToken) {
      const tokens: OAuthTokens = {
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
        expiresIn: result.expiresIn,
      };
      setTokens(tokens);
    } else {
      setState(current => ({
        ...current,
        error: result.error || 'Authentication failed',
        isLoading: false,
      }));
    }
  }, [setTokens]);

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
    setResult,
    setLoading,
    setError,
    clearState,
  };
}
