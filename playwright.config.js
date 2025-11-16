import { defineConfig, devices } from '@playwright/test';

const PLAYWRIGHT_HOST = process.env.PLAYWRIGHT_HOST ?? '127.0.0.1';
const PLAYWRIGHT_PORT = Number(process.env.PLAYWRIGHT_PORT ?? 3050);
const PLAYWRIGHT_URL = `http://${PLAYWRIGHT_HOST}:${PLAYWRIGHT_PORT}`;

export default defineConfig({
  testDir: './tests/e2e',
  timeout: 30_000,
  expect: {
    timeout: 5_000,
    toHaveScreenshot: {
      animations: 'disabled',
      maxDiffPixelRatio: 0.01,
    },
  },
  snapshotPathTemplate: '{testDir}/{testFilePath}-snapshots/{arg}{ext}',
  fullyParallel: true,
  reporter: 'list',
  use: {
    baseURL: PLAYWRIGHT_URL,
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  webServer: {
    command: `npx next dev --hostname ${PLAYWRIGHT_HOST} --port ${PLAYWRIGHT_PORT}`,
    url: PLAYWRIGHT_URL,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
