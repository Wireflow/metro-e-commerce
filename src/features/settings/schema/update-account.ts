import { z } from 'zod';

export const updateAccountSchema = z.object({
  first_name: z.string().min(1, 'First name is required'),
  last_name: z.string().min(1, 'Last name is required'),
  phone: z.string().min(1, 'Phone number is required'),
});

export type UpdateAccountType = z.infer<typeof updateAccountSchema>;
