import { useState, useCallback, useEffect } from 'react';
import { OAuthConfig, OAuthResult } from '@zestic/oauth-core';
import { ReactOAuthAdapter } from '../ReactOAuthAdapter';
import { ParameterExtractor, BrowserParameterExtractor } from '../types/NavigationTypes';

export interface UseOAuthCallbackOptions {
  onSuccess?: (result: OAuthResult) => void;
  onError?: (error: Error) => void;
  autoStart?: boolean;
  parameterExtractor?: ParameterExtractor;
}

export interface UseOAuthCallbackResult {
  status: 'processing' | 'success' | 'error';
  message: string;
  error: string | null;
  handleCallback: () => Promise<void>;
  retry: () => void;
}

/**
 * React hook for handling OAuth callback processing
 * Manages the OAuth callback flow state and provides handlers
 * Follows oauth-expo pattern with callback-based navigation
 */
export function useOAuthCallback(
  config: OAuthConfig,
  options?: UseOAuthCallbackOptions
): UseOAuthCallbackResult {
  const [status, setStatus] = useState<'processing' | 'success' | 'error'>('processing');
  const [message, setMessage] = useState('Processing OAuth callback...');
  const [error, setError] = useState<string | null>(null);

  const handleCallback = useCallback(async (): Promise<void> => {
    try {
      setStatus('processing');
      setMessage('Processing OAuth callback...');
      setError(null);

      const adapter = new ReactOAuthAdapter(config);

      // Use pluggable parameter extractor or default to browser
      const parameterExtractor = options?.parameterExtractor || new BrowserParameterExtractor();
      const urlParams = parameterExtractor.getSearchParams();

      const result = await adapter.handleCallback(urlParams);

      if (result.success) {
        setStatus('success');
        setMessage('Authentication successful');
        options?.onSuccess?.(result);
      } else {
        throw new Error(result.error || 'OAuth authentication failed');
      }
    } catch (err) {
      setStatus('error');
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      setMessage('OAuth authentication failed');
      options?.onError?.(err instanceof Error ? err : new Error(errorMessage));
    }
  }, [config, options]);

  const retry = useCallback(() => {
    handleCallback();
  }, [handleCallback]);

  // Auto-start if enabled (default: true)
  useEffect(() => {
    if (options?.autoStart !== false) {
      handleCallback();
    }
  }, [handleCallback, options?.autoStart]);

  return {
    status,
    message,
    error,
    handleCallback,
    retry,
  };
}
