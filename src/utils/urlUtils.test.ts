import { describe, it, expect } from 'vitest';
import {
  extractQueryParams,
  buildUrlWithParams,
  isValidRedirectUri,
  extractFragmentParams,
} from './urlUtils';

describe('urlUtils', () => {
  describe('extractQueryParams', () => {
    it('should extract query parameters from URL', () => {
      const url = 'https://example.com/callback?code=123&state=abc';
      const params = extractQueryParams(url);

      expect(params).toEqual({
        code: '123',
        state: 'abc',
      });
    });

    it('should return empty object for URL without query params', () => {
      const url = 'https://example.com/callback';
      const params = extractQueryParams(url);

      expect(params).toEqual({});
    });
  });

  describe('buildUrlWithParams', () => {
    it('should build URL with query parameters', () => {
      const baseUrl = 'https://example.com/auth';
      const params = { client_id: '123', redirect_uri: 'https://app.com/callback' };
      const result = buildUrlWithParams(baseUrl, params);

      expect(result).toBe(
        'https://example.com/auth?client_id=123&redirect_uri=https%3A%2F%2Fapp.com%2Fcallback'
      );
    });

    it('should skip null and undefined values', () => {
      const baseUrl = 'https://example.com/auth';
      const params = {
        client_id: '123',
        state: null as string | null,
        scope: undefined as string | undefined,
      };
      const result = buildUrlWithParams(baseUrl, params);

      expect(result).toBe('https://example.com/auth?client_id=123');
    });
  });

  describe('isValidRedirectUri', () => {
    it('should return true for valid HTTP URLs', () => {
      expect(isValidRedirectUri('http://localhost:3000/callback')).toBe(true);
      expect(isValidRedirectUri('https://example.com/auth/callback')).toBe(true);
    });

    it('should return false for invalid URLs', () => {
      expect(isValidRedirectUri('invalid-url')).toBe(false);
      expect(isValidRedirectUri('ftp://example.com')).toBe(false);
    });
  });

  describe('extractFragmentParams', () => {
    it('should extract fragment parameters from URL', () => {
      const url = 'https://example.com/callback#access_token=123&token_type=bearer';
      const params = extractFragmentParams(url);

      expect(params).toEqual({
        access_token: '123',
        token_type: 'bearer',
      });
    });

    it('should return empty object for URL without fragment', () => {
      const url = 'https://example.com/callback';
      const params = extractFragmentParams(url);

      expect(params).toEqual({});
    });
  });
});
