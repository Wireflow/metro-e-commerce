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

export const formatDateToString = (date: Date, options?: Intl.DateTimeFormatOptions) => {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    ...options,
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

export const formatRelativeDateTime = (date: string | null) => {
  if (!date) return null;

  const dateObj = new Date(date);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  // Format time
  const timeString = dateObj.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  // Check if date is today, yesterday, or older
  if (dateObj.toDateString() === today.toDateString()) {
    return `Today at ${timeString}`;
  } else if (dateObj.toDateString() === yesterday.toDateString()) {
    return `Yesterday at ${timeString}`;
  } else {
    // For older dates, show the full date
    const dateString = dateObj.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: dateObj.getFullYear() !== today.getFullYear() ? 'numeric' : undefined,
    });
    return `${dateString} at ${timeString}`;
  }
};
