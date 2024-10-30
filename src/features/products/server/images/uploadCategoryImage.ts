'use server';

import { createClient } from '@/utils/supabase/server';

const supabase = createClient();

export const uploadCategoryImage = async (file: File, fileName: string) => {
  try {
    const { error, data } = await supabase.storage.from('categories').upload(fileName, file, {
      contentType: 'image/jpeg',
    });

    if (error) {
      return { success: false, error: error.message };
    }

    const { data: urlData } = supabase.storage.from('categories').getPublicUrl(fileName);

    if (!urlData.publicUrl) {
      return { success: false, error: 'Failed to get public url' };
    }

    return {
      success: true,
      data: {
        publicUrl: urlData.publicUrl,
        path: data.fullPath,
      },
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error processing image',
    };
  }
};
