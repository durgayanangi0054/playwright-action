import { authenticatedTest as test, expect } from '../../fixtures';

// spec: tests/sauce-demo-test-plan.md
// seed: tests/seed.spec.ts

test.describe('Catalog and product details', () => {
  test('Product details show the selected item', async ({ page, inventoryPage }) => {
    // 1. Create a fresh browser context, set the session-username cookie with context.addCookies, and navigate directly to /inventory.html.
    await page.goto('/inventory.html');
    await expect(page.getByText('Products', { exact: true })).toBeVisible();

    // 2. Open the Sauce Labs Backpack details, verify its name, description, and $29.99 price, then choose Back to products.
    await inventoryPage.openDetails('Sauce Labs Backpack');
    await expect(page).toHaveURL(/\/inventory-item\.html\?id=4$/);
    await expect(page.getByText('Sauce Labs Backpack', { exact: true })).toBeVisible();
    await expect(page.getByText(/carry\.allTheThings\(\).*Sly Pack/)).toBeVisible();
    await expect(page.getByText('$29.99', { exact: true })).toBeVisible();
    await inventoryPage.backToProducts();
    await expect(page).toHaveURL(/\/inventory\.html$/);
  });
});
