import { test, expect } from '@playwright/test';
import { HomePage } from '../home/home.page';
import { LoginPage } from './login.page';
import { SIGNUP_CREDENTIALS } from '../../data/login.data';
test.describe('Login page tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
  });
  test('fill sign up credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.registerUser(
      SIGNUP_CREDENTIALS.name,
      SIGNUP_CREDENTIALS.email
    );
    await expect(page).toHaveURL('/');
  });
});
