import { z } from 'zod';

export const CreateOrderSchema = z.object({
  orderType: z.enum(['pickup', 'delivery']),
  customer_id: z.string(),
});
