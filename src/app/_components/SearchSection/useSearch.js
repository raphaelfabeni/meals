"use client";

/**
 * useSearch Hook
 * 
 * Custom hook that manages search state and interactions.
 * Currently uses hardcoded data - always shows the same recipe.
 * 
 * Key concepts:
 * - useState for managing component state
 * - Custom hooks to encapsulate logic
 * - Event handlers
 */

import { useState } from "react";

// Hardcoded recipe data
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
   * Currently always shows the same hardcoded recipe
   */
  function handleSearch(term) {
    // Show the demo recipe
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