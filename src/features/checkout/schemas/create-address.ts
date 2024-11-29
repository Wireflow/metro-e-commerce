import { z } from 'zod';

export const CreateAddressSchema = z.object({
  name: z.string().min(2),
  street: z.string().min(2),
  city: z.string().min(2),
  state: z.string().min(2),
  zip_code: z.string().min(2),
  country: z.string().min(2),
  type: z.enum(['billing', 'delivery']),
});

export type CreateAddressType = z.infer<typeof CreateAddressSchema>;
