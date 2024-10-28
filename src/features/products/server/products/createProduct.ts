'use server';

import { revalidatePath } from 'next/cache';

import { METRO_BRANCH_ID } from '@/data/constants';
import { createClient } from '@/utils/supabase/server';

import { CreateProductFormData, CreateProductSchema } from '../../schemas/create-product';
import { createBarcodes } from '../barcodes/createBarcode';
import { uploadProductImages } from '../images/uploadProductImage';

const supabase = createClient();
export const createProduct = async (data: CreateProductFormData, images?: FormData) => {
  const { barcodes, general_info, pricing_info, category_id } = CreateProductSchema.parse(data);

  const { data: product, error } = await supabase
    .from('products')
    .insert({
      ...general_info,
      ...pricing_info,
      category_id: category_id,
      branch_id: METRO_BRANCH_ID,
    })
    .select()
    .single();

  if (error) {
    return { success: false, error: error.message };
  }

  if (barcodes.length > 0) {
    const formattedBarcodes = barcodes?.map(barcode => ({
      barcode: barcode.barcode,
      product_id: product.id,
    }));

    await createBarcodes(formattedBarcodes);
  }

  if (images) {
    const imageFiles = Array.from(images.getAll('images')) as File[];
    if (imageFiles.length > 0) {
      await uploadProductImages(imageFiles, product.id);
    }
  }

  revalidatePath('/admin/products/all');

  return { success: true, data: product };
};
