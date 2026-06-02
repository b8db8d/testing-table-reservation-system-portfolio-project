import { type Locator, type Page, expect } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly logInLink: Locator;
  readonly registerLink: Locator;
  readonly dashboardLink: Locator;
  readonly dateInput: Locator;
  readonly timeSelect: Locator;
  readonly guestsSelect: Locator;
  readonly checkAvailabilityButton: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailAddressInput: Locator;
  readonly phoneNumberInput: Locator;
  readonly notesInput: Locator;
  readonly requestReservationButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.dashboardLink = page.getByRole('link', { name: 'Dashboard' });
    this.logInLink = page.getByRole('link', { name: 'Log in' });
    this.registerLink = page.getByRole('link', { name: 'Register' });
    this.dateInput = page.getByLabel('Date');
    this.timeSelect = page.getByLabel('Time');
    this.guestsSelect = page.getByLabel('Guests');
    this.checkAvailabilityButton = page.getByRole('button', { name: 'Check availability' });
    this.firstNameInput = page.getByLabel('First name');
    this.lastNameInput = page.getByLabel('Last name');
    this.emailAddressInput = page.getByLabel('Email address');
    this.phoneNumberInput = page.getByLabel('Phone number');
    this.notesInput = page.getByLabel('Notes');
    this.requestReservationButton = page.getByRole('button', { name: 'Request reservation' });
  }

  async goto() {
    await this.page.goto('/');
    await expect(this.page).toHaveTitle(/Book a Table/i);
  }

  async checkAvailability(data: { date: string; time: string; guests: string }) {
    await this.dateInput.fill(data.date);
    await this.timeSelect.selectOption(data.time);
    await this.guestsSelect.selectOption(data.guests);
    await this.checkAvailabilityButton.click();
  }

  async fillReservationForm(data: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    notes?: string;
  }) {
    await this.firstNameInput.fill(data.firstName);
    await this.lastNameInput.fill(data.lastName);
    await this.emailAddressInput.fill(data.email);
    await this.phoneNumberInput.fill(data.phone);
    if (data.notes) await this.notesInput.fill(data.notes);
  }

  async submitReservationForm() {
    await this.requestReservationButton.click();
  }
}
