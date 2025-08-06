import { HttpAdapter, HttpResponse } from '@zestic/oauth-core';

/**
 * Web HTTP adapter using fetch API
 * Implements the HttpAdapter interface for browser environments
 */
export class WebHttpAdapter implements HttpAdapter {
  async post(
    url: string,
    data: Record<string, unknown>,
    headers?: Record<string, string>
  ): Promise<HttpResponse> {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          ...headers,
        },
        body: new URLSearchParams(data as Record<string, string>).toString(),
      });

      const responseData = await response.json().catch(() => ({}));

      return {
        status: response.status,
        data: responseData,
        headers: Object.fromEntries(response.headers.entries()),
      };
    } catch (error) {
      throw new Error(
        `Network request failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  async get(url: string, headers?: Record<string, string>): Promise<HttpResponse> {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers,
      });

      const data = await response.json().catch(() => ({}));

      return {
        status: response.status,
        data,
        headers: Object.fromEntries(response.headers.entries()),
      };
    } catch (error) {
      throw new Error(
        `Network request failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }
}
