/**
 * Searches in Mailpit for email by receiver and subject, and returns mail's content.
 * If there is no subject it returns first message.
 * @param request - API Playwright context
 * @param targetEmail - receiver' email (e.g. 'anna.kowalska@mail.com')
 * @param targetSubject - (optional) subject of an e-mail
 *
 * @example getEmailByReceiverAndSubject(request, 'anna.kowalska@example.com', 'Your reservation has been received');
 * @example getEmailByReceiverAndSubject(request, 'anna.kowalska@example.com');
 */

import { expect, APIRequestContext } from '@playwright/test';

const mailpitUrl = process.env.MAILPIT_API_URL ?? 'http://localhost:8025';

export interface MailpitMessage {
  ID: string;
  Subject: string;
  Text: string;
  HTML: string;
}

export async function getEmailByReceiverAndSubject(
  request: APIRequestContext,
  targetEmail: string,
  targetSubject?: string
): Promise<MailpitMessage> {
  let matchedMessageId: string | null = null;
  // Searching for email's ID
  await expect
    .poll(
      async () => {
        const encodedEmail = encodeURIComponent(targetEmail);
        const response = await request.get(`${mailpitUrl}/api/v1/search?query=to:${encodedEmail}`);

        if (!response.ok()) return false;

        const data = await response.json();
        const messages = data.messages || [];

        if (messages.length === 0) return false;

        if (targetSubject) {
          const found = messages.find((msg: MailpitMessage) => msg.Subject === targetSubject);
          if (found) {
            matchedMessageId = found.ID;
            return true;
          }
          return false;
        }
        matchedMessageId = messages[0].ID;
        return true;
      },
      {
        message: `Mail to ${targetEmail} ${targetSubject ? `titled "${targetSubject}" ` : ''}not found`,
        timeout: 10000,
        intervals: [500],
      }
    )
    .toBe(true);

  // Getting email content
  const mailResponse = await request.get(`${mailpitUrl}/api/v1/message/${matchedMessageId}`);
  return (await mailResponse.json()) as MailpitMessage;
}
