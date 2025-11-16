"use client";

// Custom hook that owns all interactivity:
// - local state (results, loading, error, selected recipe)
// - event handlers (search by name/ingredient, random, clear)
// The UI component imports this hook and stays mostly markup.

import { useState } from "react";
import { searchByName, searchByIngredient, randomMeal } from "@_lib/api";

export function useSearch() {
  // --- local state buckets used by the UI ---
  const [results, setResults] = useState([]);     // array of normalized recipes
  const [busy, setBusy] = useState(false);        // network in flight
  const [err, setErr] = useState("");             // user-facing error message
  const [selected, setSelected] = useState(null); // currently opened recipe (for modal)

  /**
   * Main search handler:
   * - CTA-only: nothing fires until the user submits a term
   * - Try name search first; if empty, fallback to ingredient search
   * - Errors become a generic message (no leaky technical details)
   */
  async function handleSearch(term) {
    setErr("");
    setBusy(true);
    setResults([]);

    try {
      let found = await searchByName(term);
      if (!found.length) {
        found = await searchByIngredient(term);
      }
      if (!found.length) {
        setErr("No recipes found. Try a different dish or ingredient.");
      }
      setResults(found);
    } catch {
      setErr("Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  /**
   * “Surprise me”:
   * - Clears current results, shows loader, fetches a random meal
   * - Converts nulls to a friendly error
   */
  async function handleRandom() {
    setErr("");
    setBusy(true);
    setResults([]);

    try {
      const one = await randomMeal();
      setResults(one ? [one] : []);
      if (!one) setErr("No recipe returned. Try again.");
    } catch {
      setErr("Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  /** Clear everything (used by “Clear results” button). */
  function clearAll() {
    setErr("");
    setResults([]);
    setSelected(null);
  }

  return {
    // state exposed to the UI
    results,
    busy,
    err,
    selected,

    // state setters selectively exposed
    setSelected,

    // actions exposed to the UI
    handleSearch,
    handleRandom,
    clearAll
  };
}