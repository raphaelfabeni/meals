import { describe, it, expect } from "vitest";
import { normalizeMeal } from "@_lib/normalize";

function meal(overrides = {}) {
  return {
    idMeal: "123",
    strMeal: "Test Dish",
    strMealThumb: "https://img.test/thumb.jpg",
    strInstructions: " Step 1\nStep 2  ",
    strYoutube: " https://youtu.be/demo ",
    strSource: " https://example.com/src ",
    strIngredient1: "Chicken",
    strMeasure1: "200 g",
    strIngredient2: "Salt",
    strMeasure2: "  ",
    strIngredient3: "",
    strMeasure3: "1 tsp",
    strIngredient4: null,
    strMeasure4: null,
    ...overrides
  };
}

describe("normalizeMeal", () => {
  it("maps core fields and trims strings", () => {
    const out = normalizeMeal(meal());
    expect(out.id).toBe("123");
    expect(out.title).toBe("Test Dish");
    expect(out.imageUrl).toBe("https://img.test/thumb.jpg");
    expect(out.instructions).toBe("Step 1\nStep 2");
    expect(out.youtube).toBe("https://youtu.be/demo");
    expect(out.source).toBe("https://example.com/src");
  });

  it("builds ingredient lines combining measure + ingredient and omits empties", () => {
    const out = normalizeMeal(meal());
    expect(out.ingredients).toEqual(["200 g Chicken", "Salt"]);
  });

  it("handles missing fields safely", () => {
    const out = normalizeMeal(
      meal({
        strMealThumb: null,
        strInstructions: null,
        strYoutube: "",
        strSource: "",
        strIngredient1: "  ",
        strMeasure1: "  ",
        strIngredient2: null,
        strMeasure2: null
      })
    );
    expect(out.imageUrl).toBeNull();
    expect(out.instructions).toBe("");
    expect(out.youtube).toBeNull();
    expect(out.source).toBeNull();
    expect(out.ingredients).toEqual([]);
  });
});