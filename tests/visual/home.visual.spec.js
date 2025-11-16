import { test, expect } from '@playwright/test';

test.describe('Visuals', () => {
  test('home page baseline', async ({ page }) => {
    // deterministic viewport
    await page.setViewportSize({ width: 1200, height: 800 });

    // (optional) reduce flakiness from animations/transitions
    await page.addStyleTag({ content: `
      * { transition: none !important; animation: none !important; caret-color: transparent !important; }
      html { scroll-behavior: auto !important; }
    `});

    await page.goto('/', { waitUntil: 'networkidle' });

    // Take a full-page screenshot and compare to snapshot
    await expect(page).toHaveScreenshot('home-full.png', { fullPage: true });
  });
});