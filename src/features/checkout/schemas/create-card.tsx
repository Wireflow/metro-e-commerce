import { z } from 'zod';

export const CreateCardSchema = z.object({
  cardholder: z
    .string()
    .min(1, 'Cardholder name is required')
    .regex(/^[a-zA-Z\s]+$/, 'Cardholder name can only contain letters and spaces'),

  number: z
    .string()
    .min(13, 'Card number must be at least 13 digits')
    .max(19, 'Card number must not exceed 19 digits')
    .regex(/^\d+$/, 'Card number must contain only digits')
    .transform(val => val.replace(/\s/g, '')),

  expiration: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, 'Expiration must be in MM/YY format')
    .transform(val => {
      const cleaned = val.replace(/\D/g, '');
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
    })
    .refine(val => {
      const [monthStr, yearStr] = val.split('/');
      const year = 2000 + parseInt(yearStr);
      const month = parseInt(monthStr);

      // Get current date
      const now = new Date();

      // Create expiration date at the end of the month
      // Month is 0-based in JavaScript, so we use the next month's 0th day
      // (which is the last day of the current month)
      const expiry = new Date(year, month, 0, 23, 59, 59, 999);

      return expiry >= now;
    }, 'Card has expired')
    .refine(val => {
      const [monthStr, yearStr] = val.split('/');
      const year = 2000 + parseInt(yearStr);

      // Check if the year is not too far in the future (e.g., not more than 20 years)
      const maxYear = new Date().getFullYear() + 20;
      return year <= maxYear;
    }, 'Expiration year too far in the future'),

  cvc: z.string().regex(/^\d{3,4}$/, 'CVC must be 3 or 4 digits'),
  billing_address_id: z.string(),
});

export type CreateCardType = z.infer<typeof CreateCardSchema>;
