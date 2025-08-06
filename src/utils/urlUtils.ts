/**
 * URL utility functions for OAuth flows
 */

/**
 * Extracts query parameters from a URL string
 */
export function extractQueryParams(url: string): Record<string, string> {
  const urlObj = new URL(url);
  const params: Record<string, string> = {};

  urlObj.searchParams.forEach((value, key) => {
    params[key] = value;
  });

  return params;
}

/**
 * Builds a URL with query parameters
 */
export function buildUrlWithParams(baseUrl: string, params: Record<string, string>): string {
  const url = new URL(baseUrl);

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.set(key, value);
    }
  });

  return url.toString();
}

/**
 * Gets the current page URL without query parameters
 */
export function getCurrentBaseUrl(): string {
  return `${window.location.protocol}//${window.location.host}${window.location.pathname}`;
}

/**
 * Validates if a URL is a valid redirect URI
 */
export function isValidRedirectUri(uri: string): boolean {
  try {
    const url = new URL(uri);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

/**
 * Extracts the fragment parameters from a URL (for implicit flow)
 */
export function extractFragmentParams(url: string): Record<string, string> {
  const urlObj = new URL(url);
  const fragment = urlObj.hash.substring(1); // Remove the '#'
  const params: Record<string, string> = {};

  if (fragment) {
    const searchParams = new URLSearchParams(fragment);
    searchParams.forEach((value, key) => {
      params[key] = value;
    });
  }

  return params;
}
