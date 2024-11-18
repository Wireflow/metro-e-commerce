'use server';

import { createClient } from '@/utils/supabase/server';

const supabase = createClient();

export const uploadProductImage = async (file: File, productId: string, fileName: string) => {
  try {
    const { error, data } = await supabase.storage.from('products').upload(fileName, file, {
      contentType: 'image/jpeg',
    });

    if (error) {
      return { success: false, error: error.message };
    }

    const { data: urlData } = supabase.storage.from('products').getPublicUrl(fileName);

    if (!urlData.publicUrl) {
      return { success: false, error: 'Failed to get public url' };
    }

    const { data: productImage, error: productImageError } = await supabase
      .from('product_images')
      .insert({
        product_id: productId,
        url: urlData.publicUrl,
        path: data.fullPath,
      })
      .select()
      .single();

    if (productImageError) {
      return { success: false, error: productImageError.message };
    }

    return { success: true, publicUrl: productImage };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error processing image',
    };
  }
};

export const uploadProductImages = async (files: File[], productId: string) => {
  const responses = await Promise.all(
    files.map(file => uploadProductImage(file, productId, Date.now() + '_' + productId))
  );

  console.log(responses);

  return responses.filter(response => response.success);
};
