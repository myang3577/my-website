const CORS_PROXY = "https://corsproxy.io/?";

/**
 * Wrapper around fetch that uses CORS proxy.
 */
export const fetchCorsProxy = (url: RequestInfo | URL, init?: RequestInit) => {
  return fetch(`${CORS_PROXY}${url}`, init);
};
