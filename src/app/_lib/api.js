// Thin API layer. Each function:
// - builds the endpoint URL
// - performs a fetch with shared options
// - normalizes data into our UI shape
//
// Keeping network code here means components and hooks stay lean and testable.

import { MEALDB_API_BASE, SEARCH_DETAIL_LIMIT, DEFAULT_FETCH_OPTIONS } from "@_lib/constants";
import { normalizeMeal } from "@_lib/normalize";

/**
 * Search by dish name (e.g., "teriyaki", "pasta").
 * Endpoint returns full recipe objects, so no extra round trips are needed.
 */
export async function searchByName(term) {
  const url = `${MEALDB_API_BASE}/search.php?s=${encodeURIComponent(term)}`;

  const res = await fetch(url, DEFAULT_FETCH_OPTIONS);
  if (!res.ok) throw new Error(`Network error (${res.status}) while searchByName`);

  const data = await res.json();
  // If no hits, API returns { meals: null }
  const meals = data.meals || [];
  return meals.map(normalizeMeal);
}

/**
 * Search by ingredient (e.g., "chicken", "garlic").
 * First endpoint returns minimal items (id+name+thumb), so we follow up with
 * detail requests to fetch full instructions + ingredient lists.
 */
export async function searchByIngredient(term) {
  const url = `${MEALDB_API_BASE}/filter.php?i=${encodeURIComponent(term)}`;

  const res = await fetch(url, DEFAULT_FETCH_OPTIONS);
  if (!res.ok) throw new Error(`Network error (${res.status}) while searchByIngredient`);

  const data = await res.json();
  const list = data.meals || [];
  if (!list.length) return [];

  // Limit fan-out to avoid a storm of requests.
  const ids = list.map((m) => m.idMeal).slice(0, SEARCH_DETAIL_LIMIT);

  // Fetch details for each id in parallel.
  const details = await Promise.all(
    ids.map(async (id) => {
      const r = await fetch(`${MEALDB_API_BASE}/lookup.php?i=${id}`, DEFAULT_FETCH_OPTIONS);
      if (!r.ok) return null;
      const d = await r.json();
      const meal = d.meals?.[0];
      return meal ? normalizeMeal(meal) : null;
    })
  );

  return details.filter(Boolean);
}

/**
 * Fetch a single random recipe — perfect for “Surprise me”.
 */
export async function randomMeal() {
  const res = await fetch(`${MEALDB_API_BASE}/random.php`, DEFAULT_FETCH_OPTIONS);
  if (!res.ok) throw new Error(`Network error (${res.status}) while randomMeal`);

  const data = await res.json();
  const meal = data.meals?.[0];
  return meal ? normalizeMeal(meal) : null;
}