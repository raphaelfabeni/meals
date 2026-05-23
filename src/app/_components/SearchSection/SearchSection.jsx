"use client";

import { useState } from "react";
import SearchBar from "@/app/_components/SearchBar/SearchBar";
import RecipeCard from "@/app/_components/RecipeCard/RecipeCard";
import RecipeModal from "@/app/_components/RecipeModal/RecipeModal";
import Button from "@/app/_components/Button/Button";

const DEMO_RECIPE = {
  id: "1",
  title: "Spaghetti Carbonara",
  imageUrl: "https://www.themealdb.com/images/media/meals/llcbn01574260722.jpg",
  instructions: "Cook spaghetti according to package directions.\nFry bacon until crispy.\nMix eggs with parmesan cheese.\nCombine hot pasta with bacon and egg mixture.\nServe immediately with extra parmesan.",
  ingredients: ["200g Spaghetti", "2 Eggs", "100g Bacon", "50g Parmesan Cheese", "Black Pepper to taste"],
};

export default function SearchSection() {
  const [results, setResults] = useState([]);
  const [selected, setSelected] = useState(null);

  function handleSearch() {
    setResults([DEMO_RECIPE]);
  }

  function clearAll() {
    setResults([]);
    setSelected(null);
  }

  return (
    <section
      className="rounded-[var(--radius-card)] bg-emerald-50 ring-1 ring-emerald-100 p-6 md:p-8"
      aria-label="Recipe search"
    >
      <SearchBar onSearch={handleSearch} />

      <div className="mt-4 flex flex-wrap gap-3">
        <Button onClick={handleSearch} size="lg" variant="primary">
          Surprise me
        </Button>
        <Button onClick={clearAll} variant="secondary" size="lg">
          Clear results
        </Button>
      </div>

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

      <RecipeModal
        open={!!selected}
        onClose={() => setSelected(null)}
        recipe={selected}
      />
    </section>
  );
}
