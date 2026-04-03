/**
 * Main Page Component
 * 
 * This is the home page of the Meal Helper app.
 * It demonstrates:
 * - Page layout with multiple sections
 * - Using all the components we built (Button, FunFacts, SearchSection)
 * - Responsive design with Tailwind CSS
 * - Semantic HTML (main, section, header, article)
 * - State management with custom hooks
 */

// Import all the components we'll use on this page
import FunFacts from "@/app/_components/FunFacts/FunFacts";
import Button from "@/app/_components/Button/Button";
import SearchSection from "@/app/_components/SearchSection/SearchSection";

export default function Page() {
  return (
    <main>
      {/* Hero Section - Dark background with gradient blobs */}
      <section className="relative min-h-dvh grid place-items-center overflow-hidden bg-black text-white" aria-label="Welcome">
        {/* Decorative gradient blobs in the background */}
        {/* pointer-events-none means they won't interfere with clicking */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-fuchsia-600 blur-3xl opacity-30" />
          <div className="absolute -bottom-20 -right-16 h-72 w-72 rounded-full bg-rose-600 blur-3xl opacity-30" />
        </div>

        {/* Main content - positioned relative to appear above the blobs */}
        <div className="relative w-full max-w-5xl px-6 py-16">
          <header className="max-w-3xl">
            {/* Small badge */}
            <p className="inline-block rounded-full bg-white/10 px-3 py-1 text-xs tracking-wider ring-1 ring-white/15">
              Time to eat
            </p>

            {/* Main heading - responsive text size (5xl on mobile, 7xl on medium+) */}
            <h1 className="mt-4 text-balance text-5xl md:text-7xl font-extrabold tracking-tight">
              Meal Helper
            </h1>

            {/* Subheading */}
            <p className="mt-4 text-lg md:text-xl text-white/85">
              Can't cook (yet)? We've got you. Search by dish or ingredient and get steps you can actually follow.
            </p>

            {/* Call-to-action button with icon */}
            {/* href="#search" creates an anchor link to the search section below */}
            <Button
              href="#search"
              variant="hero"
              size="lg"
              className="mt-8"
            >
              Start searching
              {/* Inline SVG arrow icon */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="opacity-90">
                <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Button>
          </header>

          {/* Fun Facts section */}
          <div className="mt-10">
            <h2 className="text-sm uppercase tracking-widest text-white/60">For people who don't cook (yet)</h2>
            {/* FunFacts component will render a grid of fact cards */}
            <FunFacts />
          </div>
        </div>
      </section>

      {/* Search Section - Interactive search with state management */}
      {/* id="search" allows the button above to link here */}
      <section id="search" className="min-h-dvh bg-white text-gray-900" aria-label="Search recipes">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <header className="max-w-3xl mb-8">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
              Search by dish or ingredient
            </h2>
            <p className="mt-2 text-gray-600">
              What should we cook today?
            </p>
          </header>
          
          {/* SearchSection handles all search UI and state */}
          <SearchSection />
        </div>
      </section>
    </main>
  );
}
