import { Locator, Page, expect } from '@playwright/test';

export class AccountCreated {
  private readonly accountCreatedMsg: Locator;
  private readonly continueBtn: Locator;
  constructor(public readonly page: Page) {
    this.accountCreatedMsg = page.getByTestId('account-created');
    this.continueBtn = page.getByTestId('continue-button');
  }

  async expectAccountCreatedVisible() {
    await expect(this.accountCreatedMsg).toBeVisible();
  }
  async clickContinueBtn() {
    await this.continueBtn.click();
  }
}
