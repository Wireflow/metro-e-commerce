import { z } from 'zod';

import { Row } from '@/types/supabase/table';

export type CustomPromotion = Row<'custom_promotions'>;

// Define a custom file schema
export const FileSchema = z.instanceof(File, {
  message: 'Must be a file upload',
});

export const EditCustomPromoSchema = z.object({
  id: z.number(),
  label: z.string().optional(),
  branch_id: z.string(),
  title: z.string(),
  description: z.string(),
  call_to_action: z.string(),
  image: FileSchema.optional().nullable(),
});

export type EditCustomPromoType = z.infer<typeof EditCustomPromoSchema>;
