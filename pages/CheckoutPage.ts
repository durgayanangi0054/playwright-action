import { Locator, Page } from '@playwright/test';

export class CheckoutPage {
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly postalCode: Locator;
  readonly error: Locator;
  readonly itemTotal: Locator;
  readonly tax: Locator;
  readonly total: Locator;

  constructor(private readonly page: Page) {
    this.firstName = page.getByTestId('firstName');
    this.lastName = page.getByTestId('lastName');
    this.postalCode = page.getByTestId('postalCode');
    this.error = page.getByRole('alert');
    this.itemTotal = page.getByText('Item total: $29.99', { exact: true });
    this.tax = page.getByText('Tax: $2.40', { exact: true });
    this.total = page.getByText('Total: $32.39', { exact: true });
  }

  async continue() {
    await this.page.getByTestId('continue').click();
  }

  async cancel() {
    await this.page.getByTestId('cancel').click();
  }

  async finish() {
    await this.page.getByTestId('finish').click();
  }

  async fillInformation(firstName: string, lastName: string, postalCode: string) {
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.postalCode.fill(postalCode);
  }
}
