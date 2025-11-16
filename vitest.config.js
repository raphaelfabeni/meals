// vitest.config.js
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "url";

const r = (p) => fileURLToPath(new URL(p, import.meta.url));

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "happy-dom",
    setupFiles: ["./vitest.setup.js"],
    css: true,
    // Only run unit tests under src/
    include: ["src/**/*.test.{js,jsx}"],
    // Don't let Vitest execute Playwright specs
    exclude: ["tests/e2e/**", "node_modules/**", "dist/**"],
  },
  resolve: {
    alias: {
      "@": r("./src"),
      "@_components": r("./src/app/_components"),
      "@_lib": r("./src/app/_lib"),
    },
  },
});