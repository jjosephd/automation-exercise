import { test, expect } from '@playwright/test';
import { LoginPage } from '../login/login.page';
test.describe('Sign up page tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
  });
  test('verify login page visible', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.expectSignupTextToBeVisible();
  });
});
