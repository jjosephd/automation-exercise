import { Page, Locator, expect } from '@playwright/test';

export class ProductDetailsPage {
  // name, category, price, availability, condition, brand
  private readonly productName: Locator;
  private readonly productCategory: Locator;
  private readonly productPrice: Locator;
  private readonly productAvailability: Locator;
  private readonly productCondition: Locator;
  private readonly productBrand: Locator;

  constructor(private readonly page: Page) {
    this.productName = page.getByRole('heading', { name: 'Blue Top' });
    this.productCategory = page.getByText('Category: Women > Tops');
    this.productPrice = page.getByText('Rs.');
    this.productAvailability = page.getByText('Availability: In Stock');
    this.productCondition = page.getByText('Condition: New');
    this.productBrand = page.getByText('Brand: Polo', { exact: true });
  }

  async expectproductNameVisible() {
    await expect(this.productName).toBeVisible();
  }

  async expectProductCategoryVisible() {
    await expect(this.productCategory).toBeVisible();
  }

  async expectProductPriceVisible() {
    await expect(this.productPrice).toBeVisible();
  }

  async expectProductAvailabilityVisibile() {
    await expect(this.productAvailability).toBeVisible();
  }

  async expectProductConditionVisible() {
    await expect(this.productCondition).toBeVisible();
  }

  async expectProductBrandVisible() {
    await expect(this.productBrand).toBeVisible();
  }
}
