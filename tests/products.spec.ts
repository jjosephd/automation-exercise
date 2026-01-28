// Verify user is navigated to ALL PRODUCTS page successfully
// Verify that detail detail is visible: product name, category, price, availability, condition, brand

import { test, expect } from '@playwright/test';
import { ProductsPage } from './pages/products/products.page';
import { ProductDetailsPage } from './pages/products/product-details.page';

/* ============================================
   HELPER: Reusable contact form flow
   Reduces duplication across tests
   ============================================ */
async function verifyProductPage(page: ProductsPage) {
  await page.expectHeadingVisible();
  await page.expectProductListVisible();
}
async function verifyProductDetailsPage(page: ProductDetailsPage) {
  await page.expectProductAvailabilityVisibile();
  await page.expectProductBrandVisible();
  await page.expectProductCategoryVisible();
  await page.expectProductConditionVisible();
  await page.expectProductPriceVisible();
  await page.expectproductNameVisible();
}
/* ============================================
     Instantiate the pages for the current 
     test and navigate to the URL (products page)
     ============================================ */

test.describe('Product Page Testing', async () => {
  let productsPage: ProductsPage;
  let productDetailsPage: ProductDetailsPage;

  test.beforeEach(async ({ page }) => {
    productsPage = new ProductsPage(page);
    productDetailsPage = new ProductDetailsPage(page);

    await productsPage.dismissDialog();
    await productsPage.goto();
  });

  /* ============================================
     COMPREHENSIVE E2E SMOKE TEST
     Run on deploy, covers full journey
     ============================================ */

  test.describe('E2E Test', () => {
    test('Verify product page visibility @smoke', async ({ page }) => {
      await test.step('Confirm product page url -> /products', async () => {
        await expect(page).toHaveURL('/products');
      });
      await test.step('Assert product page visibility', async () => {
        await verifyProductPage(productsPage);
      });
    });

    test('Verify product page navigation to product details', async ({
      page,
    }) => {
      await test.step('Click view product', async () => {
        await productsPage.clickViewProduct();
      });
      await test.step('Verify we are on correct page', async () => {
        await expect(page).toHaveURL('/product_details/1');
      });
      await test.step('Verify product details -> visible', async () => {
        await verifyProductDetailsPage(productDetailsPage);
      });
    });
  });
});

/* ============================================
     GATEKEEPING / NEGATIVE TESTS
     ============================================ */
