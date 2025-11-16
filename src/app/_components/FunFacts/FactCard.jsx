const variantClasses = {
  sunrise: "bg-gradient-to-br from-amber-400 to-orange-500 text-white",
  meadow: "bg-gradient-to-br from-lime-400 to-emerald-500 text-white",
  aurora: "bg-gradient-to-br from-sky-400 to-indigo-500 text-white",
  dusk: "bg-gradient-to-br from-rose-400 to-fuchsia-500 text-white",
};

export default function FactCard({ icon, text, variant = "sunrise" }) {
  const variantClass = variantClasses[variant] ?? variantClasses.sunrise;

  return (
    <div
      className={`${variantClass} rounded-3xl p-6 flex items-start gap-4 shadow-md ring-1 ring-black/10 hover:scale-[1.02] transition-transform duration-300`}
    >
      <span className="text-3xl leading-none">{icon}</span>
      <p className="text-base font-medium leading-snug">{text}</p>
    </div>
  );
}

export { variantClasses };
