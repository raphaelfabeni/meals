import { test, expect } from '@playwright/test';

test.describe('No results flow', () => {
  test('shows an empty state when the API returns []', async ({ page }) => {
    // Mock search to return an empty array
    await page.route('**/api/search?*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([]),
      });
    });

    await page.goto('/', { waitUntil: 'domcontentloaded' });

    // Be flexible about locating the search field
    const search = page.locator(
      [
        'input[placeholder*="search" i]',
        'input[aria-label*="search" i]',
        'input[type="search"]',
        'input[name="q"]',
        'main input[type="text"]',
      ].join(', ')
    ).first();

    await expect(search).toBeVisible();
    await search.fill('zzzzzz');
    await search.press('Enter');

    // Expect some visible empty state hint
    // (Adjust text to match your UI copy if you have a specific string.)
    await expect(
      page.getByText(/no results|nothing found|try another search/i)
    ).toBeVisible();
  });
});