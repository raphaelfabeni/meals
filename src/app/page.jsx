import FunFacts from "@/app/_components/FunFacts/FunFacts";
import RecipeCard from "@/app/_components/RecipeCard/RecipeCard";
import Button from "@/app/_components/Button/Button";

export default function Page() {
  return (
    <main>
      <section className="relative min-h-dvh grid place-items-center overflow-hidden bg-black text-white" aria-label="Welcome">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-fuchsia-600 blur-3xl opacity-30" />
          <div className="absolute -bottom-20 -right-16 h-72 w-72 rounded-full bg-rose-600 blur-3xl opacity-30" />
        </div>

        <div className="relative w-full max-w-5xl px-6 py-16">
          <header className="max-w-3xl">
            <p className="inline-block rounded-full bg-white/10 px-3 py-1 text-xs tracking-wider ring-1 ring-white/15">
              Time to eat
            </p>

            <h1 className="mt-4 text-balance text-5xl md:text-7xl font-extrabold tracking-tight">
              Meal Helper
            </h1>

            <p className="mt-4 text-lg md:text-xl text-white/85">
              Can't cook (yet)? We've got you. Search by dish or ingredient and get steps you can actually follow.
            </p>

            <Button
              href="#search"
              variant="hero"
              size="lg"
              className="mt-8"
            >
              Start searching
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="opacity-90">
                <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Button>
          </header>

          <div className="mt-10">
            <h2 className="text-sm uppercase tracking-widest text-white/60">For people who don't cook (yet)</h2>
            <FunFacts />
          </div>
        </div>
      </section>

      <section id="search" className="min-h-dvh bg-white text-gray-900" aria-label="Search recipes">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <header className="max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
              Search by dish or ingredient
            </h2>
            <p className="mt-2 text-gray-600">
              In Workshop 3, you'll add the SearchBar and SearchSection components here.
            </p>
          </header>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <RecipeCard
              title="Spaghetti Carbonara"
              imageUrl="https://www.themealdb.com/images/media/meals/llcbn01574260722.jpg"
            />
            <RecipeCard
              title="Chicken Curry"
              imageUrl="https://www.themealdb.com/images/media/meals/wyxwsp1486979827.jpg"
            />
            <RecipeCard
              title="Beef Wellington"
              imageUrl="https://www.themealdb.com/images/media/meals/vvpprx1487325699.jpg"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
