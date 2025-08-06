import { HttpAdapter, HttpRequest, HttpResponse } from '@zestic/oauth-core';

/**
 * Web HTTP adapter using fetch API
 * Implements the HttpAdapter interface for browser environments
 */
export class WebHttpAdapter implements HttpAdapter {
  async request(request: HttpRequest): Promise<HttpResponse> {
    try {
      const response = await fetch(request.url, {
        method: request.method,
        headers: request.headers,
        body: request.body,
      });

      const data = await response.json().catch(() => ({}));

      return {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()),
        data,
        ok: response.ok,
      };
    } catch (error) {
      throw new Error(`Network request failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}
