import { test, expect } from '@playwright/test';
import { HomePage } from '../home/home.page';
import { LoginPage } from './login.page';
import { getNewUser } from '../../data/login.data';
test.describe('Login page tests', () => {
  let loginPage: LoginPage;
  const EXISTING_USER = {
    name: 'Test Account',
    email: 'test@me.com',
  };
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await page.goto('/login');
  });

  test('check error for existing email', async () => {
    await loginPage.registerUser(EXISTING_USER.name, EXISTING_USER.email);
    await loginPage.expectEmailErrorMsg();
  });

  test('check error for empty name', async ({ page }) => {
    await loginPage.registerUser('', 'valid@email.com');
    await expect(page).toHaveURL('/login');
  });

  test('check error for empty email', async ({ page }) => {
    await loginPage.registerUser('joe', '');
    await expect(page).toHaveURL('/login');
  });

  test('check success with fresh user', async ({ page }) => {
    const user = getNewUser(); // generate a unique user at the moment of the test
    await loginPage.registerUser(user.name, user.email);
    await expect(page).toHaveURL('/signup');
  });
});
