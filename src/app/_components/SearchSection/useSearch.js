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
  },
  {
    id: "2",
    title: "Chicken Curry",
    imageUrl: "https://www.themealdb.com/images/media/meals/wyxwsp1486979827.jpg",
    category: "Chicken",
    area: "Indian",
    instructions: "Cut chicken into bite-sized pieces.\nHeat oil and fry onions until golden.\nAdd curry powder and cook for 1 minute.\nAdd chicken and cook until browned.\nPour in coconut milk and simmer for 20 minutes.\nServe with rice.",
    ingredients: [
      "500g Chicken Breast",
      "2 tbsp Curry Powder",
      "400ml Coconut Milk",
      "1 Onion, diced",
      "2 tbsp Vegetable Oil"
    ]
  },
  {
    id: "3",
    title: "Beef Wellington",
    imageUrl: "https://www.themealdb.com/images/media/meals/vvpprx1487325699.jpg",
    category: "Beef",
    area: "British",
    instructions: "Sear beef fillet on all sides.\nSauté mushrooms until moisture evaporates.\nWrap beef in mushroom mixture and prosciutto.\nEncase in puff pastry.\nBake at 200°C for 25-30 minutes.\nRest for 10 minutes before slicing.",
    ingredients: [
      "750g Beef Fillet",
      "250g Mushrooms, finely chopped",
      "500g Puff Pastry",
      "6 slices Prosciutto",
      "2 Egg Yolks for brushing"
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
      recipe.title.toLowerCase().includes(searchLower) ||
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