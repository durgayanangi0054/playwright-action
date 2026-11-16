import { authenticatedTest as test, expect } from '../../fixtures';

// spec: tests/sauce-demo-test-plan.md
// seed: tests/seed.spec.ts

test.describe('Cart and checkout', () => {
  test('Add and remove products in the cart', async ({ page, inventoryPage, cartPage }) => {
    // 1. Create a fresh browser context, set the session-username cookie with context.addCookies, and navigate directly to /inventory.html.
    await page.goto('/inventory.html');
    await expect(page.getByText('Products', { exact: true })).toBeVisible();

    // 2. Add Sauce Labs Backpack to the cart and open the cart.
    await inventoryPage.addToCart('Sauce Labs Backpack');
    await expect(cartPage.badge).toHaveText('1');
    await cartPage.open();
    await expect(cartPage.items).toHaveCount(1);
    await expect(cartPage.items.getByText('Sauce Labs Backpack', { exact: true })).toBeVisible();
    await expect(cartPage.items.locator('.cart_quantity')).toHaveText('1');

    // 3. Remove Sauce Labs Backpack from the cart.
    await cartPage.remove('Sauce Labs Backpack');
    await expect(cartPage.items).toHaveCount(0);
    await expect(cartPage.badge).toHaveCount(0);
  });
});
