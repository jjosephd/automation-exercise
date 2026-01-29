import { Page, Locator, expect } from '@playwright/test';

export class ProductsPage {
  private readonly heading: Locator;
  private readonly itemsList: Locator;
  private readonly viewProduct: Locator;
  private readonly searchInput: Locator;
  private readonly submitSearch: Locator;
  private readonly defaultSearchValue: string;
  private readonly searchHeading: Locator;
  private readonly products: Locator;

  constructor(private readonly page: Page) {
    this.heading = page.getByRole('heading', {
      name: 'All Products',
      exact: true,
    });
    this.itemsList = page.locator('.features_items');
    this.viewProduct = page.getByRole('link', { name: 'View Product' }).first();
    this.searchInput = page.getByRole('textbox', { name: 'Search Product' });
    this.submitSearch = page.locator('#submit_search');
    this.defaultSearchValue = 'red';
    this.searchHeading = page.getByRole('heading', {
      name: 'Searched Products',
    });
    this.products = page.locator('.features_items .col-sm-4');
  }

  async goto() {
    await this.page.goto('/products');
  }

  async expectHeadingVisible() {
    await expect(this.heading).toBeVisible();
  }

  async expectProductListVisible() {
    await expect(this.itemsList).toBeVisible();
  }

  async expectSearchHeadingVisisble() {
    await expect(this.searchHeading).toBeVisible();
  }

  async expectResultsToNotHaveCount(value: number) {
    await expect(this.products).not.toHaveCount(0);
  }

  async expectResultsVisible() {
    await this.products.count();
  }

  async clickViewProduct() {
    await this.viewProduct.click();
  }

  async fillSearchInput(value: string) {
    await this.searchInput.fill(value);
  }

  async clickSearchBtn() {
    await this.submitSearch.click();
  }

  async dismissDialog() {
    // Intercept and abort all Google Ad requests to keep the test clean and fast
    await this.page.route('**/*google*', (route) => route.abort());
    await this.page.route('**/*doubleclick*', (route) => route.abort());
    await this.page.route('**/*adservice*', (route) => route.abort());
  }
}
