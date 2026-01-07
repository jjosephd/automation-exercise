export const LOGIN_PAGE = 'https://automationexercise.com/login';
export const SIGNUP_PAGE = 'https://automationexercise.com/signup';

export interface User {
  name: string;
  email: string;
  birthday: Birthday;
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
export interface Birthday {
  day: string;
  month: string;
  year: string;
}

export const DEFAULT_USER = {
  name: 'Test User',
  password: 'Password123!', // Good to keep a default password here
  birthday: {
    day: '1',
    month: 'January',
    year: '1996',
  },
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
export const USER_CREDENTIALS_PARTIAL = {
  name: 'Test User',
  password: 'Password123!', // Good to keep a default password here
  birthday: {
    day: '1',
    month: 'January',
    year: '1996',
  },
  email: '',
};

// Return a fresh object every time it's called
export const getNewUser = (): User => ({
  ...DEFAULT_USER,
  // Then only override the dynamic part
  email: `testuser_${Date.now()}@test.com`,
});
export const updateUser = (user: User, updates: Partial<User>): User => ({
  ...user,
  ...updates,
});
