// Central place for configuration-like values used by the API layer and hooks.
// Keeping them here means you can tweak behavior (e.g., API base, limits)
// without touching UI code.

/**
 * Public base URL for TheMealDB v1 API.
 * We keep it as a string constant so it’s easy to swap vendors later.
 */
export const MEALDB_API_BASE = "https://www.themealdb.com/api/json/v1/1";

/**
 * When searching by ingredient, TheMealDB returns *only* id+name+thumb.
 * We then fetch details per id (one request per recipe).
 * To keep the UI snappy and polite to the public API, cap the number of
 * detail requests per search. 12 gives a good grid without being too heavy.
 */
export const SEARCH_DETAIL_LIMIT = 12;

/**
 * Basic request options for fetch (can be extended later).
 * We keep credentials off and use GET only (the API is read-only).
 */
export const DEFAULT_FETCH_OPTIONS = {
  method: "GET",
  // mode: "cors",     // browsers default to CORS for cross-origin; uncomment if you want to be explicit
  // cache: "no-store" // for dev; consider "force-cache" if you add server components later
};