import { test, expect } from '@playwright/test';
import { LoginPage } from '../login/login.page';
import { SignUpPage } from './signup.page';
import * as Data from '../../data/login.data';

test.describe('Sign up page tests', () => {
  let signupPage: SignUpPage;
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    signupPage = new SignUpPage(page);
    const user = Data.getNewUser();
    await page.goto('/login');

    // register user before each test
    await loginPage.registerUser(user.name, user.email);

    // Verify we are actually on the signup page before starting the test
    await signupPage.expectSignupPageVisible();
  });

  test('should allow user to select title', async () => {
    await signupPage.selectTitleOption();
  });
});
