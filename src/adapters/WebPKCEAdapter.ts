import { PKCEAdapter, PKCEChallenge } from '@zestic/oauth-core';

/**
 * Web PKCE adapter using Web Crypto API
 * Implements the PKCEAdapter interface for browser environments
 */
export class WebPKCEAdapter implements PKCEAdapter {
  async generateCodeChallenge(): Promise<PKCEChallenge> {
    const codeVerifier = this.generateCodeVerifier();
    const codeChallenge = await this.generateCodeChallengeFromVerifier(codeVerifier);

    return {
      codeVerifier,
      codeChallenge,
      codeChallengeMethod: 'S256',
    };
  }

  async generateState(): Promise<string> {
    return crypto.randomUUID();
  }

  private generateCodeVerifier(): string {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return btoa(String.fromCharCode(...array))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');
  }

  private async generateCodeChallengeFromVerifier(codeVerifier: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(codeVerifier);
    const digest = await crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode(...new Uint8Array(digest)))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');
  }
}
