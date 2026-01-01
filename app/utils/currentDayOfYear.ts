/**
 * Returns the current day of the year (1-365, or 1-366 for leap years)
 * @returns The day number from 1 to 365 (or 366 in leap years)
 */
export function getCurrentDayOfYear(): number {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
}

