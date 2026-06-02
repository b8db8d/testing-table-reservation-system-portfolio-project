import { test, expect } from '@fixtures/base';
import { getEmailByReceiverAndSubject } from '@utils/getEmailByReceiverAndSubject';
import { createPendingReservation } from '@utils/createPendingReservation';
import emailData from '@data/emails-content';
import { extractSignedUrl } from '@utils/extractSignedUrl';

test.describe('Booking flow', () => {
  test('TC-003 - booking flow, rejection: submit, pending, reject, notify', async ({
    page,
    request,
  }) => {
    let reservation: Awaited<ReturnType<typeof createPendingReservation>>;
    let rejectUrl: string;

    await test.step('guest submits a valid reservation and reaches success page', async () => {
      reservation = await createPendingReservation(page);
    });

    await test.step('guest receives email about pending reservation', async () => {
      const email = await getEmailByReceiverAndSubject(
        request,
        reservation.email,
        emailData.pending.guestSubject
      );
      expect(email.Text).toContain(reservation.reservationId);
    });

    await test.step('manager receives email about pending reservation', async () => {
      const email = await getEmailByReceiverAndSubject(
        request,
        'manager@example.com',
        emailData.pending.managerSubjectFor(reservation.reservationId)
      );
      expect(email.Text).toContain(reservation.reservationId);
      rejectUrl = extractSignedUrl(email.HTML, 'reject');
    });

    await test.step('manager rejects reservation', async () => {
      const response = await page.goto(rejectUrl);
      expect(response?.status()).toBe(200);
      await expect(page.getByText(`${reservation.reservationId}`)).toBeVisible();
      await page.getByRole('textbox', { name: 'e.g. No availability for the' }).fill('Lorem ipsum');
      await page.getByRole('button', { name: 'Reject reservation' }).click();
      await expect(page.getByText(/reservation rejected/i)).toBeVisible();
    });

    await test.step('guest receives email about rejection', async () => {
      const email = await getEmailByReceiverAndSubject(
        request,
        reservation.email,
        emailData.rejected.guestSubjectFor(reservation.reservationId)
      );
      expect(email.Text).toContain(reservation.reservationId);
      expect(email.Text).toContain(emailData.rejected.guestHeading);
    });
  });

  test('TC-004 - booking flow, confirmation and cancellation: submit, pending, confirm, notify, cancel, notify', async ({
    page,
    request,
  }) => {
    let reservation: Awaited<ReturnType<typeof createPendingReservation>>;
    let cancelUrl!: string;
    let confirmUrl!: string;

    await test.step('guest submits a valid reservation and reaches success page', async () => {
      reservation = await createPendingReservation(page);
    });

    await test.step('guest receives email about pending reservation', async () => {
      const email = await getEmailByReceiverAndSubject(
        request,
        reservation.email,
        emailData.pending.guestSubject
      );
      expect(email.Text).toContain(reservation.reservationId);
    });

    await test.step('manager receives email about pending reservation', async () => {
      const email = await getEmailByReceiverAndSubject(
        request,
        'manager@example.com',
        emailData.pending.managerSubjectFor(reservation.reservationId)
      );
      expect(email.Text).toContain(reservation.reservationId);
      confirmUrl = extractSignedUrl(email.HTML, 'confirm');
    });

    await test.step('manager confirms reservation', async () => {
      const response = await page.goto(confirmUrl);
      expect(response?.status()).toBe(200);
      await expect(page.getByText(/reservation confirmed/i)).toBeVisible();
    });

    await test.step('guest receives email about confirmation', async () => {
      const email = await getEmailByReceiverAndSubject(
        request,
        reservation.email,
        emailData.accepted.guestSubjectFor(reservation.reservationId)
      );
      expect(email.Text).toContain(emailData.accepted.guestHeading);
      expect(email.Text).toContain(reservation.reservationId);
      cancelUrl = extractSignedUrl(email.HTML, 'cancel');
    });

    await test.step('guest cancels reservation via link', async () => {
      const response = await page.goto(cancelUrl);
      expect(response?.status()).toBe(200);
      await expect(page.getByText(/reservation cancelled/i)).toBeVisible();
    });

    await test.step('manager receives email about cancellation', async () => {
      const email = await getEmailByReceiverAndSubject(
        request,
        'manager@example.com',
        emailData.cancelled.managerSubjectFor(reservation.reservationId)
      );
      expect(email.Text).toContain(reservation.reservationId);
      expect(email.Text).toContain(emailData.cancelled.managerHeading);
    });

    await test.step('guest receives email about cancellation', async () => {
      const email = await getEmailByReceiverAndSubject(
        request,
        reservation.email,
        emailData.cancelled.guestSubjectFor(reservation.reservationId)
      );
      expect(email.Text).toContain(reservation.reservationId);
      expect(email.Text).toContain(emailData.cancelled.guestHeading);
    });
  });
});
