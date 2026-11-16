import { test as base } from '@playwright/test';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { ItemsList } from '../pages/ItemsList';
import { LoginPage } from '../pages/LoginPage';
import { NavigationMenu } from '../pages/NavigationMenu';

type TestFixtures = {
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  inventoryPage: ItemsList;
  loginPage: LoginPage;
  navigationMenu: NavigationMenu;
};

export const test = base.extend<TestFixtures>({
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },
  inventoryPage: async ({ page }, use) => {
    await use(new ItemsList(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  navigationMenu: async ({ page }, use) => {
    await use(new NavigationMenu(page));
  },
});

export const authenticatedTest = test.extend<{ authCookie: void }>({
  authCookie: [async ({ context }, use) => {
    await context.addCookies([{
      name: 'session-username',
      value: 'standard_user',
      domain: 'www.saucedemo.com',
      path: '/',
    }]);
    await use();
  }, { auto: true }],
});

export { expect } from '@playwright/test';
