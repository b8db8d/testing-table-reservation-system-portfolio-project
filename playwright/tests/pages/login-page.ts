import { type Locator, type Page, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailAddressInput: Locator;
  readonly passwordInput: Locator;
  readonly rememberMeCheckbox: Locator;
  readonly logInButton: Locator;
  readonly showPasswordButton: Locator;
  readonly forgotPasswordLink: Locator;
  readonly signUpLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailAddressInput = page.locator('[name="email"]');
    this.passwordInput = page.locator('[name="password"]');
    this.rememberMeCheckbox = page.getByRole('checkbox', { name: 'Remember me' });
    this.logInButton = page.getByRole('button', { name: 'Log in' });
    this.showPasswordButton = page.getByRole('button', { name: 'Show password' });
    this.forgotPasswordLink = page.getByRole('link', { name: 'Forgot password?' });
    this.signUpLink = page.getByRole('link', { name: 'Sign up' });
  }

  async goto() {
    await this.page.goto('/login');
    await expect(this.page).toHaveTitle(/Log in/i);
  }

  async login(data: { email: string; password: string }) {
    await this.emailAddressInput.fill(data.email);
    await this.passwordInput.fill(data.password);
    await this.logInButton.click();
    await expect(this.page).toHaveURL(/\/dashboard/);
  }
}
