import { z } from 'zod';

export const updateAccountSchema = z.object({
  first_name: z.string().min(1, 'First name is required').optional(),
  last_name: z.string().min(1, 'Last name is required').optional(),
  phone: z.string().min(1, 'Phone number is required').optional(),
  email: z.string().min(1, 'Email is required').optional(),
});

export type UpdateAccountType = z.infer<typeof updateAccountSchema>;
