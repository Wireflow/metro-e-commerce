'use server';

import { revalidatePath } from 'next/cache';

import { METRO_BRANCH_ID } from '@/data/constants';
import { createClient } from '@/utils/supabase/server';

import { CreateCategoryFormData, CreateCategorySchema } from '../../schemas/create-category';
import { uploadCategoryImage } from '../images/uploadCategoryImage';

const supabase = createClient();

export const createCategory = async (data: CreateCategoryFormData, image?: FormData) => {
  const categoryData = CreateCategorySchema.parse(data);

  let imageResult: {
    publicUrl?: string;
    path?: string;
  } = {};

  if (image?.get('image')) {
    const imageFile = image.get('image') as File;

    if (imageFile) {
      const result = await uploadCategoryImage(
        imageFile,
        Date.now() + '_' + categoryData.name.trim()
      );

      if (result.success) {
        imageResult = {
          publicUrl: result?.data?.publicUrl,
          path: result?.data?.path,
        };
      }

      if (!result?.success) {
        return { success: false, error: result?.error };
      }
    }
  }

  const { data: category, error } = await supabase
    .from('categories')
    .insert({
      name: categoryData.name.trim(),
      description: categoryData.description?.trim(),
      image_url: imageResult?.publicUrl || null,
      image_path: imageResult?.path || null,
      parent_category_id: categoryData.parent_category_id || null,
      branch_id: METRO_BRANCH_ID,
    })
    .select()
    .single();

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath('/admin/categories/all');

  return { success: true, data: category };
};
