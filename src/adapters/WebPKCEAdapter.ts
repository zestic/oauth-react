import { PKCEAdapter, PKCEParams } from '../types/oauth-core';

/**
 * Web PKCE adapter using Web Crypto API
 * Implements the PKCEAdapter interface for browser environments
 */
export class WebPKCEAdapter implements PKCEAdapter {
  async generatePKCE(): Promise<PKCEParams> {
    const codeVerifier = this.generateCodeVerifier();
    const codeChallenge = await this.generateCodeChallenge(codeVerifier);
    const state = crypto.randomUUID();

    return {
      codeVerifier,
      codeChallenge,
      codeChallengeMethod: 'S256',
      state,
    };
  }

  private generateCodeVerifier(): string {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return btoa(String.fromCharCode(...array))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');
  }

  private async generateCodeChallenge(codeVerifier: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(codeVerifier);
    const digest = await crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode(...new Uint8Array(digest)))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');
  }

  async validateState(storedState: string, receivedState: string): Promise<boolean> {
    return storedState === receivedState;
  }
}
