/**
 * Returns signed url from email's HTML.
 * @param html - html of an email
 * @param action - signed link action
 * @example extractSignedUrl(email.HTML, 'reject') |e.g.: http://localhost:8000/reservations/1/reject?expires=1780581902&signature=6c66bc4486739c73f2bdd6f628e1bfc27e4ef7326ec72f80a542670ca2c90bc2
 */

export type UrlAction = 'cancel' | 'confirm' | 'reject';

export function extractSignedUrl(html: string, action: UrlAction): string {
  const regex = new RegExp(`href="(http[^"]+\\/reservations\\/\\d+\\/${action}[/?][^"]+)"`);
  const match = html.match(regex);
  if (!match) {
    throw new Error('URL not found');
  }
  return match[1].replace(/&amp;/g, '&');
}
