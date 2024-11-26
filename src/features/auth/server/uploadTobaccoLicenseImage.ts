'use server';

import { SupabaseImage } from '@/features/promotions/hooks/mutations/useUploadPromotionImage';
import { createClient } from '@/utils/supabase/server';

export const uploadTobaccoLicenseImage = async (file: File, userId: string) => {
  const supabase = createClient();

  // Create a consistent filename for the user's tax ID
  const fileExt = file.name.split('.').pop();
  const fileName = `${userId}-tobacco-license.${fileExt}`;
  const bucketPath = `tobacco-licenses/${fileName}`;

  // First, try to delete the existing file if it exists
  // This ensures we don't have any caching issues
  await supabase.storage
    .from('tobacco-licenses')
    .remove([fileName])
    .catch(() => {
      // Ignore delete errors - file might not exist
    });

  // Upload the new file
  const { data, error } = await supabase.storage.from('tobacco-licenses').upload(fileName, file, {
    cacheControl: '3600',
    upsert: true,
    contentType: file.type,
  });

  if (error) {
    throw error;
  }

  const { data: urlData } = supabase.storage.from('tobacco-licenses').getPublicUrl(fileName);

  // Add timestamp to URL to prevent browser caching
  const publicUrl = `${urlData.publicUrl}`;

  const image: SupabaseImage = {
    id: data.id,
    image_path: data.path || bucketPath,
    public_url: publicUrl,
  };

  return image;
};
