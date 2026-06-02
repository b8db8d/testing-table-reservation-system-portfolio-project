import { type Locator, type Page } from '@playwright/test';

export class AdminSidebar {
  readonly dashboardLink: Locator;
  readonly allReservationsLink: Locator;
  readonly pendingReservationsLink: Locator;
  readonly tablesLink: Locator;
  readonly joiningGroupsLink: Locator;
  readonly operatingHoursLink: Locator;
  readonly staffAccountsLink: Locator;
  readonly userMenuButton: Locator;
  readonly settingsLink: Locator;
  readonly logOutButton: Locator;

  constructor(page: Page) {
    this.dashboardLink = page.getByRole('link', { name: 'Dashboard' });
    this.allReservationsLink = page.getByRole('link', { name: 'All Reservations' });
    this.pendingReservationsLink = page.getByRole('link', { name: 'Pending Reservations' });
    this.tablesLink = page.getByRole('link', { name: 'Tables' });
    this.joiningGroupsLink = page.getByRole('link', { name: 'Joining Groups' });
    this.operatingHoursLink = page.getByRole('link', { name: 'Operating Hours' });
    this.staffAccountsLink = page.getByRole('link', { name: 'Staff Accounts' });
    this.userMenuButton = page.locator('[data-test="sidebar-menu-button"]');
    this.settingsLink = page.getByRole('link', { name: 'Settings' });
    this.logOutButton = page.locator('[data-test="logout-button"]');
  }

  async logout() {
    await this.userMenuButton.click();
    await this.logOutButton.click();
  }
}
