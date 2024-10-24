import { z } from 'zod';

export const SignInSchema = z.object({
  email: z.string({ required_error: 'Email is required' }).email(),
  password: z.string({ required_error: 'Please enter your password' }),
});

export type SignInType = z.infer<typeof SignInSchema>;
