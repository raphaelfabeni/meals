"use client";

/**
 * Simplified useSearch Hook (Workshop 3)
 * 
 * This is a very basic version that just manages modal open/close state.
 * Students learn:
 * - useState for managing component state
 * - Custom hooks to encapsulate logic
 * 
 * In Workshop 4, we'll add:
 * - Real search functionality
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
  // Simple state: is the modal open and which recipe to show?
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  /**
   * Open modal with the demo recipe
   * In Workshop 4, this will show the actual searched/clicked recipe
   */
  function openRecipe() {
    setSelectedRecipe(DEMO_RECIPE);
    setModalOpen(true);
  }

  /**
   * Close the modal
   */
  function closeModal() {
    setModalOpen(false);
    setSelectedRecipe(null);
  }

  // Return state and functions for the UI to use
  return {
    modalOpen,
    selectedRecipe,
    openRecipe,
    closeModal
  };
}