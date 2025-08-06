import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  BrowserParameterExtractor,
  ReactRouterParameterExtractor,
  CustomParameterExtractor,
} from './NavigationTypes';

describe('NavigationTypes', () => {
  describe('BrowserParameterExtractor', () => {
    beforeEach(() => {
      // Mock window.location
      Object.defineProperty(window, 'location', {
        value: {
          search: '?code=123&state=abc',
        },
        writable: true,
      });
    });

    it('should extract parameters from window.location.search', () => {
      const extractor = new BrowserParameterExtractor();
      const params = extractor.getSearchParams();

      expect(params.get('code')).toBe('123');
      expect(params.get('state')).toBe('abc');
    });
  });

  describe('ReactRouterParameterExtractor', () => {
    it('should return the provided URLSearchParams', () => {
      const searchParams = new URLSearchParams('?code=456&state=def');
      const extractor = new ReactRouterParameterExtractor(searchParams);
      const params = extractor.getSearchParams();

      expect(params.get('code')).toBe('456');
      expect(params.get('state')).toBe('def');
    });
  });

  describe('CustomParameterExtractor', () => {
    it('should work with URLSearchParams', () => {
      const searchParams = new URLSearchParams('?code=789&state=ghi');
      const extractor = new CustomParameterExtractor(searchParams);
      const params = extractor.getSearchParams();

      expect(params.get('code')).toBe('789');
      expect(params.get('state')).toBe('ghi');
    });

    it('should work with function', () => {
      const mockFunction = vi.fn(() => new URLSearchParams('?code=101&state=jkl'));
      const extractor = new CustomParameterExtractor(mockFunction);
      const params = extractor.getSearchParams();

      expect(mockFunction).toHaveBeenCalled();
      expect(params.get('code')).toBe('101');
      expect(params.get('state')).toBe('jkl');
    });
  });
});
