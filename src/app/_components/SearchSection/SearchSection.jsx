"use client";

/**
 * SearchSection Component
 * 
 * Full UI with SearchBar, buttons, and RecipeCard.
 * Currently uses hardcoded data - always shows the same recipe.
 * 
 * Key concepts:
 * - Using custom hooks (useSearch)
 * - Managing state
 * - Passing props and event handlers to child components
 * - Conditional rendering
 */

import { useSearch } from "./useSearch";
import SearchBar from "@/app/_components/SearchBar/SearchBar";
import RecipeCard from "@/app/_components/RecipeCard/RecipeCard";
import RecipeModal from "@/app/_components/RecipeModal/RecipeModal";
import Button from "@/app/_components/Button/Button";

export default function SearchSection() {
  // Use our custom hook to manage search state
  const { results, selected, handleSearch, handleCardClick, handleCloseModal, handleClearResults } = useSearch();

  return (
    <section
      className="rounded-[var(--radius-card)] bg-emerald-50 ring-1 ring-emerald-100 p-6 md:p-8"
      aria-label="Recipe search"
    >
      {/* Search bar - user can type and submit */}
      <SearchBar onSearch={handleSearch} />

      {/* Action buttons */}
      <div className="mt-4 flex flex-wrap gap-3">
        <Button onClick={handleSearch} size="lg" variant="primary">
          Surprise me
        </Button>
        <Button onClick={handleClearResults} variant="secondary" size="lg">
          Clear results
        </Button>
      </div>

      {/* Show "no results" message only when results array is empty after a search */}
      {results.length === 0 && (
        <p className="mt-8 text-gray-600" role="status" aria-live="polite">
          No recipes found. Try a different dish or ingredient.
        </p>
      )}

      {/* Show results when available */}
      {results.length > 0 && (
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {results.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              title={recipe.title}
              imageUrl={recipe.imageUrl}
              onOpen={() => handleCardClick(recipe)}
            />
          ))}
        </div>
      )}

      {/* Modal - shows when a recipe card is clicked */}
      <RecipeModal
        open={!!selected}
        onClose={handleCloseModal}
        recipe={selected}
      />
    </section>
  );
}
