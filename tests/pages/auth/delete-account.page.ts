import { Locator, Page, expect } from '@playwright/test';

export class DeleteAccountPage {
  private readonly deleteAccountMsg: Locator;
  private readonly continueBtn: Locator;
  constructor(public readonly page: Page) {
    this.deleteAccountMsg = page.getByTestId('account-deleted');
    this.continueBtn = page.getByTestId('continue-button');
  }

  async expectAccountDeletedVisible() {
    await expect(this.deleteAccountMsg).toBeVisible();
  }
  async clickContinueBtn() {
    await this.continueBtn.click();
  }
}
