import FactCard from "./FactCard";

const defaultFacts = [
  {
    icon: "think",
    text: "Nobody’s born knowing how to cook: we all started by burning something.",
    variant: "sunrise",
  },
  {
    icon: "gearless",
    text: "You don’t need fancy gear. A pan, a pot, and a spoon can do wonders.",
    variant: "meadow",
  },
  {
    icon: "spark",
    text: "The first time you nail a recipe, it feels like magic; and it kind of is.",
    variant: "aurora",
  },
  {
    icon: "prep",
    text: "Cook a little extra: future you will thank you when you’re hungry tomorrow.",
    variant: "dusk",
  },
];

export default function FunFacts({ items = defaultFacts }) {
  return (
    <div className="mt-12 grid gap-6 sm:grid-cols-2">
      {items.map((fact, i) => (
        <FactCard key={i} icon={fact.icon} text={fact.text} variant={fact.variant} />
      ))}
    </div>
  );
}
