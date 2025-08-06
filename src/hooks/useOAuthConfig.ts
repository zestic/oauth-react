import { useState, useCallback } from 'react';
import { OAuthConfig } from '@zestic/oauth-core';

interface UseOAuthConfigResult {
  config: OAuthConfig | null;
  setConfig: (config: OAuthConfig) => void;
  updateConfig: (updates: Partial<OAuthConfig>) => void;
  clearConfig: () => void;
}

/**
 * React hook for managing OAuth configuration
 * Provides state management for OAuth configuration with update utilities
 */
export function useOAuthConfig(initialConfig?: OAuthConfig): UseOAuthConfigResult {
  const [config, setConfigState] = useState<OAuthConfig | null>(initialConfig || null);

  const setConfig = useCallback((newConfig: OAuthConfig) => {
    setConfigState(newConfig);
  }, []);

  const updateConfig = useCallback((updates: Partial<OAuthConfig>) => {
    setConfigState(current => {
      if (!current) return null;
      return { ...current, ...updates };
    });
  }, []);

  const clearConfig = useCallback(() => {
    setConfigState(null);
  }, []);

  return {
    config,
    setConfig,
    updateConfig,
    clearConfig,
  };
}
