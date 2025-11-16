// Conversational, personal fun facts — four colorful cards that sound like
// a friend talking to someone who's new to cooking.
// Static component (no client JS).

const facts = [
  {
    icon: "🤔",
    text: "Nobody’s born knowing how to cook: we all started by burning something.",
    color: "bg-gradient-to-br from-amber-400 to-orange-500 text-white",
  },
  {
    icon: "😅",
    text: "You don’t need fancy gear. A pan, a pot, and a spoon can do wonders.",
    color: "bg-gradient-to-br from-lime-400 to-emerald-500 text-white",
  },
  {
    icon: "✨",
    text: "The first time you nail a recipe, it feels like magic; and it kind of is.",
    color: "bg-gradient-to-br from-sky-400 to-indigo-500 text-white",
  },
  {
    icon: "🥡",
    text: "Cook a little extra: future you will thank you when you’re hungry tomorrow.",
    color: "bg-gradient-to-br from-rose-400 to-fuchsia-500 text-white",
  },
];

export default function FunFacts() {
  return (
    <div className="mt-12 grid gap-6 sm:grid-cols-2">
      {facts.map((f, i) => (
        <div
          key={i}
          className={`
            ${f.color}
            rounded-3xl p-6 flex items-start gap-4 shadow-md ring-1 ring-black/10
            hover:scale-[1.02] transition-transform duration-300
          `}
        >
          <span className="text-3xl leading-none">{f.icon}</span>
          <p className="text-base font-medium leading-snug">{f.text}</p>
        </div>
      ))}
    </div>
  );
}