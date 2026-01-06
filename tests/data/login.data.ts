export const LOGIN_PAGE = 'https://automationexercise.com/login';
export const SIGNUP_PAGE = 'https://automationexercise.com/signup';

export const DEFAULT_USER = {
  name: 'David Dillow',
  password: 'Password123!', // Good to keep a default password here
};

// Return a fresh object every time it's called
export const getNewUser = () => ({
  name: DEFAULT_USER.name,
  email: `testuser_${Date.now()}_${Math.floor(Math.random() * 1000)}@test.com`,
  password: DEFAULT_USER.password,
});
