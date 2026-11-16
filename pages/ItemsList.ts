import { Locator, Page } from '@playwright/test';

export class ItemsList {
  private readonly page: Page;
  readonly itemList: Locator;
  readonly productNames: Locator;
  readonly productPrices: Locator;

  constructor(page: Page) {
    this.page = page;
    this.itemList = page.locator('.inventory_item');
    this.productNames = page.locator('.inventory_item_name');
    this.productPrices = page.locator('.inventory_item_price');
  }

  async addToCart(filter: string, button = 'Add to cart') {
    await this.itemList
      .filter({ hasText: filter })
      .getByRole('button', { name: button })
      .click();
  }

  async sortBy(value: 'az' | 'za' | 'lohi' | 'hilo') {
    await this.page.getByTestId('product-sort-container').selectOption(value);
  }

  async openDetails(productName: string) {
    await this.itemList
      .filter({ hasText: productName })
      .locator('[data-test$="-title-link"]')
      .click();
  }

  async backToProducts() {
    await this.page.getByTestId('back-to-products').click();
  }
}