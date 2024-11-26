import { z } from 'zod';

const PersonalInfoSchema = z.object({
  first_name: z.string().min(2, 'First name must be at least 2 characters'),
  last_name: z.string().min(2, 'Last name must be at least 2 characters'),
  phone: z
    .string()
    .min(10, 'Phone number must be 10 digits')
    .max(10, 'Phone number must be 10 digits')
    .regex(/^\d+$/, 'Phone number must contain only numbers')
    .refine(
      val => /^(?!0{10}|1{10}|2{10}|3{10}|4{10}|5{10}|6{10}|7{10}|8{10}|9{10})\d{10}$/.test(val),
      {
        message: 'Please enter a valid phone number',
      }
    ),
});

const BusinessInfoSchema = z.object({
  business_name: z.string().min(2, 'Business name must be at least 2 characters'),
  customer_type: z.enum(['retail', 'wholesale']),
  street: z
    .string({ required_error: 'Street is required' })
    .min(5, 'Street address must be at least 5 characters')
    .regex(/^[a-zA-Z0-9\s,.-]+$/, 'Please enter a valid street address'),
  city: z
    .string()
    .min(2, 'City must be at least 2 letters')
    .regex(/^[a-zA-Z\s.-]+$/, 'Please enter a valid city name'),
  state: z
    .string()
    .min(2, 'State must be at least 2 letters')
    .regex(/^[a-zA-Z\s.-]+$/, 'Please enter a valid state name'),
  zip_code: z
    .string()
    .regex(/^\d{5}(-\d{4})?$/, 'Please enter a valid ZIP code (e.g., 12345 or 12345-6789)')
    .min(5, 'ZIP code must be at least 5 digits'),
  country: z
    .string()
    .min(2, 'Country must be at least 2 letters')
    .regex(/^[a-zA-Z\s.-]+$/, 'Please enter a valid country name'),
});

const AccountInfoSchema = z
  .object({
    email: z.string().email('Please enter a valid email address'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        'Password must contain at least one letter and one number'
      ),
    confirm_password: z.string(),
  })
  .refine(data => data.password === data.confirm_password, {
    message: 'Passwords do not match',
    path: ['confirm_password'],
  });

export const RegisterSchema = z.object({
  personal_info: PersonalInfoSchema,
  business_info: BusinessInfoSchema,
  account_info: AccountInfoSchema,
});

export type RegisterType = z.infer<typeof RegisterSchema>;
