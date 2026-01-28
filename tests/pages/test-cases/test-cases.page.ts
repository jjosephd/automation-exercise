import { Page, Locator, expect } from '@playwright/test';

export class TestCasesPage {
  private readonly heading: Locator;

  constructor(private readonly page: Page) {
    this.heading = page.getByRole('heading', {
      name: 'Test Cases',
      exact: true,
    });
  }

  async goto() {
    await this.page.goto('/test_cases');
  }

  async expectHeadingToBeVisible() {
    await expect(this.heading).toBeVisible();
  }
}
