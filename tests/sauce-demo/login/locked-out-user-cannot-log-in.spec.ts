import { expect, test } from '../../fixtures';

// spec: tests/sauce-demo-test-plan.md
// seed: tests/seed.spec.ts

test.describe('Login', () => {
  test('Locked-out user cannot log in', async ({ page, loginPage }) => {
    // 1. Start a fresh browser context without the session-username cookie and open https://www.saucedemo.com.
    await loginPage.navigate();
    await expect(page.getByRole('form', { name: 'Login' })).toBeVisible();

    // 2. Enter locked_out_user and secret_sauce, then submit Login.
    await loginPage.login('locked_out_user', 'secret_sauce');
    await expect(loginPage.error).toContainText('locked out');
    await expect(page).toHaveURL(/www\.saucedemo\.com\/$/);
  });
});
