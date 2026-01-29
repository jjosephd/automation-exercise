import { Locator, Page, expect } from '@playwright/test';
import { User } from 'shared';

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
  private readonly firstName: Locator;
  private readonly lastName: Locator;
  private readonly company: Locator;
  private readonly primaryAddress: Locator;
  private readonly secondaryAddress: Locator;
  private readonly country: Locator;
  private readonly stateOption: Locator;
  private readonly city: Locator;
  private readonly zipcode: Locator;
  private readonly mobileNumber: Locator;
  private readonly submitBtn: Locator;

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
    this.firstName = page.getByTestId('first_name');
    this.lastName = page.getByTestId('last_name');
    this.company = page.getByTestId('company');
    this.primaryAddress = page.getByTestId('address');
    this.secondaryAddress = page.getByTestId('address2');
    this.country = page.getByTestId('country');
    this.stateOption = page.getByTestId('state');
    this.city = page.getByTestId('city');
    this.zipcode = page.getByTestId('zipcode');
    this.mobileNumber = page.getByTestId('mobile_number');
    this.submitBtn = page.getByTestId('create-account');
  }

  expectSignupPageVisible = async () => {
    await expect(this.signupPageHeader).toBeVisible();
  };

  /* Account Information */

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
  // Interact with password input field
  fillPasswordField = async (password: string) => {
    await this.passwordInputField.fill(password);
  };
  selectNewsLetterCheckbox = async () => {
    await this.newsLetterInput.check();
  };
  selectOffersCheckbox = async () => {
    await this.offersInput.check();
  };
  // Interact with DOB inputs
  selectDayOption = async (value: string) => {
    await this.dayInput.selectOption(value);
  };
  selectMonthOption = async (value: string) => {
    await this.monthInput.selectOption(value);
  };
  selectYearOption = async (value: string) => {
    await this.yearInput.selectOption(value);
  };

  async fillAccountInformation(user: User) {
    await this.selectTitleOption();
    await this.fillNameInputField(user.name);
    await this.fillPasswordField(user.password);
    await this.selectDayOption(user.birthday.day);
    await this.selectMonthOption(user.birthday.month);
    await this.selectYearOption(user.birthday.year);
    await this.selectNewsLetterCheckbox();
    await this.selectOffersCheckbox();
  }

  /* End Account Information */

  /* Address Information */

  fillFirstName = async (value: string) => {
    await this.firstName.fill(value);
  };
  fillLastName = async (value: string) => {
    await this.lastName.fill(value);
  };
  fillCompany = async (value: string) => {
    await this.company.fill(value);
  };
  fillAddress = async (value: string) => {
    await this.primaryAddress.fill(value);
  };
  fillSecondaryAddress = async (value?: string) => {
    if (value) {
      await this.secondaryAddress.fill(value);
    }
  };
  selectCountryOption = async (value: string) => {
    await this.country.selectOption(value);
  };
  fillState = async (value: string) => {
    await this.stateOption.fill(value);
  };
  fillCity = async (value: string) => {
    await this.city.fill(value);
  };
  fillZipcode = async (value: string) => {
    await this.zipcode.fill(value);
  };
  fillMobileNumber = async (value: string) => {
    await this.mobileNumber.fill(value);
  };

  async fillAddressInformation(user: User) {
    await this.fillFirstName(user.firstName);
    await this.fillLastName(user.lastName);
    await this.fillAddress(user.address);
    await this.selectCountryOption(user.country);
    await this.fillState(user.state);
    await this.fillCity(user.city);
    await this.fillZipcode(user.zipcode);
    await this.fillMobileNumber(user.mobileNumber);
    await this.submitBtn.click();
  }

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
}
