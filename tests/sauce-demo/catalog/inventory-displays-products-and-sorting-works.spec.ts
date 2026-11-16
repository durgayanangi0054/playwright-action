import { authenticatedTest as test, expect } from '../../fixtures';

// spec: tests/sauce-demo-test-plan.md
// seed: tests/seed.spec.ts

test.describe('Catalog and product details', () => {
  test('Inventory displays products and sorting works', async ({ page, inventoryPage }) => {
    // 1. Create a fresh browser context, set the session-username cookie with context.addCookies, and navigate directly to /inventory.html.
    await page.goto('/inventory.html');
    await expect(page.getByText('Products', { exact: true })).toBeVisible();
    await expect(inventoryPage.itemList).toHaveCount(6);
    for (const item of await inventoryPage.itemList.all()) {
      await expect(item.locator('.inventory_item_name')).toBeVisible();
      await expect(item.locator('.inventory_item_desc')).not.toBeEmpty();
      await expect(item.locator('.inventory_item_price')).toBeVisible();
      await expect(item.getByRole('button', { name: 'Add to cart' })).toBeVisible();
    }

    // 2. Select Name (Z to A), then Price (low to high), then Price (high to low) from Sort products.
    await inventoryPage.sortBy('za');
    const names = await inventoryPage.productNames.allTextContents();
    expect(names).toEqual([...names].sort((a, b) => b.localeCompare(a)));
    await inventoryPage.sortBy('lohi');
    const lowToHigh = (await inventoryPage.productPrices.allTextContents()).map(price => Number(price.replace('$', '')));
    expect(lowToHigh).toEqual([...lowToHigh].sort((a, b) => a - b));
    await inventoryPage.sortBy('hilo');
    const highToLow = (await inventoryPage.productPrices.allTextContents()).map(price => Number(price.replace('$', '')));
    expect(highToLow).toEqual([...highToLow].sort((a, b) => b - a));
  });
});
