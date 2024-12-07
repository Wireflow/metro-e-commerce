import { z } from 'zod';

export const TokenSchema = z.object({
  token: z.string(),
  amount: z.string(),
  cvc: z
    .string()
    .regex(/^\d{3,4}$/, 'Invalid CVV')
    .optional(),
});
