import { Page, Locator } from '@playwright/test';

export class LoginPage {
  private readonly page: Page;
  private readonly username: Locator;
  private readonly password: Locator;
  private readonly loginButton: Locator;
  private readonly homePage: Locator;
  readonly error: Locator;

  constructor(page: Page) {
    this.page = page;
    this.username = page.getByPlaceholder('Username');
    this.password = page.getByPlaceholder('Password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.homePage = page.locator('.app_logo');
    this.error = page.getByRole('alert');
  }

  async navigate() {
    await this.page.goto('/');
  }

  async login(username: string, password: string) {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.loginButton.click();
  }

  
async getHomePageLogo(): Promise<string> {
  return await this.homePage.innerText();
}
}