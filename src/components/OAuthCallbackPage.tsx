import { OAuthConfig, OAuthResult } from '@zestic/oauth-core';
import { useOAuthCallback } from '../hooks/useOAuthCallback';
import { ParameterExtractor } from '../types/NavigationTypes';

export interface OAuthCallbackPageProps {
  config: OAuthConfig;
  onSuccess?: (result: OAuthResult) => void;
  onError?: (error: Error) => void;
  onRetry?: () => void;
  parameterExtractor?: ParameterExtractor;
  autoStart?: boolean;
}

/**
 * OAuth callback page component
 * Handles the OAuth callback flow and displays appropriate status messages
 * Follows oauth-expo pattern with callback-based navigation
 */
export function OAuthCallbackPage({
  config,
  onSuccess,
  onError,
  onRetry,
  parameterExtractor,
  autoStart = true,
}: OAuthCallbackPageProps) {
  const { status, message, error, retry } = useOAuthCallback(config, {
    onSuccess,
    onError,
    autoStart,
    parameterExtractor,
  });

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
            <button onClick={onRetry || retry}>Try Again</button>
          </div>
        );

      default:
        return null;
    }
  };

  return <div className="oauth-callback-container">{renderContent()}</div>;
}
