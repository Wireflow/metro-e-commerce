import { createClient } from '@/utils/supabase/client';

export type SupabaseImage = {
  id: string;
  image_path: string;
  public_url: string;
};

export const uploadPromotionImage = async (file: File) => {
  const supabase = createClient();

  // Create a unique filename by adding a timestamp
  const fileExt = file.name.split('.').pop();
  const uniqueFileName = `${file.name.replace(`.${fileExt}`, '')}_${Date.now()}.${fileExt}`;

  const { data, error } = await supabase.storage.from('promotions').upload(uniqueFileName, file, {
    cacheControl: '3600',
    upsert: true,
  });

  if (error) {
    throw error;
  }

  const { data: urlData } = supabase.storage.from('promotions').getPublicUrl(uniqueFileName);

  const image: SupabaseImage = {
    id: data.id,
    image_path: data.fullPath,
    public_url: urlData.publicUrl,
  };

  return image;
};

// Optional: Helper function to clean up old images
export const deletePromotionImage = async (imagePath: string) => {
  const supabase = createClient();

  const { error } = await supabase.storage.from('promotions').remove([imagePath]);

  if (error) {
    console.error('Error deleting old image:', error);
  }
};
