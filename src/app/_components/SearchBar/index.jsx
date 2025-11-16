"use client";

import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [value, setValue] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const term = value.trim();
    if (!term) return;
    onSearch?.(term);
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 flex items-center gap-3">
      <label htmlFor="search" className="sr-only">Search recipes</label>
      <input
        id="search"
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Type a dish or an ingredient…"
        className="flex-1 rounded-[var(--radius-card)] px-4 py-3 ring-1 ring-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-600"
      />
      <button
        type="submit"
        className="cursor-pointer rounded-[var(--radius-card)] px-5 py-3 font-medium ring-1 ring-transparent bg-emerald-600 text-white hover:bg-emerald-700 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-600"
      >
        Find recipes
      </button>
    </form>
  );
}