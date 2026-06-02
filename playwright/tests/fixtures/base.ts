import { test as base, expect } from '@playwright/test';
import type { Page } from '@playwright/test';
import { exec } from 'child_process';
import { promisify } from 'util';
import { createPendingReservation } from '@utils/createPendingReservation';
import { getEmailByReceiverAndSubject } from '@utils/getEmailByReceiverAndSubject';
import { extractSignedUrl } from '@utils/extractSignedUrl';
import emailData from '@data/emails-content';

const execAsync = promisify(exec);
const containerEngine = process.env.CONTAINER_ENGINE ?? 'docker';
const appContainer = process.env.APP_CONTAINER ?? 'reservations-app';

type BaseFixtures = {
  autoCleanCache: void;
  confirmedReservation: { reservationId: string };
  staffSession: Page;
  managerSession: Page;
};

export const test = base.extend<BaseFixtures>({
  // prevents flaky tests
  autoCleanCache: [
    async ({}, use) => {
      await use();
      try {
        await execAsync(`${containerEngine} exec ${appContainer} php artisan optimize:clear`);
      } catch (error) {
        console.error('Failed to clear cache after test:', error);
      }
    },
    { auto: true },
  ],
  // Create and confirm reservation
  confirmedReservation: async ({ page, request }, use) => {
    const reservation = await createPendingReservation(page);
    const email = await getEmailByReceiverAndSubject(
      request,
      'manager@example.com',
      emailData.pending.managerSubjectFor(reservation.reservationId)
    );
    expect(email.Text).toContain(reservation.reservationId);
    const confirmUrl = extractSignedUrl(email.HTML, 'confirm');

    const response = await page.goto(confirmUrl);
    expect(response?.status()).toBe(200);
    await expect(page.getByText(/reservation confirmed/i)).toBeVisible();
    await use({
      reservationId: reservation.reservationId,
    });
  },

  managerSession: async ({ browser }, use) => {
    const context = await browser.newContext({ storageState: '.auth/manager.json' });
    const page = await context.newPage();
    await use(page);
    await context.close();
  },

  staffSession: async ({ browser }, use) => {
    const context = await browser.newContext({ storageState: '.auth/staff.json' });
    const page = await context.newPage();
    await use(page);
    await context.close();
  },
});

export { expect };
