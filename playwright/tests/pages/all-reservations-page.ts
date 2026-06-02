import { Locator, type Page, expect } from '@playwright/test';
import { AdminSidebar } from '@pages/components/AdminSidebar';

export class AllReservationsPage {
  readonly page: Page;
  readonly sidebar: AdminSidebar;
  readonly tableRows: Locator;
  readonly searchInput: Locator;
  readonly statusSelect: Locator;
  readonly fromDateInput: Locator;
  readonly toDateInput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.sidebar = new AdminSidebar(page);
    this.searchInput = page.getByRole('searchbox', { name: 'Search name, email, reference…' });
    this.statusSelect = page.getByRole('combobox');
    this.fromDateInput = page.getByRole('textbox').first();
    this.toDateInput = page.getByRole('textbox').nth(1);
    this.tableRows = page.locator('tr');
  }

  async goto() {
    await this.page.goto('/admin/reservations');
    await expect(this.page).toHaveTitle(/All Reservations/i);
  }

  async getDeleteButtonByReservationId(id: string) {
    const targetRow = this.tableRows.filter({ hasText: id });

    return targetRow.getByRole('button', { name: 'Delete' });
  }
}
