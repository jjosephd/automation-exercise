import { defineConfig } from '@playwright/test';
import baseConfig from '../../playwright.config.base';

export default defineConfig({
  ...baseConfig,
  testDir: './tests',
});
