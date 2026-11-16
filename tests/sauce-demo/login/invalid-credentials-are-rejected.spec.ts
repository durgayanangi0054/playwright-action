import { expect, test } from '../../fixtures';

// spec: tests/sauce-demo-test-plan.md
// seed: tests/seed.spec.ts

test.describe('Login', () => {
  test('Invalid credentials are rejected', async ({ page, loginPage }) => {
    // 1. Start a fresh browser context without the session-username cookie and open https://www.saucedemo.com.
    await loginPage.navigate();
    await expect(page.getByRole('form', { name: 'Login' })).toBeVisible();

    // 2. Enter an invalid username and password, then submit Login.
    await loginPage.login('invalid_user', 'wrong_password');
    await expect(loginPage.error).toContainText('Username and password do not match');
    await expect(page).toHaveURL(/www\.saucedemo\.com\/$/);
  });
});
