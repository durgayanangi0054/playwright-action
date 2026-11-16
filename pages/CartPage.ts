import { Locator, Page } from '@playwright/test';

export class CartPage {
  readonly items: Locator;
  readonly badge: Locator;

  constructor(private readonly page: Page) {
    this.items = page.locator('.cart_item');
    this.badge = page.locator('.shopping_cart_badge');
  }

  async open() {
    await this.page.locator('#shopping_cart_container').click();
  }

  async remove(productName: string) {
    await this.items
      .filter({ hasText: productName })
      .getByRole('button', { name: 'Remove' })
      .click();
  }

  async continueShopping() {
    await this.page.getByTestId('continue-shopping').click();
  }

  async checkout() {
    await this.page.getByTestId('checkout').click();
  }
}
