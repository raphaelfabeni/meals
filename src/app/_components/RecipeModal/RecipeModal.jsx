import Button from "@/app/_components/Button/Button";

export default function RecipeModal({ open, onClose, recipe }) {
  const {
    title,
    imageUrl,
    ingredients = [],
    instructions = "",
    youtube,
    source,
  } = recipe ?? {};

  return (
    <dialog
      open={open}
      className="mm-dialog w-[min(92vw,880px)] rounded-[var(--radius-card)] p-0"
      role="dialog"
      aria-modal="true"
      aria-labelledby="recipe-modal-title"
    >
      <div className="bg-white ring-1 ring-gray-200 rounded-[var(--radius-card)] overflow-hidden">
        <div className="flex items-start justify-between p-4">
          <h2 id="recipe-modal-title" className="text-lg font-semibold">
            {title}
          </h2>
          <Button
            type="button"
            size="sm"
            variant="subtle"
            aria-label="Close"
            onClick={onClose}
          >
            Close
          </Button>
        </div>

        <div className="grid gap-6 px-4 pb-6 md:grid-cols-[280px,1fr]">
          <div className="w-full">
            <img
              src={imageUrl || "/placeholder.svg"}
              onError={(e) => { e.currentTarget.src = "/placeholder.svg"; }}
              alt={title || "Recipe image"}
              className="w-full h-48 md:h-56 object-cover rounded-lg ring-1 ring-gray-200"
            />
          </div>

          <div className="space-y-6">
            {ingredients.length > 0 && (
              <section>
                <h3 className="font-semibold mb-2">Ingredients</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {ingredients.map((it, i) => (
                    <li key={i} className="text-sm">{it}</li>
                  ))}
                </ul>
              </section>
            )}

            {instructions && (
              <section>
                <h3 className="font-semibold mb-2">Steps</h3>
                <ol className="list-decimal pl-5 space-y-2">
                  {instructions.split("\n").map((line, i) => (
                    <li key={i} className="text-sm leading-relaxed">
                      {line}
                    </li>
                  ))}
                </ol>
              </section>
            )}

            {(youtube || source) && (
              <div className="flex flex-wrap gap-3 pt-2">
                {youtube && (
                  <Button
                    href={youtube}
                    rel="noreferrer"
                    target="_blank"
                    variant="secondary"
                    size="md"
                  >
                    Watch on YouTube
                  </Button>
                )}
                {source && (
                  <Button
                    href={source}
                    rel="noreferrer"
                    target="_blank"
                    variant="subtle"
                    size="md"
                  >
                    Original source
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </dialog>
  );
}
