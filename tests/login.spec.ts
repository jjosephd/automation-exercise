import { test, expect } from '@playwright/test';
import { HomePage } from './pages/home/home.page';
import { LoginPage } from './pages/auth/login.page';
import { getNewUser } from './data/auth.data';
import { SignUpPage } from './pages/auth/signup.page';
import { AccountCreated } from './pages/auth/account-created.page';
import * as Data from './data/auth.data';

async function completeFullRegistration(
  signupPage: SignUpPage,
  accountCreatedPage: AccountCreated,
  user: Data.User
) {
  await signupPage.fillAccountInformation(user);
  await signupPage.fillAddressInformation(user);
  await signupPage.submitAccountCreation();
  await accountCreatedPage.expectAccountCreatedVisible();
  await accountCreatedPage.clickContinueBtn();
}
const getInvalidUser = (user: Data.User): Data.User => ({
  ...user,
  // Then only override the dynamic part
  password: `abc`,
});

test.describe('Login page Testing', () => {
  let loginPage: LoginPage;
  let signupPage: SignUpPage;
  let accountCreatedPage: AccountCreated;
  let homePage: HomePage;
  let user: Data.User;
  let invalidUser: Data.User;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    signupPage = new SignUpPage(page);
    accountCreatedPage = new AccountCreated(page);
    homePage = new HomePage(page);

    user = Data.getNewUser();

    invalidUser = getInvalidUser(user);

    await loginPage.goto();

    /* ============================================
     Sign up - the login validation relies on an existing
     user being created
     ============================================ */

    await loginPage.registerUser(user.name, user.email);
    await loginPage.clickSignUpBtn();
    await signupPage.expectSignupPageVisible();
    await completeFullRegistration(signupPage, accountCreatedPage, user);
    await homePage.verifyLoggedInUser(user);
    await homePage.clickLogoutBtn();
    await loginPage.goto(); // Return to login page
  });

  /* ============================================
     COMPREHENSIVE E2E SMOKE TEST
     Run on deploy, covers full journey
     ============================================ */

  test.describe('Smoke Test', () => {
    test('complete login flow @smoke', async ({ page }) => {
      // Fill login form
      await test.step('Interact with form', async () => {
        await loginPage.fillLoginForm(user);
      });
      await test.step('Click login buttton', async () => {
        await loginPage.clickLoginBtn();
      });
      await test.step('Verify user is logged in', async () => {
        await homePage.verifyLoggedInUser(user);
      });
    });
  });

  /* ============================================
     FOCUSED TESTS - Run in parallel, fast feedback
     ============================================ */

  test.describe('Quick checks', async () => {
    test('verify email input is visible', async () => {
      await loginPage.fillLoginForm(user);
      await loginPage.expectEmailVisible(user);
    });
  });

  /* ============================================
     GATEKEEPING / NEGATIVE TESTS
     ============================================ */

  test.describe('Form Validation', () => {
    test('stays on page when submitting invalid data', async ({ page }) => {
      await test.step('Fill login form with invalid password', async () => {
        await loginPage.fillLoginForm(invalidUser);
      });
      await test.step('Click the login button', async () => {
        await loginPage.clickLoginBtn();
      });
      await test.step('Verify page stays on login', async () => {
        await expect(page).toHaveURL(/\/login/);
      });
    });

    // Parameterized validation tests using forEach (Playwright-compatible)
  });
});
