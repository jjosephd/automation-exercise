import { test, expect } from '@playwright/test';
import { LoginPage } from '../login/login.page';
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
    // Select title option
    await signupPage.selectTitleOption();

    // Interact with name input field
    // await signupPage.fillNameInputField('Test User123');

    // Assert email input is filled and disabled
    await signupPage.expectNameAndEmailToBeFilled(user.name, user.email);
    await signupPage.expectEmailInputToBeDisabled();

    // Interact with password input field
    await signupPage.fillPasswordField(user.password);

    // Interact with DOB inputs
    await signupPage.clickDayInput();
    await signupPage.selectDayOption('4');
    await signupPage.selectMonthOption('January');
    await signupPage.selectYearOption('1996');

    // Interact with checkbox options
    await signupPage.selectNewsLetterCheckbox();
    await signupPage.selectOffersCheckbox();
  });
});
