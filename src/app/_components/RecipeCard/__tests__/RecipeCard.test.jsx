import { render, screen, fireEvent, cleanup, within } from "@testing-library/react";
import { afterEach, describe, it, expect, vi } from "vitest";
import "@testing-library/jest-dom/vitest";
import RecipeCard from "@/app/_components/RecipeCard";

afterEach(() => cleanup());

function meal(overrides = {}) {
  return {
    id: "r1",
    title: "Chicken Handi",
    imageUrl: "https://img.test/handi.jpg",
    ...overrides,
  };
}

describe("RecipeCard", () => {
  it("renders the card with CTA and decorative image", () => {
    render(<RecipeCard meal={meal()} onOpen={() => {}} />);

    // The CTA is the accessible part
    const cta = screen.getByRole("button", { name: /view details/i });
    expect(cta).toBeInTheDocument();

    // Image is decorative (alt="") → role is presentation and currently uses placeholder
    const img = within(cta).getByRole("presentation");
    expect(img).toHaveAttribute("src", "/placeholder.svg");

    // A heading exists but has no accessible name; just assert there is an h3 element
    // (If you later expose the meal title, you can tighten this assertion)
    const h3 = within(cta).getByRole("heading", { level: 3 });
    expect(h3).toBeInTheDocument();
  });

  it('calls onOpen() when clicking "View details"', () => {
    const onOpen = vi.fn();
    render(<RecipeCard meal={meal()} onOpen={onOpen} />);

    fireEvent.click(screen.getByRole("button", { name: /view details/i }));
    expect(onOpen).toHaveBeenCalledTimes(1); // component forwards the click event
  });
});