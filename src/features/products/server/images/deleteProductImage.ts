'use server';

import { createClient } from '@/utils/supabase/server';

export const deleteProductImage = async (product_image_id: string) => {
  const supabase = createClient();

  const { data: productImage, error: productImagesError } = await supabase
    .from('product_images')
    .select('path')
    .eq('id', product_image_id)
    .single();

  if (productImagesError) {
    return { success: false, error: productImagesError.message };
  }

  const { error: storageError } = await supabase.storage
    .from('products')
    .remove([productImage.path]);

  if (storageError) {
    return { success: false, error: storageError.message };
  }

  const { data, error } = await supabase.from('product_images').delete().eq('id', product_image_id);

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true, data };
};
