import FunFacts from "@/app/_components/FunFacts";
import SearchSection from "@/app/_components/SearchSection";

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
              Beginner-friendly
            </p>

            <h1 className="mt-4 text-balance text-5xl md:text-7xl font-extrabold tracking-tight">
              Meal Helper
            </h1>

            <p className="mt-4 text-lg md:text-xl text-white/85">
              Can’t cook (yet)? We’ve got you. Search by dish or ingredient and get steps you can actually follow.
            </p>

            <a
              href="#search"
              className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-fuchsia-600 to-rose-600 px-6 py-3 font-semibold ring-1 ring-white/10 shadow hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            >
              Start searching
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="opacity-90">
                <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </header>

          <div className="mt-10">
            <h2 className="text-sm uppercase tracking-widest text-white/60">For people who don’t cook (yet)</h2>
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
              Type a term and press Enter or click.
            </p>
          </header>

          <SearchSection />
        </div>
      </section>
    </main>
  );
}