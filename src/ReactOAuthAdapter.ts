import { OAuthConfig, OAuthAdapter } from './types/oauth-core';
import { WebStorageAdapter } from './adapters/WebStorageAdapter';
import { WebHttpAdapter } from './adapters/WebHttpAdapter';
import { WebPKCEAdapter } from './adapters/WebPKCEAdapter';

/**
 * React web adapter for OAuth authentication
 * Extends the core OAuth functionality with web-specific implementations
 */
export class ReactOAuthAdapter extends OAuthAdapter {
  constructor(config: OAuthConfig) {
    super(
      config,
      new WebStorageAdapter(),
      new WebHttpAdapter(),
      new WebPKCEAdapter()
    );
  }

  /**
   * Initiates OAuth flow by redirecting to authorization server
   */
  async startAuthFlow(): Promise<void> {
    const authUrl = await this.getAuthorizationUrl();
    window.location.href = authUrl;
  }

  /**
   * Handles OAuth callback from authorization server
   */
  async handleCallback(_params: Record<string, string>) {
    // Implementation will be added in Phase 1
    return { success: false, error: 'Not implemented yet' };
  }
}
