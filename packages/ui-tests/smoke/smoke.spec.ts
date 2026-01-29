import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home/home.page';

test.describe('Home Page Smoke Tests', () => {
  test('should navigate to home page and verify visibility @smoke', async ({
    page,
  }) => {
    const homePage = new HomePage(page);
    await page.goto('/');
    await homePage.expectHomePageVisible();
  });

  test('should navigate to login page from home', async ({ page }) => {
    const homePage = new HomePage(page);

    await page.goto('/');
    await homePage.gotoLogin();
    await expect(page).toHaveURL(/.*login/);
  });
});
