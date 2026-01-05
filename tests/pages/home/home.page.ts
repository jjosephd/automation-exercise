import { Page, Locator, expect } from '@playwright/test';
import { HOME_PAGE_URL } from './home.data';

export class HomePage {
  private readonly login: Locator;
  constructor(public readonly page: Page) {
    this.login = page.getByText('Signup / Login');
  }

  expectHomePageVisible = async () => {
    await expect(this.page).toHaveURL(HOME_PAGE_URL);
  };

  gotoLogin = async () => await this.login.click();
}
