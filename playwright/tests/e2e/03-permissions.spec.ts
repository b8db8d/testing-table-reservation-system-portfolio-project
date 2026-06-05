import { test, expect } from '@fixtures/base';
import { AllReservationsPage } from '@pages/all-reservations-page';

test.describe('Staff permissions', () => {
  test("TC-005 permissions, staff: reservations CRUD does not show 'Delete' button", async ({
    staffSession,
    confirmedReservation,
  }) => {
    const allReservationsPage = new AllReservationsPage(staffSession);
    await allReservationsPage.goto();
    await expect(staffSession.getByText(confirmedReservation.reservationId)).toBeVisible();
    await expect(
      await allReservationsPage.getDeleteButtonByReservationId(confirmedReservation.reservationId)
    ).not.toBeVisible();
  });

  test('TC-006 permissions, staff: access to restaurant tables dashboard is denied', async ({
    staffSession,
  }) => {
    const response = await staffSession.goto('/admin/tables');
    expect(response?.status()).toBe(403);
  });
});

test.describe('Manager permissions', () => {
  test("TC-007 permissions, manager: reservations CRUD shows 'Delete' button", async ({
    managerSession,
    confirmedReservation,
  }) => {
    const allReservationsPage = new AllReservationsPage(managerSession);
    await allReservationsPage.goto();
    await expect(managerSession.getByText(confirmedReservation.reservationId)).toBeVisible();
    await expect(
      await allReservationsPage.getDeleteButtonByReservationId(confirmedReservation.reservationId)
    ).toBeVisible();
  });

  test('TC-008 permissions, manager: reaching restaurant tables dashboard returns 200', async ({
    managerSession,
  }) => {
    const response = await managerSession.goto('/admin/tables');
    expect(response?.status()).toBe(200);
  });
});
