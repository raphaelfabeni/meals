/**
 * FactCard Component
 * 
 * Displays a fun cooking fact with an emoji icon and colorful gradient background.
 * This is a simple, focused component that demonstrates:
 * - Props usage
 * - Gradient backgrounds with Tailwind
 * - Hover effects
 */

// Define different color schemes for variety
// Each variant uses Tailwind's gradient utilities
const variantClasses = {
  sunrise: "bg-gradient-to-br from-amber-400 to-orange-500 text-white",
  meadow: "bg-gradient-to-br from-lime-400 to-emerald-500 text-white",
  aurora: "bg-gradient-to-br from-sky-400 to-indigo-500 text-white",
  dusk: "bg-gradient-to-br from-rose-400 to-fuchsia-500 text-white",
};

export default function FactCard({ icon, text, variant = "sunrise" }) {
  // Select the color scheme based on the variant prop
  // The ?? operator provides a fallback if variant doesn't exist
  const variantClass = variantClasses[variant] ?? variantClasses.sunrise;

  return (
    <div
      // Template literal allows us to combine dynamic and static classes
      // hover:scale-[1.02] creates a subtle zoom effect on hover
      className={`${variantClass} rounded-3xl p-6 flex items-start gap-4 shadow-md ring-1 ring-black/10 hover:scale-[1.02] transition-transform duration-300`}
    >
      {/* Emoji icon - large and aligned to top */}
      <span className="text-3xl leading-none">{icon}</span>
      
      {/* Fact text */}
      <p className="text-base font-medium leading-snug">{text}</p>
    </div>
  );
}
