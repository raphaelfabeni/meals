/**
 * FunFacts Component
 * 
 * Displays a grid of fun cooking facts using the FactCard component.
 * This demonstrates:
 * - Component composition (using FactCard inside FunFacts)
 * - Array mapping to render lists
 * - Default props with data
 */

// Import the FactCard component we'll use to display each fact
import FactCard from "./FactCard.jsx";

// Default data: an array of fact objects
// Each object has the props needed by FactCard
const defaultFacts = [
  {
    icon: "🤔",
    text: "Nobody's born knowing how to cook: we all started by burning something.",
    variant: "sunrise",
  },
  {
    icon: "😅",
    text: "You don't need fancy gear. A pan, a pot, and a spoon can do wonders.",
    variant: "meadow",
  },
  {
    icon: "✨",
    text: "The first time you nail a recipe, it feels like magic; and it kind of is.",
    variant: "aurora",
  },
  {
    icon: "🥡",
    text: "Cook a little extra: future you will thank you when you're hungry tomorrow.",
    variant: "dusk",
  },
];

export default function FunFacts({ items = defaultFacts }) {
  return (
    // Responsive grid: 1 column on mobile, 2 columns on small screens and up
    <div className="mt-12 grid gap-6 sm:grid-cols-2">
      {/* Map over the items array to create a FactCard for each fact */}
      {/* The key prop helps React track which items changed */}
      {items.map((fact, i) => (
        <FactCard key={i} icon={fact.icon} text={fact.text} variant={fact.variant} />
      ))}
    </div>
  );
}
