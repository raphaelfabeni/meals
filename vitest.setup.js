import "@testing-library/jest-dom/vitest";

// Polyfill <dialog> bits that jsdom doesn't implement
if (typeof globalThis.HTMLDialogElement === "undefined") {
  class HTMLDialogElement extends HTMLElement {
    open = false;
    showModal() {
      this.open = true;
      this.setAttribute("open", "");
    }
    close() {
      this.open = false;
      this.removeAttribute("open");
    }
  }
  globalThis.HTMLDialogElement = HTMLDialogElement;
}