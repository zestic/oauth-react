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
   * Initiates OAuth flow by redirecting to authorization server
   */
  async startAuthFlow(): Promise<void> {
    const { url } = await this.oauthCore.generateAuthorizationUrl();
    window.location.href = url;
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
