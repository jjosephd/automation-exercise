import { Page, Locator, expect } from '@playwright/test';

export class ProductsPage {
  private readonly heading: Locator;
  private readonly itemsList: Locator;
  private readonly viewProduct: Locator;

  constructor(private readonly page: Page) {
    this.heading = page.getByRole('heading', {
      name: 'All Products',
      exact: true,
    });
    this.itemsList = page.locator('.features_items');
    this.viewProduct = page.getByRole('link', { name: 'View Product' }).first();
  }

  async expectHeadingVisible() {
    await expect(this.heading).toBeVisible();
  }

  async expectProductListVisible() {
    await expect(this.itemsList).toBeVisible();
  }

  async clickViewProduct() {
    await this.viewProduct.click();
  }
}
