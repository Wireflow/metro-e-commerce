import { z } from 'zod';

export const ForgotPasswordSchema = z
  .object({
    oldPassword: z.string({ required_error: 'Please enter your old password' }),
    newPassword: z
      .string({ required_error: 'Please enter your new password' })
      .min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string({
      required_error: 'Please confirm your new password',
    }),
  })
  .refine(data => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type ForgotPasswordType = z.infer<typeof ForgotPasswordSchema>;

export const RecoverPasswordSchema = z.object({
  email: z.string().email({ message: 'Please enter your email' }),
  callbackUrl: z.string().optional(),
});

export type RecoverPasswordType = z.infer<typeof RecoverPasswordSchema>;
