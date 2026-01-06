export const LOGIN_PAGE = 'https://automationexercise.com/login';
export const SIGNUP_PAGE = 'https://automationexercise.com/signup';

export interface User {
  name: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  address: string;
  country: string;
  state: string;
  city: string;
  zipcode: string;
  mobileNumber: string;
}

export const DEFAULT_USER = {
  name: 'Test User',
  password: 'Password123!', // Good to keep a default password here
  email: '',
  firstName: 'Test',
  lastName: 'User',
  address: '333 Happy Path Ln',
  country: 'United States',
  state: 'Nebraska',
  city: 'Lincoln',
  zipcode: '20267',
  mobileNumber: '3334445555',
};

// Return a fresh object every time it's called
export const getNewUser = (): User => ({
  ...DEFAULT_USER,
  // Then only override the dynamic part
  email: `testuser_${Date.now()}@test.com`,
});
