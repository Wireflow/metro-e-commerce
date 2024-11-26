import { z } from 'zod';

import { FileSchema } from './tax-id-approve';

export const TobaccoLicenseSchema = z.object({
  licenseNumber: z
    .string()
    .min(3, 'License number must be at least 3 characters')
    .max(50, 'License number is too long')
    .trim(),
  image: FileSchema,
});

export type TobaccoLicenseType = z.infer<typeof TobaccoLicenseSchema>;
