// schemas/tos.ts
import { z } from 'zod';

export const SubsectionSchema = z.object({
  id: z.string().min(1, 'Subsection ID is required'),
  content: z.string().min(1, 'Subsection content is required'),
  contactDetails: z
    .object({
      company: z.string(),
      address: z.string(),
      phone: z.string(),
      email: z.string(),
    })
    .optional(),
});

export const SectionSchema = z.object({
  id: z.string().min(1, 'Section ID is required'),
  title: z.string().min(1, 'Section title is required'),
  subsections: z.array(SubsectionSchema),
});

export const TermsOfServiceSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  lastUpdated: z.string().min(1, 'Last updated date is required'),
  companyName: z.string().min(1, 'Company name is required'),
  introduction: z.string().min(1, 'Introduction is required'),
  sections: z.array(SectionSchema),
});

export const TermsOfServiceDocumentSchema = z.object({
  termsOfService: TermsOfServiceSchema,
});

// Type inference
export type Subsection = z.infer<typeof SubsectionSchema>;
export type Section = z.infer<typeof SectionSchema>;
export type TermsOfService = z.infer<typeof TermsOfServiceSchema>;
export type TermsOfServiceDocument = z.infer<typeof TermsOfServiceDocumentSchema>;
