import { authenticatedTest as test, expect } from '../../fixtures';

// spec: tests/sauce-demo-test-plan.md
// seed: tests/seed.spec.ts

test.describe('Cart and checkout', () => {
  test('Cancel checkout returns to the cart', async ({ page, inventoryPage, cartPage, checkoutPage }) => {
    // 1. Create a fresh browser context, set the session-username cookie with context.addCookies, navigate directly to /inventory.html, add Sauce Labs Backpack, open the cart, and select Checkout.
    await page.goto('/inventory.html');
    await inventoryPage.addToCart('Sauce Labs Backpack');
    await cartPage.open();
    await cartPage.checkout();
    await expect(page.getByText('Checkout: Your Information', { exact: true })).toBeVisible();

    // 2. Select Cancel.
    await checkoutPage.cancel();
    await expect(page).toHaveURL(/\/cart\.html$/);
    await expect(cartPage.items).toHaveCount(1);
    await expect(cartPage.items.getByText('Sauce Labs Backpack', { exact: true })).toBeVisible();
  });
});
