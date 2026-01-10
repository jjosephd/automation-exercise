import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/auth/login.page';
import { SignUpPage } from './pages/auth/signup.page';
import { HomePage } from './pages/home/home.page';
import * as Data from './data/auth.data';
import { AccountCreated } from './pages/auth/account-created.page';
import { DeleteAccountPage } from './pages/auth/delete-account.page';

test.describe('Sign up page tests', () => {
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

    // register user before each test
    await loginPage.registerUser(user.name, user.email);
    await loginPage.clickSignUpBtn();

    // Verify we are actually on the signup page before starting the test
    await signupPage.expectSignupPageVisible();
  });

  test('should complete full account registration and deletion', async ({
    page,
  }) => {
    // Assert email input is filled and disabled
    await signupPage.expectNameAndEmailToBeFilled(user.name, user.email);
    await signupPage.expectEmailInputToBeDisabled();

    // Fill Account Information
    await signupPage.fillAccountInformation(user);

    // Fill Address Information
    await signupPage.fillAddressInformation(user);
    await signupPage.submitAccountCreation();

    // Assert account created page is visible
    await accountCreatedPage.expectAccountCreatedVisible();

    // Click continue
    await accountCreatedPage.clickContinueBtn();

    // Verify logged in user
    await homePage.verifyLoggedInUser(user);
    await page.screenshot({ path: 'debug.png' });

    // Delete account
    await homePage.clickDeleteBtn();

    // Verify Account Deleted
    await deleteAccountPage.expectAccountDeletedVisible();

    // Continue to home
    await deleteAccountPage.clickContinueBtn();

    await expect(page).toHaveURL('/');
  });
});
