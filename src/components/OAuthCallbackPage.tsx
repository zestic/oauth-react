import { useEffect } from 'react';
import { OAuthConfig } from '../types/oauth-core';
import { useOAuthCallback } from '../hooks/useOAuthCallback';

interface OAuthCallbackPageProps {
  config: OAuthConfig;
  onSuccess?: (tokens: { accessToken: string; refreshToken?: string }) => void;
  onError?: (error: string) => void;
}

/**
 * OAuth callback page component
 * Handles the OAuth callback flow and displays appropriate status messages
 */
export function OAuthCallbackPage({ config, onSuccess: _onSuccess, onError }: OAuthCallbackPageProps) {
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
            <button onClick={() => (window.location.href = '/login')}>Try Again</button>
          </div>
        );

      default:
        return null;
    }
  };

  return <div className="oauth-callback-container">{renderContent()}</div>;
}
