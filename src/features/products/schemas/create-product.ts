import { z } from 'zod';

export const GeneralInfoSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  unit: z.string().min(1),
  manufacturer: z.string().min(1),
  is_tobacco: z.boolean(),
  in_stock: z.boolean().optional(),
  published: z.boolean().optional(),
  is_featured: z.boolean().optional(),
});

export type GeneralInfoFormData = z.infer<typeof GeneralInfoSchema>;

export const PricingInfoSchema = z.object({
  cost_price: z.number({ invalid_type_error: 'Please enter a valid number' }).min(1),
  retail_price: z.number({ invalid_type_error: 'Please enter a valid number' }).min(1),
  wholesale_price: z.number({ invalid_type_error: 'Please enter a valid number' }).min(1),
  is_taxed: z.boolean(),
  discount: z.number().optional(),
  discounted_until: z.string().optional(),
});

export type PricingInfoFormData = z.infer<typeof PricingInfoSchema>;

export const BarcodesSchema = z
  .object({
    barcode: z.string().min(3, 'Barcode must be at least 3 character long'),
    barcode_id: z.string().optional(),
    id: z.string().optional(),
    disabled: z.boolean().optional(),
  })
  .array();

export type BarcodesFormData = z.infer<typeof BarcodesSchema>;

export const CreateProductSchema = z.object({
  general_info: GeneralInfoSchema,
  pricing_info: PricingInfoSchema,
  barcodes: BarcodesSchema,
  category_id: z.string().min(1),
  id: z.string().optional(),
});

export type CreateProductFormData = z.infer<typeof CreateProductSchema>;

export const UpdateProductSchema = z.object({
  general_info: GeneralInfoSchema.partial(),
  pricing_info: PricingInfoSchema.partial(),
  barcodes: BarcodesSchema,
  category_id: z.string().min(1),
  id: z.string().optional(),
});

export type UpdateProductFormData = z.infer<typeof CreateProductSchema>;
