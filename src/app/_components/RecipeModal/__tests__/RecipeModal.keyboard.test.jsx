import { render, screen, within, fireEvent, cleanup } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import "@testing-library/jest-dom/vitest";
import RecipeModal from "@/app/_components/RecipeModal";

function recipe(overrides = {}) {
  return {
    id: "r1",
    title: "Keyboard Test Recipe",
    imageUrl: "https://img.test/meal.jpg",
    ingredients: ["200 g Pasta", "Salt"],
    instructions: "Boil water\nCook pasta",
    youtube: "https://youtu.be/demo",
    source: "https://example.com/src",
    ...overrides,
  };
}

const showModalSpy = vi.fn();
const closeSpy = vi.fn();

beforeEach(() => {
  vi.spyOn(HTMLDialogElement.prototype, "showModal").mockImplementation(showModalSpy);
  vi.spyOn(HTMLDialogElement.prototype, "close").mockImplementation(closeSpy);
});

afterEach(() => {
  vi.restoreAllMocks();
  cleanup();
});

describe("RecipeModal keyboard interactions", () => {
  it("closes when pressing Escape", () => {
    render(<RecipeModal open={true} onClose={() => {}} recipe={recipe()} />);

    const dialog = screen.getByRole("dialog", { hidden: true });
    const scope = within(dialog);

    // Sanity: title visible inside dialog (needs hidden: true)
    expect(
      scope.getByRole("heading", { level: 2, name: /keyboard test recipe/i, hidden: true })
    ).toBeInTheDocument();

    // Send Escape to the dialog
    fireEvent.keyDown(dialog, { key: "Escape", code: "Escape" });

    expect(closeSpy).toHaveBeenCalledTimes(1);
  });
});