import { authenticatedTest as test, expect } from '../../fixtures';

// spec: tests/sauce-demo-test-plan.md
// seed: tests/seed.spec.ts

test.describe('Cart and checkout', () => {
  test('Complete checkout and verify order total', async ({ page, inventoryPage, cartPage, checkoutPage }) => {
    // 1. Create a fresh browser context, set the session-username cookie with context.addCookies, navigate directly to /inventory.html, add Sauce Labs Backpack, open the cart, and select Checkout.
    await page.goto('/inventory.html');
    await inventoryPage.addToCart('Sauce Labs Backpack');
    await cartPage.open();
    await cartPage.checkout();
    await expect(page.getByText('Checkout: Your Information', { exact: true })).toBeVisible();

    // 2. Enter Test, User, and 10001 in the required customer fields and select Continue.
    await checkoutPage.fillInformation('Test', 'User', '10001');
    await checkoutPage.continue();
    await expect(page.getByText('Checkout: Overview', { exact: true })).toBeVisible();
    await expect(checkoutPage.itemTotal).toBeVisible();
    await expect(checkoutPage.tax).toBeVisible();
    await expect(checkoutPage.total).toBeVisible();

    // 3. Select Finish.
    await checkoutPage.finish();
    await expect(page.getByText('Checkout: Complete!', { exact: true })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Thank you for your order!' })).toBeVisible();
    await expect(cartPage.badge).toHaveCount(0);
  });
});
