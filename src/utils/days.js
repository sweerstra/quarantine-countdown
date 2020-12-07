import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';

function calculateDaysBetweenDates(start, end) {
  if (start >= end) return [];
  const difference = differenceInCalendarDays(end, start);
  return Array.from({ length: difference }, (_, index) => index + 1);
}

function isValidDate(d) {
  return d instanceof Date && !Number.isNaN(d.getDate());
}

export function getDaysBetweenDates(start, end) {
  const startDate = new Date(start);
  const endDate = new Date(end);

  if (!isValidDate(startDate) || !isValidDate(endDate)) {
    return [];
  }

  return calculateDaysBetweenDates(startDate, endDate);
}
