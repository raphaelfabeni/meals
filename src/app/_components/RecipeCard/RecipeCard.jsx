/**
 * RecipeCard Component
 * 
 * Displays a recipe card with an image and title.
 * This component demonstrates:
 * - "use client" directive (needed for onClick handlers)
 * - Image handling with fallbacks
 * - Event handlers (onClick)
 * - Hover effects with Tailwind's group utilities
 */

"use client";

import Button from "@/app/_components/Button/Button";

export default function RecipeCard({ title, imageUrl, onOpen }) {
  return (
    // article tag for semantic HTML
    // "group" class allows child elements to respond to hover on the parent
    <article className="group overflow-hidden rounded-[var(--radius-card)] bg-white ring-1 ring-gray-200 hover:shadow-md transition">
      {/* Using Button component as a clickable wrapper */}
      {/* In Workshop 3, onOpen will be connected to show recipe details */}
      <Button
        onClick={onOpen}
        variant="text"
        size="none"
        block
        className="rounded-none bg-transparent p-0 text-left font-normal text-inherit ring-0 hover:bg-transparent"
      >
        {/* Image container with fixed aspect ratio */}
        <div className="aspect-[4/3] w-full overflow-hidden bg-gray-100">
          <img
            // Use provided imageUrl or fallback to placeholder
            src={imageUrl || "/placeholder.svg"}
            // If image fails to load, switch to placeholder
            // This is important for handling broken image URLs
            onError={(e) => { e.currentTarget.src = "/placeholder.svg"; }}
            alt=""
            // group-hover:scale-[1.02] creates zoom effect when hovering the card
            className="h-full w-full object-cover group-hover:scale-[1.02] transition"
            loading="lazy"      // Lazy load images for better performance
            decoding="async"    // Decode images asynchronously
          />
        </div>
        
        {/* Recipe title and call-to-action */}
        <div className="p-3">
          {/* line-clamp-2 limits text to 2 lines with ellipsis */}
          <h3 className="font-medium line-clamp-2">{title}</h3>
          <p className="text-sm text-gray-500 mt-1">View details</p>
        </div>
      </Button>
    </article>
  );
}
