import { z } from 'zod';

const isValidLuhn = (cardNumber: string): boolean => {
  const digits = cardNumber.split('').map(Number);
  let sum = 0;
  let isEven = false;

  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = digits[i];

    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    isEven = !isEven;
  }

  return sum % 10 === 0;
};

// Custom Zod refinement for Luhn algorithm
const luhnCheck = (cardNumber: string): boolean => isValidLuhn(cardNumber.replace(/\D/g, ''));

export const CreateCardSchema = z.object({
  cardholder: z.string().min(1, 'Cardholder name is required'),
  number: z
    .string()
    .min(13, 'Card number must be at least 13 digits')
    .max(19, 'Card number must not exceed 19 digits')
    .refine(luhnCheck, 'Invalid card number'),
  expiration: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Expiration must be in MM/YY format')
    .refine(val => {
      const [month, year] = val.split('/').map(Number);
      const now = new Date();
      const expiry = new Date(2000 + year, month - 1);
      return expiry > now;
    }, 'Card has expired'),
  cvc: z.string().regex(/^\d{3,4}$/, 'CVC must be 3 or 4 digits'),
});

export type CreateCardType = z.infer<typeof CreateCardSchema>;
