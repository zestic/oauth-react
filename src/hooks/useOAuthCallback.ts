import { useState, useCallback } from 'react';
import { OAuthConfig } from '../types/oauth-core';
import { ReactOAuthAdapter } from '../ReactOAuthAdapter';

interface UseOAuthCallbackResult {
  status: 'processing' | 'success' | 'error';
  message: string;
  error: string | null;
  handleCallback: () => Promise<void>;
}

/**
 * React hook for handling OAuth callback
 * Manages the OAuth callback flow state and provides callback handling function
 */
export function useOAuthCallback(config: OAuthConfig): UseOAuthCallbackResult {
  const [status, setStatus] = useState<'processing' | 'success' | 'error'>('processing');
  const [message, setMessage] = useState('Processing OAuth callback...');
  const [error, setError] = useState<string | null>(null);

  const handleCallback = useCallback(async () => {
    try {
      setStatus('processing');
      setMessage('Processing OAuth callback...');
      setError(null);

      const adapter = new ReactOAuthAdapter(config);
      
      // Extract URL parameters
      const urlParams = new URLSearchParams(window.location.search);
      const params = Object.fromEntries(urlParams.entries());
      
      const result = await adapter.handleCallback(params);

      if (result.success) {
        setStatus('success');
        setMessage('OAuth authentication successful!');
        
        // Navigate to main app after delay
        setTimeout(() => {
          window.location.href = '/';
        }, 1500);
      } else {
        throw new Error(result.error || 'OAuth authentication failed');
      }
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
      setMessage('OAuth authentication failed');
    }
  }, [config]);

  return {
    status,
    message,
    error,
    handleCallback,
  };
}
