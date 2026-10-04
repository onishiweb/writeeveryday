/**
 * Returns the prompt day number for today (1-365).
 *
 * The prompts array holds exactly 365 entries, one per calendar day of a
 * non-leap year. In a leap year the extra day (29 February) is folded onto
 * 28 February so that every date from 1 March onwards keeps the prompt that
 * belongs to it — without this, the whole year after February would run a
 * day ahead and 31 December would fall off the end of the array.
 *
 * @returns The day number from 1 to 365
 */
export function getCurrentDayOfYear(): number {
  const now = new Date();
  const year = now.getFullYear();
  const start = new Date(year, 0, 0);
  const diff = now.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);

  // Day 60 is 29 February in a leap year; collapse it and shift everything
  // after it back by one so 1 March is always day 60.
  if (isLeapYear(year) && dayOfYear >= 60) {
    return dayOfYear - 1;
  }

  return dayOfYear;
}

function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}
