import { redirect } from 'next/navigation';

/**
 * Redirects to a specified path with an encoded message as a query parameter.
 * @param {('error' | 'success')} type - The type of message, either 'error' or 'success'.
 * @param {string} path - The path to redirect to.
 * @param {string} message - The message to be encoded and added as a query parameter.
 * @returns {never} This function doesn't return as it triggers a redirect.
 */
export function encodedRedirect(type: 'error' | 'success', path: string, message: string) {
  return redirect(`${path}?${type}=${encodeURIComponent(message)}`);
}

export const formatCurrency = (price?: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price || 0);
};

export const convertToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

export function formatPhoneNumber(number?: number | string): string {
  const cleaned = String(number).replace(/\D/g, '');

  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }

  return String(number);
}

export type AddressParams = {
  street: string;
  city: string;
  state: string;
  zip_code: string;
  country: string;
};

export function formatAddress(address: AddressParams) {
  return `${address.street}, ${address.city}, ${address.state}, ${address.zip_code}  ${address.country}`;
}

export const truncate = (text: string, length: number = 100) => {
  if (text.length <= length) return text;
  return text.slice(0, text.lastIndexOf(' ', length)).trim() + '...';
};

export const formatTaxId = (value: string) => {
  const numbers = value.replace(/\D/g, '');

  const truncated = numbers.slice(0, 9);

  if (truncated.length > 2) {
    return `${truncated.slice(0, 2)}-${truncated.slice(2)}`;
  }

  return truncated;
};

export const getColorHash = (lastFour: string): string => {
  // Convert last four digits to a number and use it as a seed
  const num = parseInt(lastFour);

  // Use the number to generate HSL values
  // Hue: Full 360 degrees of color based on number
  const hue = num % 360;
  // Saturation: Keep it between 60-80% for rich colors
  const saturation = 70 + (num % 10);
  // Lightness: Keep it between 15-25% to ensure dark colors
  const lightness = 15 + (num % 20);

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};

export const formatCardNumber = (value: string) => {
  const cleaned = value.replace(/\D/g, '');
  const matches = cleaned.match(/(\d{0,4})(\d{0,4})(\d{0,4})(\d{0,4})/);

  if (!matches) return '';

  const output = matches
    .slice(1)
    .filter(group => group !== '')
    .join(' ');

  return output;
};

export const formatExpiration = (value: string) => {
  // Remove any non-digit characters
  const cleaned = value.replace(/\D/g, '');

  // Handle backspace when the slash is present
  if (value.endsWith('/')) {
    return cleaned.substring(0, 2);
  }

  // Don't add slash if less than 2 digits
  if (cleaned.length < 2) {
    return cleaned;
  }

  // Add slash after month for 2 or more digits
  const month = cleaned.substring(0, 2);
  const year = cleaned.substring(2, 4);

  // Validate month
  if (parseInt(month) > 12) {
    return '12' + (year ? '/' + year : '');
  }

  if (parseInt(month) === 0) {
    return '01' + (year ? '/' + year : '');
  }

  return month + (year ? '/' + year : '');
};
