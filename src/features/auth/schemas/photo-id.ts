import { z } from 'zod';

// File validation schema

// File validation schema for ImagePicker
export const FileSchema = z.custom<File>(val => val instanceof File, 'Please upload a valid file');

export const PhotoIdSchema = z.object({
  photo_id_image: FileSchema.refine(
    file => file instanceof File && file.size <= 5 * 1024 * 1024, // 5MB
    'File must be less than 5MB'
  ).refine(file => {
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    return file instanceof File && validTypes.includes(file.type);
  }, 'File must be a JPEG or PNG image'), // Use ImagePickerAssetSchema here
});

export type PhotoIdType = z.infer<typeof PhotoIdSchema>;
