/**
 * TheMealDB returns up to 20 ingredient/measure pairs as flat fields:
 *   strIngredient1, strMeasure1 ... strIngredient20, strMeasure20
 * This helper stitches them into user-friendly "measure ingredient" lines.
 */
function buildIngredientLines(meal) {
  const lines = [];
  for (let i = 1; i <= 20; i++) {
    const ing = meal[`strIngredient${i}`];
    const meas = meal[`strMeasure${i}`];

    const safeIng = (ing ?? "").trim();
    const safeMeas = (meas ?? "").trim();

    if (safeIng) {
      const line = [safeMeas, safeIng].filter(Boolean).join(" ").trim();
      lines.push(line);
    }
  }
  return lines;
}

/**
 * Convert a meal object from TheMealDB to the compact shape our UI uses.
 * This isolates API quirks (field names, nullability) from the UI layer.
 */
export function normalizeMeal(meal) {
  return {
    id: meal.idMeal,                                  // string id
    title: meal.strMeal,                               // display title
    imageUrl: meal.strMealThumb || null,               // hero/thumbnail image
    instructions: (meal.strInstructions || "").trim(), // full text instructions
    ingredients: buildIngredientLines(meal),           // array of "measure ingredient" lines
    youtube: (meal.strYoutube || "").trim() || null,   // NEW: YouTube tutorial link
    source: (meal.strSource || "").trim() || null      // NEW: original source link
  };
}