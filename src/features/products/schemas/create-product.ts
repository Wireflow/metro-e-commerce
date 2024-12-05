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
  item_number: z.string().optional(),
});

export type GeneralInfoFormData = z.infer<typeof GeneralInfoSchema>;

export const PricingInfoSchema = z
  .object({
    cost_price: z.number({ invalid_type_error: 'Please enter a valid number' }).min(1),
    retail_price: z.number({ invalid_type_error: 'Please enter a valid number' }).min(1),
    wholesale_price: z.number({ invalid_type_error: 'Please enter a valid number' }).min(1),
    max_per_order: z.number({ invalid_type_error: 'Please enter a valid number' }).optional(),
    is_taxed: z.boolean().optional(),
    retail_discount: z
      .number({
        invalid_type_error: 'Please enter a valid number, 0 if no discount',
        required_error: 'Discount amount is required',
      })
      .optional(),
    wholesale_discount: z
      .number({
        invalid_type_error: 'Please enter a valid number, 0 if no discount',
        required_error: 'Discount amount is required',
      })
      .optional(),
    discounted_until: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    // Check retail discount
    if (data.retail_discount && data.retail_price) {
      if (data.retail_discount > data.retail_price) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Retail discount cannot be greater than retail price',
          path: ['retail_discount'],
        });
      }
    }

    // Check wholesale discount
    if (data.wholesale_discount && data.wholesale_price) {
      if (data.wholesale_discount > data.wholesale_price) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Wholesale discount cannot be greater than wholesale price',
          path: ['wholesale_discount'],
        });
      }
    }
  });

export const UpdatePricingInfoSchema = z
  .object({
    cost_price: z.number({ invalid_type_error: 'Please enter a valid number' }).optional(),
    retail_price: z.number({ invalid_type_error: 'Please enter a valid number' }).optional(),
    wholesale_price: z.number({ invalid_type_error: 'Please enter a valid number' }).optional(),
    max_per_order: z.number({ invalid_type_error: 'Please enter a valid number' }).optional(),

    is_taxed: z.boolean().optional(),

    retail_discount: z
      .number({
        invalid_type_error: 'Please enter a valid number, 0 if no discount',
        required_error: 'Discount amount is required',
      })
      .optional(),
    wholesale_discount: z
      .number({
        invalid_type_error: 'Please enter a valid number, 0 if no discount',
        required_error: 'Discount amount is required',
      })
      .optional(),
    discounted_until: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    // Check retail discount
    if (data.retail_discount && data.retail_price) {
      if (data.retail_discount > data.retail_price) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Retail discount cannot be greater than retail price',
          path: ['retail_discount'],
        });
      }
    }

    // Check wholesale discount
    if (data.wholesale_discount && data.wholesale_price) {
      if (data.wholesale_discount > data.wholesale_price) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Wholesale discount cannot be greater than wholesale price',
          path: ['wholesale_discount'],
        });
      }
    }
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
  pricing_info: UpdatePricingInfoSchema,
  barcodes: BarcodesSchema,
  category_id: z.string().min(1),
  id: z.string().optional(),
});

export type UpdateProductFormData = z.infer<typeof CreateProductSchema>;
