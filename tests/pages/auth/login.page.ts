import { Page, Locator, expect } from '@playwright/test';
import { User } from '../../data/auth.data';

export class LoginPage {
  private readonly signUpText: Locator;
  private readonly nameInput: Locator;
  private readonly signupEmailInput: Locator;
  private readonly signupBtn: Locator;
  private readonly existingEmailErrorMsg: Locator;
  private readonly loginEmailInput: Locator;
  private readonly loginPasswordInput: Locator;
  private readonly loginBtn: Locator;
  private readonly loginValidationError: Locator;

  constructor(private readonly page: Page) {
    this.signUpText = page.getByText('New User Signup!');
    this.existingEmailErrorMsg = page.getByText('Email Address already exist!');
    this.nameInput = page.getByTestId('signup-name');
    this.signupEmailInput = page.getByTestId('signup-email');
    this.signupBtn = page.getByTestId('signup-button');

    this.loginEmailInput = page.getByTestId('login-email');
    this.loginPasswordInput = page.getByTestId('login-password');
    this.loginBtn = page.getByTestId('login-button');

    this.loginValidationError = page.getByText(
      'Your email or password is incorrect!',
    );
  }

  expectSignupTextToBeVisible = async () => {
    await expect(this.signUpText).toBeVisible();
  };

  registerUser = async (name: string, email: string) => {
    await this.nameInput.fill(name);
    await this.signupEmailInput.fill(email);
  };

  async clickSignUpBtn() {
    await this.signupBtn.click();
  }

  expectEmailErrorMsg = async () => {
    await expect(this.existingEmailErrorMsg).toBeVisible();
  };

  /* ============================================
     Login services
     ============================================ */

  /**
   * Go to login page "/login"
   */
  async goto() {
    await this.page.goto('/login');
  }
  async screenshot(path: string) {
    await this.page.screenshot({ path: path });
  }
  async clickLoginBtn() {
    await this.loginBtn.click();
  }
  async fillLoginForm(user: User) {
    await this.loginEmailInput.fill(user.email);
    await this.loginPasswordInput.fill(user.password);
  }

  async expectEmailVisible(user: User) {
    await expect(this.loginEmailInput).toHaveValue(user.email);
  }
  async expectLoginValidationErrVisible() {
    await expect(this.loginValidationError).toBeVisible();
  }
}
