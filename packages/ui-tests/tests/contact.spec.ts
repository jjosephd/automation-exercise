import { test, expect } from '@playwright/test';
import { ContactPage } from '../pages/contact/contact.page';
import { getNewUser, User } from 'shared';

import path from 'path';

/* ============================================
   HELPER: Reusable contact form flow
   Reduces duplication across tests
   ============================================ */
const filePath = path.resolve(__dirname, 'debug2.png');
async function completeFullContactForm(contactPage: ContactPage, user: User) {
  await contactPage.fillNameInput(user.name);
  await contactPage.fillEmailInput(user.email);
  await contactPage.fillSubjectInput('Test Subject');
  await contactPage.fillMsgInput('Test Message');
  //await contactPage.uploadFile(filePath);
}

const getInvalidUser = (user: User, overrides: Partial<User>): User => ({
  ...user,
  ...overrides,
});

test.describe('Contact Form testing', async () => {
  let contactPage: ContactPage;
  let user: User;

  let badEmailUser: User;
  let badNameUser: User;
  /* ============================================
     Instantiate the pages for the current 
     test and navigate to the URL (contact page)
     ============================================ */
  test.beforeEach(async ({ page }) => {
    contactPage = new ContactPage(page);
    await contactPage.goto();
    user = getNewUser();
    contactPage.acceptDialog();

    badEmailUser = getInvalidUser(user, { email: 'invalid-email' });
    badNameUser = getInvalidUser(user, { name: '' });
  });

  /* ============================================
     COMPREHENSIVE E2E SMOKE TEST
     Run on deploy, covers full journey
     ============================================ */

  test.describe('Smoke Test', () => {
    test('complete contact form flow with valid inputs @smoke', async ({
      page,
    }) => {
      await test.step('Fill out full contact form', async () => {
        await completeFullContactForm(contactPage, user);
      });
      await test.step('Submit contact form', async () => {
        await contactPage.clickSubmit();
      });
      await test.step('Confirm success message', async () => {
        await contactPage.expectSuccessMsgVisible();
      });
    });
  });

  /* ============================================
     GATEKEEPING / NEGATIVE TESTS
     ============================================ */

  test.describe('NEGATIVE TESTS - Test negative paths', () => {
    test('stays on page when submit button is clicked without filling inputs', async ({
      page,
    }) => {
      await test.step('Click submit button', async () => {
        await contactPage.clickSubmit();
      });
      await test.step('Verify we are still on contact page', async () => {
        await expect(page).toHaveURL(/\/contact_us/);
      });
    });

    test('test email format validation', async ({ page }) => {
      await test.step('Fill email input', async () => {
        await completeFullContactForm(contactPage, badEmailUser);
      });
      await test.step('Verify we are still on contact page', async () => {
        await expect(page).toHaveURL(/\/contact_us/);
      });
    });

    test('test empty name field', async ({ page }) => {
      await test.step('Fill name input', async () => {
        await completeFullContactForm(contactPage, badNameUser);
      });
      await test.step('Verify we are still on contact page', async () => {
        await expect(page).toHaveURL(/\/contact_us/);
      });
    });
  });
});
