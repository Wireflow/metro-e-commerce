'use server';

import { createClient } from '@/utils/supabase/server';

export const deleteCategoryImage = async (path: string) => {
  const supabase = createClient();

  const { error: storageError } = await supabase.storage.from('categories').remove([path]);

  if (storageError) {
    return { success: false, error: storageError.message };
  }

  return { success: true };
};
