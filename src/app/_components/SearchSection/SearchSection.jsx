"use client";

/**
 * SearchSection Component
 * 
 * Full UI with SearchBar, buttons, and RecipeCard.
 * Now integrated with real API calls to fetch recipes.
 * 
 * Key concepts:
 * - Using custom hooks (useSearch)
 * - Managing state (results, loading, errors)
 * - Passing props and event handlers to child components
 * - Conditional rendering based on state
 * - Async operations with loading states
 */

import { useSearch } from "./useSearch";
import SearchBar from "@/app/_components/SearchBar/SearchBar";
import RecipeCard from "@/app/_components/RecipeCard/RecipeCard";
import RecipeModal from "@/app/_components/RecipeModal/RecipeModal";
import Button from "@/app/_components/Button/Button";

export default function SearchSection() {
  // Use our custom hook to manage search state
  const { results, busy, err, selected, setSelected, handleSearch, handleRandom, clearAll } = useSearch();

  return (
    <section
      className="rounded-[var(--radius-card)] bg-emerald-50 ring-1 ring-emerald-100 p-6 md:p-8"
      aria-label="Recipe search"
    >
      {/* Search bar - user can type and submit */}
      <SearchBar onSearch={handleSearch} />

      {/* Action buttons */}
      <div className="mt-4 flex flex-wrap gap-3">
        <Button onClick={handleRandom} size="lg" variant="primary" disabled={busy}>
          Surprise me
        </Button>
        <Button onClick={clearAll} variant="secondary" size="lg" disabled={busy}>
          Clear results
        </Button>
      </div>

      {/* Loading state */}
      {busy && (
        <p className="mt-8 text-gray-600" role="status" aria-live="polite">
          Searching...
        </p>
      )}

      {/* Error message */}
      {err && (
        <p className="mt-8 text-red-600" role="alert" aria-live="assertive">
          {err}
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
              onOpen={() => setSelected(recipe)}
            />
          ))}
        </div>
      )}

      {/* Modal - shows when a recipe card is clicked */}
      <RecipeModal
        open={!!selected}
        onClose={() => setSelected(null)}
        recipe={selected}
      />
    </section>
  );
}
