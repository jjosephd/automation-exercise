import { test, expect } from '@playwright/test';
import { HomePage } from './pages/home/home.page';
import { LoginPage } from './pages/auth/login.page';
import { SignUpPage } from './pages/auth/signup.page';
import { AccountCreated } from './pages/auth/account-created.page';
import * as Data from './data/auth.data';

async function completeFullRegistration(
  signupPage: SignUpPage,
  accountCreatedPage: AccountCreated,
  user: Data.User,
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
  password: `invalid_pass`,
});

test.describe('Authentication', () => {
  let loginPage: LoginPage; // Instantiate Login Page
  let signupPage: SignUpPage; // Instantiate Sign Up Page
  let accountCreatedPage: AccountCreated; // Instatiate Account created page
  let homePage: HomePage; // Instatiate home page

  let user: Data.User;
  let invalidPassUser: Data.User;

  /* ============================================
     SETUP TEST - Register user once to be 
     reused for tests
     ============================================ */

  test.beforeAll(async ({ browser }) => {
    // Create a setup context
    const context = await browser.newContext();
    const page = await context.newPage();

    // Instantiate temp Page Objects for setup
    const setupLogin = new LoginPage(page);
    const setupSignup = new SignUpPage(page);
    const setupAccount = new AccountCreated(page);

    // One-time Data Setup
    user = Data.getNewUser();
    invalidPassUser = getInvalidUser(user);

    /* ============================================
     Sign up - the login validation relies on an existing
     user being created
     ============================================ */

    await setupLogin.goto();
    await setupLogin.registerUser(user.name, user.email);
    await setupLogin.clickSignUpBtn();

    // Use the setup-scoped instances here
    await completeFullRegistration(setupSignup, setupAccount, user);

    await context.close();
  });

  /* ============================================
     Instantiate the pages for the current 
     test and navigate to the URL (login page)
     ============================================ */

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    signupPage = new SignUpPage(page);
    accountCreatedPage = new AccountCreated(page);
    homePage = new HomePage(page);

    await loginPage.goto(); // Navigate to login page
  });

  /* ============================================
     COMPREHENSIVE E2E SMOKE TEST
     Run on deploy, covers full journey
     ============================================ */

  test.describe('Smoke Test', () => {
    test('complete login flow with valid login @smoke', async ({ page }) => {
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

  test.describe('Logout Flow', () => {
    test('complete logout flow', async ({ page }) => {
      // First, log in (beforeEach only navigates to the login page)
      await test.step('Log in first', async () => {
        await loginPage.fillLoginForm(user);
        await loginPage.clickLoginBtn();
        await homePage.verifyLoggedInUser(user);
      });

      await test.step('Click logout button', async () => {
        await homePage.clickLogoutBtn();
      });

      await test.step('Verify redirected to login page', async () => {
        await expect(page).toHaveURL(/\/login/);
      });
    });
  });

  /* ============================================
     FOCUSED TESTS - Run in parallel, fast feedback
     ============================================ */

  test.describe('Quick checks', async () => {
    test('verify email input is visible', async () => {
      await test.step('Fill in the login form', async () => {
        await loginPage.fillLoginForm(user);
      });
      await test.step('Verify email input is filled', async () => {
        await loginPage.expectEmailVisible(user);
      });
    });
  });

  /* ============================================
     GATEKEEPING / NEGATIVE TESTS
     ============================================ */

  test.describe('Invalid Password Form Validation', () => {
    test('stays on page when submitting invalid data', async ({ page }) => {
      await test.step('Fill login form with invalid password', async () => {
        await loginPage.fillLoginForm(invalidPassUser);
      });
      await test.step('Click the login button', async () => {
        await loginPage.clickLoginBtn();
      });
      await test.step('Verify page stays on login', async () => {
        await expect(page).toHaveURL(/\/login/);
      });
      await test.step('Verify incorrect password text is displayed', async () => {
        await loginPage.expectLoginValidationErrVisible();
      });
    });
  });

  test.describe('Existing Email Form Validation', () => {});
});
