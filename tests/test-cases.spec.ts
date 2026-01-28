import { test, expect } from '@playwright/test';
import { TestCasesPage } from './pages/test-cases/test-cases.page';

test.describe('Verify test case page visibility', () => {
  test('Verify test case page is visible', async ({ page }) => {
    const testCasesPage = new TestCasesPage(page);

    await testCasesPage.goto();
    await testCasesPage.expectHeadingToBeVisible();
  });
});
