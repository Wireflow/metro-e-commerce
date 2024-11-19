import { z } from 'zod';

export const CreateCategorySchema = z
  .object({
    name: z.string().min(1),
    description: z.string(),
    id: z.string().optional(),
    is_featured: z.boolean().optional(),
    published: z.boolean().optional(),
    parent_category_id: z.string().optional().nullable(),
  })
  .superRefine(data => {
    if (data.parent_category_id === data.id) {
      return {
        message: 'Parent category cannot be the same as the category',
        path: ['parent_category_id'],
      };
    }
  });

export type CreateCategoryFormData = z.infer<typeof CreateCategorySchema>;
