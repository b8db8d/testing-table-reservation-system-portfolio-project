import { type Page, expect } from '@playwright/test';
import { AdminSidebar } from '@pages/components/AdminSidebar';

export class AdminDashboardPage {
  readonly page: Page;
  readonly sidebar: AdminSidebar;

  constructor(page: Page) {
    this.page = page;
    this.sidebar = new AdminSidebar(page);
  }

  async goto() {
    await this.page.goto('/admin');
    await expect(this.page).toHaveTitle(/Book a Table/i);
  }
}
