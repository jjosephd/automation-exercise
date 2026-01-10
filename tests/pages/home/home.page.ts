import { Page, Locator, expect } from '@playwright/test';
import { HOME_PAGE_URL } from './home.data';
import { User } from '../../data/auth.data';

export class HomePage {
  private readonly login: Locator;
  private readonly loggedInUser: Locator;
  private readonly deleteAccountBtn: Locator;
  private readonly logoutBtn: Locator;

  constructor(public readonly page: Page) {
    this.login = page.getByText('Signup / Login');
    this.loggedInUser = page.getByText(' Logged in as ');

    this.logoutBtn = page.getByRole('link', { name: 'Logout' });
    this.deleteAccountBtn = page.getByText(' Delete Account');
  }

  expectHomePageVisible = async () => {
    await expect(this.page).toHaveURL(HOME_PAGE_URL);
  };

  async verifyLoggedInUser(user: User) {
    await expect(this.loggedInUser).toContainText(user.name);
  }

  gotoLogin = async () => await this.login.click();
  clickDeleteBtn = async () => await this.deleteAccountBtn.click();
  async clickLogoutBtn() {
    await this.logoutBtn.click();
  }
}
