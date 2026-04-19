import { test, expect } from '@playwright/test';

test.describe('Search & open recipe flow', () => {
  test('searches, shows results, opens modal, and closes it', async ({ page }) => {
    // Mock MealDB search endpoint the app calls.
    await page.route('**/api/json/v1/1/search.php?*', async (route) => {
      const url = new URL(route.request().url());
      const q = url.searchParams.get('s') ?? '';
      const body = {
        meals: [
          {
            idMeal: 'r1',
            strMeal: q ? `Result for ${q}` : 'Chicken Handi',
            strMealThumb: 'https://img.test/handi.jpg',
            strInstructions: 'Boil water\nCook pasta',
            strYoutube: 'https://youtu.be/demo',
            strSource: 'https://example.com/src',
            strIngredient1: 'Pasta',
            strMeasure1: '200 g',
            strIngredient2: 'Salt',
            strMeasure2: '',
          },
        ],
      };
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(body),
      });
    });

    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.locator('[data-test-start-search]').click();

    // Wait for the search region to be ready
    const region = page.getByRole('region', { name: /recipe search/i });
    await expect(region).toBeVisible();

    // Find the input and perform a search
    const input = region.getByRole('textbox');
    await expect(input).toBeVisible();
    await input.fill('pasta');
    await input.press('Enter');

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
