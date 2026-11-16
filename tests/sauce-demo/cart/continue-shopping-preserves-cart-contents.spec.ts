import { authenticatedTest as test, expect } from '../../fixtures';

// spec: tests/sauce-demo-test-plan.md
// seed: tests/seed.spec.ts

test.describe('Cart and checkout', () => {
  test('Continue shopping preserves cart contents', async ({ page, inventoryPage, cartPage }) => {
    // 1. Create a fresh browser context, set the session-username cookie with context.addCookies, and navigate directly to /inventory.html.
    await page.goto('/inventory.html');
    await expect(page.getByText('Products', { exact: true })).toBeVisible();

    // 2. Add Sauce Labs Backpack, open the cart, and select Continue Shopping.
    await inventoryPage.addToCart('Sauce Labs Backpack');
    await cartPage.open();
    await cartPage.continueShopping();
    await expect(page).toHaveURL(/\/inventory\.html$/);
    await expect(cartPage.badge).toHaveText('1');
  });
});
