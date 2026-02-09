import { defineConfig } from '@playwright/test';
import baseConfig from './playwright.config.base';

export default defineConfig({
  ...baseConfig,
  // This root config serves as a fallback for CI
  // and can be used to run all tests in the monorepo if needed.
  testDir: './packages',
  testIgnore: '**/node_modules/**',
});
