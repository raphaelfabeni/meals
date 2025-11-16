import { test, expect } from '@playwright/test';

test.describe('Search & open recipe flow', () => {
  test('searches, shows results, opens modal, and closes it', async ({ page }) => {
    // Mock the search endpoint (works for ?query= or ?q=)
    await page.route('**/api/search?*', async (route) => {
      const url = new URL(route.request().url());
      const q = url.searchParams.get('query') ?? url.searchParams.get('q') ?? '';
      const body = [
        {
          id: 'r1',
          title: q ? `Result for ${q}` : 'Chicken Handi',
          imageUrl: 'https://img.test/handi.jpg',
          ingredients: ['200 g Pasta', 'Salt'],
          instructions: 'Boil water\nCook pasta',
          youtube: 'https://youtu.be/demo',
          source: 'https://example.com/src',
        },
      ];
      await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(body) });
    });

    await page.goto('/', { waitUntil: 'domcontentloaded' });

    // Be flexible about how the search input is exposed
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
    await search.fill('pasta');
    await search.press('Enter');

    // Click first "View details"
    const openBtn = page.getByRole('button', { name: /view details/i });
    await expect(openBtn).toBeVisible();
    await openBtn.click();

    // Modal should open
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();

    // Title exists and is pasta-related (your current title: "Mediterranean Pasta Salad")
    const h2 = dialog.getByRole('heading', { level: 2 });
    await expect(h2).toBeVisible();
    await expect(h2).toContainText(/pasta/i);

    // If links are rendered, check their basic shape (don’t require exact URLs)
    const youtubeLinks = dialog.getByRole('link', { name: /watch on youtube/i });
    if (await youtubeLinks.count()) {
      await expect(youtubeLinks.first()).toHaveAttribute('href', /youtu/i);
    }
    const sourceLinks = dialog.getByRole('link', { name: /original source/i });
    if (await sourceLinks.count()) {
      await expect(sourceLinks.first()).toHaveAttribute('href', /^https?:\/\//i);
    }

    // Close the modal and verify
    await dialog.getByRole('button', { name: /close/i }).click();
    await expect(dialog).toBeHidden();
  });
});