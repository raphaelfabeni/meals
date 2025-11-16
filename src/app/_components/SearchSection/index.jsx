"use client";

import { useSearch } from "./useSearch";
import SearchBar from "@/app/_components/SearchBar";
import RecipeCard from "@/app/_components/RecipeCard";
import RecipeModal from "@/app/_components/RecipeModal";
import Button from "@/app/_components/ui/Button";

export default function SearchSection() {
  const {
    results,
    busy,
    err,
    selected,
    setSelected,
    handleSearch,
    handleRandom,
    clearAll,
  } = useSearch();

  return (
    <section
      className="mt-8 rounded-[var(--radius-card)] bg-emerald-50 ring-1 ring-emerald-100 p-6 md:p-8"
      aria-label="Recipe search"
    >
      <SearchBar onSearch={handleSearch} />

      <div className="mt-4 flex flex-wrap gap-3">
        <Button onClick={handleRandom} size="lg" variant="primary">
          Surprise me
        </Button>
        <Button onClick={clearAll} variant="secondary" size="lg">
          Clear results
        </Button>
      </div>

      {busy && (
        <div
          className="mt-8 flex items-center gap-3 text-emerald-800"
          role="status"
          aria-live="polite"
        >
          <span className="mm-spinner" aria-hidden="true"></span>
          <span>Searching recipes…</span>
        </div>
      )}

      {/* Option B: the hook provides the "no results" message via `err` */}
      {!busy && err && (
        <p className="mt-8 text-red-600" role="status" aria-live="polite">
          {err}
        </p>
      )}

      {/* Future-proof fallback: only if no error and empty results */}
      {!busy && !err && Array.isArray(results) && results.length === 0 && (
        <p className="mt-8 text-gray-600" role="status" aria-live="polite">
          No recipes found. Try a different dish or ingredient.
        </p>
      )}

      {!busy && !err && results.length > 0 && (
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {results.map((r) => (
            <RecipeCard
              key={r.id}
              title={r.title}
              imageUrl={r.imageUrl}
              onOpen={() => setSelected(r)}
            />
          ))}
        </div>
      )}

      <RecipeModal
        open={!!selected}
        onClose={() => setSelected(null)}
        recipe={selected}
      />
    </section>
  );
}
