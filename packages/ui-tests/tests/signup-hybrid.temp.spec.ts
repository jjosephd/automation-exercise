import { test, expect } from '@playwright/test';
import { SignUpPage } from '../pages/auth/signup.page';
import { HomePage } from '../pages/home/home.page';
import { LoginPage } from '../pages/auth/login.page';
import * as Data from 'shared';
import { AccountCreated } from '../pages/auth/account-created.page';
import { DeleteAccountPage } from '../pages/auth/delete-account.page';

/**
 * HYBRID APPROACH (Recommended)
 * Combines the best of both worlds:
 * - Focused, parallel tests for fast feedback during development
 * - One comprehensive E2E smoke test for deployment validation
 */

/* ============================================
   HELPER: Reusable registration flow
   Reduces duplication across tests
   ============================================ */
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

test.describe.skip('Sign up page - Hybrid Approach', () => {
  let signupPage: SignUpPage;
  let loginPage: LoginPage;
  let accountCreatedPage: AccountCreated;
  let homePage: HomePage;
  let deleteAccountPage: DeleteAccountPage;
  let user: Data.User;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    signupPage = new SignUpPage(page);
    accountCreatedPage = new AccountCreated(page);
    deleteAccountPage = new DeleteAccountPage(page);
    homePage = new HomePage(page);

    user = Data.getNewUser();
    await page.goto('/login');
    await loginPage.registerUser(user.name, user.email);
    await loginPage.clickSignUpBtn();
    await signupPage.expectSignupPageVisible();
  });

  /* ============================================
     FOCUSED TESTS - Run in parallel, fast feedback
     ============================================ */
  test.describe('Quick Checks (Parallel)', () => {
    test('pre-fills user name and email', async () => {
      await signupPage.expectNameAndEmailToBeFilled(user.name, user.email);
    });

    test('email field is disabled', async () => {
      await signupPage.expectEmailInputToBeDisabled();
    });

    test('shows confirmation after valid registration', async () => {
      await signupPage.fillAccountInformation(user);
      await signupPage.fillAddressInformation(user);
      await signupPage.submitAccountCreation();

      await accountCreatedPage.expectAccountCreatedVisible();
    });

    test('displays username after registration', async () => {
      await completeFullRegistration(signupPage, accountCreatedPage, user);
      await homePage.verifyLoggedInUser(user);
    });
  });

  /* ============================================
     COMPREHENSIVE E2E SMOKE TEST
     Run on deploy, covers full journey
     ============================================ */
  test.describe('Smoke Tests', () => {
    // Tag this to run separately: npx playwright test --grep @smoke
    test('complete registration and deletion journey @smoke', async ({
      page,
    }) => {
      // Step 1: Verify pre-population
      await signupPage.expectNameAndEmailToBeFilled(user.name, user.email);
      await signupPage.expectEmailInputToBeDisabled();

      // Step 2: Complete registration
      await signupPage.fillAccountInformation(user);
      await signupPage.fillAddressInformation(user);
      await signupPage.submitAccountCreation();

      // Step 3: Verify account created
      await accountCreatedPage.expectAccountCreatedVisible();
      await accountCreatedPage.clickContinueBtn();

      // Step 4: Verify logged in state
      await homePage.verifyLoggedInUser(user);

      // Step 5: Delete account
      await homePage.clickDeleteBtn();
      await deleteAccountPage.expectAccountDeletedVisible();
      await deleteAccountPage.clickContinueBtn();

      // Step 6: Verify back to home
      await expect(page).toHaveURL('/');
    });
  });

  /* ============================================
     GATEKEEPING / NEGATIVE TESTS
     ============================================ */
  test.describe('Form Validation', () => {
    test('stays on page when submitting without address info', async ({
      page,
    }) => {
      await signupPage.fillAccountInformation(user);
      await signupPage.submitAccountCreation();

      // Should still be on signup page (form validation failed)
      await signupPage.expectSignupPageVisible();
    });

    // Parameterized validation tests using forEach (Playwright-compatible)
    test.describe('Invalid Data', () => {
      const invalidInputs = [
        { field: 'firstName', value: '', error: 'First name is required' },
        { field: 'email', value: 'invalid', error: 'Invalid email format' },
        { field: 'mobileNumber', value: 'abc', error: 'Invalid phone number' },
      ];

      invalidInputs.forEach(({ field, value, error }) => {
        test(`shows error for invalid ${field}`, async ({ page }) => {
          // TODO: Implement once Data.updateUser is available
          // const invalidUser = Data.updateUser(user, { [field]: value });
          // ... fill and submit, verify error
        });
      });
    });
  });
});
