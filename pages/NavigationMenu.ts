import { Page } from '@playwright/test';

export class NavigationMenu {
  constructor(private readonly page: Page) {}

  async logout() {
    await this.page.getByRole('button', { name: 'Open Menu' }).click();
    await this.page.getByTestId('logout-sidebar-link').click();
  }
}
