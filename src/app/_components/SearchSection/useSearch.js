"use client";

/**
 * Simplified useSearch Hook (Workshop 3)
 * 
 * This version shows the full UI (SearchBar + RecipeCard) but with hardcoded data.
 * No matter what the user searches, it always shows the same recipe.
 * 
 * Students learn:
 * - useState for managing component state
 * - Custom hooks to encapsulate logic
 * - Event handlers
 * 
 * In Workshop 4, we'll add:
 * - Real search functionality with filtering
 * - API calls with async/await
 * - Loading and error states
 */

import { useState } from "react";

// Hardcoded recipe for Workshop 3
// In Workshop 4, this will come from API calls
const DEMO_RECIPE = {
  id: "1",
  title: "Spaghetti Carbonara",
  imageUrl: "https://www.themealdb.com/images/media/meals/llcbn01574260722.jpg",
  category: "Pasta",
  area: "Italian",
  instructions: "Cook spaghetti according to package directions.\nFry bacon until crispy.\nMix eggs with parmesan cheese.\nCombine hot pasta with bacon and egg mixture.\nServe immediately with extra parmesan.",
  ingredients: [
    "200g Spaghetti",
    "2 Eggs",
    "100g Bacon",
    "50g Parmesan Cheese",
    "Black Pepper to taste"
  ]
};

export function useSearch() {
  // State for search results and modal
  const [results, setResults] = useState([]);
  const [selected, setSelected] = useState(null);

  /**
   * Handle search submission
   * In Workshop 3: Always shows the same hardcoded recipe
   * In Workshop 4: Will actually search/filter based on the term
   */
  function handleSearch(term) {
    // For now, just show the demo recipe no matter what they search
    setResults([DEMO_RECIPE]);
  }

  /**
   * Handle clicking a recipe card to open the modal
   */
  function handleCardClick(recipe) {
    setSelected(recipe);
  }

  /**
   * Close the modal
   */
  function handleCloseModal() {
    setSelected(null);
  }

  /**
   * Clear all results
   */
  function handleClearResults() {
    setResults([]);
    setSelected(null);
  }

  // Return state and functions for the UI to use
  return {
    results,
    selected,
    handleSearch,
    handleCardClick,
    handleCloseModal,
    handleClearResults
  };
}