/**
 * Returns a date relative to today as an ISO date string (YYYY-MM-DD).
 * @param days - number of days from today (can be negative)
 * @example getRelativeDate(1) // tomorrow
 * @example getRelativeDate(-1) // yesterday
 */

export function getRelativeDate(days: number): string {
  const date = new Date();
  date.setDate(date.getDate() + days);

  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  const yyyy = date.getFullYear();

  return `${yyyy}-${mm}-${dd}`;
}
