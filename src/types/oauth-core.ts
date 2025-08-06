// Temporary type definitions for @zestic/oauth-core
// These will be replaced when the actual package is available

export interface OAuthConfig {
  clientId: string;
  endpoints: {
    authorization: string;
    token: string;
    revocation: string;
  };
  redirectUri: string;
  scopes: string[];
}

export interface OAuthTokens {
  accessToken: string;
  refreshToken?: string;
  expiresIn?: number;
  tokenType?: string;
}

export interface StorageAdapter {
  setItem(key: string, value: string): Promise<void>;
  getItem(key: string): Promise<string | null>;
  removeItem(key: string): Promise<void>;
  removeItems(keys: string[]): Promise<void>;
}

export interface HttpRequest {
  url: string;
  method: string;
  headers?: Record<string, string>;
  body?: string;
}

export interface HttpResponse {
  status: number;
  statusText: string;
  headers: Record<string, string>;
  data: unknown;
  ok: boolean;
}

export interface HttpAdapter {
  request(request: HttpRequest): Promise<HttpResponse>;
}

export interface PKCEParams {
  codeVerifier: string;
  codeChallenge: string;
  codeChallengeMethod: string;
  state: string;
}

export interface PKCEAdapter {
  generatePKCE(): Promise<PKCEParams>;
  validateState(storedState: string, receivedState: string): Promise<boolean>;
}

// Base OAuth adapter class (placeholder)
export class OAuthAdapter {
  constructor(
    protected config: OAuthConfig,
    protected storageAdapter: StorageAdapter,
    protected httpAdapter: HttpAdapter,
    protected pkceAdapter: PKCEAdapter
  ) {}

  async getAuthorizationUrl(): Promise<string> {
    // Placeholder implementation
    return `${this.config.endpoints.authorization}?client_id=${this.config.clientId}&redirect_uri=${this.config.redirectUri}`;
  }
}
