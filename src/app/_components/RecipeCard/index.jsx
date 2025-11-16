"use client";

import Button from "@/app/_components/ui/Button";

// Small card showing meal thumbnail + title. Placeholder if image fails.

export default function RecipeCard({ title, imageUrl, onOpen }) {
  return (
    <article className="group overflow-hidden rounded-[var(--radius-card)] bg-white ring-1 ring-gray-200 hover:shadow-md transition">
      <Button
        onClick={onOpen}
        variant="text"
        size="none"
        block
        className="rounded-none bg-transparent p-0 text-left font-normal text-inherit ring-0 hover:bg-transparent"
      >
        <div className="aspect-[4/3] w-full overflow-hidden bg-gray-100">
          {/* fallback image on error */}
          <img
            src={imageUrl || "/placeholder.svg"}
            onError={(e) => { e.currentTarget.src = "/placeholder.svg"; }}
            alt=""
            className="h-full w-full object-cover group-hover:scale-[1.02] transition"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="p-3">
          <h3 className="font-medium line-clamp-2">{title}</h3>
          <p className="text-sm text-gray-500 mt-1">View details</p>
        </div>
      </Button>
    </article>
  );
}
