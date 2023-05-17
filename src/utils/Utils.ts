const CORS_PROXY = "https://corsproxy.io/?";

/**
 * Wrapper around fetch that uses CORS proxy.
 */
export const fetchCorsProxy = (url: RequestInfo | URL, init?: RequestInit) => {
  return fetch(`${CORS_PROXY}${url}`, init);
};

/**
 * Helper to add an `id` field to each object of the list to use as data for the MUI DataGrid object.
 *
 * @param list
 */
export const withIdField = <T>(list: T[]): T[] => {
  return list.map((item, index) => ({ ...item, id: index }));
};
