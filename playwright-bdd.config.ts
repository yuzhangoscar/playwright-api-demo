import { defineConfig } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';

const testDir = defineBddConfig({
  paths: ['features/*.feature'],
  steps: ['features/step-definitions/*.ts', 'features/fixtures/*.ts'],
});

export default defineConfig({
  testDir,
  timeout: 60000,
  reporter: [
    ['html'],
    ['json', { outputFile: 'reports/bdd-results.json' }],
    ['allure-playwright', { outputFolder: 'allure-results-bdd' }],
  ],
  use: {
    baseURL: 'https://crypto.com',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
    actionTimeout: 10000,
  },
  projects: [
    {
      name: 'bdd-chromium',
      use: {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        ...require('@playwright/test').devices['Desktop Chrome'],
        viewport: { width: 1280, height: 720 },
      },
    },
    {
      name: 'bdd-firefox',
      use: {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        ...require('@playwright/test').devices['Desktop Firefox'],
        viewport: { width: 1280, height: 720 },
      },
    },
  ],
});
