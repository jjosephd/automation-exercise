import { test, expect } from '@playwright/test';
import { LoginPage } from './login.page';
import { SignUpPage } from './signup.page';
import * as Data from '../../data/login.data';

test.describe('Sign up page tests', () => {
  let signupPage: SignUpPage;
  let loginPage: LoginPage;
  let user: Data.User;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    signupPage = new SignUpPage(page);
    user = Data.getNewUser();
    await page.goto('/login');

    // register user before each test
    await loginPage.registerUser(user.name, user.email);

    // Verify we are actually on the signup page before starting the test
    await signupPage.expectSignupPageVisible();
  });

  test('should complete full account registration', async ({ page }) => {
    // Assert email input is filled and disabled
    await signupPage.expectNameAndEmailToBeFilled(user.name, user.email);
    await signupPage.expectEmailInputToBeDisabled();

    // Fill Account Information
    await signupPage.fillAccountInformation(user);

    // Fill Address Information
    await signupPage.fillAddressInformation(user);
  });
  test('check gatekeeping logic for partial required information', async ({
    page,
  }) => {
    // Assert email input is filled and disabled
    await signupPage.expectNameAndEmailToBeFilled(user.name, user.email);
    await signupPage.expectEmailInputToBeDisabled();

    // Fill Account Information
    await signupPage.fillAccountInformation(user);
  });
});
