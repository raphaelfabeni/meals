"use client";

/**
 * SearchSection Component (Workshop 3 - Simplified)
 * 
 * This simplified version just shows a button that opens a modal with hardcoded data.
 * Students learn:
 * - Using custom hooks (useSearch)
 * - Managing modal state
 * - Passing props to child components
 * 
 * In Workshop 4, we'll add:
 * - Real search functionality
 * - Dynamic recipe cards
 * - API integration
 */

import { useSearch } from "./useSearch";
import RecipeModal from "@/app/_components/RecipeModal/RecipeModal";
import Button from "@/app/_components/Button/Button";

export default function SearchSection() {
  // Use our custom hook to manage modal state
  const { modalOpen, selectedRecipe, openRecipe, closeModal } = useSearch();

  return (
    <section
      className="mt-8 rounded-[var(--radius-card)] bg-emerald-50 ring-1 ring-emerald-100 p-6 md:p-8"
      aria-label="Recipe search"
    >
      <header className="max-w-3xl">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
          Search by dish or ingredient
        </h2>
        <p className="mt-2 text-gray-600">
          Click the button below to see a sample recipe. In Workshop 4, you'll add real search functionality!
        </p>
      </header>

      {/* Simple button that opens the modal */}
      <div className="mt-6">
        <Button onClick={openRecipe} size="lg" variant="primary">
          View Sample Recipe
        </Button>
      </div>

      {/* Modal component - shows/hides based on modalOpen state */}
      <RecipeModal
        open={modalOpen}
        onClose={closeModal}
        recipe={selectedRecipe}
      />
    </section>
  );
}
