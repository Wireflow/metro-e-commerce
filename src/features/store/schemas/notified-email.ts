import { z } from 'zod';

export const NotifiedEmailSchema = z.object({
  orders_notified_email: z.string().email(),
});

export type NotifiedEmailType = z.infer<typeof NotifiedEmailSchema>;
