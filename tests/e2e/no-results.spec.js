import { test, expect } from '@playwright/test';

test.describe('No results flow', () => {
  test('shows an empty state when the API returns []', async ({ page }) => {
    // Mock search to return an empty array for any non-empty query (?query= or ?q=)
    await page.route(/\/api\/search(\?.*)?$/, async route => {
      const url = new URL(route.request().url());
      const q = url.searchParams.get('query') ?? url.searchParams.get('q') ?? '';
      if (q.trim()) {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ meals: [] }),
        });
        return;
      }
      await route.continue();
    });

    // ✅ Go to the landing page (where SearchSection lives)
    await page.goto('/', { waitUntil: 'domcontentloaded' });

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