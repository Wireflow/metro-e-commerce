export const millisecondsToHours = (milliseconds: number) => {
  if (typeof milliseconds !== 'number' || isNaN(milliseconds)) {
    throw new Error('Invalid input: milliseconds must be a number');
  }

  const MILLISECONDS_PER_HOUR = 3600000; // 3600000 ms = 1 hour
  return milliseconds / MILLISECONDS_PER_HOUR;
};

export function millisecondsToHoursAndMinutes(milliseconds: number) {
  const hours = Math.floor(milliseconds / 3600000);
  const minutes = Math.floor((milliseconds % 3600000) / 60000);

  return { hours, minutes };
}

export const formatDateToString = (date: Date) => {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const formatDateForCSV = (date: Date) => {
  return date
    .toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    })
    .replace(',', '');
};
