import { Locator, Page, expect } from '@playwright/test';
import { User } from '../../data/login.data';

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
    this.titleOne = page.getByRole('radio', { name: 'Mr.' }); // needs to be fixed
    this.titleTwo = page.getByRole('radio', { name: 'Mrs.' }); // needs to be fixed
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
    await this.titleOne.check();
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
   * @param name Name to test
   * @param email Email to test
   */
  expectNameAndEmailToBeFilled = async (name: string, email: string) => {
    await this.expectNameInputToBeFilled(name);
    await this.expectEmailInputToBeFilled(email);
  };
  fillNameInputField = async (name: string) => {
    await this.nameInputField.fill(name);
  };
  fillEmailInputField = async (email: string) => {
    await this.emailInputField.fill(email);
  };
  fillPasswordField = async (password: string) => {
    await this.passwordInputField.fill(password);
  };

  fillFirstName = async (firstName: string) => {};
  fillLastName = async (lastName: string) => {};
  fillCompany = async (company: string) => {};
  fillAddress = async (address: string) => {};
  fillSecondaryAddress = async (address: string) => ({});
  selectCountryOption = async (value: string) => {};
  fillState = async (state: string) => {};
  fillCity = async (city?: string) => {};
  fillZipcode = async (zipcode?: string) => {};
  fillMobileNumber = async (number: string) => {};

  async fillAddressInformation(user: User) {}

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
