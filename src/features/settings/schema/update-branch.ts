import { z } from 'zod';

export const branchSchema = z.object({
  name: z.string().min(1),
  phone: z.string().min(1),
  email: z.string().min(1),
  orders_notified_email: z.string().min(1),
  address: z.string().min(1),
  city: z.string().min(1),
  state: z.string().min(1),
  zip_code: z.string().min(1),
});

export type BranchSchemaType = z.infer<typeof branchSchema>;
