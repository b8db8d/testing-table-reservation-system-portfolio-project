/**
 * Creates reservation with status 'pending'.
 */

import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';
import { HomePage } from '@pages/home-page';
import { getNextDayOfWeek } from '@utils/getNextDayOfWeek';

export async function createPendingReservation(page: Page) {
  const availabilityData = {
    date: getNextDayOfWeek('wednesday'),
    time: '19:00',
    guests: '2',
  };
  const guestData = {
    firstName: 'Anna',
    lastName: 'Kowalska',
    email: `anna.kowalska+${Date.now()}@example.com`,
    phone: '+48123456789',
  };

  const homePage = new HomePage(page);
  await homePage.goto();
  await homePage.checkAvailability(availabilityData);
  await homePage.fillReservationForm(guestData);
  await homePage.submitReservationForm();
  await expect(page).toHaveURL(/\/reservations\/success/);
  const reservationLocator = page.getByText(/^RES-\d{8}-\d{6}$/);
  await expect(reservationLocator).toBeVisible();
  const reservationId = (await reservationLocator.textContent())!.trim();
  return { reservationId, ...guestData, ...availabilityData };
}
