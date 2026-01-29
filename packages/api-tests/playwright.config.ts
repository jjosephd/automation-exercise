import { defineConfig } from '@playwright/test';
import baseConfig from '../../playwright.config.base';

export default defineConfig({
  ...baseConfig,
  testDir: './tests',
  // Override projects to run only chromium and headless for API tests if desired
  projects: [
    {
      name: 'api',
      use: {
        // No browser needed for purely API requests,
        // but Playwright still runs in a project context.
      },
    },
  ],
});
