"use client";

/**
 * SearchSection Component (Workshop 3)
 * 
 * Full UI with SearchBar and RecipeCard, but using hardcoded data.
 * No matter what the user searches, it always shows the same recipe.
 * 
 * Students learn:
 * - Using custom hooks (useSearch)
 * - Managing state
 * - Passing props and event handlers to child components
 * - Conditional rendering (show results only after search)
 * 
 * In Workshop 4, we'll add:
 * - Real search functionality with filtering
 * - API integration
 * - Loading and error states
 */

import { useSearch } from "./useSearch";
import SearchBar from "@/app/_components/SearchBar/SearchBar";
import RecipeCard from "@/app/_components/RecipeCard/RecipeCard";
import RecipeModal from "@/app/_components/RecipeModal/RecipeModal";

export default function SearchSection() {
  // Use our custom hook to manage search state
  const { results, selected, handleSearch, handleCardClick, handleCloseModal } = useSearch();

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
          Try searching for anything! In Workshop 3, it always shows the same recipe. In Workshop 4, you'll add real search!
        </p>
      </header>

      {/* Search bar - user can type and submit */}
      <SearchBar onSearch={handleSearch} />

      {/* Show results only if there are any */}
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
