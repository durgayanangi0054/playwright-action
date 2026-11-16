import { authenticatedTest as test, expect } from '../../fixtures';

// spec: tests/sauce-demo-test-plan.md
// seed: tests/seed.spec.ts

test.describe('Cart and checkout', () => {
  test('Checkout requires customer information', async ({ page, inventoryPage, cartPage, checkoutPage }) => {
    // 1. Create a fresh browser context, set the session-username cookie with context.addCookies, navigate directly to /inventory.html, add Sauce Labs Backpack, open the cart, and select Checkout.
    await page.goto('/inventory.html');
    await inventoryPage.addToCart('Sauce Labs Backpack');
    await cartPage.open();
    await cartPage.checkout();
    await expect(page.getByText('Checkout: Your Information', { exact: true })).toBeVisible();
    await expect(checkoutPage.firstName).toBeVisible();
    await expect(checkoutPage.lastName).toBeVisible();
    await expect(checkoutPage.postalCode).toBeVisible();

    // 2. Leave all fields blank and select Continue.
    await checkoutPage.continue();
    await expect(checkoutPage.error).toContainText('First Name is required');
    await expect(page).toHaveURL(/\/checkout-step-one\.html$/);
  });
});
