'use server';

import { revalidatePath } from 'next/cache';

import { createClient } from '@/utils/supabase/server';

import { CreateProductFormData } from '../../schemas/create-product';
import { createBarcodes } from '../barcodes/createBarcode';
import { uploadProductImages } from '../images/uploadProductImage';

const supabase = createClient();

export const updateProduct = async (data: Partial<CreateProductFormData>, images?: FormData) => {
  if (!data.id) {
    return { success: false, error: 'Product is required' };
  }

  const { barcodes, general_info, pricing_info, category_id } = data;

  const { data: product, error } = await supabase
    .from('products')
    .update({
      ...general_info,
      ...pricing_info,
      category_id: category_id,
    })
    .eq('id', data.id);

  if (error) {
    return { success: false, error: error.message };
  }

  if (barcodes && barcodes?.length > 0) {
    const formattedBarcodes = barcodes?.map(barcode => ({
      product_id: data.id ?? '',
      barcode: barcode.barcode,
    }));

    await createBarcodes(formattedBarcodes);
  }

  if (images) {
    const imageFiles = Array.from(images.getAll('images')) as File[];

    if (imageFiles.length > 0) {
      await uploadProductImages(imageFiles, data.id);
    }
  }

  revalidatePath('/admin/products/all');
  revalidatePath(`/admin/products/${data.id}`);

  return { success: true, data: product };
};
