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

type AddressParams = {
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
