import { Page, Locator, expect } from '@playwright/test';
import { User } from '../../data/auth.data';

export class ContactPage {
  private readonly heading: Locator;
  private readonly nameInput: Locator;
  private readonly emailInput: Locator;
  private readonly subjectInput: Locator;
  private readonly msgInput: Locator;
  private readonly fileInput: Locator;
  private readonly submitBtn: Locator;
  private readonly successMsg: Locator;

  constructor(private readonly page: Page) {
    this.heading = page.getByRole('heading', { name: 'Get In Touch' });
    this.nameInput = page.getByTestId('name');
    this.emailInput = page.getByTestId('email');
    this.subjectInput = page.getByTestId('subject');
    this.msgInput = page.getByTestId('message');
    this.fileInput = page.getByRole('button', { name: 'Choose File' });
    this.submitBtn = page.getByTestId('submit-button');
    this.successMsg = page
      .locator('#contact-page')
      .getByText('Success! Your details have been submitted successfully.');
  }

  /* ============================================
     CONTACT US services
     ============================================ */

  async goto() {
    await this.page.goto('/contact_us');
  }

  async expectHeadingVisible() {
    await expect(this.heading).toBeVisible();
  }

  async expectSuccessMsgVisible() {
    await expect(this.successMsg).toBeVisible();
  }

  async fillNameInput(name: string) {
    await this.nameInput.fill(name);
  }

  async fillEmailInput(email: string) {
    await this.emailInput.fill(email);
  }

  async fillSubjectInput(subject: string) {
    await this.subjectInput.fill(subject);
  }

  async fillMsgInput(msg: string) {
    await this.msgInput.fill(msg);
  }

  async uploadFile(filePath: string) {
    await this.fileInput.setInputFiles(filePath);
  }

  async clickSubmit() {
    await this.submitBtn.click();
  }
}
