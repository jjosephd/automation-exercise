import { Locator, Page, expect } from '@playwright/test';

export class SignUpPage {
  private readonly signupPageHeader: Locator;
  private readonly titleOne: Locator;
  private readonly titleTwo: Locator;
  private readonly nameInputField: Locator;
  private readonly emailInputField: Locator;
  private readonly passwordInputField: Locator;
  private readonly dayInput: Locator;
  private readonly monthInput: Locator;
  private readonly yearInput: Locator;
  private readonly newsLetterInput: Locator;
  private readonly offersInput: Locator;

  constructor(public readonly page: Page) {
    this.signupPageHeader = page.getByText('Enter Account Information');
    this.titleOne = page.getByLabel('id_title1');
    this.titleTwo = page.getByLabel('id_title2');
    this.nameInputField = page.getByTestId('name');
    this.emailInputField = page.getByTestId('email');
    this.passwordInputField = page.getByTestId('password');
    this.dayInput = page.getByTestId('days');
    this.monthInput = page.getByTestId('months');
    this.yearInput = page.getByTestId('years');
    this.newsLetterInput = page.getByRole('checkbox', {
      name: 'Sign up for our newsletter!',
    });
    this.offersInput = page.getByRole('checkbox', {
      name: 'Receive special offers from',
    });
  }
  expectSignupPageVisible = async () => {
    await expect(this.signupPageHeader).toBeVisible();
  };

  selectTitleOption = async () => {
    await expect(this.titleOne).toBeVisible();
    await expect(this.titleTwo).toBeVisible();
    await this.titleOne.click();
  };

  expectNameInputToBeFilled = async (name: string) => {
    await expect(this.nameInputField).toHaveValue(name);
  };
  expectEmailInputToBeFilled = async (email: string) => {
    await expect(this.emailInputField).toHaveValue(email);
  };
  expectEmailInputToBeDisabled = async () => {
    await expect(this.emailInputField).toBeDisabled();
  };

  /**
   *
   * @param name name to test
   * @param email email to test
   *
   */
  fillNameInputField = async (name: string) => {
    await this.nameInputField.fill(name);
  };
  fillEmailInputField = async (email: string) => {
    await this.emailInputField.fill(email);
  };
  fillPasswordField = async (password: string) => {
    await this.passwordInputField.fill(password);
  };

  expectDayInputFieldVisible = async () => {
    await expect(this.dayInput).toBeVisible();
  };
  expectMonthInputFieldVisible = async () => {
    await expect(this.monthInput).toBeVisible();
  };
  expectYearInputFieldVisible = async () => {
    await expect(this.yearInput).toBeVisible();
  };

  clickDayInput = async () => {
    await this.dayInput.click();
  };

  selectDayOption = async (value: string) => {
    await this.dayInput.selectOption(value);
  };
  selectMonthOption = async (value: string) => {
    await this.monthInput.selectOption(value);
  };
  selectYearOption = async (value: string) => {
    await this.yearInput.selectOption(value);
  };

  selectNewsLetterCheckbox = async () => {
    await this.newsLetterInput.check();
  };
  selectOffersCheckbox = async () => {
    await this.offersInput.check();
  };
}
