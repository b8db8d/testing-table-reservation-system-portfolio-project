/**
 * Returns a date of next chosen day of week as an ISO date string (YYYY-MM-DD).
 * If the chosen day is today, it returns the date of that day next week.
 *
 * @param targetDayName - The name of the day of the week
 *
 * Assuming today is Friday, 2026-05-29:
 * @example getNextDayOfWeek('wednesday') | returns '2026-06-03'
 * @example getNextDayOfWeek('friday')    | returns '2026-06-05'
 */

import { getRelativeDate } from '@utils/getRelativeDate';

export type DayOfWeek =
  | 'sunday'
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday';

const DAY_MAP: Record<DayOfWeek, number> = {
  sunday: 0,
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6,
};

export function getNextDayOfWeek(targetDayName: DayOfWeek): string {
  const date = new Date();
  const todayDayOfWeek = date.getDay();
  const targetDay = DAY_MAP[targetDayName];

  let daysUntilTarget = (targetDay - todayDayOfWeek + 7) % 7;

  if (daysUntilTarget === 0) {
    daysUntilTarget = 7;
  }

  return getRelativeDate(daysUntilTarget);
}
