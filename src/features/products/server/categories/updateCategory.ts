'use server';

import { revalidatePath } from 'next/cache';

import { createClient } from '@/utils/supabase/server';

import { CreateCategoryFormData } from '../../schemas/create-category';
import { deleteCategoryImage } from '../images/deleteCategoryImage';
import { uploadCategoryImage } from '../images/uploadCategoryImage';

const supabase = createClient();

export const updateCategory = async (data: Partial<CreateCategoryFormData>, image?: FormData) => {
  let imageResult: {
    publicUrl?: string;
    path?: string;
  } = {};

  if (!data.id) {
    return { success: false, error: 'Category not found!' };
  }

  const imageFile = image?.get('image') as File;

  if (imageFile) {
    const { data: img, error: pathError } = await supabase
      .from('categories')
      .select('image_path')
      .eq('id', data?.id)
      .single();

    if (pathError) {
      return { success: false, error: pathError.message };
    }

    if (img?.image_path) {
      const { success, error } = await deleteCategoryImage(img.image_path);

      if (!success) {
        return { success: false, error: error };
      }
    }

    const result = await uploadCategoryImage(imageFile, Date.now() + '_' + data?.name?.trim());

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

  const { data: category, error } = await supabase
    .from('categories')
    .update({
      ...(data.name && { name: data.name.trim() }),
      description: data?.description?.trim(),
      is_featured: data?.is_featured,
      published: data?.published,
      image_url: imageResult?.publicUrl || undefined,
      image_path: imageResult?.path || undefined,
      parent_category_id: data?.parent_category_id || null,
      promoted: data?.promoted,
    })
    .eq('id', data.id)
    .select()
    .single();

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath('/admin/categories/all');
  revalidatePath(`/admin/categories/${data.id}`);

  return { success: true, data: category };
};
