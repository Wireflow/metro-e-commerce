import { z } from 'zod';

// File validation schema
export const FileSchema = z.custom<File>(val => val instanceof File, 'Please upload a valid file');

export const TaxIdApproveSchema = z
  .object({
    tax_id: z
      .string()
      .regex(/^\d{2}-\d{7}$/, 'Tax ID must be in format XX-XXXXXXX')
      .refine(val => {
        // Remove hyphen and check if it's 9 digits
        const digitsOnly = val.replace(/-/g, '');
        return digitsOnly.length === 9;
      }, 'Tax ID must contain exactly 9 digits'),
    tax_id_image: FileSchema.refine(
      file => file instanceof File && file.size <= 5 * 1024 * 1024, // 5MB
      'File must be less than 5MB'
    ).refine(file => {
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      return file instanceof File && validTypes.includes(file.type);
    }, 'File must be a JPEG or PNG image'),
  })
  .refine(
    data => {
      const digitsOnly = data.tax_id.replace(/-/g, '');
      return digitsOnly.length === 9 && /^\d{9}$/.test(digitsOnly);
    },
    {
      message: 'Invalid Tax ID format',
      path: ['tax_id'],
    }
  );

export type TaxIdApproveType = z.infer<typeof TaxIdApproveSchema>;
