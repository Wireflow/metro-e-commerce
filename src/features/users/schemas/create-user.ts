import { z } from 'zod';

const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(
    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/,
    'Password must contain at least one letter and one number'
  );

export const CreateUserSchema = z
  .object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.string().min(1, 'Email is required').email('Please enter a valid email'),
    phone: z
      .string()
      .min(1, 'Phone number is required')
      .regex(
        /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
        'Please enter a valid phone number'
      ),
    password: passwordSchema.optional(),
    confirmPassword: z.string().min(1, 'Please confirm your password').optional(),
    role: z.enum(['sales', 'independent_sales'], {
      errorMap: () => ({ message: 'Please select a valid role' }),
    }),
  })
  .refine(
    data => {
      // Only check password match if password is provided
      if (!data.password) return true;
      return data.password === data.confirmPassword;
    },
    {
      message: 'Passwords do not match',
      path: ['confirmPassword'],
    }
  );

export const UpdatePasswordSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type CreateUserType = z.infer<typeof CreateUserSchema>;
export type UpdatePasswordType = z.infer<typeof UpdatePasswordSchema>;
