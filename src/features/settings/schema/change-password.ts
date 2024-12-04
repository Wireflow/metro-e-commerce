import { z } from 'zod';

export const ChangePasswordSchema = z.object({
  old_password: z.string().min(2),
  new_password: z.string().min(2),
  confirm_password: z.string().min(2),
});

export type ChangePasswordType = z.infer<typeof ChangePasswordSchema>;
