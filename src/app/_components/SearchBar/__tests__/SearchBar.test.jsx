import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/vitest";
import { describe, it, expect, afterEach, vi } from "vitest";
import SearchBar from "..";

afterEach(() => cleanup());

describe("SearchBar", () => {
  it("submits when clicking the button with trimmed value", async () => {
    const user = userEvent.setup();
    const onSearch = vi.fn();

    render(<SearchBar onSearch={onSearch} />);
    const input = screen.getByLabelText(/search recipes/i);
    await user.type(input, "  pasta  ");
    const button = screen.getByRole("button", { name: /find recipes/i });
    await user.click(button);

    expect(onSearch).toHaveBeenCalledWith("pasta");
  });

  it("submits on Enter key", async () => {
    const user = userEvent.setup();
    const onSearch = vi.fn();

    render(<SearchBar onSearch={onSearch} />);
    const input = screen.getByLabelText(/search recipes/i);
    await user.type(input, "ramen{enter}");

    expect(onSearch).toHaveBeenCalledWith("ramen");
  });

  it("does not submit when empty or only whitespace", async () => {
    const user = userEvent.setup();
    const onSearch = vi.fn();

    render(<SearchBar onSearch={onSearch} />);
    const input = screen.getByLabelText(/search recipes/i);
    const button = screen.getByRole("button", { name: /find recipes/i });

    await user.clear(input);
    await user.click(button);
    await user.type(input, "   ");
    await user.click(button);

    expect(onSearch).not.toHaveBeenCalled();
  });

  it("uses pointer cursor on the submit button", () => {
    const onSearch = vi.fn();
    render(<SearchBar onSearch={onSearch} />);
    const button = screen.getByRole("button", { name: /find recipes/i });
    expect(button).toHaveClass("cursor-pointer");
  });
});