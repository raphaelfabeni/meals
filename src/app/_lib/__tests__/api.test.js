// src/app/_lib/__tests__/api.test.js
import { describe, it, expect, beforeEach, afterAll, vi } from "vitest";
import * as api from "@/app/_lib/api";

const realFetch = global.fetch;

function resolveSearchFn(mod) {
  // Try common named exports first
  const candidate =
    mod.searchMeals ||
    mod.searchByName ||
    mod.search ||
    mod.fetchMeals ||
    // default could be a function or an object with the fn
    (typeof mod.default === "function" ? mod.default : null) ||
    mod.default?.searchMeals ||
    mod.default?.searchByName ||
    mod.default?.search ||
    mod.default?.fetchMeals;

  return candidate;
}

beforeEach(() => {
  vi.restoreAllMocks();
  global.fetch = vi.fn();
});

afterAll(() => {
  global.fetch = realFetch;
});

describe("api.search (generic)", () => {
  it("calls the endpoint with the encoded query and returns parsed JSON", async () => {
  const search = resolveSearchFn(api);
  expect(typeof search).toBe("function");

  // Minimal MealDB-like fixture that your normalize() will understand
  const mealdbPayload = {
    meals: [
      {
        idMeal: "123",
        strMeal: "Pasta",
        strMealThumb: "https://img.test/pasta.jpg",
        strInstructions: "Boil. Mix. Eat.",
        strYoutube: "https://youtu.be/demo",
        strSource: "https://example.com/src",

        // keep ingredients minimal; we won't assert on them specifically
        strIngredient1: "Salt",
        strMeasure1: "1 tsp",
        strIngredient2: "",
        strMeasure2: "",
      },
    ],
  };

  global.fetch.mockResolvedValue({
    ok: true,
    json: async () => mealdbPayload,
  });

  const result = await search("pasta");

  // still ensure query was encoded and used
  expect(global.fetch).toHaveBeenCalledTimes(1);
  const [url] = global.fetch.mock.calls[0];
  expect(url).toMatch(/pasta/i);

  // Your API returns a normalized ARRAY — assert on key fields
  expect(Array.isArray(result)).toBe(true);
  expect(result).toHaveLength(1);
  expect(result[0]).toEqual(
    expect.objectContaining({
      id: "123",
      title: "Pasta",
      imageUrl: "https://img.test/pasta.jpg",
      instructions: expect.stringContaining("Boil"),
      youtube: "https://youtu.be/demo",
      source: "https://example.com/src",
    })
  );
});

  it("throws when the response is not ok", async () => {
    const search = resolveSearchFn(api);
    expect(typeof search).toBe("function");

    global.fetch.mockResolvedValue({
      ok: false,
      status: 500,
      json: async () => ({ error: "Server error" }),
    });

    await expect(search("pasta")).rejects.toThrow();
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it("propagates network errors", async () => {
    const search = resolveSearchFn(api);
    expect(typeof search).toBe("function");

    global.fetch.mockRejectedValue(new Error("network down"));

    await expect(search("pasta")).rejects.toThrow(/network/i);
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });
});