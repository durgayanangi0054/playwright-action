import { authenticatedTest as test, expect } from '../../fixtures';

// spec: tests/sauce-demo-test-plan.md
// seed: tests/seed.spec.ts

test.describe('Navigation and session controls', () => {
  test('Menu logout ends the authenticated session', async ({ page, context, navigationMenu }) => {
    // 1. Create a fresh browser context, set the session-username cookie with context.addCookies, and navigate directly to /inventory.html.
    await page.goto('/inventory.html');
    await expect(page.getByText('Products', { exact: true })).toBeVisible();

    // 2. Open the menu and choose Logout.
    await navigationMenu.logout();
    await expect(page.getByRole('form', { name: 'Login' })).toBeVisible();
    await expect.poll(async () => (await context.cookies()).some(cookie => cookie.name === 'session-username')).toBe(false);

    // 3. Navigate directly to /inventory.html.
    await page.goto('/inventory.html');
    await expect(page).toHaveURL(/www\.saucedemo\.com\/$/);
    await expect(page.getByRole('alert')).toContainText('You can only access \'/inventory.html\' when you are logged in');
  });
});
