'use server';

import { createClient } from '@/utils/supabase/server';

import { PromotedProduct } from '../hooks/queries/usePromotedProducts';

export const getPromotedProducts = async (promotionIds: number[]) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('promoted_products')
    .select('*, product:products(*, images:product_images(*), barcodes:barcodes(*))')
    .order('id', { ascending: true })
    .in('id', promotionIds);

  if (error) {
    throw error;
  }

  return data as unknown as PromotedProduct[];
};
