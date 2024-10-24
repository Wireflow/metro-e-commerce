import { z } from 'zod';

const PersonalInfoSchema = z.object({
  first_name: z.string().min(2, 'First name must be at least 2 characters'),
  last_name: z.string().min(2, 'Last name must be at least 2 characters'),
  phone: z
    .string()
    .min(10, 'Phone number must be at least 10 characters')
    .max(10, 'Phone number must be at most 10 characters'),
});

const BusinessInfoSchema = z.object({
  business_name: z.string().min(2, 'Business name must be at least 2 characters'),
  business_type: z.enum(['retail', 'wholesale']),
  street: z.string({ required_error: 'Street is required' }),
  city: z.string().min(2, 'City must be at least 2 characters'),
  state: z.string().min(2, 'State must be at least 2 characters'),
  zip_code: z.string().min(2, 'Zip code must be at least 2 characters'),
  country: z.string().min(2, 'Country must be at least 2 characters'),
});

const AccountInfoSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirm_password: z.string().min(8, 'Password must be at least 8 characters'),
  })
  .refine(data => data.password === data.confirm_password, {
    message: 'Passwords do not match',
    path: ['confirm_password'],
  });

export const SignUpSchema = z.object({
  personal_info: PersonalInfoSchema,
  business_info: BusinessInfoSchema,
  account_info: AccountInfoSchema,
  branchId: z.string({ required_error: 'Branch ID is required' }),
});

export type SignUpType = z.infer<typeof SignUpSchema>;
