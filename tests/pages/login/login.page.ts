import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  private readonly signUpText: Locator;
  private readonly nameInput: Locator;
  private readonly emailInput: Locator;
  private readonly signupBtn: Locator;
  constructor(public readonly page: Page) {
    this.signUpText = page.getByText('New User Signup!');
    this.nameInput = page.getByTestId('signup-name');
    this.emailInput = page.getByTestId('signup-email');
    this.signupBtn = page.getByTestId('signup-button');
  }

  expectSignupTextToBeVisible = async () => {
    await expect(this.signUpText).toBeVisible();
  };

  registerUser = async (name: string, email: string) => {
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
    await this.signupBtn.click();
  };
}
