import { test, expect } from '@playwright/test';

test.describe('No results flow', () => {
  test('shows an empty state when the API returns []', async ({ page }) => {
    // Name search returns no matches, so app falls back to ingredient search.
    await page.route('**/api/json/v1/1/search.php?*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ meals: null }),
      });
    });

    // Ingredient fallback also returns no matches.
    await page.route('**/api/json/v1/1/filter.php?*', async (route) => {
      const url = new URL(route.request().url());
      const q = url.searchParams.get('i') ?? '';
      if (!q.trim()) {
        await route.continue();
        return;
      }

      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ meals: null }),
      });
    });

    // ✅ Go to the landing page (where SearchSection lives)
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.locator('[data-test-start-search]').click();

    // Wait for the search region to be ready
    const region = page.getByRole('region', { name: /recipe search/i });
    await expect(region).toBeVisible();

    // Find the input and perform a search
    const input = region.getByRole('textbox');
    await expect(input).toBeVisible();
    await input.fill('nope-nope');
    await input.press('Enter');

    // Expect the "no results" message you render in SearchSection
    const status = page.getByRole('status').filter({
      hasText: /no recipes found|different dish/i,
    });
    await expect(status).toBeVisible();
  });
});
