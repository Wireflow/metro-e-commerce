// src/utils/validator.ts

import { z } from 'zod';

// Helper function for Luhn algorithm check
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
const luhnCheck = (cardNumber: string) => isValidLuhn(cardNumber.replace(/\D/g, ''));

// Zod schema for card details
export const CardDetailsSchema = z.object({
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
  avs_street: z.string(),
  avs_postalcode: z.string(),
});

// Infer the TypeScript type from the Zod schema
export type CardDetails = z.infer<typeof CardDetailsSchema>;

// Validation function
export const validateCardDetails = (cardDetails: CardDetails) => {
  const result = CardDetailsSchema.safeParse(cardDetails);
  if (!result.success) {
    // Return the first error message
    return result.error.flatten().formErrors[0];
  }
  return null;
};
