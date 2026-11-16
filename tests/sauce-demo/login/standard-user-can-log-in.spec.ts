import { expect, test } from '../../fixtures';

// spec: tests/sauce-demo-test-plan.md
// seed: tests/seed.spec.ts

test.describe('Login', () => {
  test('Standard user can log in', async ({ page, loginPage, inventoryPage }) => {
    // 1. Start a fresh browser context without the session-username cookie and open https://www.saucedemo.com.
    await loginPage.navigate();
    await expect(page.getByRole('form', { name: 'Login' })).toBeVisible();

    // 2. Enter standard_user and secret_sauce, then submit Login.
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/\/inventory\.html$/);
    await expect(page.getByText('Products', { exact: true })).toBeVisible();
    await expect(inventoryPage.itemList).toHaveCount(6);
  });
});
