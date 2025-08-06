/**
 * Navigation and parameter extraction types for router-agnostic OAuth handling
 */

/**
 * Interface for extracting URL parameters from different routing systems
 */
export interface ParameterExtractor {
  /**
   * Extract URL search parameters for OAuth callback processing
   * @returns URLSearchParams containing the callback parameters
   */
  getSearchParams(): URLSearchParams;
}

/**
 * Default browser-based parameter extractor
 * Uses window.location.search directly
 */
export class BrowserParameterExtractor implements ParameterExtractor {
  getSearchParams(): URLSearchParams {
    return new URLSearchParams(window.location.search);
  }
}

/**
 * React Router parameter extractor
 * Uses React Router's useSearchParams hook result
 */
export class ReactRouterParameterExtractor implements ParameterExtractor {
  constructor(private searchParams: URLSearchParams) {}

  getSearchParams(): URLSearchParams {
    return this.searchParams;
  }
}

/**
 * Custom parameter extractor
 * Allows passing custom URLSearchParams or extraction function
 */
export class CustomParameterExtractor implements ParameterExtractor {
  constructor(private paramsOrExtractor: URLSearchParams | (() => URLSearchParams)) {}

  getSearchParams(): URLSearchParams {
    if (typeof this.paramsOrExtractor === 'function') {
      return this.paramsOrExtractor();
    }
    return this.paramsOrExtractor;
  }
}
