import { z } from 'zod';

export const CreateCategorySchema = z.object({
  name: z.string().min(1),
  description: z.string(),
  id: z.string().optional(),
  is_featured: z.boolean().optional(),
  published: z.boolean().optional(),
});

export type CreateCategoryFormData = z.infer<typeof CreateCategorySchema>;
