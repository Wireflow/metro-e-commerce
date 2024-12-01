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
    .transform(val => val.replace(/\s/g, '')), // Remove spaces before validation

  expiration: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, 'Expiration must be in MM/YY format') // Make the slash optional
    .transform(val => {
      // Normalize the format to include the slash
      const cleaned = val.replace(/\D/g, '');
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
    })
    .refine(val => {
      const [month, yearStr] = val.split('/');
      const year = 2000 + parseInt(yearStr);
      const expiry = new Date(year, parseInt(month) - 1);
      const now = new Date();

      // Set both dates to the first of the month for comparison
      now.setDate(1);
      expiry.setDate(1);

      return expiry >= now;
    }, 'Card has expired'),

  cvc: z.string().regex(/^\d{3,4}$/, 'CVC must be 3 or 4 digits'),
});

export type CreateCardType = z.infer<typeof CreateCardSchema>;
