import { test, expect } from "@playwright/test";

// Serial mode keeps screenshots deterministic even if tests share the page
test.describe.configure({ mode: "serial" });

test.describe("Visual regression", () => {
  test("homepage hero and search layout stay consistent", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    await expect(page).toHaveScreenshot({
      path: "tests/e2e/visual.spec.js-snapshots/homepage-full.png",
      fullPage: true,
    });
  });

  test("search section initial state", async ({ page }) => {
    await page.goto("#search");
    await page.waitForLoadState("networkidle");

    const searchSection = page.locator('section[aria-label="Search recipes"]');
    await expect(searchSection).toHaveScreenshot({
      path: "tests/e2e/visual.spec.js-snapshots/search-section.png",
    });
  });
});
