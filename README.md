# 🎭 Playwright UI Automation Practice

A hands-on repository for practicing **UI automation testing** with [Playwright](https://playwright.dev/) using [Automation Exercise](https://automationexercise.com/) as the target application.

---

## 🎯 Purpose

This project serves as a learning sandbox to:

- Practice **black-box testing** against a real web application
- Implement **Page Object Model (POM)** for maintainable test architecture
- Explore **design patterns** for effective and fast test execution
- Write **clean, readable test code** following industry best practices

---

## 🏗️ Project Structure

```
playwright-practice/
├── tests/
│   ├── data/                    # Test data factories & fixtures
│   │   └── auth.data.ts         # User data generators
│   ├── pages/                   # Page Object Models
│   │   ├── auth/                # Authentication pages
│   │   │   ├── login.page.ts
│   │   │   ├── signup.page.ts
│   │   │   ├── account-created.page.ts
│   │   │   └── delete-account.page.ts
│   │   └── home/                # Home page
│   │       └── home.page.ts
│   ├── setup/                   # Test setup & configuration
│   ├── smoke/                   # Smoke test suites
│   ├── login.spec.ts            # Login feature tests
│   ├── signup.spec.ts           # Signup feature tests
│   └── signup-hybrid.temp.spec.ts # Hybrid test approach examples
├── playwright.config.ts         # Playwright configuration
└── package.json
```

---

## 🧪 Test Design Patterns

### Page Object Model (POM)

Each page is encapsulated in its own class with:

- **Locators** as private properties
- **Actions** as public methods
- **Assertions** as `expect*` methods

```typescript
export class LoginPage {
  private readonly emailInput: Locator;

  constructor(private readonly page: Page) {
    this.emailInput = page.getByTestId('login-email');
  }

  async fillLoginForm(user: User) {
    await this.emailInput.fill(user.email);
  }
}
```

### Hybrid Test Architecture

Combines focused unit-style tests with comprehensive E2E flows:

| Category            | Purpose                          | Speed     |
| ------------------- | -------------------------------- | --------- |
| **Quick Checks**    | Single-assertion, parallel tests | ⚡ Fast   |
| **Smoke Tests**     | Full user journey validation     | 🐢 Slower |
| **Form Validation** | Negative/gatekeeping tests       | ⚡ Fast   |

### Data-Driven Testing

Using `forEach` for parameterized tests (Playwright-compatible):

```typescript
const invalidInputs = [
  { field: 'email', value: 'invalid', error: 'Invalid email' },
  { field: 'password', value: '', error: 'Password required' },
];

invalidInputs.forEach(({ field, value, error }) => {
  test(`shows error for invalid ${field}`, async ({ page }) => {
    // ...
  });
});
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd playwright-practice

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install
```

### Running Tests

```bash
# Run all tests
npx playwright test

# Run smoke tests only
npm run test:smoke

# Run with UI mode (interactive)
npx playwright test --ui

# Run specific test file
npx playwright test tests/login.spec.ts

# View test report
npx playwright show-report
```

---

## 📝 Key Learnings

### ✅ Best Practices Applied

- **Single Responsibility**: Each test verifies one behavior
- **Reusable Helpers**: Common flows extracted to functions
- **Test Tagging**: `@smoke` tags for selective test runs
- **Descriptive Naming**: Test names explain intent without reading code
- **Await Everything**: `test.step()` requires `await`

### 🔧 Patterns Explored

| Pattern               | Description                            |
| --------------------- | -------------------------------------- |
| **POM**               | Encapsulate page interactions          |
| **Factory Functions** | Generate unique test data per run      |
| **Helper Functions**  | Reduce duplication across tests        |
| **Logical Grouping**  | `test.describe` blocks by feature/type |

---

## 🌐 Target Application

**[Automation Exercise](https://automationexercise.com/)** — A practice site designed for learning automation testing, featuring:

- User registration & login
- Product catalog & cart
- Checkout flows
- Contact forms

---

## 📚 Resources

- [Playwright Documentation](https://playwright.dev/docs/intro)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [Page Object Model Guide](https://playwright.dev/docs/pom)

---

## 📄 License

ISC
