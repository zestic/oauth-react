import { OAuthConfig, OAuthCore, OAuthResult } from '@zestic/oauth-core';
import { WebStorageAdapter } from './adapters/WebStorageAdapter';
import { WebHttpAdapter } from './adapters/WebHttpAdapter';
import { WebPKCEAdapter } from './adapters/WebPKCEAdapter';

/**
 * React web adapter for OAuth authentication
 * Wraps the core OAuth functionality with web-specific implementations
 */
export class ReactOAuthAdapter {
  private oauthCore: OAuthCore;

  constructor(config: OAuthConfig) {
    this.oauthCore = new OAuthCore(config, {
      storage: new WebStorageAdapter(),
      http: new WebHttpAdapter(),
      pkce: new WebPKCEAdapter(),
    });
  }

  /**
   * Generates authorization URL for OAuth flow
   * The app is responsible for handling the redirect
   */
  async generateAuthorizationUrl(
    additionalParams?: Record<string, string>
  ): Promise<{ url: string; state: string }> {
    return await this.oauthCore.generateAuthorizationUrl(additionalParams);
  }

  /**
   * Handles OAuth callback from authorization server
   */
  async handleCallback(params: Record<string, string> | URLSearchParams): Promise<OAuthResult> {
    const urlParams = params instanceof URLSearchParams ? params : new URLSearchParams(params);
    return await this.oauthCore.handleCallback(urlParams);
  }

  /**
   * Get the underlying OAuth core instance for advanced usage
   */
  getCore(): OAuthCore {
    return this.oauthCore;
  }
}
