import { z } from 'zod';

export const PolicySectionSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
  items: z.array(z.string()).optional(),
  note: z.string().optional(),
});

export const PrivacyPolicySchema = z.object({
  title: z.string().min(1, 'Title is required'),
  lastUpdated: z.string().min(1, 'Last updated date is required'),
  appName: z.string().min(1, 'App name is required'),
  introduction: z.string().min(1, 'Introduction is required'),
  sections: z.array(PolicySectionSchema),
});

export const PrivacyPolicyDocumentSchema = z.object({
  privacyPolicy: PrivacyPolicySchema,
});

// Type inference
export type PolicySection = z.infer<typeof PolicySectionSchema>;
export type PrivacyPolicy = z.infer<typeof PrivacyPolicySchema>;
export type PrivacyPolicyDocument = z.infer<typeof PrivacyPolicyDocumentSchema>;
