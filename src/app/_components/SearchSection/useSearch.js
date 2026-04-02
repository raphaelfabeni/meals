"use client";

/**
 * Simplified useSearch Hook (Workshop 3)
 * 
 * Custom hook that manages search state and interactions.
 * This simplified version uses only local state - no API calls yet.
 * 
 * In Workshop 4, we'll enhance this with async operations and real API calls.
 * 
 * Key concepts:
 * - useState for managing component state
 * - Custom hooks to encapsulate logic
 * - Event handlers for user interactions
 */

import { useState } from "react";

// Placeholder data for Workshop 3
// In Workshop 4, this will be replaced with real API calls
const PLACEHOLDER_RECIPES = [
  {
    id: "1",
    name: "Spaghetti Carbonara",
    image: "https://www.themealdb.com/images/media/meals/llcbn01574260722.jpg",
    category: "Pasta",
    area: "Italian",
    instructions: "This is a placeholder recipe. In Workshop 4, you'll fetch real data from the API.",
    ingredients: [
      { name: "Spaghetti", measure: "200g" },
      { name: "Eggs", measure: "2" },
      { name: "Bacon", measure: "100g" }
    ]
  },
  {
    id: "2",
    name: "Chicken Curry",
    image: "https://www.themealdb.com/images/media/meals/wyxwsp1486979827.jpg",
    category: "Chicken",
    area: "Indian",
    instructions: "This is a placeholder recipe. In Workshop 4, you'll fetch real data from the API.",
    ingredients: [
      { name: "Chicken", measure: "500g" },
      { name: "Curry Powder", measure: "2 tbsp" },
      { name: "Coconut Milk", measure: "400ml" }
    ]
  },
  {
    id: "3",
    name: "Beef Wellington",
    image: "https://www.themealdb.com/images/media/meals/vvpprx1487325699.jpg",
    category: "Beef",
    area: "British",
    instructions: "This is a placeholder recipe. In Workshop 4, you'll fetch real data from the API.",
    ingredients: [
      { name: "Beef Fillet", measure: "750g" },
      { name: "Mushrooms", measure: "250g" },
      { name: "Puff Pastry", measure: "500g" }
    ]
  }
];

export function useSearch() {
  // State management - the core of React interactivity
  const [results, setResults] = useState([]);     // Search results to display
  const [busy, setBusy] = useState(false);        // Loading state (not used yet, but ready for Workshop 4)
  const [err, setErr] = useState("");             // Error messages
  const [selected, setSelected] = useState(null); // Currently selected recipe for modal

  /**
   * Search handler - filters placeholder recipes by search term
   * In Workshop 4, this will be replaced with actual API calls
   */
  function handleSearch(term) {
    // Clear previous errors
    setErr("");
    
    // If no search term, show error
    if (!term || term.trim() === "") {
      setErr("Please enter a dish name or ingredient");
      setResults([]);
      return;
    }

    // Simple filter on placeholder data
    // In Workshop 4, this becomes an API call
    const searchLower = term.toLowerCase();
    const filtered = PLACEHOLDER_RECIPES.filter(recipe => 
      recipe.name.toLowerCase().includes(searchLower) ||
      recipe.category.toLowerCase().includes(searchLower) ||
      recipe.area.toLowerCase().includes(searchLower)
    );

    if (filtered.length === 0) {
      setErr("No recipes found. Try searching for 'pasta', 'chicken', or 'beef'");
    }

    setResults(filtered);
  }

  /**
   * Random recipe handler - picks a random recipe from placeholders
   * In Workshop 4, this will call the random meal API endpoint
   */
  function handleRandom() {
    setErr("");
    
    // Pick a random recipe from our placeholder data
    const randomIndex = Math.floor(Math.random() * PLACEHOLDER_RECIPES.length);
    const randomRecipe = PLACEHOLDER_RECIPES[randomIndex];
    
    setResults([randomRecipe]);
  }

  /**
   * Clear all results and reset state
   */
  function clearAll() {
    setErr("");
    setResults([]);
    setSelected(null);
  }

  // Return state and functions for the UI to use
  return {
    // State values
    results,
    busy,
    err,
    selected,

    // State setters (only expose what's needed)
    setSelected,

    // Action handlers
    handleSearch,
    handleRandom,
    clearAll
  };
}