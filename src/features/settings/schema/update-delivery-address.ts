import { z } from 'zod';

export const UpdateAddressSchema = z.object({
  name: z.string().min(2).optional(),
  street: z.string().min(2).optional(),
  city: z.string().min(2).optional(),
  state: z.string().min(2).optional(),
  zip_code: z.string().min(2).optional(),
  country: z.string().min(2).optional(),
  type: z.enum(['billing', 'delivery']),
});

export type UpdateAddressType = z.infer<typeof UpdateAddressSchema>;
