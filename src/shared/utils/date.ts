import { format } from 'date-fns';

export const DAY = 1 * 24 * 60 * 60 * 1000;
export const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
export const MONTH_WITH_YEAR = 'MMMM, yyyy';
export const US_DATE_TIME_FORMAT = 'MMM d, yyyy, hh:mm a';
export const MM_DD_YYYY = 'MMM dd, yyyy';

export const ISOToDate = (itc: string) => {
  const converted = new Date(itc);
  return converted;
};

export const dateToISO = (date: Date) => date.toISOString();

export function convertToStandardFormat(date: string | number | Date): string {
  return format(date, US_DATE_TIME_FORMAT);
}

export function convertToShortDate(date: string | number | Date): string {
  if (!date) date = new Date();
  return format(date, MM_DD_YYYY);
}

export function howManyDaysPremiumLeft(date: string): string {
  const currentDate = new Date(date);
  const today = new Date();
  return `qolgan kun: ${Math.floor((currentDate.getTime() - today.getTime()) / DAY) + 1}`;
}

export function getTimeAgoString(previousTime: string): string {
  const currentTime = new Date();
  const previousDate = new Date(previousTime);
  previousDate.setHours(previousDate.getHours() + 3); // @todo: it should be implemente on the backend
  const elapsedTime = currentTime.getTime() - previousDate.getTime();

  const seconds = Math.abs(Math.floor(elapsedTime / 1000));
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  if (years > 0) {
    return `${years} yil oldin`;
  } else if (months > 0) {
    return `${months} oy oldin`;
  } else if (days > 0) {
    return `${days} kun oldin`;
  } else if (hours > 0) {
    return `${hours} soat oldin`;
  } else if (minutes > 0) {
    return `${minutes} minut oldin`;
  } else {
    return `${seconds} sekund oldin`;
  }
}
