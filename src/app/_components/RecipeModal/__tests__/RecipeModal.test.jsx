import { render, screen, within, fireEvent, cleanup } from "@testing-library/react";
import { beforeEach, afterEach, describe, it, expect, vi } from "vitest";
import "@testing-library/jest-dom/vitest";
import RecipeModal from "@/app/_components/RecipeModal";

function recipe(overrides = {}) {
  return {
    id: "r1",
    title: "Test Recipe",
    imageUrl: "https://img.test/meal.jpg",
    ingredients: ["200 g Pasta", "Salt"],
    instructions: "Boil water\nCook pasta", // component uses split("\n")
    youtube: "https://youtu.be/demo",
    source: "https://example.com/src",
    ...overrides,
  };
}

const showModalSpy = vi.fn();
const closeSpy = vi.fn();

afterEach(() => {
  vi.restoreAllMocks();
  cleanup();
});

beforeEach(() => {
  vi.spyOn(HTMLDialogElement.prototype, "showModal").mockImplementation(function () {
    this.open = true;
    showModalSpy();
  });
  vi.spyOn(HTMLDialogElement.prototype, "close").mockImplementation(function () {
    this.open = false;
    closeSpy();
    // In browsers, calling close() fires a 'close' event on the dialog element.
    this.dispatchEvent(new Event("close"));
  });
});

describe("RecipeModal", () => {
  it("opens and renders content when open=true", () => {
    render(<RecipeModal open={true} onClose={() => {}} recipe={recipe()} />);

    const dialog = screen.getByRole("dialog", { hidden: true });
    const scope = within(dialog);

    // Title
    expect(
      scope.getByRole("heading", { level: 2, name: /test recipe/i, hidden: true })
    ).toBeInTheDocument();

    // Image
    expect(scope.getByRole("img", { name: /test recipe/i, hidden: true })).toHaveAttribute(
      "src",
      "https://img.test/meal.jpg"
    );

    // Ingredients section: only assert the UL list items, not the steps <ol>
    const ingHeading = scope.getByRole("heading", { level: 3, name: /ingredients/i, hidden: true });
    const ingSection = ingHeading.closest("section") ?? dialog;
    const ingList = within(ingSection).getByRole("list", { hidden: true });
    const ingItems = within(ingList).getAllByRole("listitem", { hidden: true });
    expect(ingItems.map((li) => li.textContent)).toEqual(["200 g Pasta", "Salt"]);

    // Steps heading exists because instructions string is provided
    expect(scope.getByRole("heading", { level: 3, name: /steps/i, hidden: true })).toBeInTheDocument();

    // At least one showModal call (avoid strict exact counts)
    expect(showModalSpy).toHaveBeenCalled();
  });

  it("invokes onClose() when clicking Close button (via dialog 'close' event)", () => {
    const onClose = vi.fn();
    render(<RecipeModal open={true} onClose={onClose} recipe={recipe()} />);

    const dialog = screen.getByRole("dialog", { hidden: true });
    const scope = within(dialog);

    // Click the Close button – our mock close() also dispatches the 'close' event
    scope.getByRole("button", { name: /close/i, hidden: true }).click();
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("unmounts/ closes when prop toggles from open=true to open=false", () => {
    const r = recipe();
    const { rerender } = render(<RecipeModal open={true} onClose={() => {}} recipe={r} />);
    expect(showModalSpy).toHaveBeenCalled(); // at least once

    rerender(<RecipeModal open={false} onClose={() => {}} recipe={r} />);
    expect(closeSpy).toHaveBeenCalled(); // at least once
  });

  it("uses placeholder image if imageUrl is missing", () => {
    const r = recipe({ imageUrl: null });
    render(<RecipeModal open={true} onClose={() => {}} recipe={r} />);

    const dialog = screen.getByRole("dialog", { hidden: true });
    const scope = within(dialog);
    const img = scope.getByRole("img", { hidden: true });

    expect(img.getAttribute("src")).toMatch(/\/placeholder\.svg$/);
  });

  it("falls back to placeholder when image fails to load", () => {
    const r = recipe({ imageUrl: "https://img.test/broken.jpg" });
    render(<RecipeModal open={true} onClose={() => {}} recipe={r} />);

    const dialog = screen.getByRole("dialog", { hidden: true });
    const scope = within(dialog);
    const img = scope.getByRole("img", { hidden: true });

    fireEvent.error(img);
    expect(img.getAttribute("src")).toMatch(/\/placeholder\.svg$/);
  });

  it("renders YouTube and source links when provided", () => {
    render(<RecipeModal open={true} onClose={() => {}} recipe={recipe()} />);

    const dialog = screen.getByRole("dialog", { hidden: true });
    const scope = within(dialog);

    const yt = scope.getByRole("link", { name: /watch on youtube/i, hidden: true });
    const src = scope.getByRole("link", { name: /original source/i, hidden: true });

    expect(yt).toHaveAttribute("href", "https://youtu.be/demo");
    expect(src).toHaveAttribute("href", "https://example.com/src");
  });
});