# API Testing Fundamentals with Playwright

> A practical guide to understanding API testing—what it is, why it matters, and how to approach it effectively.

---

## Table of Contents

1. [What is API Testing?](#what-is-api-testing)
2. [UI Testing vs. API Testing](#ui-testing-vs-api-testing)
3. [The Anatomy of an API Request](#the-anatomy-of-an-api-request)
4. [What to Test: The Core Checklist](#what-to-test-the-core-checklist)
5. [Edge Cases: Where Bugs Hide](#edge-cases-where-bugs-hide)
6. [Design Patterns for API Tests](#design-patterns-for-api-tests)
7. [The Testing Pyramid](#the-testing-pyramid)
8. [Playwright's API Testing Toolkit](#playwrights-api-testing-toolkit)
9. [Common Mistakes to Avoid](#common-mistakes-to-avoid)

---

## What is API Testing?

Think of an API (Application Programming Interface) as a **waiter in a restaurant**. You (the customer) don't go into the kitchen to make your food. Instead, you tell the waiter what you want, they take your order to the kitchen, and they bring back what you asked for.

- **Your order** = The Request (e.g., "I want user #123's profile")
- **The kitchen** = The Server/Database
- **What comes back** = The Response (e.g., `{ "name": "John", "email": "john@example.com" }`)

**API Testing** is the process of verifying that this "waiter" works correctly:

- Does it understand your order?
- Does it bring back the right thing?
- What happens if you order something that doesn't exist?
- What if someone tries to order from a table they're not sitting at (unauthorized access)?

---

## UI Testing vs. API Testing

| Aspect            | UI Testing                                       | API Testing                                        |
| ----------------- | ------------------------------------------------ | -------------------------------------------------- |
| **What you test** | What the user _sees_ (buttons, forms, pages)     | What the system _does_ behind the scenes           |
| **Speed**         | Slow (must render a full browser)                | Fast (just sending/receiving data)                 |
| **Stability**     | Fragile (a CSS change can break tests)           | Stable (data contracts rarely change)              |
| **Feedback**      | "The button didn't work"                         | "The server returned a 500 error"                  |
| **When to use**   | Verifying user experience and visual correctness | Verifying business logic, data integrity, security |

### The Golden Rule:

> **Test the API first, then verify the UI reflects it correctly.**

If your API returns the wrong data, the UI will show the wrong data. API tests catch the root cause; UI tests only catch the symptom.

---

## The Anatomy of an API Request

Every API interaction has these core components:

### 1. The Endpoint (URL)

Where you're sending the request.

```
https://api.example.com/users/123
```

### 2. The Method (Verb)

What you want to do:
| Method | Purpose | Example |
|--------|---------|---------|
| `GET` | Retrieve data | Get a user's profile |
| `POST` | Create new data | Register a new user |
| `PUT` | Replace existing data | Update entire user profile |
| `PATCH` | Partially update data | Change just the email |
| `DELETE` | Remove data | Delete a user account |

### 3. The Headers

Metadata about the request (authentication, content type, etc.):

```
Authorization: Bearer abc123token
Content-Type: application/json
```

### 4. The Body (Payload)

The data you're sending (for POST, PUT, PATCH):

```json
{
  "name": "John Doe",
  "email": "john@example.com"
}
```

### 5. The Response

What the server sends back:

- **Status Code**: A number indicating success or failure (200, 404, 500, etc.)
- **Response Body**: The actual data returned

---

## What to Test: The Core Checklist

When testing an API endpoint, always verify these areas:

### ✅ 1. Status Codes

The most fundamental check. Is the response code what you expect?

| Code  | Meaning      | When to Expect                    |
| ----- | ------------ | --------------------------------- |
| `200` | OK           | Successful GET, PUT, PATCH        |
| `201` | Created      | Successful POST (new resource)    |
| `204` | No Content   | Successful DELETE                 |
| `400` | Bad Request  | Invalid input from the client     |
| `401` | Unauthorized | Missing or invalid authentication |
| `403` | Forbidden    | Authenticated but not allowed     |
| `404` | Not Found    | Resource doesn't exist            |
| `500` | Server Error | Something broke on the server     |

### ✅ 2. Response Body Structure

Does the response have the right "shape"?

- Are all expected fields present?
- Are the data types correct (string, number, array)?
- Is an array empty when it shouldn't be?

### ✅ 3. Response Body Values

Are the _values_ in the response correct?

- If you created a user named "Alice", does the response contain "Alice"?
- If you requested user #5, did you get user #5 (not user #6)?

### ✅ 4. Headers

Check critical response headers:

- `Content-Type`: Is it `application/json` as expected?
- `Cache-Control`: Is sensitive data being cached when it shouldn't be?

### ✅ 5. Performance (Response Time)

Is the API fast enough?

- Most APIs should respond in under 500ms for simple operations.
- Set a threshold and fail the test if it's exceeded.

### ✅ 6. Error Messages

When something goes wrong, is the error message helpful?

- A good error: `{ "error": "Email is already registered" }`
- A bad error: `{ "error": "Error occurred" }` (not helpful!)

---

## Edge Cases: Where Bugs Hide

Edge cases are the unusual, unexpected, or "boundary" scenarios that developers often forget to handle. These are where bugs love to hide.

### 🔍 Input Edge Cases

| Category               | Examples to Test                                          |
| ---------------------- | --------------------------------------------------------- |
| **Empty Values**       | Empty string `""`, empty array `[]`, `null`, `undefined`  |
| **Boundary Numbers**   | `0`, `-1`, maximum integer, decimals like `0.0001`        |
| **Special Characters** | `<script>alert('xss')</script>`, `'; DROP TABLE users;--` |
| **Unicode/Emojis**     | Names with `李明`, `Müller`, or `😀`                      |
| **Long Inputs**        | A name with 10,000 characters                             |
| **Wrong Types**        | Sending a string when a number is expected                |

### 🔍 Authentication Edge Cases

| Scenario             | What to Verify                           |
| -------------------- | ---------------------------------------- |
| No token provided    | Should return `401 Unauthorized`         |
| Expired token        | Should return `401` with a clear message |
| Token for wrong user | Should return `403 Forbidden`            |
| Malformed token      | Should not crash the server              |

### 🔍 State-Based Edge Cases

| Scenario                  | What to Verify                            |
| ------------------------- | ----------------------------------------- |
| Delete something twice    | Second delete should return `404`         |
| Update a deleted resource | Should return `404`, not create a new one |
| Access during maintenance | Should return `503 Service Unavailable`   |

### 🔍 Concurrency Edge Cases

| Scenario                           | What to Verify                        |
| ---------------------------------- | ------------------------------------- |
| Two users update the same resource | Who wins? Is there data loss?         |
| Rapid repeated requests            | Does the server handle rate limiting? |

---

## Design Patterns for API Tests

Just like UI tests, API tests benefit from structure and organization.

### 1. The AAA Pattern (Arrange, Act, Assert)

The simplest and most common pattern:

```typescript
test('should return user profile', async ({ request }) => {
  // ARRANGE: Set up any preconditions
  const userId = 123;

  // ACT: Make the API call
  const response = await request.get(`/api/users/${userId}`);

  // ASSERT: Verify the result
  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body.id).toBe(userId);
});
```

### 2. The "Helper Function" Pattern

Extract common operations into reusable functions:

```typescript
// helpers/api.helpers.ts
export async function createUser(request, userData) {
  const response = await request.post('/api/users', { data: userData });
  return response.json();
}

export async function deleteUser(request, userId) {
  await request.delete(`/api/users/${userId}`);
}

// In your test:
test('should delete a user', async ({ request }) => {
  const user = await createUser(request, { name: 'Test User' });

  const deleteResponse = await request.delete(`/api/users/${user.id}`);
  expect(deleteResponse.status()).toBe(204);
});
```

### 3. The "Fixture" Pattern (Setup/Teardown)

Use Playwright's `beforeEach` and `afterEach` to create and clean up test data:

```typescript
test.describe('User API', () => {
  let testUser;

  test.beforeEach(async ({ request }) => {
    // Create a fresh user before each test
    const response = await request.post('/api/users', {
      data: { name: 'Temp User', email: 'temp@test.com' },
    });
    testUser = await response.json();
  });

  test.afterEach(async ({ request }) => {
    // Clean up after each test
    await request.delete(`/api/users/${testUser.id}`);
  });

  test('should update user name', async ({ request }) => {
    // testUser is guaranteed to exist here
  });
});
```

### 4. The "Contract Testing" Mindset

Instead of testing specific values, test that the _shape_ of the response is correct. This makes tests less brittle.

```typescript
test('user response has correct structure', async ({ request }) => {
  const response = await request.get('/api/users/1');
  const user = await response.json();

  // Test the contract, not the exact values
  expect(user).toHaveProperty('id');
  expect(user).toHaveProperty('name');
  expect(user).toHaveProperty('email');
  expect(typeof user.id).toBe('number');
  expect(typeof user.name).toBe('string');
});
```

---

## The Testing Pyramid

A healthy test suite follows the "Testing Pyramid" principle:

```
        /\
       /  \      UI Tests (Few)
      /    \     - Slow, expensive, fragile
     /------\    - Test critical user journeys only
    /        \
   /  API     \  API/Integration Tests (More)
  /   Tests    \ - Faster, more stable
 /--------------\- Test business logic, edge cases
/                \
/   Unit Tests    \  Unit Tests (Most)
/------------------\ - Fastest, most stable
                     - Test individual functions
```

**The Takeaway:**

- Write _many_ unit tests (fast, isolated).
- Write a _moderate_ number of API tests (validate integrations).
- Write _few_ UI tests (only for critical user flows).

---

## Playwright's API Testing Toolkit

Playwright isn't just for browsers—it has a built-in API client called `request`.

### Making Requests

```typescript
import { test, expect } from '@playwright/test';

test('GET request example', async ({ request }) => {
  const response = await request.get('https://api.example.com/users');

  expect(response.ok()).toBeTruthy(); // Status 200-299
  expect(response.status()).toBe(200);

  const users = await response.json();
  expect(users.length).toBeGreaterThan(0);
});

test('POST request example', async ({ request }) => {
  const response = await request.post('https://api.example.com/users', {
    data: {
      name: 'New User',
      email: 'new@example.com',
    },
  });

  expect(response.status()).toBe(201);
});
```

### Setting Headers and Authentication

```typescript
// In playwright.config.ts
export default defineConfig({
  use: {
    extraHTTPHeaders: {
      Authorization: `Bearer ${process.env.API_TOKEN}`,
      'Content-Type': 'application/json',
    },
  },
});
```

### Combining API and UI Tests

A powerful pattern: use the API to set up data, then verify it in the UI.

```typescript
test('user created via API appears in UI', async ({ request, page }) => {
  // 1. Create user via API (fast)
  const apiResponse = await request.post('/api/users', {
    data: { name: 'API User', email: 'api@test.com' },
  });
  const user = await apiResponse.json();

  // 2. Verify in UI (the actual test)
  await page.goto('/users');
  await expect(page.getByText('API User')).toBeVisible();

  // 3. Clean up via API
  await request.delete(`/api/users/${user.id}`);
});
```

---

## Common Mistakes to Avoid

### ❌ 1. Testing Only the "Happy Path"

**Problem:** Only testing when everything goes right.
**Fix:** Always test what happens when things go _wrong_ (invalid input, missing auth, etc.).

### ❌ 2. Hardcoding Test Data

**Problem:** Using fixed IDs like `userId: 1` that might not exist in all environments.
**Fix:** Create your own test data in a `beforeEach`, then clean it up in `afterEach`.

### ❌ 3. Ignoring Response Time

**Problem:** A test passes, but the API took 30 seconds to respond.
**Fix:** Add performance assertions: `expect(response.headers()['x-response-time']).toBeLessThan(500)`.

### ❌ 4. Testing Implementation, Not Behavior

**Problem:** Testing internal details like "the database query used a specific index."
**Fix:** Test _what_ the API returns, not _how_ it gets it.

### ❌ 5. Not Cleaning Up Test Data

**Problem:** Tests create data that pollutes the database for future runs.
**Fix:** Always delete what you create. Use `afterEach` or `afterAll`.

### ❌ 6. Skipping Security Tests

**Problem:** Assuming authentication "just works."
**Fix:** Explicitly test unauthorized access, expired tokens, and forbidden resources.

---

## Summary: The API Tester's Mindset

1. **Think like a hacker.** What would break this? What shouldn't be allowed?
2. **Test the "sad paths."** The happy path is easy; the edge cases are where bugs hide.
3. **Be skeptical of the response.** Don't just check the status code—verify the _data_.
4. **Keep tests independent.** Each test should set up its own data and clean up after itself.
5. **Prioritize speed.** API tests are faster than UI tests—use them to cover more ground.

---

## Next Steps

Now that you understand the fundamentals, try these exercises:

1. **Create an API test file** in this project (`tests/api/`) that tests a public API like [JSONPlaceholder](https://jsonplaceholder.typicode.com/).
2. **Test the CRUD cycle:** Create a resource, read it, update it, delete it, then verify it's gone.
3. **Test an edge case:** What happens if you try to get a user with ID `-1` or `abc`?

Happy testing! 🚀
